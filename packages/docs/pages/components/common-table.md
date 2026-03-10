---
title: CommonTable
---

# CommonTable 表格组件

`CommonTable` 是基于 Element Plus `ElTable` 的轻量封装，统一了列配置写法，并保留了大部分原生表格能力，适合业务表格的快速搭建。

主要特性：

- 支持数组和对象两种列配置写法
- 内置 `selection`、`index`、`expand`、`date`、`dateTime`、`dict` 列类型
- 支持按列名快速定义具名插槽
- 数据变化时自动滚动到表格顶部
- 支持通过 `ref` 访问内部 `ElTable` 实例方法

## 基础用法

<demo vue="CommonTable/basic.vue" ssg="true"/>

## 多选表格

<demo vue="CommonTable/selection.vue" ssg="true"/>

## 固定列

<demo vue="CommonTable/fixed.vue" ssg="true"/>

## 自定义插槽

常见列渲染可以通过列名插槽快速定制：

- 普通列默认使用 `prop` 作为插槽名
- 展开列使用 `expand` 作为插槽名

<demo vue="CommonTable/slot.vue" ssg="true"/>

## 排序与筛选

组件会透传 `ElTable` 的排序和筛选能力，可以直接使用 `sortable`、`filters`、`filter-method` 等配置。

<demo vue="CommonTable/sort-filter.vue" ssg="true"/>

## 内置列类型

| 类型 | 说明 | 示例 |
| --- | --- | --- |
| `selection` | 多选列 | `{ type: 'selection' }` |
| `index` | 序号列 | `{ type: 'index' }` |
| `expand` | 展开列 | `{ type: 'expand' }` |
| `date` | 日期列，格式化为 `YYYY-MM-DD` | `{ prop: 'createDate', type: 'date' }` |
| `dateTime` | 日期时间列，格式化为 `YYYY-MM-DD HH:mm:ss` | `{ prop: 'createTime', type: 'dateTime' }` |
| `dict` | 字典列，按 `options` 映射显示文本 | `{ prop: 'status', type: 'dict', options: [...] }` |

<demo vue="CommonTable/column-types.vue" ssg="true"/>

## 暴露方法

通过 `ref` 可以直接调用内部表格实例方法。

<demo vue="CommonTable/expose.vue" ssg="true"/>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 表格数据 | `T[]` | `[]` |
| `columns` | 列配置，支持数组或对象形式 | `CommonTableColumn<T>` | - |

> 组件还支持大部分 Element Plus `ElTable` 原生属性，例如 `height`、`max-height`、`border`、`stripe`、`row-key`、`default-sort` 等。

### 列配置

```ts
type CommonTableColumn<T> =
  | CommonTableArrayColumns<T>
  | Record<string, CommonTableColumnRoot<T>>
```

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| 列名插槽 | 使用列的 `prop` 作为插槽名，例如 `#name`、`#status` | `{ row, column, index, value }` |
| `expand` | 展开列插槽 | `{ row, column, index, value }` |
| `empty` | 自定义空状态 | - |

### Exposes

| 方法 | 说明 |
| --- | --- |
| `clearSelection` | 清空多选结果 |
| `toggleRowSelection` | 切换指定行的选中状态 |
| `toggleAllSelection` | 切换全选状态 |
| `toggleRowExpansion` | 切换行展开状态 |
| `setCurrentRow` | 设置当前行 |
| `clearSort` | 清空排序 |
| `clearFilter` | 清空筛选 |
| `doLayout` | 重新布局表格 |
| `sort` | 手动排序 |
| `scrollTo` | 滚动到指定位置 |
| `setScrollTop` | 设置垂直滚动位置 |
| `setScrollLeft` | 设置水平滚动位置 |

## TypeScript 类型

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

## 参考

- [Element Plus Table](https://element-plus.org/zh-CN/component/table.html)
- [Element Plus TableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-attributes)
