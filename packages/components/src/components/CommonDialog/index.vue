<script setup lang="ts">
import { ElDialog } from 'element-plus'
import { computed, useAttrs, useSlots } from 'vue'
import { CommonButton, getCommonProviderConfig } from '../../index'
import type { CommonDialogExpose, CommonDialogProps, CommonDialogSlotProps } from './type'

const props = withDefaults(defineProps<CommonDialogProps>(), {
  showFooter: true,
  showCancelButton: true,
  showConfirmButton: true,
  modal: true,
  showClose: true,
  destroyOnClose: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  lockScroll: true,
  confirmButtonProps() {
    return {}
  },
  cancelButtonProps() {
    return {}
  },
})

const attrs = useAttrs()
const slots = useSlots()
const config = getCommonProviderConfig()

const visible = defineModel<boolean>({
  default: false,
})

const loading = defineModel('loading', {
  default: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const dialogProps = computed(() => {
  const {
    showFooter,
    showCancelButton,
    showConfirmButton,
    confirmText,
    cancelText,
    confirmButtonProps,
    cancelButtonProps,
    ...rest
  } = props
  return rest
})

const mergedConfirmButtonProps = computed(() => ({
  type: 'primary' as const,
  ...props.confirmButtonProps,
}))

const mergedCancelButtonProps = computed(() => ({
  type: 'default' as const,
  ...props.cancelButtonProps,
}))

const slotProps = computed<CommonDialogSlotProps>(() => ({
  visible: visible.value,
  loading: loading.value,
  open,
  close,
  toggle,
  confirm: handleConfirm,
  cancel: handleCancel,
}))

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

function toggle(nextVisible = !visible.value) {
  visible.value = nextVisible
}

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  emit('cancel')
  close()
}

defineExpose<CommonDialogExpose>({
  open,
  close,
  toggle,
})

defineOptions({
  name: 'CommonDialog',
  inheritAttrs: false,
})
</script>

<template>
  <el-dialog v-model="visible" class="common-dialog" v-bind="{ ...dialogProps, ...attrs }">
    <template v-if="slots.header" #header>
      <slot name="header" v-bind="slotProps" />
    </template>

    <slot v-bind="slotProps" />

    <template v-if="slots.footer || showFooter" #footer>
      <slot name="footer" v-bind="slotProps">
        <div v-if="showFooter" class="common-dialog-footer">
          <CommonButton v-if="showCancelButton" v-bind="mergedCancelButtonProps" @click="handleCancel">
            {{ cancelText || config.component.dialog.cancelText }}
          </CommonButton>
          <CommonButton
            v-if="showConfirmButton"
            v-bind="mergedConfirmButtonProps"
            :loading="loading"
            @click="handleConfirm"
          >
            {{ confirmText || config.component.dialog.confirmText }}
          </CommonButton>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped>
.common-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
