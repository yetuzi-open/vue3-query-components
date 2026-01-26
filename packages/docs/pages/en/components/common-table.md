---
title: CommonTable
---

# CommonTable Table Component

A data table component wrapped around Element Plus Table, providing rich configuration options and flexible slot support.

## Basic Usage

Basic table usage example, including selection column, index column, and action column. Configure column information through `columns`, pass table data through `data`.

<demo vue="CommonTable/basic.vue" ssg="true"/>

## Multi-Select Table

Table supporting multi-select functionality. Implement multi-select column by setting `type: 'selection'`, and get selected data through `selection-change` event.

<demo vue="CommonTable/selection.vue" ssg="true"/>

## Fixed Columns

When there are many data columns, you can fix left or right columns through the `fixed` attribute to ensure important information is always visible.

<demo vue="CommonTable/fixed.vue" ssg="true"/>

## Custom Slots

Customize column content display through slots. Support using prop name as slot name to render specific columns, or use default slot to render action columns.

<demo vue="CommonTable/slot.vue" ssg="true"/>

## Sorting and Filtering

Support column sorting and filtering. Implement sorting by setting `sortable`, implement filtering by `filters` and `filter-method`.

<demo vue="CommonTable/sort-filter.vue" ssg="true"/>

## Column Types

CommonTable provides various built-in column types. Use them by setting the `type` attribute:

### Supported Column Types

| Type | Description | Example |
| --- | --- | --- |
| `selection` | Multi-select column, displays checkbox | `{ type: 'selection' }` |
| `index` | Index column, automatically displays row number | `{ type: 'index' }` |
| `expand` | Expand column, supports expanding additional content | `{ type: 'expand' }` |
| `date` | Date column, automatically formats as YYYY-MM-DD | `{ type: 'date' }` |
| `dateTime` | Date-time column, automatically formats as YYYY-MM-DD HH:mm:ss | `{ type: 'dateTime' }` |
| `dict` | Dictionary column, maps values to text | `{ type: 'dict', options: [...] }` |

<demo vue="CommonTable/column-types.vue" ssg="true"/>

## API

### Props

CommonTable component is a secondary wrapper based on Element Plus Table. In addition to the following custom properties, it also supports all native properties of Element Plus Table.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| data | Table data | `T[]` | `[]` |
| columns | Column configuration array | `CommonTableColumn[]` | `[]` |

> 💡 **Note**: In addition to the custom properties above, CommonTable supports all native properties of Element Plus Table, such as `height`, `border`, `stripe`, `size`, etc. For detailed properties, please refer to [Element Plus Table Documentation](https://element-plus.org/en-US/component/table.html).

#### Column Configuration

Column configuration supports the following basic properties:

```typescript
interface CommonTableColumn {
  // Column type
  type?: 'selection' | 'index' | 'expand' | 'date' | 'dateTime' | 'dict'

  // Basic properties
  prop?: string              // Column field name
  label?: string             // Column title
  width?: string | number    // Column width
  fixed?: boolean | 'left' | 'right'  // Fixed column

  // dict type specific
  options?: Array<{ label: string; value: any }>  // Dictionary options
}
```

#### Type Descriptions

| Value | Description | Features |
| --- | --- | --- |
| `selection` | Multi-select column | Displays checkbox, supports multi-select functionality |
| `index` | Index column | Automatically displays row number, starting from 1 |
| `expand` | Expand column | Supports expanding/collapsing row content |
| `date` | Date column | Automatically formats timestamp to YYYY-MM-DD |
| `dateTime` | Date-time column | Automatically formats timestamp to YYYY-MM-DD HH:mm:ss |
| `dict` | Dictionary column | Maps numeric values to corresponding text labels |

> 💡 **Note**: CommonTable's Column inherits from Element Plus's TableColumnCtx and supports all native properties. For detailed configuration, please refer to [Element Plus Table Documentation](https://element-plus.org/en-US/component/table.html#table-column-attributes).

### Exposes

CommonTable exposes all Element Plus Table methods through ref, which can be called directly.

For the complete method list, please refer to [Element Plus Table Documentation](https://element-plus.org/en-US/component/table#table-exposes).

<demo vue="CommonTable/expose.vue" ssg="true"/>

### Slots

CommonTable supports slots for customizing column content:

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Default action column slot | `{ row, column, index }` |
| [prop] | Custom column content, slot name is the prop attribute of the column | `{ row, column, index }` |

<demo vue="CommonTable/slots-api.vue" ssg="true"/>

> 💡 **Note**: CommonTable also supports all slots of Element Plus Table, such as `empty`, `append`, `header`, etc. For details, please refer to [Element Plus Table Documentation](https://element-plus.org/en-US/component/table.html#table-slots).

## TypeScript Types

The component exports the following TypeScript type definitions for direct use in your project:

### CommonTableProps

```typescript
interface CommonTableProps<T extends AnyObject = AnyObject> {
  /** Table column configuration */
  columns: CommonTableColumn<T>

  /** Table data */
  data: T[]
}
```

### CommonTableColumn

```typescript
/**
 * Table column configuration type
 * @typeParam T - Table data row type
 */
type CommonTableColumn<T extends AnyObject> =
  | CommonTableArrayColumns<T>
  | CommonTableObjectColumns<T>
```

### CommonTableArrayColumns

```typescript
/**
 * Table column type array
 * Used for CommonTable's columns property, also for type annotation
 */
type CommonTableArrayColumns<T extends AnyObject> = Array<CommonTableColumnRoot<T>>
```

### CommonTableColumnRoot

```typescript
/**
 * Table column definition root type, containing union of all column types
 */
type CommonTableColumnRoot<T extends AnyObject> =
  | TableColumnBase<T>           // Regular column
  | TableColumnTypeIndex<T>      // Index column
  | TableColumnTypeSelection<T>  // Selection column
  | TableColumnTypeExpand<T>     // Expand column
  | TableColumnTypeDate<T>       // Date column
  | TableColumnTypeDateTime<T>   // Date-time column
  | TableColumnTypeDict<T>       // Dictionary column
```

### Special Column Types

```typescript
/** Index column type */
interface TableColumnTypeIndex<T extends AnyObject> {
  type: 'index'
}

/** Selection column type */
interface TableColumnTypeSelection<T extends AnyObject> {
  type: 'selection'
  selectable?: (row: T, index: number) => boolean
  'reserve-selection'?: boolean
}

/** Expand column type */
interface TableColumnTypeExpand<T extends AnyObject> {
  type: 'expand'
}

/** Date column type */
interface TableColumnTypeDate<T extends AnyObject> {
  type: 'date'
}

/** Date-time column type */
interface TableColumnTypeDateTime<T extends AnyObject> {
  type: 'dateTime'
}

/** Dictionary column type */
interface TableColumnTypeDict<T extends AnyObject> {
  type: 'dict'
  /** Dictionary option list */
  options?: Array<{ label: string; value: any }>
  /** Dictionary name, used to get options from global dictionary service */
  dictName?: string
}
```

### CommonTableInstance

```typescript
/**
 * CommonTable component instance exposed type
 */
interface CommonTableInstance {
  /** ElTable component instance reference */
  elTableRef: Ref<TableInstance | undefined>
}
```

**Usage Example:**

```typescript
import type {
  CommonTableProps,
  CommonTableArrayColumns,
} from '@yetuzi/vue3-query-components'

// Define data row type
interface UserData {
  id: number
  name: string
  email: string
  status: number
  createTime: number
}

// Define dictionary options
const statusOptions = [
  { label: 'Enabled', value: 1 },
  { label: 'Disabled', value: 0 },
]

// Define column configuration
const columns: CommonTableArrayColumns<UserData> = [
  { prop: 'id', label: 'ID', type: 'index' },
  { prop: 'name', label: 'Name' },
  { prop: 'email', label: 'Email' },
  { prop: 'status', label: 'Status', type: 'dict', options: statusOptions },
  { prop: 'createTime', label: 'Create Time', type: 'dateTime' },
]

// Use component
const tableProps: CommonTableProps<UserData> = {
  columns,
  data: []
}
```
