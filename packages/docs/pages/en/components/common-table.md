---
title: CommonTable
---

# CommonTable

`CommonTable` is a lightweight wrapper around Element Plus `ElTable`. It standardizes column configuration while keeping most native table capabilities.

Key features:

- Supports both array-style and object-style column config
- Built-in column types: `selection`, `index`, `expand`, `date`, `dateTime`, `dict`
- Supports fast named slots based on column names
- Automatically scrolls to the top when data changes
- Exposes internal `ElTable` instance methods through `ref`

## Basic Usage

<demo vue="CommonTable/basic.vue" ssg="true"/>

## Selection Table

<demo vue="CommonTable/selection.vue" ssg="true"/>

## Fixed Columns

<demo vue="CommonTable/fixed.vue" ssg="true"/>

## Custom Slots

Typical custom rendering can be defined with column-based slot names:

- Regular columns use `prop` as the slot name
- Expand columns use `expand` as the slot name

<demo vue="CommonTable/slot.vue" ssg="true"/>

## Sorting and Filtering

The component forwards native sorting and filtering capabilities from `ElTable`.

<demo vue="CommonTable/sort-filter.vue" ssg="true"/>

## Built-in Column Types

| Type | Description | Example |
| --- | --- | --- |
| `selection` | Selection column | `{ type: 'selection' }` |
| `index` | Index column | `{ type: 'index' }` |
| `expand` | Expand column | `{ type: 'expand' }` |
| `date` | Date column formatted as `YYYY-MM-DD` | `{ prop: 'createDate', type: 'date' }` |
| `dateTime` | Date-time column formatted as `YYYY-MM-DD HH:mm:ss` | `{ prop: 'createTime', type: 'dateTime' }` |
| `dict` | Dictionary column mapped by `options` | `{ prop: 'status', type: 'dict', options: [...] }` |

<demo vue="CommonTable/column-types.vue" ssg="true"/>

## Exposed Methods

Use `ref` to access internal table instance methods.

<demo vue="CommonTable/expose.vue" ssg="true"/>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `data` | Table data | `T[]` | `[]` |
| `columns` | Column config in array or object form | `CommonTableColumn<T>` | - |

> The component also supports most native Element Plus `ElTable` props such as `height`, `max-height`, `border`, `stripe`, `row-key`, and `default-sort`.

### Column Config

```ts
type CommonTableColumn<T> =
  | CommonTableArrayColumns<T>
  | Record<string, CommonTableColumnRoot<T>>
```

### Slots

| Slot | Description | Params |
| --- | --- | --- |
| Column slot | Uses the column `prop` as the slot name, such as `#name` or `#status` | `{ row, column, index, value }` |
| `expand` | Expand row slot | `{ row, column, index, value }` |
| `empty` | Custom empty state | - |

### Exposes

| Method | Description |
| --- | --- |
| `clearSelection` | Clear selected rows |
| `toggleRowSelection` | Toggle a row selection state |
| `toggleAllSelection` | Toggle select all |
| `toggleRowExpansion` | Toggle row expansion |
| `setCurrentRow` | Set the current row |
| `clearSort` | Clear sorting |
| `clearFilter` | Clear filtering |
| `doLayout` | Recalculate layout |
| `sort` | Sort manually |
| `scrollTo` | Scroll to a target position |
| `setScrollTop` | Set vertical scroll position |
| `setScrollLeft` | Set horizontal scroll position |

## TypeScript Types

```ts
import type {
  CommonTableProps,
  CommonTableColumn,
  CommonTableArrayColumns,
  CommonTableColumnRoot,
  CommonTableExpose,
} from '@yetuzi/vue3-query-components'
```

```ts
interface CommonTableProps<T = AnyObject> {
  columns: CommonTableColumn<T>
  data: T[]
}

interface CommonTableExpose extends TableInstance {}
```

## References

- [Element Plus Table](https://element-plus.org/en-US/component/table.html)
- [Element Plus TableColumn](https://element-plus.org/en-US/component/table.html#table-column-attributes)
