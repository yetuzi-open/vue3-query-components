---
title: CommonQueryTable
---

# CommonQueryTable 查询表格

高度集成的查询页面组件，包含表单查询、表格展示、分页功能。

## 基础用法

基础的查询表格使用示例。

<demo vue="CommonQueryTable/basic.vue" ssg="true" />

## 布局配置

可通过 `layouts` 属性控制页面布局，支持以下布局组件：

`['header', 'form', 'toolbar', 'table', 'pagination', 'footer']`

### 纯表格分页展示

表格带分页功能，适合纯数据的展示。

<demo vue="CommonQueryTable/layouts/table.vue" ssg="true" />

### 操作栏

增加了操作栏目，适合对整个表格数据的操作，如新增、删除等。

<demo vue="CommonQueryTable/layouts/toolbar.vue" ssg="true" />

### 底部展示内容

展示一些额外信息。

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

通过 `pagination-*` 前缀的属性可以自定义分页组件的行为，比如：

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

以下例子中，当你选择表单项时，控制台会有输出。

<demo vue="CommonQueryTable/attrs.vue" ssg="true" />

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fetch | 数据获取函数，接收查询参数并返回包含列表和总数的 Promise | `(params?: ListParam) => Promise<{ list: T[]; total: string \| number }>` | 必填 |
| form | 表单配置数组，定义查询表单的字段和属性 | `CommonFormItemArray<T>` | `[]` |
| columns | 表格列配置，定义表格的列结构和展示方式 | `CommonTableColumn<T>` | 必填 |
| layouts | 页面布局配置，控制页面中各个组件的显示顺序 | `Array<'header' \| 'form' \| 'toolbar' \| 'table' \| 'pagination' \| 'footer'>` | `['form', 'table', 'pagination']` |
| pagination-* | 分页组件属性透传，详见[分页配置](#分页配置)章节 | - | - |

### Slots

#### 布局插槽

CommonQueryTable 支持通过布局插槽向内部组件传递内容：

| 名称 | 说明 | 作用对象 |
| --- | --- | --- |
| header | 头部区域插槽 | 页面头部 |
| form | 表单区域插槽 | 查询表单组件 |
| toolbar | 工具栏插槽 | 表格工具栏 |
| table | 表格区域插槽 | 数据表格组件 |
| pagination | 分页区域插槽 | 分页组件 |
| footer | 底部区域插槽 | 页面底部 |

#### 子组件插槽传递

通过前缀的方式向内部组件传递插槽：

- **`form-*`** - 向内部的 CommonForm 组件传递插槽
- **`table-*`** - 向内部的 CommonTable 组件传递插槽
- **`pagination-*`** - 向内部的 CommonPagination 组件传递插槽

**使用示例：**

- `form-name` - 向表单组件传递 name 插槽
- `table-status` - 向表格组件传递 status 插槽
- `pagination-sizes` - 向分页组件传递 sizes 插槽

### 事件透传

支持通过 `@组件名-事件名` 的方式监听内部组件事件：

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| @table-selection-change | 表格选择变化时触发 | `selection` |
| @form-submit | 表单提交时触发 | `formData` |
| @form-reset | 表单重置时触发 | - |
| @pagination-change | 分页变化时触发 | `{ pageNo, pageSize }` |

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

  /** 页面布局配置 */
  layouts?: Array<CommonQueryTableLayoutsUnite>
}
```

### CommonQueryTableLayoutsUnite

```typescript
/** 布局名联合类型 */
type CommonQueryTableLayoutsUnite =
  | 'header'    // 头部区域
  | 'form'      // 表单区域
  | 'toolbar'   // 工具栏区域
  | 'table'     // 表格区域
  | 'pagination' // 分页区域
  | 'footer'    // 底部区域
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
  CommonQueryTableLayoutsUnite,
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