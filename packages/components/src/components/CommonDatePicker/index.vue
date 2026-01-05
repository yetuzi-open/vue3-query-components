<script setup lang="ts">
import { ElDatePicker } from 'element-plus'
import type { CommonDatePickerProps } from './type'
import type { ModelValueType } from 'element-plus'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonDatePickerProps>(), {
  /** 默认日期格式为年-月-日 */
  valueFormat: 'YYYY-MM-DD',
  /** 默认可清空选择 */
  clearable: true,
  /** 默认显示底部操作栏 */
  showFooter: true,
  /** 默认占位符文本 */
  placeholder: '请选择日期',
  /** 默认开始日期占位符 */
  startPlaceholder: '开始日期',
  /** 默认结束日期占位符 */
  endPlaceholder: '结束日期',
  /** 默认触发表单验证 */
  validateEvent: true,
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
