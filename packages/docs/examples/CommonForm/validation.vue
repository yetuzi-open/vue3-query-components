<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '????',
    prop: 'username',
    props: {
      placeholder: '???????',
    },
    formItem: {
      rules: [
        { required: true, message: '???????', trigger: 'blur' },
        { min: 3, message: '???????? 3 ???', trigger: 'blur' },
      ],
    },
  },
  {
    is: 'input',
    label: '????',
    prop: 'password',
    props: {
      type: 'password',
      showPassword: true,
      placeholder: '???????',
    },
    formItem: {
      rules: [
        { required: true, message: '???????', trigger: 'blur' },
        { min: 6, message: '???????? 6 ?', trigger: 'blur' },
      ],
    },
  },
  {
    is: 'input',
    label: '????',
    prop: 'confirmPassword',
    props: {
      type: 'password',
      showPassword: true,
      placeholder: '???????',
    },
    formItem: {
      rules: [
        {
          validator: (_rule: any, value: string, callback: Function, formData: any) => {
            if (!value) {
              callback(new Error('???????'))
              return
            }
            if (value !== formData.password) {
              callback(new Error('??????????'))
              return
            }
            callback()
          },
          trigger: 'blur',
        },
      ],
    },
  },
]

function handleSubmit(formData: any) {
  console.log('??????????', formData)
  ElMessage.success('?????????????')
}

function handleReset(formData: any) {
  console.log('?????????', formData)
}
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">???????????????????????????????</p>
    <CommonForm
      :form="form"
      :inline="false"
      label-width="100px"
      @submit="handleSubmit"
      @reset="handleReset"
    />
  </div>
</template>

<style scoped>
.form-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
</style>
