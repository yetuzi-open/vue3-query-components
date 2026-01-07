# Vue3 Query Components

<div align="center">

**企业级查询页面组件库**

专为 Vue3 设计的高效查询组件，提升开发效率

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue](https://img.shields.io/badge/Vue-3.5+-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue)](https://www.typescriptlang.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.11+-blueviolet)](https://element-plus.org/)

[在线文档](https://github.com/vue3-query-components/vue3-query-components) · [快速开始](#快速开始) · [组件](#核心组件)

</div>

## 特性

- **一体化查询** - CommonQueryTable 集成表单、表格、分页，一个组件即可构建完整的查询页面，支持灵活的布局配置
- **类型安全** - 完整的 TypeScript 泛型支持，列类型、表单项类型自动推导，提供精准的类型提示和校验
- **高度可定制** - 响应式全局配置系统，支持自定义组件、插槽和样式扩展，满足各种业务场景需求
- **丰富组件** - 提供 CommonTable（多种列类型）、CommonForm（7种表单项）及完整的基础组件体系
- **开箱即用** - 基于 Element Plus 封装，API 设计一致，学习成本低，大幅提升开发效率
- **实用工具** - 内置 useResettable 等实用 hooks，提供可重置的响应式数据管理能力

## 项目结构

```
vue3-query-components/
├── packages/
│   ├── components/       # 组件库 (@yetuzi/vue3-query-components)
│   │   ├── src/          # 源码
│   │   ├── dist/         # 构建产物
│   │   └── package.json  # 组件库配置
│   └── docs/             # 文档站点 (VitePress)
│       ├── pages/        # 页面源文件
│       └── examples/     # 组件示例
├── package.json          # 根配置（npm workspaces）
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

# 只启动组件库监听构建
npm run dev:components

# 只启动文档站点
npm run dev:docs
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

## 核心组件

### CommonQueryTable

一体化查询表格组件，集成表单查询、数据展示、分页功能。

```vue
<template>
  <CommonQueryTable
    :fetch="fetchData"
    :form="queryForm"
    :columns="tableColumns"
  />
</template>

<script setup lang="ts">
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const queryForm = [
  { is: 'input', prop: 'name', label: '姓名' },
  { is: 'select', prop: 'status', label: '状态', props: { options: [...] } }
]

const tableColumns = [
  { prop: 'id', label: 'ID', type: 'index' },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' }
]

const fetchData = async (params) => {
  const { list, total } = await api.getList(params)
  return { list, total }
}
</script>
```

### CommonTable

增强型表格组件，支持多种列类型。

- 索引列 (`type: 'index'`)
- 选择列 (`type: 'selection'`)
- 展开列 (`type: 'expand'`)
- 日期列 (`type: 'date' | 'dateTime'`)

### CommonForm

动态表单组件，支持 7 种内置表单项。

- Input（输入框）
- Select（选择器）
- DatePicker（日期选择器）
- Radio（单选框）
- Checkbox（多选框）
- Switch（开关）
- 自定义组件

### CommonConfigProvider

全局配置组件，提供统一的组件配置。

```vue
<template>
  <CommonConfigProvider :component="{ placeholder: '无数据' }">
    <App />
  </CommonConfigProvider>
</template>
```

## 环境要求

- Node.js: `^20.19.0 || >=22.12.0`
- npm: 支持 workspaces（**注意：不使用 pnpm**）

## 文档

详细的使用文档和 API 说明，请访问 [在线文档](https://github.com/vue3-query-components/vue3-query-components) 或运行本地文档站点：

```bash
npm run dev:docs
```

## 许可证

[MIT](LICENSE)

---

Made with ❤️ by [yetuzi](https://github.com/vue3-query-components)
