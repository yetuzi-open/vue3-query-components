<script setup lang="ts">
import { computed, ref } from 'vue'
import { CommonForm, type CommonFormExpose } from '@yetuzi/vue3-query-components'

const formRef = ref<CommonFormExpose>()

const baseForm = [
  {
    is: 'select',
    label: '????',
    prop: 'type',
    initialValue: 'person',
    props: {
      options: [
        { value: 'person', label: '????' },
        { value: 'company', label: '????' },
      ],
    },
  },
  {
    is: 'input',
    label: '???',
    prop: 'name',
    props: {
      placeholder: '????????',
    },
    formItem: {
      rules: [{ required: true, message: '????????', trigger: 'blur' }],
    },
  },
]

const companyFields = computed(() => {
  if (formRef.value?.formData?.type === 'company') {
    return [
      {
        is: 'input',
        label: '????',
        prop: 'companyName',
        props: {
          placeholder: '???????',
        },
        formItem: {
          rules: [{ required: true, message: '???????', trigger: 'blur' }],
        },
      },
      {
        is: 'input',
        label: '????????',
        prop: 'creditCode',
        props: {
          placeholder: '???????????',
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
    <p class="demo-description">????????????????????/??????????????</p>
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
