---
title: CommonQueryTable
---

# CommonQueryTable Query Table

A highly integrated query page component that includes form queries, table display, and pagination.

## Basic Usage

<demo vue="CommonQueryTable/basic.vue" ssg="true"/>

## Slot Layout

The component provides 6 layout slots, control the page layout through slot content:

- `header` - Header area
- `form` - Form query area
- `toolbar` - Toolbar area
- `table` - Table area (default display)
- `pagination` - Pagination area
- `footer` - Footer area

::: tip Slot Display Rules
- `header`, `toolbar`, `footer`: Displayed only when slot content is provided
- `form`: Displayed when slot content is provided or form configuration exists
- `table`: Always displayed by default
- `pagination`: Displayed when slot content is provided or has data (total > 0)
:::

### Table with Pagination

Display only table and pagination without `form` prop.

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true"/>

### Toolbar

Add operation buttons via `toolbar` slot.

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true"/>

### Footer Content

Display additional information via `footer` slot.

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true"/>

## Pagination Configuration

CommonQueryTable has built-in complete pagination functionality, supporting custom pagination parameters and styles.

::: tip Pagination Notes
- Global default page number and page size can be set via `CommonConfigProvider` component
- Pagination component will automatically display when the returned `total` from the API is greater than the page size
- Pagination parameters `pageNo` and `pageSize` are automatically passed to the `fetch` function
:::

<demo vue="CommonQueryTable/pagination.vue" ssg="true"/>

### Pagination Props

Customize pagination component behavior via `pagination-*` prefixed attributes:

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| `pagination-page-size` | Array of page size options | `number[]` | `[10, 20, 50, 100]` |
| `pagination-default-page-size` | Default page size | `number` | `10` |
| `pagination-layout` | Pagination component layout | `string` | `'total, sizes, prev, pager, next, jumper'` |
| `pagination-background` | Whether to show background color | `boolean` | `true` |
| `pagination-page-count` | Total page count (usually calculated from total) | `number` | - |

### Pagination Events

| Event | Description | Callback Parameters |
| --- | --- | --- |
| `@pagination-change` | Triggered when pagination changes | `{ pageNo: number, pageSize: number }` |

## Slot Pass-through

In actual use, you may need to use slot functionality on the `form` or `table` components under `CommonQueryTable`.

::: tip Slot Naming Rule
Pass slots to internal components via `componentName-slotName`:

- `form-name` - Pass name slot to form component
- `table-status` - Pass status slot to table component
- `table-empty` - Pass empty state slot to table component (corresponds to Element Plus el-table's #empty)

:::

<demo vue="CommonQueryTable/slot.vue" ssg="true"/>

## Attribute Pass-through

Although the component provides some default attributes, it cannot meet all requirements. Supports passing additional attributes and events to internal components via attribute pass-through.

::: tip Pass-through Rule
- **Attribute Pass-through**: Pass attributes to internal components via `componentName-attributeName`
- **Event Pass-through**: Listen to internal component events via `@componentName-eventName`

:::

### Attribute Pass-through Example

Pass additional attributes to internal components, for example, setting form to non-inline mode:

```vue
<CommonQueryTable
  :form-inline="false"
  ...
/>
```

### Event Pass-through Example

Listen to internal component events, for example, listening to table selection changes:

```vue
<script setup>
function handleSelectionChange(selection) {
  console.log('Selected items:', selection)
}
</script>

<template>
  <CommonQueryTable
    @table-selection-change="handleSelectionChange"
    ...
  />
</template>
```

The following complete example shows the actual usage of attribute pass-through and event pass-through:

<demo vue="CommonQueryTable/attrs.vue" ssg="true"/>

## API

### Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| fetch | Data fetch function, receives query parameters and returns a Promise containing list and total | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | Required |
| form | Form configuration array, defines fields and properties of query form | `CommonFormItemArray<T>` | `[]` |
| columns | Table column configuration, defines table column structure and display | `CommonTableColumn<T>` | Required |
| pagination-* | Pagination component attribute pass-through, see [Pagination Configuration](#pagination-configuration) section | - | - |

### Slots

#### Layout Slots

CommonQueryTable supports passing content to internal components via layout slots:

| Name | Description | Target |
| --- | --- | --- |
| header | Header area slot | Page header |
| form | Form area slot | Query form component |
| toolbar | Toolbar slot | Table toolbar |
| table | Table area slot | Data table component |
| pagination | Pagination area slot | Pagination component |
| footer | Footer area slot | Page footer |

#### Sub-component Slot Passing

Pass slots to internal components via prefix:

- **`form-*`** - Pass slots to internal CommonForm component
- **`table-*`** - Pass slots to internal CommonTable component
- **`pagination-*`** - Pass slots to internal CommonPagination component

**Usage Example:**

- `form-name` - Pass name slot to form component
- `table-status` - Pass status slot to table component
- `pagination-sizes` - Pass sizes slot to pagination component

### Exposes

The component exposes the following methods that can be called via ref:

| Method | Description | Parameters | Return Value |
| --- | --- | --- | --- |
| refresh | Refresh list data | - | `void` |
| reset | Reset query conditions and pagination | - | `void` |
| getFormData | Get current form data | - | `Partial<T>` |
| getSelectionRows | Get selected row data from table | - | `T[]` |

## TypeScript Types

The component exports the following TypeScript type definitions for direct use in your project:

### CommonQueryTableProps

```typescript
interface CommonQueryTableProps<T extends AnyObject = AnyObject> {
  /** Data fetch function */
  fetch: (params?: ListParam) => Promise<{ list: T[]; total: string | number }>

  /** Form configuration array */
  form?: CommonFormItemArray<T>

  /** Table column configuration */
  columns: CommonTableColumn<T>
}
```

### CommonQueryTableExpose

Type definition for component instance, used for ref type annotation:

```typescript
interface CommonQueryTableExpose<T = AnyObject> {
  /** Refresh list data */
  refresh: () => void

  /** Reset query conditions and pagination */
  reset: () => void

  /** Get form data */
  getFormData: () => Partial<T>

  /** Get selected row data from table */
  getSelectionRows: () => T[]
}
```

### ListParam

```typescript
/**
 * List request parameter type
 * @typeParam T - Additional query parameter type
 */
type ListParam<T extends AnyObject = AnyObject> = PaginationParam & T

/**
 * Pagination request parameters
 */
type PaginationParam = {
  pageNo: number
  pageSize: number
}
```

**Usage Example:**

```typescript
import type {
  CommonQueryTableProps,
  ListParam,
} from '@yetuzi/vue3-query-components'

// Define query parameter type
interface MyQueryParams {
  name: string
  status: number
}

// Define data row type
interface UserData {
  id: number
  name: string
  email: string
}

// Use types
const fetch = (params: ListParam<MyQueryParams>) => {
  // params includes: pageNo, pageSize, name, status
  return Promise.resolve({
    list: [] as UserData[],
    total: 0
  })
}
```
