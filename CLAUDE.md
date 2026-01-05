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
- **Node 版本**: 22.16.0（通过 Volta 管理）

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
'@yetuzi/vue3-query-components-dev': resolve(__dirname, '../../components/src')
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

使用组件库时，需要**手动导入** Element Plus 组件的 CSS：
```typescript
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/form/style/css'
// ... 其他需要的组件样式
```

## 版本管理

组件库版本号位于 `packages/components/package.json`，当前版本：`1.1.38`

构建脚本 `scripts/build.js` 支持自动升级版本：
- `npm run build:patch` - 升级补丁版本（1.1.38 → 1.1.39）
- `npm run build:minor` - 升级小版本（1.1.38 → 1.2.0）
- `npm run build:major` - 升级大版本（1.1.38 → 2.0.0）

## 开发注意事项

1. **不要使用 pnpm**: 项目配置为 npm workspaces
2. **VitePress 内置 Vue 支持**: 不需要在文档站点安装或配置 `@vitejs/plugin-vue`
3. **组件库修改后需要重新构建**: 运行 `npm run dev:components` 进行监听构建
4. **文档版本号导入**: 从 `@yetuzi/vue3-query-components` 导入版本号，与用户使用一致
