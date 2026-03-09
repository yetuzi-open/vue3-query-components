<script setup lang="ts">
import { ElColorPicker, ElInputNumber, ElRate } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '名称',
    prop: 'name',
  },
  {
    is: ElInputNumber,
    label: '数量',
    prop: 'quantity',
    initialValue: 1,
  },
  {
    is: 'rate',
    label: '评分',
    prop: 'rating',
    initialValue: 3,
  },
  {
    is: 'color-picker',
    label: '颜色',
    prop: 'color',
    initialValue: '#409EFF',
  },
]
</script>

<template>
  <CommonForm :form="form" :inline="false" label-width="100px">
    <template #rating="{ value, updateValue }">
      <ElRate :model-value="value" @update:modelValue="updateValue" show-score />
    </template>

    <template #color="{ value, updateValue }">
      <ElColorPicker :model-value="value" @update:modelValue="updateValue" />
    </template>
  </CommonForm>
</template>