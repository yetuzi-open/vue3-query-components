<script setup lang="ts">
import { ElRate, ElTag } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  { is: 'input', label: '姓名', prop: 'name' },
  { is: 'input', label: '备注', prop: 'remark' },
  { is: 'input', label: '评分', prop: 'rating', initialValue: 4 },
]
</script>

<template>
  <CommonForm :form="form" :inline="false" label-width="100px">
    <template #remark="{ value, updateValue }">
      <el-tag type="info" style="margin-right: 8px">自定义插槽</el-tag>
      <input
        :value="value"
        style="border: 1px solid #dcdfe6; padding: 6px 10px; border-radius: 4px"
        placeholder="请输入备注"
        @input="updateValue(($event.target as HTMLInputElement).value)"
      />
    </template>

    <template #rating="{ value, updateValue }">
      <ElRate :model-value="value" @update:modelValue="updateValue" show-score />
    </template>
  </CommonForm>
</template>