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
  type?: 'selection' | 'index' | 'expand' | 'date' | 'dateTime'

  // 基本属性
  prop?: string              // 列字段名
  label?: string             // 列标题
  width?: string | number    // 列宽度
  fixed?: boolean | 'left' | 'right'  // 固定列
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