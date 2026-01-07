import { execSync } from 'child_process'
import { existsSync, rmSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

// 获取命令行参数中的版本升级类型
const args = process.argv.slice(2)
const versionType = args.find(arg => ['patch', 'minor', 'major'].includes(arg))

console.log('🚀 开始构建组件库...')

// 只有指定了版本类型时才升级版本号和更新 CHANGELOG
if (versionType) {
  try {
    console.log(`📈 升级版本号 (${versionType}) 并更新 CHANGELOG...`)
    // 使用 standard-version 更新 CHANGELOG 和版本号，但不创建 git tag
    execSync(`standard-version --release-as ${versionType} --skip.tag --skip.commit`, {
      stdio: 'inherit',
    })
  } catch (error) {
    console.error('❌ 版本号升级失败：', error.message)
    process.exit(1)
  }
}

// 读取当前版本号
const packageJsonPath = path.resolve(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
const currentVersion = packageJson.version
console.log(`📌 当前版本: ${currentVersion}`)

// 执行构建
try {
  console.log('📦 构建中...')
  execSync('vite build', { stdio: 'inherit' })

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
    execSync('node scripts/generate-version-info.js', { stdio: 'inherit' })
  } catch (error) {
    console.warn('⚠️  版本信息生成失败，但不影响构建')
  }
} catch (error) {
  console.error('❌ 构建失败：', error.message)
  process.exit(1)
}
