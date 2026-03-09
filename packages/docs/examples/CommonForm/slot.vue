<script setup lang="ts">
import { ElInput, ElRate, ElTag } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  { is: 'input', label: '????', prop: 'name' },
  { is: 'input', label: '????', prop: 'remark' },
  { is: 'input', label: '????', prop: 'rating', initialValue: 4 },
]
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">??????????????????????????????????</p>

    <CommonForm :form="form" :inline="false" label-width="100px">
      <template #remark="{ value, updateValue }">
        <div class="slot-field">
          <ElTag type="info">????????</ElTag>
          <ElInput
            :model-value="value"
            placeholder="???????"
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
