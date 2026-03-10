# NPM 发布指南

本指南适用于 `@yetuzi/vue3-query-components` 当前仓库结构和发布脚本。

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
7. 执行 `npm publish --access public`
8. 推送 `main` 和对应 tag

## 手动发布方式

如果需要手动控制流程，请按以下顺序执行：

```bash
cd packages/components
npm run type-check
npm run build
```

然后手动更新版本号和 `CHANGELOG.md`，提交 release commit，创建 tag，并执行：

```bash
npm publish --access public
git push origin main
git push origin v<version>
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
