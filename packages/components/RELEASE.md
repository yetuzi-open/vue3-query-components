# 版本管理说明

本仓库的组件包版本管理基于 `standard-version`，但实际发布流程已经通过 `scripts/publish.js` 做了统一封装。

## 版本来源

`packages/components/CHANGELOG.md` 由提交历史生成，核心依赖是：

- Conventional Commits
- `standard-version`

因此，提交信息越规范，生成的更新日志越准确。

## 可用命令

在 `packages/components` 目录下：

```bash
npm run build
npm run build:patch
npm run build:minor
npm run build:major

npm run publish:patch
npm run publish:minor
npm run publish:major
```

## 命令职责

### `build`

- 仅构建当前版本
- 输出 `dist/` 产物
- 生成 `dist/version-info.json`

### `build:patch|minor|major`

- 先更新版本号和 `CHANGELOG.md`
- 再执行构建
- 如果版本升级或构建失败，会回滚版本文件，避免留下半完成状态

### `publish:patch|minor|major`

- 更新版本号和 `CHANGELOG.md`
- 执行类型检查和构建
- 创建 release commit 和 git tag
- 发布到 npm
- 推送 `main` 和 tag 到远程

## 发布顺序

当前推荐顺序是：

1. 在 `main` 合并待发布内容
2. 进入 `packages/components`
3. 执行 `npm run publish:patch` / `minor` / `major`
4. 发布后检查 npm registry 与 git tag 是否一致

## 约束

- 正式版本只从 `main` 发布
- 每个 npm 版本必须有同名 git tag
- 版本号、`CHANGELOG.md`、远程 tag 和 npm registry 必须一致
- 如果发现 npm 已有版本但 git 缺少 tag，应先补齐 tag，再继续后续发布
