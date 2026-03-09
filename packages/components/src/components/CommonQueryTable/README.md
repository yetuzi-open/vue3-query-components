# CommonQueryTable 查询表格

`CommonQueryTable` 是一个组合型业务组件，将查询表单、数据表格和分页功能整合在一起，适合后台列表页面快速搭建。

主要特性：

- 内置查询表单、表格和分页联动能力
- 支持通过 `fetch` 统一管理列表请求
- 支持布局插槽：`header`、`form`、`toolbar`、`table`、`pagination`、`footer`
- 支持通过前缀插槽和属性向内部组件透传配置
- 暴露 `refresh`、`reset`、`getFormData`、`getSelectionRows` 等方法

## 基础用法

```vue
<template>
  <CommonQueryTable :fetch="fetchUsers" :form="form" :columns="columns" />
</template>

<script setup lang="ts">
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' },
      ],
    },
  },
]

const columns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '用户名' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间', type: 'dateTime', width: 180 },
]

const fetchUsers = async () => {
  return {
    list: [
      { id: 1, name: '张三', status: 1, createTime: 1705278600000 },
      { id: 2, name: '李四', status: 0, createTime: 1705377600000 },
    ],
    total: 2,
  }
}
</script>
```

## 布局插槽

组件提供 6 个布局插槽：

- `header`：页面头部区域
- `form`：查询表单区域
- `toolbar`：工具栏区域
- `table`：表格区域
- `pagination`：分页区域
- `footer`：底部区域

使用示例：

```vue
<CommonQueryTable :fetch="fetchUsers" :form="form" :columns="columns">
  <template #toolbar>
    <el-button type="primary">新增</el-button>
    <el-button>导出</el-button>
  </template>
</CommonQueryTable>
```

## 子组件插槽透传

除了布局插槽，还可以通过前缀方式把插槽传给内部组件：

- `form-*`：传给内部 `CommonForm`
- `table-*`：传给内部 `CommonTable`
- `pagination-*`：传给内部 `CommonPagination`

例如：

```vue
<CommonQueryTable :fetch="fetchUsers" :form="form" :columns="columns">
  <template #table-status="{ row }">
    <el-tag :type="row.status ? 'success' : 'danger'">
      {{ row.status ? '启用' : '禁用' }}
    </el-tag>
  </template>
</CommonQueryTable>
```

## 属性与事件透传

可以通过带前缀的属性和事件向内部组件透传配置：

- `form-*`：传给 `CommonForm`
- `table-*`：传给 `CommonTable`
- `pagination-*`：传给 `CommonPagination`

例如：

```vue
<CommonQueryTable
  :fetch="fetchUsers"
  :form="form"
  :columns="columns"
  :form-inline="false"
  @table-selection-change="handleSelectionChange"
/>
```

## 暴露方法

通过 `ref` 可以调用以下方法：

| 方法名 | 说明 |
| --- | --- |
| `refresh` | 使用当前条件刷新列表 |
| `reset` | 重置查询条件和分页 |
| `getFormData` | 获取当前表单数据 |
| `getSelectionRows` | 获取当前表格选中行 |

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CommonQueryTable, type CommonQueryTableExpose } from '@yetuzi/vue3-query-components'

const queryTableRef = ref<CommonQueryTableExpose>()

const handleRefresh = () => {
  queryTableRef.value?.refresh()
}
</script>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fetch` | 数据获取函数 | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | - |
| `form` | 查询表单配置数组 | `CommonFormItemArray<T>` | `[]` |
| `columns` | 表格列配置 | `CommonTableColumn<T>` | - |

## TypeScript 类型

```ts
interface CommonQueryTableProps<T = AnyObject> {
  fetch: (params?: ListParam) => Promise<{ list: T[]; total: string | number }>
  form?: CommonFormItemArray<T>
  columns: CommonTableColumn<T>
}

interface CommonQueryTableExpose<T = AnyObject> {
  refresh: () => void
  reset: () => void
  getFormData: () => Partial<T>
  getSelectionRows: () => T[]
}
```