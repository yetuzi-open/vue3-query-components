<script setup lang="ts">
import { ElDatePicker } from 'element-plus'
import type { CommonDatePickerProps } from './type'
import type { ModelValueType } from 'element-plus'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonDatePickerProps>(), {
  /** 默认日期格式为字符串（业务默认值） */
  valueFormat: 'YYYY-MM-DD',
})

/** 日期选择器值，支持v-model双向绑定 */
const modelValue = defineModel<ModelValueType>()

defineOptions({
  name: 'CommonDatePicker',
})
</script>

<template>
  <ElDatePicker v-bind="props" v-model="modelValue"></ElDatePicker>
</template>

<style scoped></style>
