<script setup lang="ts">
import { computed, ref } from 'vue'
import { CommonForm, type CommonFormExpose } from '@yetuzi/vue3-query-components'

const formRef = ref<CommonFormExpose>()

const baseForm = [
  {
    is: 'select',
    label: '主体类型',
    prop: 'type',
    initialValue: 'person',
    props: {
      options: [
        { value: 'person', label: '个人' },
        { value: 'company', label: '企业' },
      ],
    },
  },
  {
    is: 'input',
    label: '名称',
    prop: 'name',
    formItem: {
      rules: [{ required: true, message: '请输入名称' }],
    },
  },
]

const companyFields = computed(() => {
  if (formRef.value?.formData?.type === 'company') {
    return [
      {
        is: 'input',
        label: '公司名称',
        prop: 'companyName',
        formItem: {
          rules: [{ required: true, message: '请输入公司名称' }],
        },
      },
    ]
  }
  return []
})

const dynamicForm = computed(() => [...baseForm, ...companyFields.value])
</script>

<template>
  <CommonForm
    ref="formRef"
    :form="dynamicForm"
    :inline="false"
    label-width="120px"
  />
</template>