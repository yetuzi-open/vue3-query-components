---
title: CommonQueryTable
---

# CommonQueryTable Query Table

A highly integrated query page component that includes form queries, table display, and pagination.

## Basic Usage

<demo vue="CommonQueryTable/basic.vue" ssg="true"/>

## Layout Configuration

Control page layout via `layouts` property. Supports the following layout components:

`['header', 'form', 'toolbar', 'table', 'pagination', 'footer']`

### Table with Pagination

Table with pagination functionality, suitable for pure data display.

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true"/>

### Toolbar

Added toolbar section, suitable for operations on entire table data such as add, delete, etc.

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true"/>

### Footer Content

Display additional information.

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true"/>

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

In the following example, when you select form items, the console will output.

<demo vue="CommonQueryTable/attrs.vue" ssg="true"/>

## API

### Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| fetch | Data fetch function, receives query parameters and returns a Promise containing list and total | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | Required |
| form | Form configuration array, defines fields and properties of query form | `CommonFormItemArray<T>` | `[]` |
| columns | Table column configuration, defines table column structure and display | `CommonTableColumn<T>` | Required |
| layouts | Page layout configuration, controls display order of components on page | `Array<'header' \| 'form' \| 'toolbar' \| 'table' \| 'pagination' \| 'footer'>` | `['form', 'table', 'pagination']` |

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

### Event Pass-through

Supports listening to internal component events via `@componentName-eventName`:

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| @table-selection-change | Triggered when table selection changes | `selection` |
| @form-submit | Triggered when form is submitted | `formData` |
| @form-reset | Triggered when form is reset | - |
| @pagination-change | Triggered when pagination changes | `{ pageNo, pageSize }` |

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

  /** Page layout configuration */
  layouts?: Array<CommonQueryTableLayoutsUnite>
}
```

### CommonQueryTableLayoutsUnite

```typescript
/** Layout name union type */
type CommonQueryTableLayoutsUnite =
  | 'header'    // Header area
  | 'form'      // Form area
  | 'toolbar'   // Toolbar area
  | 'table'     // Table area
  | 'pagination' // Pagination area
  | 'footer'    // Footer area
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
  CommonQueryTableLayoutsUnite,
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
