<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { CommonInputProps } from './type'
import { useSlots } from 'vue'
import type { Slots } from 'vue'

/** 组件Props定义，使用运行时定义避免类型问题 */
const props = defineProps<CommonInputProps>()

/** 定义组件事件 */
const emit = defineEmits<{
  /** 回车键按下事件，返回键盘事件对象 */
  (e: 'enter', event: KeyboardEvent): void
}>()

/** 输入框值，支持v-model双向绑定 */
const modelValue = defineModel<string>({
  /** 默认空字符串 */
  default: '',
})

const slots: Slots = useSlots()

/**
 * 回车键处理函数
 * 处理输入法组合状态，避免在输入中文时误触发回车事件
 * @param e - 键盘事件对象
 */
function handleEnter(e: Event | KeyboardEvent) {
  /** 如果正在输入组合中（如中文输入），不触发回车事件 */
  if ('isComposing' in e) {
    if (e.isComposing) return
  } else {
    return
  }
  emit('enter', e)
}

defineOptions({
  name: 'CommonInput',
})
</script>

<template>
  <el-input v-bind="props" v-model="modelValue" @keydown.enter="handleEnter">
    <template v-for="(_, slotName) in slots" :key="slotName" #[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData" />
    </template>
  </el-input>
</template>

<style scoped></style>
