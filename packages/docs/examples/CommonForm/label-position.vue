<script setup lang="ts">
import { ref } from 'vue'
import { ElRadioButton, ElRadioGroup } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const labelPosition = ref<'left' | 'right' | 'top'>('right')

const form = [
  {
    is: 'input',
    label: '????',
    prop: 'name',
    props: {
      placeholder: '???????',
    },
  },
  {
    is: 'input',
    label: '?????',
    prop: 'email',
    props: {
      placeholder: '????????',
    },
  },
  {
    is: 'select',
    label: '????',
    prop: 'status',
    props: {
      placeholder: '???????',
      options: [
        { value: 1, label: '???' },
        { value: 0, label: '???' },
      ],
    },
  },
]
</script>

<template>
  <div class="label-demo">
    <p class="demo-description">??????????????????????????????</p>

    <ElRadioGroup v-model="labelPosition" style="margin-bottom: 16px">
      <ElRadioButton label="left">left</ElRadioButton>
      <ElRadioButton label="right">right</ElRadioButton>
      <ElRadioButton label="top">top</ElRadioButton>
    </ElRadioGroup>

    <CommonForm :form="form" :inline="false" :label-position="labelPosition" label-width="100px" />
  </div>
</template>

<style scoped>
.label-demo {
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
