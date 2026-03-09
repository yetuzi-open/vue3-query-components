---
title: CommonTable
---

# CommonTable

`CommonTable` is a wrapper around Element Plus `ElTable`. It provides a more consistent column configuration API while keeping most native table capabilities.

Key features:

- Supports both array and object column configurations
- Built-in column types: `selection`, `index`, `expand`, `date`, `dateTime`, `dict`
- Supports quick named slots based on column names
- Automatically scrolls to the top when table data changes
- Exposes `ElTable` instance methods through `ref`
- Forwards most native `ElTable` props, events, and column options

## Basic Usage

Basic table usage with selection, index, date-time, and operation columns.

<demo vue="CommonTable/basic.vue" ssg="true"/>

## Selection Table

Use the `selection` column type to quickly enable row selection and listen to `selection-change` for selected rows.

<demo vue="CommonTable/selection.vue" ssg="true"/>

## Fixed Columns

When there are many columns, use `fixed` to pin important columns to the left or right side.

<demo vue="CommonTable/fixed.vue" ssg="true"/>

## Custom Slots

`CommonTable` supports named slots based on columns:

- Regular columns use `prop` as the slot name
- Expand columns can use `expand` as the slot name directly

<demo vue="CommonTable/slot.vue" ssg="true"/>

## Sorting and Filtering

The component forwards Element Plus sorting and filtering behavior, so you can use `sortable`, `filters`, and `filter-method` directly.

<demo vue="CommonTable/sort-filter.vue" ssg="true"/>

## Built-in Column Types

`CommonTable` includes several built-in column types to reduce repetitive configuration.

| Type | Description | Example |
| --- | --- | --- |
| `selection` | Selection column with checkbox | `{ type: 'selection' }` |
| `index` | Index column with row numbers | `{ type: 'index' }` |
| `expand` | Expand column for extra row content | `{ type: 'expand' }` |
| `date` | Date column formatted as `YYYY-MM-DD` | `{ prop: 'createDate', type: 'date' }` |
| `dateTime` | Date-time column formatted as `YYYY-MM-DD HH:mm:ss` | `{ prop: 'createTime', type: 'dateTime' }` |
| `dict` | Dictionary column mapped by `options` | `{ prop: 'status', type: 'dict', options: [...] }` |

<demo vue="CommonTable/column-types.vue" ssg="true"/>

## Exposed Methods

You can access common `ElTable` instance methods via `ref`, such as clearing selection, sorting, and scrolling.

<demo vue="CommonTable/expose.vue" ssg="true"/>

## API

### Props

Besides the custom props below, `CommonTable` also supports most native Element Plus `ElTable` props.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `data` | Table data | `T[]` | `[]` |
| `columns` | Column configuration in array or object form | `CommonTableColumn<T>` | - |

> Note: Common forwarded props include `height`, `max-height`, `border`, `stripe`, `row-key`, and `default-sort`.

### Column Configuration

Column definitions extend Element Plus `TableColumnCtx` and add support for built-in column types.

```ts
interface CommonTableColumn<T> extends Partial<TableColumnCtx<T>> {
  prop?: keyof T | string
  type?: 'default' | 'selection' | 'index' | 'expand' | 'date' | 'dateTime' | 'dict'
  options?: Array<{ label: string; value: any }>
  dictName?: string
}
```

### Exposes

`CommonTable` exposes `ElTable` instance methods through `ref`. Common methods include:

| Method | Description |
| --- | --- |
| `clearSelection` | Clear selected rows |
| `toggleRowSelection` | Toggle selection for one row |
| `toggleAllSelection` | Toggle select all |
| `toggleRowExpansion` | Toggle row expansion |
| `setCurrentRow` | Set current row |
| `clearSort` | Clear sorting |
| `clearFilter` | Clear filters |
| `doLayout` | Recalculate layout |
| `sort` | Sort manually |
| `scrollTo` | Scroll to a given position |
| `setScrollTop` | Set vertical scroll position |
| `setScrollLeft` | Set horizontal scroll position |

### Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| Column slot | Uses the column `prop` as the slot name, such as `#name` or `#status` | `{ row, column, index, value }` |
| `expand` | Expand column slot | `{ row, column, index, value }` |
| `empty` | Custom empty state content | - |

## TypeScript Types

The component exports these commonly used types:

```ts
import type {
  CommonTableProps,
  CommonTableColumn,
  CommonTableArrayColumns,
  CommonTableColumnRoot,
  CommonTableExpose,
} from '@yetuzi/vue3-query-components'
```

### `CommonTableProps`

```ts
interface CommonTableProps<T = AnyObject> {
  columns: CommonTableColumn<T>
  data: T[]
}
```

### `CommonTableColumn`

```ts
type CommonTableColumn<T> =
  | CommonTableArrayColumns<T>
  | Record<string, CommonTableColumnRoot<T>>
```

### `CommonTableArrayColumns`

```ts
type CommonTableArrayColumns<T> = Array<CommonTableColumnRoot<T>>
```

### `CommonTableExpose`

```ts
interface CommonTableExpose extends TableInstance {}
```

## References

- [Element Plus Table](https://element-plus.org/en-US/component/table.html)
- [Element Plus TableColumn](https://element-plus.org/en-US/component/table.html#table-column-attributes)