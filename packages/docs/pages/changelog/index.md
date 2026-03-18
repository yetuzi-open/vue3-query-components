---
title: 更新日志
---

# 更新日志

本文档记录了 Vue3 Query Components 的所有重要变更。

<!--@include: ../../../components/CHANGELOG.md-->

## 版本规范

本项目遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/) 规范：

- **主版本号（Major）**：不兼容的 API 变更
- **次版本号（Minor）**：向后兼容的功能新增
- **修订号（Patch）**：向后兼容的问题修复

## Commit 规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范：

| 类型 | 说明 | Emoji |
|------|------|-------|
| `feat` | 新功能 | ✨ |
| `fix` | 修复 Bug | 🔧 |
| `docs` | 文档更新 | 📝 |
| `style` | 代码格式化 | 💄 |
| `refactor` | 代码重构 | ♻️ |
| `perf` | 性能优化 | ⚡ |
| `test` | 测试相关 | ✅ |
| `build` | 构建系统 | 📦 |

## 协作与发布规范

本仓库采用轻量化的主干开发模式：

- `main` 是唯一正式主干分支，组件发布和文档部署都以 `main` 为准
- `next` 仅用于大版本或 breaking change 的预发布验证
- 日常开发使用短期分支，例如 `feat/*`、`fix/*`、`docs/*`、`refactor/*`、`chore/*`、`hotfix/*`

正式发布遵循以下约束：

- npm 正式版本只从 `main` 发布
- 每一个已发布 npm 版本都必须有对应的 git tag，例如 `v1.5.1`
- `packages/components/package.json`、`CHANGELOG.md`、git tag 和 npm registry 中的版本号必须保持一致
- 本地 release 脚本只负责生成 release commit 与 tag，真正的 npm 发布由 GitHub Actions 在 tag 推送后完成

文档站点部署遵循以下约束：

- GitHub Pages 只在版本 tag 推送后的 release workflow 中自动构建和部署
- 文档示例与组件源码保持同仓库、同主干演进，不再维护长期 `docs` 分支
