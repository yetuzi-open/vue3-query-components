# CommonForm 表单

常用的表单组件，基于 Element Plus Form 封装，支持动态渲染表单项和表单验证。

## 基础用法

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" @submit="handleSubmit" @reset="handleReset" />
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({})

const formConfig = ref([
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    required: true,
  },
  {
    type: 'select',
    prop: 'city',
    label: '城市',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
    ],
  },
])

const handleSubmit = (data) => {
  console.log('提交数据:', data)
}

const handleReset = () => {
  console.log('重置表单')
}
</script>
```

## 表单项类型

支持多种表单项类型：输入框、选择器、日期选择器等。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" />
</template>

<script setup>
const formData = ref({})

const formConfig = ref([
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    placeholder: '请输入姓名',
  },
  {
    type: 'select',
    prop: 'gender',
    label: '性别',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
  },
  {
    type: 'date',
    prop: 'birthday',
    label: '生日',
  },
  {
    type: 'radio',
    prop: 'status',
    label: '状态',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'inactive' },
    ],
  },
  {
    type: 'switch',
    prop: 'enabled',
    label: '是否启用',
  },
])
</script>
```

## 表单验证

通过 `rules` 属性设置表单验证规则。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" :rules="rules" />
</template>

<script setup>
const formData = ref({})

const formConfig = ref([
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    required: true,
  },
  {
    type: 'input',
    prop: 'email',
    label: '邮箱',
    required: true,
  },
])

const rules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
})
</script>
```

## 自定义表单项

使用插槽自定义表单项内容。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData">
    <template #customField="{ item, modelValue }">
      <el-rate v-model="modelValue[item.prop]" />
    </template>
  </CommonForm>
</template>

<script setup>
const formData = ref({})

const formConfig = ref([
  {
    type: 'custom',
    prop: 'rating',
    label: '评分',
  },
])
</script>
```

## 行内表单

设置 `inline` 属性可以让表单域变为行内的表单域。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" inline />
</template>
```

## 表单尺寸

通过 `size` 属性设置表单尺寸。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" size="large" />
</template>
```

## 禁用表单

通过 `disabled` 属性设置整个表单禁用。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" disabled />
</template>
```

## 隐藏操作按钮

通过设置 `showFooter` 为 `false` 隐藏默认的操作按钮。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData" :show-footer="false" />
  <el-button type="primary" @click="submitForm">提交</el-button>
  <el-button @click="resetForm">重置</el-button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const submitForm = () => {
  formRef.value?.handleSubmit()
}

const resetForm = () => {
  formRef.value?.handleReset()
}
</script>
```

## 自定义操作按钮

使用插槽自定义操作按钮。

```vue
<template>
  <CommonForm :form="formConfig" v-model="formData">
    <template #footer="{ handleSubmit, handleReset }">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="handleReset">清空</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </CommonForm>
</template>

<script setup>
const cancel = () => {
  console.log('取消操作')
}
</script>
```

## 动态表单

根据条件动态显示或隐藏表单项。

```vue
<template>
  <CommonForm :form="dynamicForm" v-model="formData" />
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({})
const showAdvanced = ref(false)

const baseForm = ref([
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
  },
  {
    type: 'switch',
    prop: 'showAdvanced',
    label: '显示高级选项',
  },
])

const advancedForm = ref([
  {
    type: 'input',
    prop: 'address',
    label: '地址',
  },
  {
    type: 'select',
    prop: 'type',
    label: '类型',
    options: [
      { label: '类型1', value: 'type1' },
      { label: '类型2', value: 'type2' },
    ],
  },
])

const dynamicForm = computed(() => {
  if (formData.value.showAdvanced) {
    return [...baseForm.value, ...advancedForm.value]
  }
  return baseForm.value
})
</script>
```

## 完整功能示例

```vue
<template>
  <CommonForm
    ref="formRef"
    :form="formConfig"
    v-model="formData"
    :rules="rules"
    label-width="100px"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  email: '',
  gender: '',
  birthday: '',
  status: 'active',
  enabled: true,
  description: '',
})

const formConfig = ref([
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    placeholder: '请输入姓名',
    required: true,
  },
  {
    type: 'input',
    prop: 'email',
    label: '邮箱',
    placeholder: '请输入邮箱',
    required: true,
  },
  {
    type: 'select',
    prop: 'gender',
    label: '性别',
    placeholder: '请选择性别',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
    required: true,
  },
  {
    type: 'date',
    prop: 'birthday',
    label: '生日',
    placeholder: '请选择生日',
  },
  {
    type: 'radio',
    prop: 'status',
    label: '状态',
    options: [
      { label: '启用', value: 'active' },
      { label: '禁用', value: 'inactive' },
    ],
  },
  {
    type: 'switch',
    prop: 'enabled',
    label: '是否启用',
  },
  {
    type: 'input',
    prop: 'description',
    label: '描述',
    type: 'textarea',
    placeholder: '请输入描述信息',
  },
])

const rules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
})

const handleSubmit = (data) => {
  console.log('表单提交:', data)
  // 处理提交逻辑
}

const handleReset = () => {
  console.log('表单重置')
  // 处理重置逻辑
}
</script>
```

## 属性

| 属性名                  | 说明                                    | 类型    | 可选值              | 默认值 |
| ----------------------- | --------------------------------------- | ------- | ------------------- | ------ |
| form                    | 表单项配置数组                          | array   | -                   | []     |
| model                   | 表单数据对象                            | object  | -                   | {}     |
| rules                   | 表单验证规则                            | object  | -                   | -      |
| inline                  | 行内表单模式                            | boolean | -                   | false  |
| label-position          | 表单域标签的位置                        | string  | right/left/top      | right  |
| label-width             | 表单域标签的宽度                        | string  | -                   | -      |
| label-suffix            | 表单域标签的后缀                        | string  | -                   | -      |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色星号    | boolean | -                   | false  |
| show-message            | 是否显示校验错误信息                    | boolean | -                   | true   |
| inline-message          | 是否以行内形式展示校验信息              | boolean | -                   | false  |
| status-icon             | 是否在输入框中显示校验结果反馈图标      | boolean | -                   | false  |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证 | boolean | -                   | true   |
| size                    | 用于控制该表单内组件的尺寸              | string  | large/default/small | -      |
| disabled                | 是否禁用该表单内的所有组件              | boolean | -                   | false  |
| scroll-to-error         | 当校验失败时，滚动到第一个错误表单项    | boolean | -                   | false  |
| show-footer             | 是否显示底部操作按钮                    | boolean | -                   | true   |

## 事件

| 事件名 | 说明           | 回调参数                   |
| ------ | -------------- | -------------------------- |
| submit | 表单提交时触发 | (formData: object) => void |
| reset  | 表单重置时触发 | () => void                 |

## 方法

| 方法名        | 说明                                                       | 参数                                |
| ------------- | ---------------------------------------------------------- | ----------------------------------- |
| validate      | 对整个表单的内容进行验证                                   | (callback?: Function) => Promise    |
| validateField | 对表单部分字段进行验证                                     | (props?: array/callback) => Promise |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | -                                   |
| clearValidate | 移除表单项的校验结果                                       | (props?: array) => void             |
| handleSubmit  | 手动触发表单提交                                           | -                                   |
| handleReset   | 手动触发表单重置                                           | -                                   |

## 插槽

| 插槽名  | 说明                                           |
| ------- | ---------------------------------------------- |
| default | 自定义表单项内容，使用表单项的 prop 作为插槽名 |
| footer  | 自定义底部操作按钮                             |

## 类型定义

```typescript
interface CommonFormProps {
  form: CommonFormPropForm[]
  model?: Record<string, any>
  rules?: Record<string, any>
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  showFooter?: boolean
}

interface CommonFormPropForm {
  type: 'input' | 'select' | 'date' | 'radio' | 'switch' | 'checkbox' | 'custom'
  prop: string
  label: string
  placeholder?: string
  required?: boolean
  options?: OptionItem[]
  rules?: FormItemRule[]
  [key: string]: any
}
```
