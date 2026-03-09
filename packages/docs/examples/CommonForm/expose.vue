<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { CommonForm, type CommonFormExpose } from '@yetuzi/vue3-query-components'

const formRef = ref<CommonFormExpose>()

const form = [
  {
    is: 'input' as const,
    label: '???',
    prop: 'name',
    initialValue: '',
    props: {
      placeholder: '????????',
    },
    formItem: {
      rules: [{ required: true, message: '????????', trigger: 'blur' }],
    },
  },
  {
    is: 'input' as const,
    label: '????',
    prop: 'email',
    initialValue: '',
    props: {
      placeholder: '???????',
    },
    formItem: {
      rules: [
        { required: true, message: '???????', trigger: 'blur' },
        { type: 'email', message: '??????????', trigger: 'blur' },
      ],
    },
  },
]

async function handleValidate() {
  const valid = await formRef.value?.validate()
  if (valid) {
    ElMessage.success('??????')
  } else {
    ElMessage.error('???????')
  }
}

function handleValidateField() {
  formRef.value?.validateField('name', (errorMessage) => {
    if (errorMessage) {
      ElMessage.error('??????????' + errorMessage)
      return
    }
    ElMessage.success('?????????')
  })
}

function handleReset() {
  formRef.value?.resetFields()
  ElMessage.info('?????')
}

function handleClearValidate() {
  formRef.value?.clearValidate()
  ElMessage.info('???????')
}

function handleScrollToField() {
  formRef.value?.scrollToField('email')
  ElMessage.info('????????')
}

function handleGetFormData() {
  console.log('???????', formRef.value?.formData)
  ElMessage.success('????????????????')
}
</script>

<template>
  <div class="expose-demo">
    <p class="demo-description">?? `ref` ????????????????????????????</p>

    <CommonForm ref="formRef" :form="form" />

    <div class="demo-actions">
      <ElButton @click="handleValidate">????</ElButton>
      <ElButton @click="handleValidateField">?????</ElButton>
      <ElButton @click="handleReset">????</ElButton>
      <ElButton @click="handleClearValidate">????</ElButton>
      <ElButton @click="handleScrollToField">?????</ElButton>
      <ElButton @click="handleGetFormData">??????</ElButton>
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
