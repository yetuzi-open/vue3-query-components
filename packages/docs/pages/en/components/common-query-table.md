---
title: CommonQueryTable
---

# CommonQueryTable

`CommonQueryTable` is a composed list component that combines a query form, data table, and pagination into one reusable unit.

Key features:

- Built-in query form, table, and pagination workflow
- Unified list request management through `fetch`
- Supports layout slots and child component slot forwarding
- Supports prop and event forwarding through prefixes
- Exposes common instance methods for page-level control

## Basic Usage

<demo vue="CommonQueryTable/basic.vue" ssg="true" />

## Layout Slots

The component provides these layout slots:

- `header`
- `form`
- `toolbar`
- `table`
- `pagination`
- `footer`

### Table + Pagination Only

If `form` is not provided, only the table and pagination areas are rendered.

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true" />

### Toolbar

Use the `toolbar` slot to add common action buttons.

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true" />

### Footer

Use the `footer` slot to display additional notes.

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true" />

## Pagination

Pagination is built in. Query params `pageNo` and `pageSize` are automatically passed to `fetch`.

<demo vue="CommonQueryTable/pagination.vue" ssg="true" />

You can also forward pagination props with the `pagination-*` prefix, such as:

- `pagination-page-size`
- `pagination-layout`
- `pagination-background`

## Slot Forwarding

You can pass slots to child components by prefix:

- `form-*` for `CommonForm`
- `table-*` for `CommonTable`
- `pagination-*` for `CommonPagination`

Examples:

- `form-name`
- `table-status`
- `table-empty`

<demo vue="CommonQueryTable/slot.vue" ssg="true" />

## Prop and Event Forwarding

Extra props and events can be forwarded to internal components using prefixes:

- Prop forwarding: `:form-inline="false"`
- Event forwarding: `@table-selection-change="handleSelectionChange"`

<demo vue="CommonQueryTable/attrs.vue" ssg="true" />

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `fetch` | Data fetch function | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | - |
| `form` | Query form configuration array | `CommonFormItemArray<T>` | `[]` |
| `columns` | Table column configuration | `CommonTableColumn<T>` | - |

### Slots

#### Layout Slots

| Name | Description |
| --- | --- |
| `header` | Header area |
| `form` | Query form area |
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
| `reset` | Reset query conditions and pagination |
| `getFormData` | Get current form data |
| `getSelectionRows` | Get selected table rows |

## TypeScript Types

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