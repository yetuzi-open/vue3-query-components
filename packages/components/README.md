# @yetuzi/vue3-query-components

基于 Vue 3 + Element Plus 的企业级查询页面组件库，专注于表格查询场景，开箱即用。

## ✨ 特性

- 🚀 **开箱即用** - 高度封装的业务组件，减少重复开发
- 🎨 **统一设计** - 基于 Element Plus 设计语言，支持全局配置
- 🔧 **高度可配置** - 灵活的配置选项，满足不同业务需求
- 📦 **TypeScript 支持** - 完整的类型定义，类型安全
- 🌳 **Tree Shaking** - 按需引入，减小打包体积
- 🔥 **热更新** - 支持开发模式热更新
- 🎯 **业务导向** - 专注于查询、表单、表格等常见业务场景
- 🔄 **状态管理** - 内置数据请求、分页、表单状态管理
- 🎨 **插槽支持** - 灵活的插槽系统，支持自定义扩展

## 📦 安装

```bash
npm install @yetuzi/vue3-query-components
# 或
yarn add @yetuzi/vue3-query-components
# 或
pnpm add @yetuzi/vue3-query-components
```

## 🚀 快速开始

### 1. 全局引入

```typescript
import { createApp } from 'vue'
import '@yetuzi/vue3-query-components/dist/style.css'
import 'element-plus/theme-chalk/index.css' // 需要安装 Element Plus

const app = createApp(App)
```

### 2. 按需引入

```typescript
import {
  CommonQueryTable,
  CommonTable,
  CommonForm,
  CommonConfigProvider,
} from '@yetuzi/vue3-query-components'
import '@yetuzi/vue3-query-components/dist/style.css'
import 'element-plus/theme-chalk/index.css' // 需要安装 Element Plus
```

### 3. 基础使用

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

## 📚 组件文档

### CommonQueryTable Props

| 参数    | 说明         | 类型                                                                     | 默认值                            |
| ------- | ------------ | ------------------------------------------------------------------------ | --------------------------------- |
| fetch   | 数据请求函数 | `(params: ListParam) => Promise<{ list: T[], total: string \| number }>` | -                                 |
| form    | 表单配置数组 | `CommonFormPropForm[]`                                                   | []                                |
| columns | 表格列配置   | `CommonTableColumn[]`                                                    | -                                 |
| layouts | 布局顺序     | `Array<'header'\|'form'\|'toolbar'\|'table'\|'pagination'\|'footer'>`    | `['form', 'table', 'pagination']` |

### 表单组件类型支持

支持以下表单组件类型：

- `input` - 输入框
- `select` - 下拉选择
- `date-picker` - 日期选择器
- `radio` - 单选框组
- `check-box` - 复选框组
- `switch` - 开关

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

- Node.js >= 18.0.0
- Vue 3.5+
- Element Plus 2.11+
- TypeScript 5.9+

### 本地开发

```bash
# 克隆项目
git clone https://gitee.com/yetuzi/vue3-common.git
cd vue3-common/vue3-query-components

# 安装依赖
npm install

# 开发模式（构建并监听文件变化）
npm run dev

# 构建
npm run build

# 类型检查
npm run type-check

# 代码格式化
npm run format

# Lint
npm run lint

# 测试
npm test
```

### 依赖说明

```json
{
  "peerDependencies": {
    "vue": "^3.5.0", // Vue 3 - 需要宿主项目安装
    "element-plus": "^2.11.5" // Element Plus UI 库 - 需要宿主项目安装
  },
  "dependencies": {
    "dayjs": "^1.11.18", // 日期处理库
    "lodash-es": "^4.17.21", // 工具函数库
    "vue-hooks-plus": "^2.4.1" // Vue 组合式 API 工具库
  }
}
```

## 🎯 使用场景

本组件库特别适用于：

- **企业后台管理系统** - 大量数据查询、展示、分页场景
- **数据报表页面** - 需要复杂查询条件的数据展示
- **CRUD 操作页面** - 增删改查的标准业务页面
- **列表展示页面** - 各种数据列表的展示和筛选

## 📄 许可证

[MIT](./LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请提交 [Issue](https://gitee.com/yetuzi/vue3-common/issues)

## 🗺️ 更新日志

查看详细的更新日志请访问：[CHANGELOG.md](./CHANGELOG.md)
