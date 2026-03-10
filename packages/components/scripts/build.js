import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { applyVersionBump, findVersionType, readCurrentVersion, restoreFiles, run, snapshotFiles } from './release-utils.js'

const versionType = findVersionType()
const releaseSnapshot = versionType ? snapshotFiles() : null

console.log('🚀 开始构建组件库...')

if (versionType) {
  try {
    console.log(`📈 升级版本号 (${versionType}) 并更新 CHANGELOG...`)
    const nextVersion = applyVersionBump(versionType)
    console.log(`📌 版本已更新为: ${nextVersion}`)
  } catch (error) {
    if (releaseSnapshot) {
      restoreFiles(releaseSnapshot)
      console.error('↩️ 已恢复版本文件与 CHANGELOG 的变更')
    }
    console.error('❌ 版本号升级失败：', error.message)
    process.exit(1)
  }
}

const currentVersion = readCurrentVersion()
console.log(`📌 当前版本: ${currentVersion}`)

// 执行构建
try {
  console.log('📦 构建中...')
  run('vite build')

  console.log('✅ Vite 构建完成')

  // 后处理
  const jsPath = path.resolve(process.cwd(), 'dist/index.js')

  if (!existsSync(jsPath)) {
    throw new Error('index.js not found in dist directory')
  }

  console.log('🧹 后处理中...')

  let jsContent = readFileSync(jsPath, 'utf8')

  // 替换版本号占位符（Vite 已经加了引号，所以直接替换内容）
  jsContent = jsContent.replace(/"__PACKAGE_VERSION__"/g, `"${currentVersion}"`)
  jsContent = jsContent.replace(/'__PACKAGE_VERSION__'/g, `'${currentVersion}'`)

  // 同时替换可能存在的旧版本号（当 Vite 使用了 define 配置时）
  // 查找类似 const Kc = "1.4.0", kc = 的模式并替换（version 导出语句）
  jsContent = jsContent.replace(
    /const\s+(\w+)\s*=\s*"(\d+\.\d+\.\d+(-[\w.]+)?)"/g,
    (match, varName, oldVersion) => {
      // 检查这行后面是否还有同一个变量的引用（如 const Kc = "1.4.0", kc = ...）
      const lineStart = jsContent.indexOf(match)
      const lineEnd = jsContent.indexOf('\n', lineStart)
      const line = jsContent.substring(lineStart, lineEnd)

      // 如果行中包含逗号且逗号后有小写字母开头的同名变量，则替换
      if (line.includes(',') && line.includes(`${varName.toLowerCase()} =`)) {
        return `const ${varName} = "${currentVersion}"`
      }
      return match
    },
  )

  // 移除 index.css 导入（CSS 会被单独输出到 dist/index.css）
  // 注意：保留 Element Plus 的样式导入，让 unplugin-element-plus 处理并合并到 CSS
  const indexCssImportRegex = /import\s+['"]\.\/index\.css['"]\s*;?\s*/g

  const indexRemovedImports = jsContent.match(indexCssImportRegex) || []

  jsContent = jsContent.replace(indexCssImportRegex, '')

  // 写回 JS 文件
  writeFileSync(jsPath, jsContent)

  console.log(
    `   版本号: ${currentVersion}, CSS 导入清理: ${indexRemovedImports.length} 个 index.css 导入`,
  )
  console.log(
    `   ✨ Element Plus 样式已合并到组件库 CSS 中`,
  )

  console.log('')
  console.log('✅ 构建成功！')
  console.log('')
  console.log('构建产物：')
  console.log('- dist/index.js      (ES Module)')
  console.log('- dist/index.d.ts    (TypeScript 声明文件)')
  console.log('- dist/index.css     (样式文件)')

  // 生成版本信息（供 docs 使用）
  try {
    console.log('')
    console.log('📝 生成版本信息...')
    run('node scripts/generate-version-info.js')
  } catch (error) {
    console.warn('⚠️  版本信息生成失败，但不影响构建')
  }
} catch (error) {
  if (releaseSnapshot) {
    restoreFiles(releaseSnapshot)
    console.error('↩️ 已恢复版本文件与 CHANGELOG 的变更')
  }
  console.error('❌ 构建失败：', error.message)
  process.exit(1)
}
