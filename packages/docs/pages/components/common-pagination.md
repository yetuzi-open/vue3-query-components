---
title: CommonPagination
---

# CommonPagination 分页组件

`CommonPagination` 是基于 Element Plus `ElPagination` 的轻量封装，统一了常用分页默认值，并使用 `v-model:pageNo`、`v-model:pageSize` 对接列表查询参数。

主要特性：

- 提供后台列表常用的默认分页布局
- 支持页码与每页条数双向绑定
- 每页条数变化时自动回到第一页
- 统一通过 `change` 事件返回分页参数
- 透传大部分 Element Plus 原生分页属性

## 基础用法

<demo vue="CommonPagination/basic.vue" ssg="true"/>

## 布局配置

通过 `layout` 可以控制分页器显示顺序与显示内容，适配不同页面布局。

<demo vue="CommonPagination/layout.vue" ssg="true"/>

## 插槽内容

默认布局包含 `slot` 区域，可以在分页左侧补充统计信息或提示文案。

<demo vue="CommonPagination/slot.vue" ssg="true"/>

## 事件回调

组件通过 `change` 统一抛出当前分页参数。

<demo vue="CommonPagination/events.vue" ssg="true"/>

## API

### Props

除以下自定义约定外，`CommonPagination` 还支持大部分 Element Plus `ElPagination` 原生属性，例如 `pager-count`、`hide-on-single-page`、`small`、`disabled` 等。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model:pageNo` | 当前页码 | `number` | - |
| `v-model:pageSize` | 每页条数 | `number` | - |
| `total` | 数据总条数 | `number` | `0` |
| `page-sizes` | 每页条数选项 | `number[]` | `[10, 20, 30, 40, 50]` |
| `layout` | 分页布局配置 | `string` | `'slot, ->, total, sizes, prev, pager, next, jumper'` |
| `background` | 是否显示带背景色的分页按钮 | `boolean` | `true` |
| `teleported` | 下拉面板是否挂载到 `body` | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 页码或每页条数变化时触发 | `(pagination: PaginationParam) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义分页左侧插槽内容，需要 `layout` 中包含 `slot` |

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
