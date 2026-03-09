---
title: CommonQueryTable
---

# CommonQueryTable 查询表格

`CommonQueryTable` 是一个组合型列表组件，把查询表单、数据表格和分页统一收敛到一个组件里，适合中后台列表页快速落地。

主要特性：

- 内置查询表单、表格和分页联动逻辑
- 通过 `fetch` 统一管理列表请求
- 支持布局插槽和子组件插槽透传
- 支持前缀属性 / 事件透传给内部组件
- 通过 `ref` 暴露常用列表操作方法

## 基础用法

<demo vue="CommonQueryTable/basic.vue" ssg="true" />

## 布局插槽

组件提供以下布局区域：

- `header`：头部区域
- `form`：查询表单区域
- `toolbar`：工具栏区域
- `table`：表格区域
- `pagination`：分页区域
- `footer`：底部区域

### 仅保留表格 + 分页

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true" />

### 工具栏

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true" />

### 页脚补充信息

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true" />

## 分页配置

组件内部会自动把 `pageNo` 和 `pageSize` 传入 `fetch`。

<demo vue="CommonQueryTable/pagination.vue" ssg="true" />

### 分页透传属性

可以通过 `pagination-*` 前缀把属性传给内部 `CommonPagination`，例如：

- `pagination-page-sizes`
- `pagination-layout`
- `pagination-background`

## 插槽透传

可以通过带前缀的插槽把内容传给内部子组件：

- `form-*`：透传给 `CommonForm`
- `table-*`：透传给 `CommonTable`
- `pagination-*`：透传给 `CommonPagination`

例如：

- `table-status`
- `table-empty`
- `pagination-default`

<demo vue="CommonQueryTable/slot.vue" ssg="true" />

## 属性与事件透传

通过带前缀的属性和事件，可以精细控制内部组件行为：

- 属性透传：`:form-inline="false"`
- 事件透传：`@table-selection-change="handleSelectionChange"`

<demo vue="CommonQueryTable/attrs.vue" ssg="true" />

## API

### Props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `fetch` | 列表请求函数 | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` |
| `form` | 查询表单配置数组 | `CommonFormItemArray<T>` |
| `columns` | 表格列配置 | `CommonTableColumn<T>` |

### Slots

#### 布局插槽

| 名称 | 说明 |
| --- | --- |
| `header` | 页面头部区域 |
| `form` | 查询表单区域 |
| `toolbar` | 工具栏区域 |
| `table` | 表格区域 |
| `pagination` | 分页区域 |
| `footer` | 页面底部区域 |

#### 子组件透传插槽

- `form-*`：透传给内部 `CommonForm`
- `table-*`：透传给内部 `CommonTable`
- `pagination-*`：透传给内部 `CommonPagination`

### Exposes

| 方法 | 说明 |
| --- | --- |
| `refresh` | 使用当前条件刷新列表 |
| `reset` | 重置查询条件和分页并重新获取列表 |
| `getFormData` | 获取当前表单数据 |
| `getSelectionRows` | 获取当前选中行 |

## TypeScript 类型

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
