<script setup lang="ts">
import { ElColorPicker, ElInputNumber, ElRate } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '模板名称',
    prop: 'name',
    props: {
      placeholder: '请输入模板名称',
    },
  },
  {
    is: ElInputNumber,
    label: '库存预警值',
    prop: 'threshold',
    initialValue: 10,
    props: {
      min: 1,
      max: 999,
    },
  },
  {
    is: ElRate,
    label: '服务评分',
    prop: 'rating',
    initialValue: 4,
    props: {
      showScore: true,
    },
  },
  {
    is: ElColorPicker,
    label: '主题色',
    prop: 'color',
    initialValue: '#409EFF',
  },
]
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">除了内置字段类型，你也可以把任意 Vue 组件直接作为表单控件接入。</p>
    <CommonForm :form="form" :inline="false" label-width="100px" />
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
