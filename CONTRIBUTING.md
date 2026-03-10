# Contributing Guide

本文档定义本仓库的推荐协作方式，目标是让组件源码、文档示例、npm 版本和 git tag 始终保持一致。

## 分支模型

本仓库采用轻量化的主干开发模式，不使用长期存在的 `develop` 分支。

### 长期分支

- `main`
  - 唯一正式主干分支
  - 要求随时可构建、可发布
  - npm `latest` 版本只从该分支发布

- `next`
  - 仅在准备下一个大版本或存在 breaking change 时创建和维护
  - 用于预发布验证，不参与日常小迭代
  - npm 预发布版本使用 `next` tag，而不是 `latest`

### 临时分支

所有开发分支都应从最新的 `main` 拉出，并在合并后尽快删除。

- `feat/*`
  - 新功能开发
  - 示例：`feat/common-query-table-toolbar`

- `fix/*`
  - 缺陷修复
  - 示例：`fix/common-table-date-render`

- `docs/*`
  - 纯文档、示例、说明性改动
  - 示例：`docs/common-form-examples`

- `refactor/*`
  - 不改变对外行为的重构
  - 示例：`refactor/common-table-column-normalize`

- `chore/*`
  - 工程配置、脚本、依赖、CI 等维护性工作
  - 示例：`chore/release-script`

- `hotfix/*`
  - 已发布版本的紧急修复
  - 必须从 `main` 拉出
  - 修复完成后优先合回 `main`

## 不推荐的做法

- 不保留长期 `develop` 分支
- 不在发布前临时堆积大量未合并功能
- 不从个人长期分支直接发布 npm
- 不出现“npm 已发布但 git 没有对应 tag”的情况
- 不让文档示例长期脱离组件源码演进

## 日常开发流程

### 1. 拉取主干

```bash
git checkout main
git pull origin main
```

### 2. 创建短期分支

```bash
git checkout -b feat/your-change
```

### 3. 本地开发与验证

在仓库根目录执行：

```bash
npm run type-check
npm run build
```

如果改动涉及文档示例、组件交互或样式，需同时在 `packages/docs/examples` 中完成验证。

### 4. 提交代码

提交信息遵循 Conventional Commits：

```bash
feat: ...
fix: ...
docs: ...
refactor: ...
chore: ...
```

建议一组相关修改形成一次提交，不要把多个无关功能混在一个 commit 中。

### 5. 发起 PR

PR 合并目标默认是 `main`，并满足以下要求：

- 说明本次修改的用户可感知影响
- 说明是否影响组件 API、类型、样式或示例
- 标明验证方式，例如 `npm run type-check`、`npm run build`
- UI 或文档改动尽量附带截图或说明涉及的示例路径

## 发布策略

### 正式发布

正式版本只允许从 `main` 发布。

发布前必须满足：

- 工作区中发布相关文件状态清晰
- `npm run type-check` 通过
- `npm run build` 通过
- `packages/components/package.json` 版本号正确
- `packages/components/CHANGELOG.md` 已更新

正式发布的标准顺序：

1. 合并发布内容到 `main`
2. 更新版本号与 `CHANGELOG`
3. 提交 release commit
4. 创建对应 git tag，例如 `v1.5.1`
5. 推送 `main` 和 tag
6. 在 `packages/components` 下执行 `npm publish --access public`
7. 回查 npm registry 与远程 tag 是否一致

### 预发布

仅在需要验证 breaking change 或大改版时使用 `next` 分支。

建议形式：

- 分支：`next`
- 版本：`1.6.0-beta.0`、`2.0.0-rc.0`
- 发布命令：`npm publish --tag next`

当预发布验证完成后，再将最终稳定版本整理回 `main` 并发布 `latest`。

## 版本与 tag 约束

每一个已发布的 npm 版本，都必须满足以下对应关系：

- `packages/components/package.json` 中存在同版本号
- git 中存在同名 tag，例如 `v1.5.1`
- 远程仓库中可查询到该 tag
- npm registry 中可查询到该版本

如果发现某个版本已发布到 npm，但缺少 git tag，应优先补齐 tag，再继续后续版本发布，避免 `CHANGELOG` 和发布脚本范围计算错误。

## 文档与组件的协同约束

本仓库是组件库和文档站点共存的 monorepo，建议遵循以下原则：

- 组件 API 改动时，同步更新示例和文档
- 仅改文档时可走 `docs/*` 分支，不强制发 npm 包
- 组件行为、类型、导出项变更时，必须补充文档或示例验证
- 不在独立长期文档开发分支上维护与主干脱节的说明

## 推荐实践

- 小步提交，短分支合并
- 用 tag 而不是额外长期发布分支表示正式版本
- 把发布动作收敛到少数维护者执行
- 把 `main` 视为唯一可信的“当前稳定状态”

## 一句话规则

- 日常开发走 `main` + 短分支
- 大版本预演才开 `next`
- 正式发版只从 `main`
- npm 版本必须和 git tag 一一对应
