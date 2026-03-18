# NPM 发布指南

本指南适用于 `@yetuzi/vue3-query-components` 当前仓库结构和基于 GitHub Actions 的自动发布流程。

## 发布前检查

- 使用 Node.js `^20.19.0 || >=22.12.0`
- 已执行 `npm install`
- 发布内容已合并到 `main`
- 提交信息遵循 Conventional Commits
- 工作区中发布相关文件没有未提交改动：
  - `package-lock.json`
  - `packages/components/package.json`
  - `packages/components/CHANGELOG.md`

## 推荐发布方式

在 `packages/components` 目录下执行：

```bash
npm run publish:patch
```

或：

```bash
npm run publish:minor
npm run publish:major
```

发布脚本会自动执行以下步骤：

1. 使用 `standard-version` 更新版本号和 `CHANGELOG.md`
2. 同步根 `package-lock.json` 中的 workspace 版本
3. 执行 `npm run type-check`
4. 执行 `npm run build`
5. 创建 release commit
6. 创建对应 git tag
7. 输出推送命令，等待你执行 `git push origin main --follow-tags`
8. GitHub 在收到 `v*.*.*` tag 后自动执行 npm 发布与文档部署

> 注意
> 本地 `publish:*` 命令不再直接执行 `npm publish`，npm 发版完全由 GitHub Actions 完成。

## GitHub Actions 前置配置

需要在 npm 包后台为当前 GitHub 仓库配置 Trusted Publisher：

- Repository: `yetuzi-open/vue3-query-components`
- Workflow file: `.github/workflows/release.yml`
- 发布包名：`@yetuzi/vue3-query-components`

只有配置完成后，tag 触发的 workflow 才能免 OTP 发布到 npm。

## 手动发布方式

如果需要手动控制流程，请按以下顺序执行：

```bash
cd packages/components
npm run type-check
npm run build
```

然后手动更新版本号和 `CHANGELOG.md`，提交 release commit，创建 tag，并执行：

```bash
git push origin main --follow-tags
```

## 发布后校验

```bash
npm view @yetuzi/vue3-query-components version
git tag -l "v*"
```

确认以下信息一致：

- npm registry 中的版本号
- `packages/components/package.json` 中的版本号
- git tag，例如 `v1.5.1`
