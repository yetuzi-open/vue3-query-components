<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { CommonForm, type CommonFormExpose } from '@yetuzi/vue3-query-components'

const formRef = ref<CommonFormExpose>()

const form = [
  {
    is: 'input' as const,
    label: '姓名',
    prop: 'name',
    initialValue: '',
    formItem: {
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    },
  },
  {
    is: 'input' as const,
    label: '邮箱',
    prop: 'email',
    initialValue: '',
    formItem: {
      rules: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
      ],
    },
  },
]

async function handleValidate() {
  const valid = await formRef.value?.validate()
  if (valid) {
    ElMessage.success('校验通过')
  } else {
    ElMessage.error('校验失败')
  }
}

function handleValidateField() {
  formRef.value?.validateField('name', (errorMessage) => {
    if (errorMessage) {
      ElMessage.error(`姓名字段校验失败：${errorMessage}`)
    } else {
      ElMessage.success('姓名字段校验通过')
    }
  })
}

function handleReset() {
  formRef.value?.resetFields()
  ElMessage.info('表单已重置')
}

function handleClearValidate() {
  formRef.value?.clearValidate()
  ElMessage.info('校验信息已清除')
}

function handleScrollToField() {
  formRef.value?.scrollToField('email')
}

function handleGetFormData() {
  console.log('表单数据：', formRef.value?.formData)
  ElMessage.success('请查看控制台输出的表单数据')
}
</script>

<template>
  <div class="expose-demo">
    <CommonForm ref="formRef" :form="form" />

    <div class="demo-actions">
      <ElButton @click="handleValidate">校验表单</ElButton>
      <ElButton @click="handleValidateField">校验姓名字段</ElButton>
      <ElButton @click="handleReset">重置表单</ElButton>
      <ElButton @click="handleClearValidate">清除校验</ElButton>
      <ElButton @click="handleScrollToField">滚动到邮箱</ElButton>
      <ElButton @click="handleGetFormData">获取表单数据</ElButton>
    </div>
  </div>
</template>

<style scoped>
.expose-demo {
  padding: 20px;
}

.demo-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>