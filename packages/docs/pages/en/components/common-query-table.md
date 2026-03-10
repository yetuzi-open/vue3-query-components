---
title: CommonQueryTable
---

# CommonQueryTable

`CommonQueryTable` is a composed list component that combines a search form, data table, and pagination into one unified solution for admin list pages.

Key features:

- Built-in linkage between form, table, and pagination
- Uses `fetch` as the single list request entry
- Supports layout slots and child-component slot forwarding
- Supports prefixed prop / event forwarding to internal components
- Exposes common list actions through `ref`

## Basic Usage

<demo vue="CommonQueryTable/basic.vue" ssg="true" />

## Layout Slots

Available layout areas:

- `header`
- `form`
- `toolbar`
- `table`
- `pagination`
- `footer`

### Table + Pagination Only

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true" />

### Toolbar

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true" />

### Footer Summary

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true" />

## Pagination

The component automatically passes `pageNo` and `pageSize` into `fetch`.

<demo vue="CommonQueryTable/pagination.vue" ssg="true" />

### Pagination Forwarding

Use the `pagination-*` prefix to pass props to internal `CommonPagination`, for example:

- `pagination-page-sizes`
- `pagination-layout`
- `pagination-background`

## Slot Forwarding

Use prefixed slots to customize internal child components:

- `form-*` → internal `CommonForm`
- `table-*` → internal `CommonTable`
- `pagination-*` → internal `CommonPagination`

Examples:

- `table-status`
- `table-empty`
- `pagination-default`

<demo vue="CommonQueryTable/slot.vue" ssg="true" />

## Prop and Event Forwarding

Prefixed props and events let you fine-tune internal components:

- prop forwarding: `:form-inline="false"`
- event forwarding: `@table-selection-change="handleSelectionChange"`

<demo vue="CommonQueryTable/attrs.vue" ssg="true" />

## API

### Props

| Prop | Description | Type |
| --- | --- | --- |
| `fetch` | List request function | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` |
| `form` | Search form config array | `CommonFormItemArray<T>` |
| `columns` | Table column config | `CommonTableColumn<T>` |

### Slots

#### Layout Slots

| Name | Description |
| --- | --- |
| `header` | Header area |
| `form` | Search form area |
| `toolbar` | Toolbar area |
| `table` | Table area |
| `pagination` | Pagination area |
| `footer` | Footer area |

#### Child Slot Forwarding

- `form-*` forwards to internal `CommonForm`
- `table-*` forwards to internal `CommonTable`
- `pagination-*` forwards to internal `CommonPagination`

### Exposes

| Method | Description |
| --- | --- |
| `refresh` | Refresh the list with current conditions |
| `reset` | Reset filters and pagination, then reload the list |
| `getFormData` | Get current form data |
| `getSelectionRows` | Get currently selected rows |

## TypeScript Types

```ts
import type {
  CommonQueryTableProps,
  CommonQueryTableExpose,
} from '@yetuzi/vue3-query-components'
```

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
