# CommonPagination 分页

常用的分页组件，基于 Element Plus Pagination 封装，支持双向绑定页码和每页条数。

## 基础用法

```vue
<template>
  <CommonPagination
    v-model:pageNo="currentPage"
    v-model:pageSize="pageSize"
    :total="total"
    @change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handlePageChange = (pagination) => {
  console.log('页码:', pagination.pageNo)
  console.log('每页条数:', pagination.pageSize)
}
</script>
```

## 总页数

通过 `total` 属性设置总条目数。

```vue
<template>
  <CommonPagination v-model:pageNo="currentPage" v-model:pageSize="pageSize" :total="200" />
</template>
```

## 每页条数

通过 `page-sizes` 属性设置每页显示个数选择器的选项设置。

```vue
<template>
  <CommonPagination
    v-model:pageNo="currentPage"
    v-model:pageSize="pageSize"
    :total="100"
    :page-sizes="[5, 10, 15, 20]"
  />
</template>
```

## 自定义布局

通过 `layout` 属性设置组件布局，子组件名用逗号分隔。

```vue
<template>
  <CommonPagination
    v-model:pageNo="currentPage"
    v-model:pageSize="pageSize"
    :total="100"
    layout="prev, pager, next, jumper, ->, total"
  />
</template>
```

## 带背景色

通过 `background` 属性设置是否带有背景色。

```vue
<template>
  <CommonPagination
    v-model:pageNo="currentPage"
    v-model:pageSize="pageSize"
    :total="100"
    background
  />
</template>
```

## 小型分页

通过 `small` 属性设置是否使用小型分页样式。

```vue
<template>
  <CommonPagination v-model:pageNo="currentPage" v-model:pageSize="pageSize" :total="100" small />
</template>
```

## 自定义插槽内容

使用默认插槽自定义内容。

```vue
<template>
  <CommonPagination v-model:pageNo="currentPage" v-model:pageSize="pageSize" :total="100">
    <span class="pagination-info">共 {{ Math.ceil(total / pageSize) }} 页</span>
  </CommonPagination>
</template>
```

## 隐藏每页条数选择器

通过设置 `layout` 属性不包含 `sizes` 来隐藏每页条数选择器。

```vue
<template>
  <CommonPagination
    v-model:pageNo="currentPage"
    v-model:pageSize="pageSize"
    :total="100"
    layout="prev, pager, next, jumper, total"
  />
</template>
```

## 完整功能示例

```vue
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>

    <CommonPagination
      v-model:pageNo="currentPage"
      v-model:pageSize="pageSize"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      @change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const tableData = ref([
  { date: '2024-01-01', name: '张三', address: '北京市' },
  { date: '2024-01-02', name: '李四', address: '上海市' },
  // ... 更多数据
])

const handlePageChange = (pagination) => {
  // 重新加载数据
  loadData(pagination.pageNo, pagination.pageSize)
}

const loadData = (page, size) => {
  // 模拟数据加载
  console.log(`加载第 ${page} 页，每页 ${size} 条数据`)
}
</script>
```

## 属性

| 属性名           | 说明                          | 类型     | 可选值 | 默认值                                              |
| ---------------- | ----------------------------- | -------- | ------ | --------------------------------------------------- |
| v-model:pageNo   | 当前页码                      | number   | -      | 1                                                   |
| v-model:pageSize | 每页显示条目个数              | number   | -      | 10                                                  |
| total            | 总条目数                      | number   | -      | 0                                                   |
| page-sizes       | 每页显示个数选择器的选项设置  | number[] | -      | [10, 20, 30, 40, 50]                                |
| layout           | 组件布局，子组件名用逗号分隔  | string   | -      | 'slot, ->, total, sizes, prev, pager, next, jumper' |
| background       | 是否为分页按钮添加背景色      | boolean  | -      | true                                                |
| small            | 是否使用小型分页样式          | boolean  | -      | false                                               |
| teleported       | 是否将下拉菜单teleport至 body | boolean  | -      | true                                                |

## 事件

| 事件名 | 说明                         | 回调参数                              |
| ------ | ---------------------------- | ------------------------------------- |
| change | 当前页码或每页条数改变时触发 | (pagination: PaginationParam) => void |

## 类型定义

```typescript
interface PaginationParam {
  pageNo: number
  pageSize: number
}

interface CommonPaginationProps extends Partial<PaginationProps> {}
```
