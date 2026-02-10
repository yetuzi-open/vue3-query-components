# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 npm workspaces 的 Monorepo 项目，包含企业级 Vue3 查询组件库和 VitePress 文档站点。

## 技术栈

- **构建工具**: Vite 6.4.1（组件库） + VitePress 1.6.4（文档）
- **框架**: Vue 3.5+ with Composition API
- **UI 基础库**: Element Plus 2.11.5+
- **语言**: TypeScript 5.9+
- **包管理**: npm workspaces（**注意：不是 pnpm**）
- **Node 版本**: 20.19.0（通过 Volta 管理，项目支持 ^20.19.0 || >=22.12.0）
- **依赖管理**: vue-hooks-plus（useReactive）、lodash-es、dayjs

## 项目结构

```
packages/
├── components/          # 组件库 (@yetuzi/vue3-query-components)
│   ├── src/            # 源码目录
│   │   ├── components/ # 各组件实现（每个组件有独立目录）
│   │   ├── types/      # 类型定义
│   │   ├── utils/      # 工具函数
│   │   ├── provide/    # Provide/Inject 相关
│   │   ├── hooks/      # 组合式函数
│   │   └── index.ts    # 入口文件
│   ├── dist/           # 构建输出
│   ├── vite.config.ts  # Vite 构建配置
│   └── scripts/        # 构建脚本
│
└── docs/               # 文档站点 (VitePress)
    ├── pages/          # 页面源文件（srcDir 配置）
    ├── examples/       # 组件示例（vitepress-demo-plugin）
    └── .vitepress/     # VitePress 配置
```

## 常用命令

```bash
# 开发模式（并行启动组件库监听和文档站点）
npm run dev

# 单独启动组件库监听构建
npm run dev:components

# 单独启动文档站点
npm run dev:docs

# 构建所有
npm run build

# 只构建组件库
npm run build:components

# 只构建文档
npm run build:docs

# 组件库类型检查
npm run type-check

# 清理构建产物
npm run clean
```

## 核心架构概念

### 组件库架构

- **入口文件**: `src/index.ts` 导出所有模块（组件、类型、工具、hooks、配置）
- **组件组织**: 每个组件有独立目录，包含 `index.vue`、`index.ts`、`type.ts`
- **全局配置**: 通过 `CommonConfigProvider` 的 Provide/Inject 模式传递配置
- **类型定义**: 集中在 `src/types/index.ts`，使用泛型支持扩展

#### 组件列表

**核心组件**：
- `CommonQueryTable` - 一体化查询表格
- `CommonForm` - 动态表单组件
- `CommonTable` - 增强型表格组件
- `CommonConfigProvider` - 全局配置组件

**表单组件**：
- `CommonInput` / `CommonInputNumber` - 输入框
- `CommonSelect` - 下拉选择
- `CommonDatePicker` / `CommonTimePicker` - 日期/时间选择器
- `CommonCascader` - 级联选择器
- `CommonRadio` / `CommonCheckbox` / `CommonSwitch` - 单选/复选/开关
- `CommonButton` - 按钮
- `CommonPagination` - 分页

### 构建系统

- **Vite 构建**: 使用 Library Mode 构建 ES Module 格式
- **类型生成**: `vite-plugin-dts` 自动生成 `.d.ts` 声明文件
- **版本注入**: 构建脚本将版本号注入到 `dist/index.js`
- **CSS 处理**: CSS 单独输出到 `dist/index.css`，不注入到 JS 中（避免 Node.js 加载问题）

### npm Workspaces 配置

- 根 `package.json` 定义 `workspaces: ["packages/*"]`
- 使用 `overrides` 强制所有依赖使用 VitePress 1.6.4（避免版本冲突）
- **重要**: 项目使用 npm 而非 pnpm

### 文档站点路径别名

在 `packages/docs/.vitepress/config.ts` 中配置：
```typescript
'@components-src': resolve(__dirname, '../../components/src')  // 组件库源码别名
'@components-root': resolve(__dirname, '../../components')     // 组件库根目录
```

用于在示例中直接导入组件库源码，实现开发时热更新。

## 重要配置细节

### VitePress 版本锁定

根 `package.json` 中的 `overrides` 配置强制所有依赖使用 VitePress 1.6.4：
```json
"overrides": {
  "vitepress": "^1.6.4"
}
```

这是为了解决 VitePress 2.0 alpha（使用 vite 7）与 `@vitejs/plugin-vue`（只支持到 vite 6）的版本冲突。

### 组件库 exports 配置

`packages/components/package.json` 的 exports 字段：
```json
"exports": {
  ".": {
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  },
  "./dist/style.css": "./dist/index.css",
  "./dist/index.css": "./dist/index.css"
}
```

注意：CSS 导出不能直接在 Node.js 中作为 ES Module 加载，所以 Vite 配置中移除了 `vite-plugin-lib-inject-css`，避免构建后的 JS 文件包含 CSS 导入语句。

### Element Plus CSS 导入

使用组件库时，只需导入组件库样式文件即可（已包含所需 Element Plus 样式）：
```typescript
import '@yetuzi/vue3-query-components/dist/style.css'
```

## 版本管理

组件库版本号位于 `packages/components/package.json`，当前版本：`1.5.0`

**组件库内构建命令**（在 `packages/components/` 目录下）：
- `npm run build` - 使用 `build-optimized.js` 优化构建
- `npm run build:legacy` - 使用 `build.js` 传统构建
- `npm run build:patch` - 升级补丁版本并构建（1.5.0 → 1.5.1）
- `npm run build:minor` - 升级小版本并构建（1.5.0 → 1.6.0）
- `npm run build:major` - 升级大版本并构建（1.5.0 → 2.0.0）
- `npm run dev` - 启动监听构建（使用 `dev-watch.js`）

## 发布到 npm 工作流程

**重要**: 每次发布到 npm 时，必须按以下步骤执行：

1. **提交代码** - 确保所有修改已提交到 git
   ```bash
   git add .
   git commit -m "描述本次修改内容"
   ```

2. **创建 tag** - 为发布版本打上 git tag
   ```bash
   git tag v<版本号>
   # 例如：git tag v1.5.0
   ```

3. **推送代码和 tag** - 推送到远程仓库
   ```bash
   git push
   git push --tags
   ```

4. **发布到 npm** - 在组件库目录下发布
   ```bash
   cd packages/components
   npm publish
   ```

## 开发注意事项

1. **不要使用 pnpm**: 项目配置为 npm workspaces
2. **VitePress 内置 Vue 支持**: 不需要在文档站点安装或配置 `@vitejs/plugin-vue`
3. **组件库修改后需要重新构建**: 运行 `npm run dev:components` 进行监听构建
4. **文档版本号导入**: 从 `@yetuzi/vue3-query-components` 导入版本号，与用户使用一致

## 组件开发模式

### 添加新组件

1. 在 `packages/components/src/components/` 创建组件目录
2. 创建三个文件：
   - `index.vue` - 组件实现
   - `index.ts` - 导出组件
   - `type.ts` - 类型定义
3. 在 `packages/components/src/components/index.ts` 中添加导出
4. 在文档站点创建对应的文档和示例

### 配置注入系统

组件通过 `provide/inject` 获取全局配置：
```typescript
import { getCommonProviderConfig } from '@yetuzi/vue3-query-components'

const config = getCommonProviderConfig()
// config.component.placeholder
// config.component.pagination.defaultPageSize
// etc.
```

### 可用 Hooks

| Hook 名 | 说明 |
|---------|------|
| `useResettableRef` | 创建可重置的 ref |
| `useResettableReactive` | 创建可重置的 reactive |
| `useGetComponentsChildrenSlots` | 获取组件子插槽 |
