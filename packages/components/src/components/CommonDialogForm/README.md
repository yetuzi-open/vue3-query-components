# CommonDialogForm 弹窗表单组件

`CommonDialogForm` 将 `CommonDialog` 和 `CommonForm` 组合为一个组件，适合新增、编辑、审批这类需要在弹窗中完成表单录入的场景。

## 基础用法

```vue
<template>
  <CommonDialogForm
    v-model="visible"
    title="新增成员"
    width="560px"
    :form="form"
    :form-data="detail"
    :form-props="{ labelWidth: '88px' }"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CommonDialogForm } from '@yetuzi/vue3-query-components'

const visible = ref(false)
const detail = ref({
  name: '张敏',
})

const form = [
  {
    is: 'input',
    label: '姓名',
    prop: 'name',
    initialValue: '',
    formItem: {
      required: true,
    },
  },
]

function handleSubmit(formData: any) {
  console.log(formData)
}
</script>
```

## 主要能力

- 透传大部分 `CommonDialog` 属性，例如 `title`、`width`、`destroy-on-close`
- 通过 `form` + `formData` + `formProps` 复用 `CommonForm` 的配置驱动能力
- 默认将提交、重置、取消按钮放在弹窗底部
- 通过 `ref` 同时访问弹窗控制方法和表单校验方法
