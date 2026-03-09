<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '登录账号',
    prop: 'username',
    props: {
      placeholder: '请输入登录账号',
    },
    formItem: {
      rules: [
        { required: true, message: '请输入登录账号', trigger: 'blur' },
        { min: 3, message: '账号长度不能少于 3 个字符', trigger: 'blur' },
      ],
    },
  },
  {
    is: 'input',
    label: '登录密码',
    prop: 'password',
    props: {
      type: 'password',
      showPassword: true,
      placeholder: '请输入登录密码',
    },
    formItem: {
      rules: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' },
      ],
    },
  },
  {
    is: 'input',
    label: '确认密码',
    prop: 'confirmPassword',
    props: {
      type: 'password',
      showPassword: true,
      placeholder: '请再次输入密码',
    },
    formItem: {
      rules: [
        {
          validator: (_rule: any, value: string, callback: Function, formData: any) => {
            if (!value) {
              callback(new Error('请再次输入密码'))
              return
            }
            if (value !== formData.password) {
              callback(new Error('两次输入的密码不一致'))
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
  console.log('校验通过的表单数据：', formData)
  ElMessage.success('校验通过，可以继续提交请求')
}

function handleReset(formData: any) {
  console.log('重置后的表单数据：', formData)
}
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">适合注册或账号管理场景，示例展示了必填、长度校验和跨字段校验。</p>
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
