<script setup lang="ts">
import { ElCascader } from 'element-plus'
import type { CommonCascaderProps } from './type'
import { useSlots } from 'vue'
import type { Slots } from 'vue'

/** 组件Props定义 */
const props = defineProps<CommonCascaderProps>()

/** 级联选择器值，支持v-model双向绑定 */
const modelValue = defineModel<any[] | any>()

/** 获取插槽信息 */
const slots: Slots = useSlots()

defineOptions({
  name: 'CommonCascader',
})
</script>

<template>
  <ElCascader v-bind="props" v-model="modelValue">
    <!-- 只有在使用者提供了 default 插槽时才覆盖默认渲染 -->
    <template v-if="slots.default" #default="{ node, data }">
      <slot name="default" :node="node" :data="data"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </ElCascader>
</template>

<style scoped></style>
