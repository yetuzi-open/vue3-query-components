<script setup lang="ts">
import { ref } from 'vue'
import { CommonForm } from '@yetuzi/vue3-query-components'
import type { CommonFormExpose } from '@yetuzi/vue3-query-components'
import { ElMessage, ElButton } from 'element-plus'


const formRef = ref<CommonFormExpose>()

const form = [
  {
    is: 'input' as const,
    label: 'Name',
    prop: 'name',
    initialValue: '',
    formItem: {
      rules: [{ required: true, message: 'Please enterName', trigger: 'blur' }],
    },
  },
  {
    is: 'input' as const,
    label: '邮箱',
    prop: 'email',
    initialValue: '',
    formItem: {
      rules: [
        { required: true, message: 'Please enter邮箱', trigger: 'blur' },
        { type: 'email', message: 'Please enter正确的邮箱地址', trigger: 'blur' },
      ],
    },
  },
]

// 表单验证
async function handleValidate() {
  const valid = await formRef.value?.validate()
  if (valid) {
    ElMessage.success('验证通过！')
  } else {
    ElMessage.error('验证失败！')
  }
}

// 验证指定字段
function handleValidateField() {
  formRef.value?.validateField('name', (errorMessage) => {
    if (errorMessage) {
      ElMessage.error(`Name字段验证失败：${errorMessage}`)
    } else {
      ElMessage.success('Name字段验证通过！')
    }
  })
}

// Reset表单
function handleReset() {
  formRef.value?.resetFields()
  ElMessage.info('表单已Reset')
}

// 清除验证信息
function handleClearValidate() {
  formRef.value?.clearValidate()
  ElMessage.info('验证信息已清除')
}

// 滚动到指定字段
function handleScrollToField() {
  formRef.value?.scrollToField('email')
}

// 获取表单数据
function handleGetFormData() {
  console.log('表单数据:', formRef.value?.formData)
  ElMessage.success('请查看控制台输出的表单数据')
}
</script>

<template>
  <div class="expose-demo">
    <CommonForm ref="formRef" :form="form" />

    <div class="demo-actions">
      <el-button @click="handleValidate">验证表单</el-button>
      <el-button @click="handleValidateField">验证Name字段</el-button>
      <el-button @click="handleReset">Reset表单</el-button>
      <el-button @click="handleClearValidate">清除验证</el-button>
      <el-button @click="handleScrollToField">滚动到邮箱</el-button>
      <el-button @click="handleGetFormData">获取表单数据</el-button>
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
