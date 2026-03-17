<script setup lang="ts">
import { ElUpload } from 'element-plus'
import { computed, useSlots } from 'vue'
import type { Slots } from 'vue'
import { CommonButton } from '../CommonButton'
import type { CommonUploadProps, CommonUploadValue } from './type'

const props = withDefaults(defineProps<CommonUploadProps>(), {
  action: '#',
})

const modelValue = defineModel<CommonUploadValue>({
  default: () => [],
})

const slots: Slots = useSlots()
const slotNames = computed<string[]>(() => Object.keys(slots))

defineOptions({
  name: 'CommonUpload',
})
</script>

<template>
  <ElUpload v-bind="props" v-model:file-list="modelValue">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}"></slot>
    </template>

    <template v-if="!slots.default">
      <div v-if="props.drag" class="common-upload-dragger-placeholder">
        <div class="common-upload-dragger-title">将文件拖到此处，或点击上传</div>
        <div class="common-upload-dragger-tip">支持拖拽选择文件</div>
      </div>
      <CommonButton v-else type="primary">点击上传</CommonButton>
    </template>
  </ElUpload>
</template>

<style scoped>
.common-upload-dragger-placeholder {
  display: flex;
  min-height: 120px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--el-text-color-regular);
  text-align: center;
}

.common-upload-dragger-title {
  color: var(--el-text-color-primary);
  font-size: 14px;
}

.common-upload-dragger-tip {
  font-size: 12px;
}
</style>
