import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

/**
 * 生成版本信息 JSON 文件
 * 用于文档站点展示版本信息和更新日志
 */

const packageJsonPath = path.resolve(process.cwd(), 'package.json')
const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md')
const outputPath = path.resolve(process.cwd(), 'dist/version-info.json')

console.log('📝 生成版本信息...')

// 读取 package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

// 读取 CHANGELOG.md
let changelog = ''
if (existsSync(changelogPath)) {
  changelog = readFileSync(changelogPath, 'utf8')
}

// 解析 CHANGELOG 获取最新版本信息
const latestVersionMatch = changelog.match(/\[(\d+\.\d+\.\d+)\][^—]*?(\d{4}-\d{2}-\d{2})/s)

// 提取最近 3 个版本的更新内容
const recentChanges = []
const versionSections = changelog.split(/^## \[/m)

for (let i = 1; i < Math.min(4, versionSections.length); i++) {
  const section = versionSections[i]
  const titleMatch = section.match(/^(\d+\.\d+\.\d+).*?(\d{4}-\d{2}-\d{2})/s)
  if (titleMatch) {
    const version = titleMatch[1]
    const date = titleMatch[2]
    const content = section.split(/## \[/m)[0].trim()
    recentChanges.push({
      version,
      date,
      content: content.substring(0, 500) + (content.length > 500 ? '...' : '')
    })
  }
}

const versionInfo = {
  version: packageJson.version,
  publishDate: latestVersionMatch ? latestVersionMatch[2] : new Date().toISOString().split('T')[0],
  name: packageJson.name,
  description: packageJson.description,
  repository: packageJson.repository?.url || '',
  homepage: packageJson.homepage || '',
  bugs: packageJson.bugs?.url || '',
  recentChanges,
  engines: packageJson.engines || {},
  peerDependencies: packageJson.peerDependencies || {}
}

// 确保 dist 目录存在
const distDir = path.resolve(process.cwd(), 'dist')
if (!existsSync(distDir)) {
  console.warn('⚠️  dist 目录不存在，将在构建时自动创建')
}

// 写入版本信息文件
try {
  writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2), 'utf8')
  console.log('✅ 版本信息已生成到 dist/version-info.json')
  console.log(`   版本: ${versionInfo.version}`)
  console.log(`   发布日期: ${versionInfo.publishDate}`)
} catch (error) {
  console.error('❌ 版本信息生成失败：', error.message)
  // 不退出，因为这是可选步骤
}
