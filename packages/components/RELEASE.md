# 版本发布指南

本文档介绍如何使用组件库的版本管理和发布流程。

## 📋 概述

组件库使用 **standard-version** 进行版本管理和 CHANGELOG 生成，每个版本会自动：

- ✅ 从 commit message 生成 CHANGELOG
- ✅ 更新 package.json 版本号
- ✅ 生成版本信息 JSON 文件（供文档站点使用）
- ✅ 创建 git tag

## 🔧 Commit 规范

为了自动生成准确的 CHANGELOG，请遵循以下 commit 规范：

### Commit 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加新的表格组件` |
| `fix` | 修复 bug | `fix: 修复分页不生效的问题` |
| `docs` | 文档更新 | `docs: 更新 README 使用说明` |
| `style` | 代码格式（不影响功能） | `style: 统一代码缩进` |
| `refactor` | 重构（既不是新功能也不是修复） | `refactor: 重构类型定义` |
| `perf` | 性能优化 | `perf: 优化组件渲染性能` |
| `test` | 测试相关 | `test: 添加单元测试` |
| `build` | 构建系统或依赖变更 | `build: 升级 Vite 到 v6` |
| `chore` | 其他杂项 | `chore: 更新 .gitignore` |

### Commit 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**示例：**

```bash
# 简单的 commit
git commit -m "feat: 添加表格排序功能"

# 带范围的 commit
git commit -m "fix(CommonTable): 修复分页重置问题"

# 带详细说明的 commit
git commit -m "refactor(CoreForm): 优化类型定义

- 重命名 CommonFormPropForm 为 CommonFormItemArray
- 添加详细的 JSDoc 注释
- 改善类型推导

Closes #123"
```

## 📦 发布流程

### 1. 开发阶段

正常进行开发，使用规范的 commit message：

```bash
git add .
git commit -m "feat: 添加新功能"
git push origin main
```

### 2. 预览 CHANGELOG（可选）

在发布前，可以预览即将生成的 CHANGELOG：

```bash
npm run release:dry
```

这不会修改任何文件，只会显示即将生成的 CHANGELOG 内容。

### 3. 发布新版本

根据版本变更类型，选择相应的发布命令：

#### Patch 版本（1.2.0 → 1.2.1）
**适用场景：** bug 修复、小的改进

```bash
npm run release:patch
```

#### Minor 版本（1.2.0 → 1.3.0）
**适用场景：** 新增功能、重要改进

```bash
npm run release:minor
```

#### Major 版本（1.2.0 → 2.0.0）
**适用场景：** 破坏性变更、重大重构

```bash
npm run release:major
```

#### 自动版本
**适用场景：** 让 standard-version 根据提交历史自动判断版本类型

```bash
npm run release
```

### 4. 检查生成的文件

发布命令会自动：

1. ✅ 更新 `package.json` 的版本号
2. ✅ 更新 `CHANGELOG.md`
3. ✅ 创建 commit
4. ⚠️ **不会创建 tag**（配置中已禁用）

### 5. 构建

```bash
npm run build
```

构建会自动：
- 生成 dist 目录
- 生成 `dist/version-info.json`（供文档站点使用）

### 6. 发布到 npm

```bash
# 首次发布或登录
npm login

# 发布
npm publish
```

### 7. 推送到远程仓库

```bash
git push origin main
```

### 8. 创建 Git Tag（可选）

```bash
# 手动创建 tag
git tag v1.2.1

# 推送 tag
git push origin v1.2.1
```

## 📂 生成的文件

### CHANGELOG.md

自动生成的更新日志，格式如下：

```markdown
# 更新日志

## [1.2.1] - 2025-01-06

### ✨ 新增
* 添加表格排序功能

### 🔧 修复
* 修复分页重置问题

### 📝 文档
* 更新 README 使用说明
```

### dist/version-info.json

版本信息 JSON 文件，供文档站点使用：

```json
{
  "version": "1.2.0",
  "publishDate": "2025-01-06",
  "name": "@yetuzi/vue3-query-components",
  "description": "Vue3查询页面组件库...",
  "repository": "https://gitee.com/yetuzi/vue3-common.git",
  "homepage": "https://gitee.com/yetuzi/vue3-common#readme",
  "bugs": "https://gitee.com/yetuzi/vue3-common/issues",
  "recentChanges": [
    {
      "version": "1.2.0",
      "date": "2025-01-06",
      "content": "..."
    }
  ],
  "engines": {
    "node": ">=16.0.0"
  },
  "peerDependencies": {
    "element-plus": "^2.11.5",
    "vue": "^3.5.0"
  }
}
```

## 🎯 文档站点使用

### 在 VitePress 文档中使用版本信息

```vue
<template>
  <div class="version-info">
    <h3>当前版本：{{ version }}</h3>
    <p>发布日期：{{ publishDate }}</p>

    <div v-for="change in recentChanges" :key="change.version" class="change-log">
      <h4>v{{ change.version }} - {{ change.date }}</h4>
      <div v-html="formatContent(change.content)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const version = ref('')
const publishDate = ref('')
const recentChanges = ref([])

onMounted(async () => {
  try {
    // 从 npm 包读取版本信息
    const response = await fetch('https://unpkg.com/@yetuzi/vue3-query-components@latest/version-info.json')
    const data = await response.json()

    version.value = data.version
    publishDate.value = data.publishDate
    recentChanges.value = data.recentChanges
  } catch (error) {
    console.error('加载版本信息失败：', error)
  }
})

function formatContent(content) {
  // 将换行符转换为 HTML
  return content.replace(/\n/g, '<br>')
}
</script>
```

### 本地开发时读取版本信息

```typescript
// scripts/load-version-info.ts
import versionInfo from '@yetuzi/vue3-query-components/dist/version-info.json'

console.log('组件库版本：', versionInfo.version)
console.log('最近更新：', versionInfo.recentChanges)
```

## ⚙️ 配置文件

### .versionrc.json

```json
{
  "types": [
    { "type": "feat", "section": "✨ 新增" },
    { "type": "fix", "section": "🔧 修复" },
    { "type": "docs", "section": "📝 文档" },
    { "type": "refactor", "section": "♻️ 重构" }
  ],
  "releaseCommitMessageFormat": "chore: release {{currentTag}}",
  "skip": {
    "tag": false,
    "commit": false,
    "bump": false
  }
}
```

## 🚀 快速参考

```bash
# 开发流程
git add .
git commit -m "feat: 添加新功能"
git push

# 发布补丁版本
npm run release:patch
npm run build
npm publish
git push

# 发布次版本
npm run release:minor
npm run build
npm publish
git push

# 预览 CHANGELOG
npm run release:dry

# 单独生成版本信息
npm run version
```

## 📚 相关文档

- [Semantic Versioning](https://semver.org/lang/zh-CN/)
- [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)
- [standard-version 文档](https://github.com/conventional-changelog/standard-version)

## ❓ 常见问题

### Q: 如果 commit message 不规范怎么办？

A: standard-version 会尽力解析，但可能导致 CHANGELOG 分类不准确。建议在提交时遵循规范。

### Q: 如何修改已生成的 CHANGELOG？

A: 可以直接编辑 CHANGELOG.md，但要注意保持格式一致。

### Q: 版本信息文件是必须的吗？

A: 不是必须的，但强烈推荐。它可以让文档站点自动显示版本信息。

### Q: 如何回滚版本？

A: 使用 git 回退 commit，然后重新运行发布命令：

```bash
git reset --soft HEAD~1
# 修改 package.json 中的版本号
git add .
git commit -m "chore: 回退版本号"
```
