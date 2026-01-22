<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import type { CommonSelectProps } from './type'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonSelectProps>(), {
  /** 默认空选项数组（自定义属性） */
  options() {
    return []
  },
})

/** 选择器值，支持v-model双向绑定 */
const model = defineModel<any>()

defineOptions({
  name: 'CommonSelect',
})
</script>

<template>
  <el-select v-bind="props" v-model="model">
    <slot>
      <el-option
        v-for="item in props.options"
        :key="item.label"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
      ></el-option>
    </slot>
  </el-select>
</template>

<style scoped></style>
