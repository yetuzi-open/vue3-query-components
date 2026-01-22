<script setup lang="ts">
import { ElSwitch } from 'element-plus'
import type { CommonSwitchProps } from './type'
import type { SwitchProps } from 'element-plus'
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonSwitchProps>(), {})

/** 开关值，支持v-model双向绑定 */
const modelValue = defineModel<SwitchProps['modelValue']>()

/**
 * 样式计算属性
 * 根据props中的颜色配置生成CSS变量，用于自定义开关颜色
 * 支持激活状态颜色、非激活状态颜色和边框颜色
 */
const style = computed(() => {
  const css: CSSProperties = {}
  /** 设置开关激活状态颜色 */
  if (props.activeColor) {
    css['--el-switch-on-color'] = props.activeColor
  }
  /** 设置开关非激活状态颜色 */
  if (props.inactiveColor) {
    css['--el-switch-off-color'] = props.inactiveColor
  }
  /** 设置开关边框颜色 */
  if (props.borderColor) {
    css['--el-switch-border-color'] = props.borderColor
  }
  return css
})

defineOptions({
  name: 'CommonSwitch',
})
</script>

<template>
  <ElSwitch class="common-switch" v-bind="props" v-model="modelValue" :style="style"> </ElSwitch>
</template>

<style scoped></style>
