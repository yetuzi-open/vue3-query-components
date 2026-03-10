---
title: CommonPagination
---

# CommonPagination

`CommonPagination` is a lightweight wrapper around Element Plus `ElPagination`. It provides a practical default layout for admin list pages and uses `v-model:pageNo` / `v-model:pageSize` to match common query parameter naming.

Key features:

- Provides a default layout for admin list pages
- Supports two-way binding for page number and page size
- Resets to page `1` when page size changes
- Emits unified pagination params through `change`
- Forwards most native Element Plus pagination props

## Basic Usage

<demo vue="CommonPagination/basic.vue" ssg="true"/>

## Layout

Use `layout` to control the order and visibility of pagination sections.

<demo vue="CommonPagination/layout.vue" ssg="true"/>

## Slot Content

The default layout includes a `slot` area for summary text or extra tips.

<demo vue="CommonPagination/slot.vue" ssg="true"/>

## Events

Use `change` to receive the current pagination params directly.

<demo vue="CommonPagination/events.vue" ssg="true"/>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:pageNo` | Current page number | `number` | - |
| `v-model:pageSize` | Current page size | `number` | - |
| `total` | Total record count | `number` | `0` |
| `page-sizes` | Selectable page size options | `number[]` | `[10, 20, 30, 40, 50]` |
| `layout` | Pagination layout | `string` | `'slot, ->, total, sizes, prev, pager, next, jumper'` |
| `background` | Whether to show button backgrounds | `boolean` | `true` |
| `teleported` | Whether dropdown panels are teleported to `body` | `boolean` | `true` |

> The component also supports most native Element Plus `ElPagination` props such as `pager-count`, `hide-on-single-page`, `small`, and `disabled`.

### Events

| Event | Description | Callback |
| --- | --- | --- |
| `change` | Triggered when page number or page size changes | `(pagination: PaginationParam) => void` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content on the left side of the pagination area, requires `slot` in `layout` |

## TypeScript Types

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

## References

- [Element Plus Pagination](https://element-plus.org/en-US/component/pagination.html)
