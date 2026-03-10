# @yetuzi/vue3-query-components

<div align="center">

**企业级查询页面组件库**

专为 Vue3 设计的高效查询组件，提升开发效率

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5+-brightgreen)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue)](https://www.typescriptlang.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.11+-blueviolet)](https://element-plus.org/)
[![npm version](https://img.shields.io/npm/v/@yetuzi/vue3-query-components)](https://www.npmjs.com/package/@yetuzi/vue3-query-components)

</div>

## ✨ 特性

- 🚀 **开箱即用** - 高度封装的查询表格组件，一个组件即可构建完整的查询页面
- ⚡️ **高效开发** - 减少重复代码，专注于业务逻辑，提升开发效率
- 🎨 **高度定制** - 灵活的配置系统，支持自定义插槽和样式
- 🔧 **类型安全** - 完整的 TypeScript 支持，类型安全
- 🛡️ **API 一致** - 基于 Element Plus 封装，API 设计一致，学习成本低

## 📚 文档

完整文档请访问：[https://yetuzi-open.github.io/vue3-query-components](https://yetuzi-open.github.io/vue3-query-components)

## 📦 安装

::: code-group

```bash [npm]
npm install @yetuzi/vue3-query-components
```

```bash [yarn]
yarn add @yetuzi/vue3-query-components
```

```bash [pnpm]
pnpm add @yetuzi/vue3-query-components
```

:::

::: tip 注意
本组件库依赖 Element Plus，需要确保项目中已安装 Element Plus。
:::

## 🚀 快速开始

### 导入样式

`main.ts` 中导入样式，包含使用到的element plus 和 组件库所需的样式

```typescript
import '@yetuzi/vue3-query-components/dist/style.css'
```

### 按需引入组件

```typescript
import {
  CommonQueryTable,
  CommonTable,
  CommonForm,
  CommonConfigProvider,
} from '@yetuzi/vue3-query-components'
```

### 基础使用

#### 完整查询表格组件（推荐）

`CommonQueryTable` 是一个高度集成的组件，包含表单查询、表格展示、分页功能。

```vue
<template>
  <CommonQueryTable :fetch="fetchData" :form="formConfig" :columns="tableColumns" />
</template>

<script setup>
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

// 数据请求函数
const fetchData = async (params) => {
  const { pageNo, pageSize, ...searchParams } = params
  const response = await api.getList({
    page: pageNo,
    size: pageSize,
    ...searchParams,
  })
  return {
    list: response.data.list,
    total: response.data.total,
  }
}

// 表单配置
const formConfig = [
  {
    is: 'input', // 组件类型
    prop: 'name', // 字段名
    formItem: {
      label: '姓名', // 表单标签
    },
    initialValue: '', // 初始值
    props: {
      placeholder: '请输入姓名',
    },
  },
  {
    is: 'select',
    prop: 'status',
    formItem: {
      label: '状态',
    },
    initialValue: 'all',
    props: {
      options: [
        { value: 'all', label: '全部' },
        { value: 'active', label: '激活' },
        { value: 'inactive', label: '未激活' },
      ],
    },
  },
  {
    is: 'date-picker',
    prop: 'createTime',
    formItem: {
      label: '创建时间',
    },
  },
]

// 表格列配置
const tableColumns = [
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'status', label: '状态' },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'dateTime', // 自动格式化日期时间
  },
]
</script>
```

#### 高级配置示例

```vue
<template>
  <CommonConfigProvider
    :component="{
      form: {
        submitText: '查询',
        resetText: '重置',
        formItem: {
          components: {
            width: '240px',
          },
        },
      },
      pagination: {
        defaultPageSize: 20,
        defaultPageCount: 1,
      },
      table: {
        headerCellStyle: {
          backgroundColor: '#f5f7fa',
          color: '#303133',
        },
      },
    }"
  >
    <CommonQueryTable
      v-bind="queryTableConfig"
      :layouts="['form', 'toolbar', 'table', 'pagination']"
    >
      <!-- 自定义工具栏 -->
      <template #toolbar>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="handleExport">导出</el-button>
      </template>

      <!-- 自定义表格列 -->
      <template #table-action="{ row }">
        <el-button link @click="handleEdit(row)">编辑</el-button>
        <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </CommonQueryTable>
  </CommonConfigProvider>
</template>

<script setup>
import { CommonConfigProvider, CommonQueryTable } from '@yetuzi/vue3-query-components'

const queryTableConfig = {
  fetch: fetchData,
  form: formConfig,
  columns: [
    { prop: 'name', label: '姓名' },
    { prop: 'status', label: '状态' },
    { label: '操作', prop: 'action', fixed: 'right', width: 150 },
  ],
}
</script>
```

## 📚 组件列表

### 核心组件

| 组件名 | 说明 |
|--------|------|
| `CommonQueryTable` | 一体化查询表格，集成表单、表格、分页 |
| `CommonTable` | 增强型表格组件，支持多种列类型 |
| `CommonForm` | 动态表单组件，支持 7 种表单项 |
| `CommonConfigProvider` | 全局配置组件，提供统一的组件配置 |

### 基础组件

| 组件名 | 说明 |
|--------|------|
| `CommonInput` | 输入框组件 |
| `CommonSelect` | 下拉选择组件 |
| `CommonDatePicker` | 日期选择器组件 |
| `CommonRadio` | 单选框组件 |
| `CommonCheckbox` | 复选框组件 |
| `CommonSwitch` | 开关组件 |
| `CommonPagination` | 分页组件 |

### Hooks

| Hook 名 | 说明 |
|---------|------|
| `useResettableRef` | 创建可重置的 ref |
| `useResettableReactive` | 创建可重置的 reactive |
| `useGetComponentsChildrenSlots` | 获取组件子插槽 |

## 📚 API 文档

### CommonQueryTable Props

| 参数    | 说明         | 类型                                                                     | 默认值                            |
| ------- | ------------ | ------------------------------------------------------------------------ | --------------------------------- |
| fetch   | 数据请求函数 | `(params: ListParam) => Promise<{ list: T[], total: string \| number }>` | -                                 |
| form    | 表单配置数组 | `CommonFormPropForm[]`                                                   | []                                |
| columns | 表格列配置   | `CommonTableColumn[]`                                                    | -                                 |
| layouts | 布局顺序     | `Array<'header'\|'form'\|'toolbar'\|'table'\|'pagination'\|'footer'>`    | `['form', 'table', 'pagination']` |

### 表单组件类型支持

CommonForm 支持以下 7 种内置表单项类型：

| 组件类型 | 说明 | 用途 |
|---------|------|------|
| `input` | 输入框 | 文本、数字等简单输入 |
| `select` | 下拉选择 | 单选下拉选项 |
| `date-picker` | 日期选择器 | 日期、日期时间范围选择 |
| `radio` | 单选框组 | 互斥选项选择 |
| `check-box` | 复选框组 | 多选选项 |
| `switch` | 开关 | 二元状态切换 |
| 自定义组件 | 任意 Vue 组件 | 扩展自定义表单项 |

### 表格列类型支持

CommonTable 支持多种特殊列类型：

| 列类型 | 说明 | 使用场景 |
|--------|------|----------|
| `index` | 索引列 | 自动显示行号 |
| `selection` | 选择列 | 多选功能 |
| `expand` | 展开列 | 行内容展开 |
| `date` | 日期列 | 自动格式化日期显示 |
| `dateTime` | 日期时间列 | 自动格式化日期时间显示 |
| 普通列 | 数据列 | 绑定字段数据 |

### 表单配置项类型

```typescript
interface FormItemConfig {
  is: string // 组件类型
  prop: string // 字段名
  formItem: {
    // ElFormItem 配置
    label: string
    [key: string]: any
  }
  initialValue?: any // 初始值
  props?: {
    // 组件属性
    [key: string]: any
  }
}
```

### 表格列配置类型

```typescript
interface TableColumn {
  prop: string                  // 列属性名
  label: string                 // 列标题
  type?: 'dateTime'            // 特殊类型：自动格式化日期时间
  width?: string \| number      // 列宽度
  fixed?: boolean \| 'left' \| 'right'  // 固定列
  [key: string]: any           // 其他 ElTableColumn 属性
}
```

## 🎨 全局配置

使用 `CommonConfigProvider` 可以全局配置组件样式和行为：

```vue
<template>
  <CommonConfigProvider
    :component="{
      placeholder: '暂无数据', // 空值占位
      pagination: {
        defaultPageCount: 1, // 默认起始页
        defaultPageSize: 10, // 默认每页条数
      },
      table: {
        headerCellStyle: {
          // 表头样式
          backgroundColor: '#f1f6ff',
          color: '#000000',
          height: '48px',
        },
      },
      form: {
        submitText: '搜索', // 提交按钮文本
        resetText: '重置', // 重置按钮文本
        formItem: {
          components: {
            width: '200px', // 表单组件宽度
          },
        },
      },
    }"
  >
    <YourApp />
  </CommonConfigProvider>
</template>
```

## 🛠️ 开发

### 环境要求

- Node.js ^20.19.0 || >=22.12.0
- Vue 3.5+
- Element Plus 2.11+
- TypeScript 5.9+ (推荐)

### 浏览器兼容性

- 现代浏览器，支持 ES2018+ 和 ES Modules
- 不支持 IE 浏览器

### 依赖说明

#### Peer Dependencies（需要宿主项目安装）

```json
{
  "peerDependencies": {
    "vue": "^3.4.0",
    "element-plus": "^2.11.5"
  }
}
```

#### Dependencies（随组件库一起安装）

```json
{
  "dependencies": {
    "dayjs": "^1.11.18",
    "lodash-es": "^4.17.21",
    "vue-hooks-plus": "^2.4.1"
  }
}
```

### 构建产物

组件库构建后生成以下文件：

```
dist/
├── index.js       # ES Module 格式的组件代码
├── index.d.ts     # TypeScript 类型声明文件
├── index.css      # 组件库样式（包含 Element Plus 组件样式）
└── index.js.map   # Source Map 文件
```

**重要说明**：
- 组件库采用 ES Module 格式输出
- CSS 文件已包含所有所需的 Element Plus 组件样式（约 129KB，gzip 后约 17KB）
- Vue 和 Element Plus JS 模块被外部化，不会打包进组件库（减小体积）

## 🎯 使用场景

本组件库特别适用于：

- **企业后台管理系统** - 大量数据查询、展示、分页场景
- **数据报表页面** - 需要复杂查询条件的数据展示
- **CRUD 操作页面** - 增删改查的标准业务页面
- **列表展示页面** - 各种数据列表的展示和筛选

## 📄 许可证

[MIT](./LICENSE)

## 📞 支持与反馈

如有问题或建议，请提交 Issue：

- [GitHub Issues](https://github.com/yetuzi-open/vue3-query-components/issues)
- [Gitee Issues](https://gitee.com/yetuzi-open/vue3-query-components/issues)

## 🗺️ 更新日志

查看详细的更新日志：[CHANGELOG.md](./CHANGELOG.md)

---

Made with ❤️ by [yetuzi](https://github.com/yetuzi-open)
