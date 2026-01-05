# Vue3 Query Components Monorepo

企业后台管理系统组件库 - 基于 Vue 3 + Element Plus

## 项目结构

```
vue3-query-components-new/
├── packages/
│   ├── components/       # 组件库 (@yetuzi/vue3-query-components)
│   └── docs/             # 文档站点 (VitePress)
├── package.json          # 根配置
└── .npmrc                # npm 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 同时启动组件库监听和文档站点
npm run dev

# 只启动组件库监听
npm run dev --workspace=packages/components

# 只启动文档站点
npm run dev --workspace=packages/docs
```

### 构建

```bash
# 构建所有
npm run build

# 只构建组件库
npm run build:components

# 只构建文档
npm run build:docs
```

## 包说明

### @yetuzi/vue3-query-components

企业后台管理系统组件库，提供开箱即用的查询表格组件。

- 查询表格组件 (CommonQueryTable)
- 全局配置提供者 (CommonConfigProvider)
- 基于 Element Plus 封装
- TypeScript 类型支持

### 文档站点

基于 VitePress 构建的组件库文档。

- 组件使用指南
- API 文档
- 实时示例

## 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- npm: 支持 workspaces

## 许可证

MIT
