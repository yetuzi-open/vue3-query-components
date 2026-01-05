<script setup lang="ts">
import { ElRadioGroup } from 'element-plus'
import type { CommonRadioProps } from './type'
import type { RadioGroupProps } from 'element-plus'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonRadioProps>(), {})

/** 单选框组值，支持v-model双向绑定 */
const modelValue = defineModel<RadioGroupProps['modelValue']>()

defineOptions({
  name: 'CommonRadio',
})
</script>

<template>
  <ElRadioGroup v-bind="props" v-model="modelValue"> </ElRadioGroup>
</template>

<style scoped></style>
