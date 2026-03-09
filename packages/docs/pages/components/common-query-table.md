---
title: CommonQueryTable
---

# CommonQueryTable 查询表格

`CommonQueryTable` 是一个组合型列表组件，将查询表单、表格展示和分页能力整合在一起，适合快速搭建后台列表页面。

主要特性：

- 内置查询表单、表格和分页联动能力
- 通过 `fetch` 统一管理列表请求
- 支持布局插槽和子组件插槽透传
- 支持前缀属性和事件透传到内部组件
- 暴露常用实例方法，便于页面联动控制

## 基础用法

<demo vue="CommonQueryTable/basic.vue" ssg="true" />

## 布局插槽

组件提供以下布局插槽：

- `header`：头部区域
- `form`：查询表单区域
- `toolbar`：工具栏区域
- `table`：表格区域
- `pagination`：分页区域
- `footer`：底部区域

### 仅表格 + 分页

不传 `form` 时，只展示表格和分页。

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true" />

### 工具栏

通过 `toolbar` 插槽添加常用操作按钮。

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true" />

### 底部内容

通过 `footer` 插槽展示额外说明信息。

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true" />

## 分页配置

组件内置分页功能，查询参数中的 `pageNo` 和 `pageSize` 会自动传给 `fetch`。

<demo vue="CommonQueryTable/pagination.vue" ssg="true" />

### 分页透传属性

可以通过 `pagination-*` 前缀向内部分页组件传递属性，例如：

- `pagination-page-size`
- `pagination-layout`
- `pagination-background`

## 插槽透传

可以通过前缀插槽的方式把内容传给内部组件：

- `form-*`：传给 `CommonForm`
- `table-*`：传给 `CommonTable`
- `pagination-*`：传给 `CommonPagination`

例如：

- `form-name`
- `table-status`
- `table-empty`

<demo vue="CommonQueryTable/slot.vue" ssg="true" />

## 属性与事件透传

通过带前缀的属性和事件，可以向内部组件透传额外配置：

- 属性透传：`:form-inline="false"`
- 事件透传：`@table-selection-change="handleSelectionChange"`

<demo vue="CommonQueryTable/attrs.vue" ssg="true" />

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fetch` | 数据获取函数 | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | - |
| `form` | 查询表单配置数组 | `CommonFormItemArray<T>` | `[]` |
| `columns` | 表格列配置 | `CommonTableColumn<T>` | - |

### Slots

#### 布局插槽

| 名称 | 说明 |
| --- | --- |
| `header` | 页面头部区域 |
| `form` | 查询表单区域 |
| `toolbar` | 工具栏区域 |
| `table` | 表格区域 |
| `pagination` | 分页区域 |
| `footer` | 底部区域 |

#### 子组件插槽透传

- `form-*`：透传给内部 `CommonForm`
- `table-*`：透传给内部 `CommonTable`
- `pagination-*`：透传给内部 `CommonPagination`

### Exposes

| 方法 | 说明 |
| --- | --- |
| `refresh` | 使用当前查询条件刷新列表 |
| `reset` | 重置查询条件和分页 |
| `getFormData` | 获取当前表单数据 |
| `getSelectionRows` | 获取当前表格选中行 |

## TypeScript 类型

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