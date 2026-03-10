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
        { value: 'person', label: '个人客户' },
        { value: 'company', label: '企业客户' },
      ],
    },
  },
  {
    is: 'input',
    label: '联系人',
    prop: 'name',
    props: {
      placeholder: '请输入联系人姓名',
    },
    formItem: {
      rules: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
    },
  },
]

const companyFields = computed(() => {
  if (formRef.value?.formData?.type === 'company') {
    return [
      {
        is: 'input',
        label: '企业名称',
        prop: 'companyName',
        props: {
          placeholder: '请输入企业名称',
        },
        formItem: {
          rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        },
      },
      {
        is: 'input',
        label: '统一社会信用代码',
        prop: 'creditCode',
        props: {
          placeholder: '请输入统一社会信用代码',
        },
      },
    ]
  }
  return []
})

const dynamicForm = computed(() => [...baseForm, ...companyFields.value])
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">根据已填写的字段动态增减表单项，适合企业/个人切换、复杂审批单等场景。</p>
    <CommonForm ref="formRef" :form="dynamicForm" :inline="false" label-width="120px" />
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
