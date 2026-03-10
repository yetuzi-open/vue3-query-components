<script setup lang="ts">
import { ref } from 'vue'
import { ElRadioButton, ElRadioGroup } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const labelPosition = ref<'left' | 'right' | 'top'>('right')

const form = [
  {
    is: 'input',
    label: '项目名称',
    prop: 'name',
    props: {
      placeholder: '请输入项目名称',
    },
  },
  {
    is: 'input',
    label: '负责人邮箱',
    prop: 'email',
    props: {
      placeholder: '请输入负责人邮箱',
    },
  },
  {
    is: 'select',
    label: '项目状态',
    prop: 'status',
    props: {
      placeholder: '请选择项目状态',
      options: [
        { value: 1, label: '进行中' },
        { value: 0, label: '已暂停' },
      ],
    },
  },
]
</script>

<template>
  <div class="label-demo">
    <p class="demo-description">标签位置会直接影响表单阅读节奏，详情页和录入页常见用法如下。</p>

    <ElRadioGroup v-model="labelPosition" style="margin-bottom: 16px">
      <ElRadioButton value="left">left</ElRadioButton>
      <ElRadioButton value="right">right</ElRadioButton>
      <ElRadioButton value="top">top</ElRadioButton>
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

