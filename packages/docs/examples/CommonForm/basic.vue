<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '???',
    prop: 'name',
    formItem: {
      rules: [
        { required: true, message: '????????', trigger: 'blur' },
        { min: 2, max: 10, message: '?????? 2 - 10 ???', trigger: 'blur' },
      ],
    },
    props: {
      placeholder: '????????',
    },
  },
  {
    is: 'select',
    label: '????',
    prop: 'level',
    initialValue: 'a',
    props: {
      placeholder: '???????',
      options: [
        { value: 'a', label: 'A?' },
        { value: 'b', label: 'B?' },
        { value: 'c', label: 'C?' },
      ],
      clearable: true,
    },
  },
  {
    is: 'date-picker',
    label: '????',
    prop: 'followDate',
    props: {
      type: 'date',
      placeholder: '???????',
      clearable: true,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    is: 'radio',
    label: '????',
    prop: 'status',
    initialValue: 'pending',
    props: {
      options: [
        { value: 'pending', label: '???' },
        { value: 'tracking', label: '???' },
        { value: 'done', label: '???' },
      ],
    },
  },
  {
    is: 'check-box',
    label: '????',
    prop: 'channels',
    initialValue: ['wechat'],
    props: {
      options: [
        { value: 'wechat', label: '??' },
        { value: 'phone', label: '??' },
        { value: 'email', label: '??' },
        { value: 'visit', label: '??' },
      ],
    },
  },
  {
    is: 'switch',
    label: '????',
    prop: 'subscribe',
    initialValue: true,
    props: {
      activeText: '??',
      inactiveText: '??',
      activeValue: true,
      inactiveValue: false,
    },
  },
]

function handleSubmit(formData: any) {
  console.log('????????', formData)
  ElMessage.success('?????????????')
}

function handleReset(formData: any) {
  console.log('?????????', formData)
  ElMessage.info('?????')
}
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">?????????/?????????????????????????</p>
    <CommonForm :form="form" @submit="handleSubmit" @reset="handleReset" />
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
