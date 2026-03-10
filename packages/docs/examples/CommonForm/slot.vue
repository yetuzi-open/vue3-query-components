<script setup lang="ts">
import { ElInput, ElRate, ElTag } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  { is: 'input', label: '客户名称', prop: 'name' },
  { is: 'input', label: '备注信息', prop: 'remark' },
  { is: 'input', label: '服务评分', prop: 'rating', initialValue: 4 },
]
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">当内置组件不满足需求时，可以按字段名提供插槽，自定义任意表单项内容。</p>

    <CommonForm :form="form" :inline="false" label-width="100px">
      <template #remark="{ value, updateValue }">
        <div class="slot-field">
          <ElTag type="info">自定义备注输入框</ElTag>
          <ElInput
            :model-value="value"
            placeholder="请输入补充说明"
            @update:modelValue="updateValue"
          />
        </div>
      </template>

      <template #rating="{ value, updateValue }">
        <ElRate :model-value="value" @update:modelValue="updateValue" show-score />
      </template>
    </CommonForm>
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

.slot-field {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
