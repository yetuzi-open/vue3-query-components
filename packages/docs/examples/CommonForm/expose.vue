<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { CommonForm, type CommonFormExpose } from '@yetuzi/vue3-query-components'

const formRef = ref<CommonFormExpose>()

const form = [
  {
    is: 'input' as const,
    label: '负责人',
    prop: 'name',
    initialValue: '',
    props: {
      placeholder: '请输入负责人姓名',
    },
    formItem: {
      rules: [{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
    },
  },
  {
    is: 'input' as const,
    label: '邮箱地址',
    prop: 'email',
    initialValue: '',
    props: {
      placeholder: '请输入邮箱地址',
    },
    formItem: {
      rules: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
      ],
    },
  },
]

async function handleValidate() {
  const valid = await formRef.value?.validate()
  if (valid) {
    ElMessage.success('表单校验通过')
  } else {
    ElMessage.error('表单校验未通过')
  }
}

function handleValidateField() {
  formRef.value?.validateField('name', (errorMessage) => {
    if (errorMessage) {
      ElMessage.error('负责人字段校验失败：' + errorMessage)
      return
    }
    ElMessage.success('负责人字段校验通过')
  })
}

function handleReset() {
  formRef.value?.resetFields()
  ElMessage.info('表单已重置')
}

function handleClearValidate() {
  formRef.value?.clearValidate()
  ElMessage.info('已清空校验结果')
}

function handleScrollToField() {
  formRef.value?.scrollToField('email')
  ElMessage.info('已滚动到邮箱字段')
}

function handleGetFormData() {
  console.log('当前表单数据：', formRef.value?.formData)
  ElMessage.success('已输出当前表单数据，请查看控制台')
}
</script>

<template>
  <div class="expose-demo">
    <p class="demo-description">通过 `ref` 可以直接调用内部表单实例方法，适合复杂页面中的联动控制。</p>

    <CommonForm ref="formRef" :form="form" />

    <div class="demo-actions">
      <ElButton @click="handleValidate">校验表单</ElButton>
      <ElButton @click="handleValidateField">校验负责人</ElButton>
      <ElButton @click="handleReset">重置表单</ElButton>
      <ElButton @click="handleClearValidate">清除校验</ElButton>
      <ElButton @click="handleScrollToField">滚动到邮箱</ElButton>
      <ElButton @click="handleGetFormData">获取表单数据</ElButton>
    </div>
  </div>
</template>

<style scoped>
.expose-demo {
  display: grid;
  gap: 16px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.demo-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
