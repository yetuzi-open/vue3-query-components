---
title: CommonForm
---

# CommonForm 表单组件

`CommonForm` 是一个基于配置生成的动态表单组件，适合查询、编辑和录入场景。

主要特性：

- 通过配置快速生成表单结构
- 内置常用表单组件类型
- 支持 Element Plus 表单校验
- 支持具名插槽自定义表单项
- 通过 `ref` 暴露 `FormInstance` 方法和 `formData`

## 基础用法

<demo vue="CommonForm/basic.vue" ssg="true"/>

## 表单校验

支持直接在表单项配置中使用 Element Plus 规则。

<demo vue="CommonForm/validation.vue" ssg="true"/>

## 布局方式

### 行内表单

适合查询栏场景。

<demo vue="CommonForm/inline.vue" ssg="true"/>

### 标签位置

支持 `left`、`right`、`top` 三种标签位置。

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## 自定义插槽

可以使用表单项的 `prop` 作为插槽名，自定义表单项内容。

<demo vue="CommonForm/slot.vue" ssg="true"/>

## 动态表单

可以根据已有字段值动态生成和切换表单项。

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## 自定义组件集成

可以通过 `is` 传入任意 Vue 组件，或通过插槽集成自定义控件。

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## 暴露方法

通过 `ref` 可以调用 `FormInstance` 方法，并读取 `formData`。

<demo vue="CommonForm/expose.vue" ssg="true"/>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `form` | 表单配置数组 | `CommonFormItemArray<T>` | `[]` |
| `loading` | 提交按钮 loading 状态，支持 `v-model:loading` | `boolean` | `false` |
| `inline` | 是否为行内表单 | `boolean` | `true` |

> 除以上属性外，组件还支持大部分 Element Plus `ElForm` 原生属性，例如 `label-width`、`label-position`、`size`、`disabled` 等。

### 表单项配置

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `is` | 组件类型，支持内置字符串或自定义组件 | `string \| Component` |
| `label` | 表单项标签 | `string` |
| `prop` | 表单字段名 | `string \| keyof T` |
| `props` | 传递给组件的属性 | `object` |
| `initialValue` | 初始值 | `any` |
| `formItem` | 传递给 `ElFormItem` 的额外配置 | `Partial<FormItemProps>` |

### 内置组件类型

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

插槽名与表单项 `prop` 一致。

| 参数名 | 说明 |
| --- | --- |
| `props` | 当前表单项的 `props` 配置 |
| `value` | 当前字段值 |
| `updateValue` | 更新字段值的方法 |

### Exposes

`CommonForm` 暴露所有 `FormInstance` 方法，并额外暴露：

| 名称 | 说明 |
| --- | --- |
| `formData` | 当前表单响应式数据对象 |

## TypeScript 类型

```ts
interface CommonFormProps<T> {
  form?: CommonFormItemArray<T>
}

type CommonFormItemArray<T> = Array<
  | CommonFormSelectItem<T>
  | CommonFormInputItem<T>
  | CommonFormInputNumberItem<T>
  | CommonFormDatePickerItem<T>
  | CommonFormTimePickerItem<T>
  | CommonFormCascaderItem<T>
  | CommonFormRadioItem<T>
  | CommonFormCustomItem<T>
  | CommonFormCheckboxItem<T>
  | CommonFormSwitchItem<T>
>

interface CommonFormExpose<T> extends FormInstance {
  formData: Reactive<CommonFormData<T>>
}
```