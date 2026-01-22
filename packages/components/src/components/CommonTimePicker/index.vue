<script setup lang="ts">
import { ElTimePicker } from 'element-plus'
import type { CommonTimePickerProps } from './type'

/** 组件Props定义 */
const props = defineProps<CommonTimePickerProps>()

/** 时间选择器值，支持v-model双向绑定 */
const modelValue = defineModel<any>()

defineOptions({
  name: 'CommonTimePicker',
})
</script>

<template>
  <ElTimePicker v-bind="props" v-model="modelValue"></ElTimePicker>
</template>

<style scoped></style>
