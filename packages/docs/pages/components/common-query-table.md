---
title: CommonQueryTable
---

# CommonQueryTable 查询表格

高度集成的查询页面组件，包含表单查询、表格展示、分页功能。

## 基础用法

基础的查询表格使用示例。

<demo vue="CommonQueryTable/basic.vue" ssg="true" />

## 插槽布局

组件提供了 6 个布局插槽，通过插槽内容来控制页面布局：

- `header` - 头部区域
- `form` - 表单查询区域
- `toolbar` - 工具栏区域
- `table` - 表格区域（默认显示）
- `pagination` - 分页区域
- `footer` - 底部区域

::: tip 插槽显示规则
- `header`、`toolbar`、`footer`：只在提供插槽内容时显示
- `form`：在提供插槽内容或有表单配置时显示
- `table`：默认始终显示
- `pagination`：在提供插槽内容或有数据（total > 0）时显示
:::

### 纯表格分页展示

不传 `form` 属性，只显示表格和分页。

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true" />

### 操作栏

通过 `toolbar` 插槽添加操作按钮。

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true" />

### 底部展示内容

通过 `footer` 插槽展示额外信息。

<demo vue="CommonQueryTable/layouts/footer.vue" ssg="true" />

## 分页配置

CommonQueryTable 内置了完整的分页功能，支持自定义分页参数和样式。

::: tip 分页说明
- 可通过 `CommonConfigProvider` 组件设置全局默认的页码和每页条数
- 当接口返回的 `total` 大于每页显示条数时，将自动显示分页组件
- 分页参数 `pageNo` 和 `pageSize` 会自动传递给 `fetch` 函数
:::

<demo vue="CommonQueryTable/pagination.vue" ssg="true" />

### 分页属性

通过 `pagination-*` 前缀的属性可以自定义分页组件的行为，比如 ：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `pagination-page-size` | 每页显示条数选项数组 | `number[]` | `[10, 20, 50, 100]` |
| `pagination-default-page-size` | 默认每页显示条数 | `number` | `10` |
| `pagination-layout` | 分页组件布局 | `string` | `'total, sizes, prev, pager, next, jumper'` |
| `pagination-background` | 是否显示背景色 | `boolean` | `true` |
| `pagination-page-count` | 总页数（通常由 total 自动计算） | `number` | - |

### 分页事件

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| `@pagination-change` | 分页变化时触发 | `{ pageNo: number, pageSize: number }` |

## 插槽透传

在实际使用过程中，可能需要对 `CommonQueryTable` 下的 `form` 或 `table` 组件使用插槽功能。

::: tip 插槽命名规则
通过 `组件名-插槽名` 的方式向内部组件传递插槽：

- `form-name` - 向表单组件传递 name 插槽
- `table-status` - 向表格组件传递 status 插槽
- `table-empty` - 向表格组件传递空状态插槽（对应 Element Plus el-table 的 #empty）

:::

<demo vue="CommonQueryTable/slot.vue" ssg="true" />

## 属性透传

虽然组件提供了一些默认属性，但无法满足所有需求。支持通过属性透传的方式向内部组件传递额外的属性和事件。

::: tip 透传规则
- **属性透传**：通过 `组件名-属性名` 的方式向内部组件传递属性
- **事件透传**：通过 `@组件名-事件名` 的方式监听内部组件事件

:::

### 属性透传示例

向内部组件传递额外属性，例如设置表单为非行内模式：

```vue
<CommonQueryTable
  :form-inline="false"
  ...
/>
```

### 事件透传示例

监听内部组件的事件，例如监听表格选择变化：

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

以下完整示例展示了属性透传和事件透传的实际使用：

<demo vue="CommonQueryTable/attrs.vue" ssg="true" />

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fetch | 数据获取函数，接收查询参数并返回包含列表和总数的 Promise | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | 必填 |
| form | 表单配置数组，定义查询表单的字段和属性 | `CommonFormItemArray<T>` | `[]` |
| columns | 表格列配置，定义表格的列结构和展示方式 | `CommonTableColumn<T>` | 必填 |
| pagination-* | 分页组件属性透传，详见[分页配置](#分页配置)章节 | - | - |

### Slots

#### 布局插槽

| 名称 | 说明 | 显示条件 |
| --- | --- | --- |
| header | 头部区域插槽 | 插槽有内容时显示 |
| form | 表单区域插槽 | 插槽有内容或有表单配置时显示 |
| toolbar | 工具栏插槽 | 插槽有内容时显示 |
| table | 表格区域插槽 | 默认始终显示 |
| pagination | 分页区域插槽 | 插槽有内容或有数据（total > 0）时显示 |
| footer | 底部区域插槽 | 插槽有内容时显示 |

#### 子组件插槽传递

通过前缀的方式向内部组件传递插槽：

- **`form-*`** - 向内部的 CommonForm 组件传递插槽
- **`table-*`** - 向内部的 CommonTable 组件传递插槽
- **`pagination-*`** - 向内部的 CommonPagination 组件传递插槽

**使用示例：**

- `form-name` - 向表单组件传递 name 插槽
- `table-status` - 向表格组件传递 status 插槽
- `pagination-sizes` - 向分页组件传递 sizes 插槽

### Exposes

组件暴露了以下方法，可以通过 ref 调用：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| refresh | 刷新列表数据 | - | `void` |
| reset | 重置查询条件和分页 | - | `void` |
| getFormData | 获取当前表单数据 | - | `Partial<T>` |
| getSelectionRows | 获取表格选中的行数据 | - | `T[]` |

## TypeScript 类型

组件导出了以下 TypeScript 类型定义，可在你的项目中直接使用：

### CommonQueryTableProps

```typescript
interface CommonQueryTableProps<T extends AnyObject = AnyObject> {
  /** 数据获取函数 */
  fetch: (params?: ListParam) => Promise<{ list: T[]; total: string | number }>

  /** 表单配置数组 */
  form?: CommonFormItemArray<T>

  /** 表格列配置 */
  columns: CommonTableColumn<T>
}
```

### CommonQueryTableExpose

组件实例的类型定义，用于 ref 的类型标注：

```typescript
interface CommonQueryTableExpose<T = AnyObject> {
  /** 刷新列表数据 */
  refresh: () => void

  /** 重置查询条件和分页 */
  reset: () => void

  /** 获取表单数据 */
  getFormData: () => Partial<T>

  /** 获取表格选中的行数据 */
  getSelectionRows: () => T[]
}
```

### ListParam

```typescript
/**
 * 列表请求参数类型
 * @typeParam T - 额外的查询参数类型
 */
type ListParam<T extends AnyObject = AnyObject> = PaginationParam & T

/**
 * 分页请求参数
 */
type PaginationParam = {
  pageNo: number
  pageSize: number
}
```

**使用示例：**

```typescript
import type {
  CommonQueryTableProps,
  ListParam,
} from '@yetuzi/vue3-query-components'

// 定义查询参数类型
interface MyQueryParams {
  name: string
  status: number
}

// 定义数据行类型
interface UserData {
  id: number
  name: string
  email: string
}

// 使用类型
const fetch = (params: ListParam<MyQueryParams>) => {
  // params 包含: pageNo, pageSize, name, status
  return Promise.resolve({
    list: [] as UserData[],
    total: 0
  })
}
```