---
title: CommonTable
---

# CommonTable 表格组件

基于 Element Plus Table 封装的数据表格组件，提供丰富的配置选项和灵活的插槽支持。

## 基础用法

基础的表格使用示例，包含选择列、序号列和操作列。通过 `columns` 配置列信息，`data` 传入表格数据。

<demo vue="CommonTable/basic.vue" ssg="true"/>

## 多选表格

支持多选功能的表格，通过设置 `type: 'selection'` 实现多选列，并通过 `selection-change` 事件获取选中的数据。

<demo vue="CommonTable/selection.vue" ssg="true"/>

## 固定列

当数据列较多时，可以通过 `fixed` 属性固定左侧或右侧的列，确保重要信息始终可见。

<demo vue="CommonTable/fixed.vue" ssg="true"/>

## 自定义插槽

通过插槽可以自定义列的内容展示，支持使用 prop 名称作为插槽名来渲染特定列，或使用 default 插槽来渲染操作列。

<demo vue="CommonTable/slot.vue" ssg="true"/>

## 排序和筛选

支持列排序和筛选功能，通过设置 `sortable` 实现排序，通过 `filters` 和 `filter-method` 实现筛选。

<demo vue="CommonTable/sort-filter.vue" ssg="true"/>

## 列类型

CommonTable 提供了多种内置列类型，通过设置 `type` 属性即可使用：

### 支持的列类型

| 类型 | 说明 | 示例 |
| --- | --- | --- |
| `selection` | 多选列，显示复选框 | `{ type: 'selection' }` |
| `index` | 序号列，自动显示行号 | `{ type: 'index' }` |
| `expand` | 展开列，支持展开额外内容 | `{ type: 'expand' }` |
| `date` | 日期列，自动格式为 YYYY-MM-DD | `{ type: 'date',  }` |
| `dateTime` | 日期时间列，自动格式为 YYYY-MM-DD HH:mm:ss | `{ type: 'dateTime' }` |
| `dict` | 字典列，将值映射为文本 | `{ type: 'dict', options: [...] }` |

<demo vue="CommonTable/column-types.vue" ssg="true"/>

## API

### Props

CommonTable 组件基于 Element Plus Table 进行了二次封装，除了以下自定义属性外，还支持所有 Element Plus Table 的原生属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | `T[]` | `[]` |
| columns | 列配置数组 | `CommonTableColumn[]` | `[]` |

> 💡 **提示**：除了上述自定义属性外，CommonTable 支持所有 Element Plus Table 的原生属性，如 `height`、`border`、`stripe`、`size` 等。详细属性请参考 [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html)。

#### Column 配置

列配置支持以下基本属性：

```typescript
interface CommonTableColumn {
  // 列类型
  type?: 'selection' | 'index' | 'expand' | 'date' | 'dateTime' | 'dict'

  // 基本属性
  prop?: string              // 列字段名
  label?: string             // 列标题
  width?: string | number    // 列宽度
  fixed?: boolean | 'left' | 'right'  // 固定列

  // dict 类型专属
  options?: Array<{ label: string; value: any }>  // 字典选项
  dictName?: string  // 字典名称（用于从全局字典服务获取）
}
```

#### Type 类型说明

| 值 | 说明 | 特点 |
| --- | --- | --- |
| `selection` | 多选列 | 显示复选框，支持多选功能 |
| `index` | 序号列 | 自动显示行号，从 1 开始 |
| `expand` | 展开列 | 支持展开/折叠行内容 |
| `date` | 日期列 | 自动格式化日期戳为 YYYY-MM-DD |
| `dateTime` | 日期时间列 | 自动格式化时间戳为 YYYY-MM-DD HH:mm:ss |
| `dict` | 字典列 | 将数值映射为对应的文本标签 |

> 💡 **提示**：CommonTable 的 Column 继承自 Element Plus 的 TableColumnCtx，支持所有原生属性。详细配置请参考 [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html#table-column-attributes)。

### Exposes

CommonTable 通过 ref 暴露了所有 Element Plus Table 的方法，可以直接调用。 

完整的方法列表请参考 [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table#table-exposes)。

<demo vue="CommonTable/expose.vue" ssg="true"/>

### Slots

CommonTable 支持自定义列内容的插槽：

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 默认操作列插槽 | `{ row, column, index }` |
| [prop] | 自定义列内容，插槽名为列的 prop 属性 | `{ row, column, index }` |

<demo vue="CommonTable/slots-api.vue" ssg="true"/>

> 💡 **提示**：CommonTable 还支持 Element Plus Table 的所有插槽，如 `empty`、`append`、`header` 等。详情请参考 [Element Plus Table 文档](https://element-plus.org/zh-CN/component/table.html#table-slots)。

## TypeScript 类型

组件导出了以下 TypeScript 类型定义，可在你的项目中直接使用：

### CommonTableProps

```typescript
interface CommonTableProps<T extends AnyObject = AnyObject> {
  /** 表格列配置 */
  columns: CommonTableColumn<T>

  /** 表格数据 */
  data: T[]
}
```

### CommonTableColumn

```typescript
/**
 * 表格列配置类型
 * @typeParam T - 表格数据行类型
 */
type CommonTableColumn<T extends AnyObject> =
  | CommonTableArrayColumns<T>
  | CommonTableObjectColumns<T>
```

### CommonTableArrayColumns

```typescript
/**
 * 表格列类型数组
 * 用于 CommonTable 的 columns 属性，也可用于类型标注
 */
type CommonTableArrayColumns<T extends AnyObject> = Array<CommonTableColumnRoot<T>>
```

### CommonTableColumnRoot

```typescript
/**
 * 表格列定义根类型，包含所有列类型的联合类型
 */
type CommonTableColumnRoot<T extends AnyObject> =
  | TableColumnBase<T>           // 普通列
  | TableColumnTypeIndex<T>      // 索引列
  | TableColumnTypeSelection<T>  // 选择列
  | TableColumnTypeExpand<T>     // 展开列
  | TableColumnTypeDate<T>       // 日期列
  | TableColumnTypeDateTime<T>   // 日期时间列
  | TableColumnTypeDict<T>       // 字典列
```

### 特殊列类型

```typescript
/** 索引列类型 */
interface TableColumnTypeIndex<T extends AnyObject> {
  type: 'index'
}

/** 选择列类型 */
interface TableColumnTypeSelection<T extends AnyObject> {
  type: 'selection'
  selectable?: (row: T, index: number) => boolean
  'reserve-selection'?: boolean
}

/** 展开列类型 */
interface TableColumnTypeExpand<T extends AnyObject> {
  type: 'expand'
}

/** 日期列类型 */
interface TableColumnTypeDate<T extends AnyObject> {
  type: 'date'
}

/** 日期时间列类型 */
interface TableColumnTypeDateTime<T extends AnyObject> {
  type: 'dateTime'
}

/** 字典列类型 */
interface TableColumnTypeDict<T extends AnyObject> {
  type: 'dict'
  /** 字典选项列表 */
  options?: Array<{ label: string; value: any }>
  /** 字典名称，用于从全局字典服务获取选项 */
  dictName?: string
}
```

### CommonTableInstance

```typescript
/**
 * CommonTable 组件实例暴露类型
 */
interface CommonTableInstance {
  /** ElTable 组件实例引用 */
  elTableRef: Ref<TableInstance | undefined>
}
```

**使用示例：**

```typescript
import type {
  CommonTableProps,
  CommonTableArrayColumns,
  TableColumnType,
} from '@yetuzi/vue3-query-components'

// 定义数据行类型
interface UserData {
  id: number
  name: string
  email: string
  status: number
  createTime: number
}

// 定义字典选项
const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]

// 定义列配置
const columns: CommonTableArrayColumns<UserData> = [
  { prop: 'id', label: 'ID', type: 'index' },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'status', label: '状态', type: 'dict', options: statusOptions },
  { prop: 'createTime', label: '创建时间', type: 'dateTime' },
]

// 使用组件
const tableProps: CommonTableProps<UserData> = {
  columns,
  data: []
}
```

### 注册自定义列类型

如果你需要自定义列类型，可以使用 `registerColumnTypeConfig` 函数：

```typescript
import { registerColumnTypeConfig } from '@yetuzi/vue3-query-components'

// 注册自定义货币列类型
registerColumnTypeConfig('currency', (originalColumn) => ({
  width: '120px',
  formatter: (row, column, cellValue) => `¥${cellValue.toFixed(2)}`
}))

// 使用自定义列类型
const columns = [
  {
    prop: 'price',
    label: '价格',
    type: 'currency'  // 使用自定义类型
  }
]
```