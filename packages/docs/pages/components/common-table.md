---
title: CommonTable
---

# CommonTable 表格组件

`CommonTable` 是基于 Element Plus `ElTable` 的二次封装组件，提供更统一的列配置方式，并保留原生表格的大部分能力。

主要特性：

- 支持数组和对象两种列配置形式
- 内置 `selection`、`index`、`expand`、`date`、`dateTime`、`dict` 列类型
- 支持按列名快速定义具名插槽
- 数据变化时自动滚动到表格顶部
- 支持通过 `ref` 直接调用 `ElTable` 实例方法
- 透传大部分 `ElTable` 属性、事件和列配置

## 基础用法

基础表格使用示例，包含多选列、序号列、日期时间列和操作列。

<demo vue="CommonTable/basic.vue" ssg="true"/>

## 多选表格

通过设置列类型为 `selection`，可以快速启用多选能力，并通过 `selection-change` 获取选中结果。

<demo vue="CommonTable/selection.vue" ssg="true"/>

## 固定列

当表格列较多时，可以通过 `fixed` 固定左侧或右侧关键列。

<demo vue="CommonTable/fixed.vue" ssg="true"/>

## 自定义插槽

`CommonTable` 支持按列名定义具名插槽：

- 普通列默认使用 `prop` 作为插槽名
- 展开列可直接使用 `expand` 作为插槽名

<demo vue="CommonTable/slot.vue" ssg="true"/>

## 排序与筛选

组件透传 `ElTable` 的排序和筛选能力，可直接使用 `sortable`、`filters`、`filter-method` 等配置。

<demo vue="CommonTable/sort-filter.vue" ssg="true"/>

## 内置列类型

`CommonTable` 内置了几种常用列类型，用于减少重复配置。

| 类型 | 说明 | 示例 |
| --- | --- | --- |
| `selection` | 多选列，显示复选框 | `{ type: 'selection' }` |
| `index` | 序号列，自动显示行号 | `{ type: 'index' }` |
| `expand` | 展开列，支持渲染展开内容 | `{ type: 'expand' }` |
| `date` | 日期列，自动格式化为 `YYYY-MM-DD` | `{ prop: 'createDate', type: 'date' }` |
| `dateTime` | 日期时间列，自动格式化为 `YYYY-MM-DD HH:mm:ss` | `{ prop: 'createTime', type: 'dateTime' }` |
| `dict` | 字典列，根据 `options` 映射展示文本 | `{ prop: 'status', type: 'dict', options: [...] }` |

<demo vue="CommonTable/column-types.vue" ssg="true"/>

## 暴露方法

通过 `ref` 可直接访问 `ElTable` 的常用实例方法，例如清空选中、切换排序、滚动到指定位置等。

<demo vue="CommonTable/expose.vue" ssg="true"/>

## API

### Props

除以下自定义属性外，`CommonTable` 还支持大部分 Element Plus `ElTable` 原生属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 表格数据 | `T[]` | `[]` |
| `columns` | 列配置，支持数组和对象两种形式 | `CommonTableColumn<T>` | - |

> 提示：常见透传属性包括 `height`、`max-height`、`border`、`stripe`、`row-key`、`default-sort` 等。

### 列配置

列配置继承自 Element Plus 的 `TableColumnCtx`，并扩展了内置列类型能力。

```ts
interface CommonTableColumn<T> extends Partial<TableColumnCtx<T>> {
  prop?: keyof T | string
  type?: 'default' | 'selection' | 'index' | 'expand' | 'date' | 'dateTime' | 'dict'
  options?: Array<{ label: string; value: any }>
  dictName?: string
}
```

### Exposes

`CommonTable` 通过 `ref` 暴露 `ElTable` 的实例方法，常见方法如下：

| 方法名 | 说明 |
| --- | --- |
| `clearSelection` | 清空多选表格的选中项 |
| `toggleRowSelection` | 切换某一行的选中状态 |
| `toggleAllSelection` | 切换全选状态 |
| `toggleRowExpansion` | 切换某一行的展开状态 |
| `setCurrentRow` | 设置当前行 |
| `clearSort` | 清空排序条件 |
| `clearFilter` | 清空筛选条件 |
| `doLayout` | 重新布局表格 |
| `sort` | 手动排序 |
| `scrollTo` | 滚动到指定位置 |
| `setScrollTop` | 设置垂直滚动位置 |
| `setScrollLeft` | 设置水平滚动位置 |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| 列名插槽 | 使用列的 `prop` 作为插槽名，例如 `#name`、`#status` | `{ row, column, index, value }` |
| `expand` | 展开列插槽 | `{ row, column, index, value }` |
| `empty` | 自定义空状态内容 | - |

## TypeScript 类型

组件导出了以下常用类型，可直接在业务代码中使用：

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

## 参考

- [Element Plus Table](https://element-plus.org/zh-CN/component/table.html)
- [Element Plus TableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-attributes)