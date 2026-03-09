---
title: CommonForm
---

# CommonForm 表单组件

`CommonForm` 是一个基于配置生成的动态表单组件，适合查询、录入、编辑和审批等场景。你只需要维护字段配置，就可以快速生成统一风格的表单。

主要特性：

- 通过配置驱动表单结构生成
- 内置常见字段类型，覆盖大多数业务表单需求
- 支持 Element Plus 校验规则
- 支持具名插槽自定义字段渲染
- 通过 `ref` 暴露 `FormInstance` 方法和 `formData`

## 基础用法

<demo vue="CommonForm/basic.vue" ssg="true"/>

## 表单校验

支持在字段配置中直接声明规则，适合登录、注册、编辑等需要完整校验的场景。

<demo vue="CommonForm/validation.vue" ssg="true"/>

## 布局方式

### 行内表单

适合查询栏、筛选器等字段较少的场景。

<demo vue="CommonForm/inline.vue" ssg="true"/>

### 标签位置

支持 `left`、`right`、`top` 三种标签位置。

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## 自定义插槽

使用字段 `prop` 作为插槽名，按需覆盖单个字段的渲染方式。

<demo vue="CommonForm/slot.vue" ssg="true"/>

## 动态表单

可以根据当前字段值动态追加或移除表单项。

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## 自定义组件

除了内置类型，也可以直接传入任意 Vue 组件作为表单控件。

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## 暴露方法

通过 `ref` 可以访问内部 `FormInstance` 方法，并读取当前表单数据。

<demo vue="CommonForm/expose.vue" ssg="true"/>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `form` | 表单项配置数组 | `CommonFormItemArray<T>` | `[]` |
| `loading` | 提交按钮 loading 状态，支持 `v-model:loading` | `boolean` | `false` |
| `inline` | 是否使用行内表单布局 | `boolean` | `true` |

> 除以上字段外，组件还支持大部分 Element Plus `ElForm` 原生属性，例如 `label-width`、`label-position`、`size`、`disabled` 等。

### 表单项配置

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `is` | 字段组件类型，支持内置标识或自定义组件 | `string \| Component` |
| `label` | 字段标签 | `string` |
| `prop` | 字段名 | `string \| keyof T` |
| `props` | 透传给字段组件的属性 | `object` |
| `initialValue` | 字段初始值 | `any` |
| `formItem` | 透传给 `ElFormItem` 的额外配置 | `Partial<FormItemProps>` |

### 内置字段类型

- `input`
- `input-number`
- `select`
- `date-picker`
- `time-picker`
- `cascader`
- `radio`
- `check-box`
- `switch`

### Slots

插槽名与字段 `prop` 一致。

| 参数 | 说明 |
| --- | --- |
| `props` | 当前字段的 `props` 配置 |
| `value` | 当前字段值 |
| `updateValue` | 更新字段值的方法 |

### Exposes

| 名称 | 说明 |
| --- | --- |
| `formData` | 当前响应式表单数据 |
| `validate` | 校验整个表单 |
| `validateField` | 校验指定字段 |
| `resetFields` | 重置表单 |
| `clearValidate` | 清除校验结果 |
| `scrollToField` | 滚动到指定字段 |

## TypeScript 类型

```ts
import type {
  CommonFormProps,
  CommonFormItemArray,
  CommonFormExpose,
} from '@yetuzi/vue3-query-components'
```

```ts
interface CommonFormProps<T> {
  form?: CommonFormItemArray<T>
}

interface CommonFormExpose<T> extends FormInstance {
  formData: Reactive<CommonFormData<T>>
}
```

## 参考

- [Element Plus Form](https://element-plus.org/zh-CN/component/form.html)
