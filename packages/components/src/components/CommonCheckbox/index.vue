<script setup lang="ts">
import { ElCheckboxGroup } from 'element-plus'
import type { CommonCheckboxProps } from './type'
import type { CheckboxGroupProps } from 'element-plus'

const props = withDefaults(defineProps<CommonCheckboxProps>(), {})

const modelValue = defineModel<CheckboxGroupProps['modelValue']>()

defineOptions({
  name: 'CommonCheckbox',
})
</script>

<template>
  <ElCheckboxGroup v-bind="props" v-model="modelValue"> </ElCheckboxGroup>
</template>

<style scoped></style>
