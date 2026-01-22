<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
import type { CommonInputNumberProps } from './type'

/** 组件Props定义 */
const props = defineProps<CommonInputNumberProps>()

/** 数字输入框值，支持v-model双向绑定 */
const modelValue = defineModel<number>()

defineOptions({
  name: 'CommonInputNumber',
})
</script>

<template>
  <ElInputNumber v-bind="props" v-model="modelValue"></ElInputNumber>
</template>

<style scoped></style>
