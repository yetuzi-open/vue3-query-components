# CommonTable 表格

基于 Element Plus `ElTable` 的常用表格组件封装，提供更统一的列配置方式，并保留原生表格的大部分能力。

主要特性：

- 支持数组和对象两种列配置写法
- 内置索引列、选择列、展开列、日期列、日期时间列、字典列
- 支持按列名快速定义具名插槽
- 数据变化时自动滚动到表格顶部
- 通过 `ref` 直接调用 `ElTable` 实例方法
- 透传大部分 `ElTable` 属性和事件

## 基础用法

```vue
<template>
  <CommonTable :data="tableData" :columns="columns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface UserRow {
  name: string
  age: number
  city: string
}

const tableData = ref<UserRow[]>([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
])

const columns: CommonTableArrayColumns<UserRow> = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'city', label: '城市' },
]
</script>
```

## 对象形式列配置

除了数组形式，也支持对象形式列配置。对象的键名通常会作为列的默认 `prop`。

```vue
<template>
  <CommonTable :data="tableData" :columns="columnConfig" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
])

const columnConfig = ref({
  name: { label: '姓名', width: 120 },
  age: { label: '年龄', width: 80 },
  city: { label: '城市', width: 100 },
})
</script>
```

## 自定义列插槽

`CommonTable` 支持按列名快速定义具名插槽：

- 普通列默认使用 `prop` 作为插槽名
- 特殊列如 `expand` 可直接使用类型名作为插槽名

```vue
<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #name="{ row }">
      <el-tag>{{ row.name }}</el-tag>
    </template>

    <template #age="{ row }">
      <span style="color: #409eff">{{ row.age }} 岁</span>
    </template>

    <template #action="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </CommonTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
])

const columns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'action', label: '操作', width: 160 },
])

const handleEdit = (row: unknown) => {
  console.log('编辑', row)
}

const handleDelete = (row: unknown) => {
  console.log('删除', row)
}
</script>
```

## 内置列类型

`CommonTable` 内置了几种常用列类型，用于减少重复配置。

### 索引列

```ts
{ type: 'index', label: '序号', width: 60 }
```

### 选择列

```ts
{ type: 'selection', width: 55 }
```

### 展开列

```vue
<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #expand="{ row }">
      <div>邮箱：{{ row.email }}</div>
    </template>
  </CommonTable>
</template>

<script setup lang="ts">
const columns = [
  { type: 'expand', width: 55 },
  { prop: 'name', label: '姓名' },
]
</script>
```

### 日期列 / 日期时间列

```ts
[
  { prop: 'createDate', label: '创建日期', type: 'date' },
  { prop: 'createTime', label: '创建时间', type: 'dateTime' },
]
```

### 字典列

```ts
{
  prop: 'status',
  label: '状态',
  type: 'dict',
  options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 },
  ],
}
```

## 空状态

默认空状态会显示“暂无数据”，也可以通过 `empty` 插槽自定义。

```vue
<template>
  <CommonTable :data="[]" :columns="columns">
    <template #empty>
      <el-empty description="当前没有数据" />
    </template>
  </CommonTable>
</template>
```

## 数据变化自动滚动

当 `data` 发生变化时，组件会自动滚动到表格顶部，适合列表刷新、分页切换等场景。

```vue
<template>
  <div>
    <el-button @click="loadData">加载新数据</el-button>
    <CommonTable :data="tableData" :columns="columns" height="300px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([])
const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '名称' },
])

const loadData = () => {
  tableData.value = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `数据 ${index + 1}`,
  }))
}
</script>
```

## 透传 ElTable 属性与事件

`CommonTable` 会透传大部分 `ElTable` 的属性和事件，因此可以像使用原生表格一样使用它。

```vue
<template>
  <CommonTable
    :data="tableData"
    :columns="columns"
    border
    stripe
    row-key="id"
    @row-click="handleRowClick"
    @selection-change="handleSelectionChange"
  />
</template>
```

常见透传能力包括：

- 表格属性：`border`、`stripe`、`height`、`max-height`、`row-key`、`default-sort`
- 列属性：`sortable`、`filters`、`filter-method`、`fixed`、`show-overflow-tooltip`
- 表格事件：`selection-change`、`row-click`、`sort-change`、`filter-change` 等

## 暴露方法

通过 `ref` 可以直接调用 `ElTable` 的实例方法。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CommonTable, type CommonTableExpose } from '@yetuzi/vue3-query-components'

const tableRef = ref<CommonTableExpose>()

const clearSelection = () => {
  tableRef.value?.clearSelection()
}

const scrollToTop = () => {
  tableRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <CommonTable ref="tableRef" :data="tableData" :columns="columns" />
</template>
```

常用方法包括：

| 方法名 | 说明 |
| --- | --- |
| `clearSelection` | 清空多选表格的选中项 |
| `toggleRowSelection` | 切换某一行的选中状态 |
| `toggleAllSelection` | 切换全选状态 |
| `toggleRowExpansion` | 切换某一行的展开状态 |
| `setCurrentRow` | 设置当前行 |
| `clearSort` | 清空排序条件 |
| `clearFilter` | 清空筛选条件 |
| `doLayout` | 重新布局表格 |
| `sort` | 手动排序 |
| `scrollTo` | 滚动到指定位置 |
| `setScrollTop` | 设置垂直滚动位置 |
| `setScrollLeft` | 设置水平滚动位置 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| 列名插槽 | 使用列的 `prop` 作为插槽名，例如 `#name`、`#status` |
| `expand` | 展开列插槽 |
| `empty` | 自定义空状态内容 |

## 类型定义

```ts
interface CommonTableProps<T = AnyObject> {
  columns: CommonTableColumn<T>
  data: T[]
}

type CommonTableColumn<T> = CommonTableArrayColumns<T> | Record<string, CommonTableColumnRoot<T>>
```