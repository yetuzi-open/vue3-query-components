# CommonForm 表单组件

`CommonForm` 是一个基于配置生成的动态表单组件，适合后台查询表单、编辑表单和快速录入场景。

主要特性：

- 基于配置生成表单结构
- 内置 `input`、`input-number`、`select`、`date-picker`、`time-picker`、`cascader`、`radio`、`check-box`、`switch`
- 支持 Element Plus 表单校验规则
- 支持通过具名插槽自定义表单项内容
- 支持暴露 `FormInstance` 方法和 `formData`

## 基础用法

```vue
<template>
  <CommonForm :form="form" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '用户名',
    prop: 'name',
    formItem: {
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    },
  },
  {
    is: 'select',
    label: '状态',
    prop: 'status',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' },
      ],
    },
  },
]

function handleSubmit(formData: any) {
  console.log(formData)
}
</script>
```

## 表单项配置

每个表单项支持以下基础配置：

| 字段 | 说明 |
| --- | --- |
| `is` | 组件类型，可以是内置字符串或自定义组件 |
| `label` | 表单项标签 |
| `prop` | 表单字段名 |
| `props` | 传递给组件的额外属性 |
| `initialValue` | 字段初始值 |
| `formItem` | 传递给 `ElFormItem` 的额外配置 |

## 内置组件类型

- `input`
- `input-number`
- `select`
- `date-picker`
- `time-picker`
- `cascader`
- `radio`
- `check-box`
- `switch`

## 插槽自定义

可以使用表单项的 `prop` 作为插槽名，自定义渲染内容：

```vue
<CommonForm :form="form">
  <template #status="{ value, updateValue }">
    <el-switch :model-value="value" @update:modelValue="updateValue" />
  </template>
</CommonForm>
```

插槽参数：

| 参数 | 说明 |
| --- | --- |
| `props` | 当前表单项的 `props` 配置 |
| `value` | 当前字段值 |
| `updateValue` | 更新当前字段值的方法 |

## 暴露方法

`CommonForm` 通过 `ref` 暴露所有 Element Plus `FormInstance` 方法，以及额外的 `formData`：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CommonForm, type CommonFormExpose } from '@yetuzi/vue3-query-components'

const formRef = ref<CommonFormExpose>()

const handleValidate = async () => {
  await formRef.value?.validate()
  console.log(formRef.value?.formData)
}
</script>
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `form` | 表单项配置数组 | `CommonFormItemArray<T>` | `[]` |
| `loading` | 提交按钮 loading 状态，支持 `v-model:loading` | `boolean` | `false` |
| `inline` | 是否为行内表单 | `boolean` | `true` |

> 除以上属性外，组件还支持大部分 Element Plus `ElForm` 原生属性。

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