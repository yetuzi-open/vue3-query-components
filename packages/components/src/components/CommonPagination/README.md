# CommonPagination 分页组件

`CommonPagination` 是基于 Element Plus `ElPagination` 的轻量封装，统一了常用默认值，并通过 `v-model:pageNo`、`v-model:pageSize` 提供更贴近列表请求参数的双向绑定方式。

主要特性：

- 默认启用常见后台分页布局
- 支持页码和每页条数双向绑定
- 每页条数变化时自动回到第一页
- 统一通过 `change` 事件返回分页参数
- 透传大部分 Element Plus 原生分页属性和事件

## 基础用法

```vue
<template>
  <CommonPagination
    v-model:pageNo="pageNo"
    v-model:pageSize="pageSize"
    :total="total"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNo = ref(1)
const pageSize = ref(10)
const total = ref(168)

const handleChange = ({ pageNo, pageSize }: { pageNo: number; pageSize: number }) => {
  console.log('当前页码：', pageNo)
  console.log('每页条数：', pageSize)
}
</script>
```

## 自定义布局

通过 `layout` 可以调整分页器内容顺序，也可以移除 `sizes`、`jumper` 等区域。

```vue
<CommonPagination
  v-model:pageNo="pageNo"
  v-model:pageSize="pageSize"
  :total="120"
  layout="prev, pager, next, jumper, ->, total"
/>
```

## 自定义每页条数选项

```vue
<CommonPagination
  v-model:pageNo="pageNo"
  v-model:pageSize="pageSize"
  :total="120"
  :page-sizes="[10, 20, 50, 100]"
/>
```

## 自定义插槽内容

默认布局中包含 `slot`，可以在分页器左侧插入补充说明。

```vue
<CommonPagination
  v-model:pageNo="pageNo"
  v-model:pageSize="pageSize"
  :total="120"
>
  <span>当前共 {{ Math.ceil(total / pageSize) }} 页</span>
</CommonPagination>
```

## 事件说明

组件统一抛出 `change` 事件，返回结构与常见列表查询参数一致：

```ts
type PaginationParam = {
  pageNo: number
  pageSize: number
}
```

当 `pageSize` 变化且当前页不是第一页时，组件会先把 `pageNo` 重置为 `1`，再触发一次 `change`，避免请求越界页码。

## Props

除下表外，组件还支持大部分 Element Plus `ElPagination` 原生属性，例如 `pager-count`、`hide-on-single-page`、`disabled`、`small` 等。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:pageNo` | 当前页码 | `number` | - |
| `v-model:pageSize` | 每页条数 | `number` | - |
| `total` | 数据总条数 | `number` | `0` |
| `page-sizes` | 每页条数选项 | `number[]` | `[10, 20, 30, 40, 50]` |
| `layout` | 分页布局配置 | `string` | `'slot, ->, total, sizes, prev, pager, next, jumper'` |
| `background` | 是否显示带背景色的分页按钮 | `boolean` | `true` |
| `teleported` | 下拉面板是否挂载到 `body` | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 页码或每页条数变化时触发 | `(pagination: PaginationParam) => void` |

## TypeScript 类型

```ts
import type {
  CommonPaginationProps,
  PaginationParam,
} from '@yetuzi/vue3-query-components'
```

```ts
interface CommonPaginationProps extends Partial<PaginationProps> {}

type PaginationParam = {
  pageNo: number
  pageSize: number
}
```

## 参考

- [Element Plus Pagination](https://element-plus.org/zh-CN/component/pagination.html)
