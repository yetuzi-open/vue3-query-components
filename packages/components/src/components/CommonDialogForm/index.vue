<script setup lang="ts" generic="T extends AnyObject">
import { computed, ref, useAttrs, useSlots } from 'vue'
import type { Slots } from 'vue'
import { CommonButton, CommonDialog, CommonForm, getCommonProviderConfig } from '../../index'
import type { AnyObject } from '../../index'
import type { CommonFormExpose } from '../CommonForm'
import type { CommonDialogFormExpose, CommonDialogFormProps, CommonDialogFormSlotProps } from './type'

const props = withDefaults(defineProps<CommonDialogFormProps<T>>(), {
  showFooter: true,
  showCancelButton: true,
  showConfirmButton: true,
  showResetButton: false,
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
  resetButtonProps() {
    return {}
  },
  formProps() {
    return {}
  },
  form() {
    return []
  },
})

const attrs = useAttrs()
const slots: Slots = useSlots()
const config = getCommonProviderConfig()

const visible = defineModel<boolean>({
  default: false,
})

const loading = defineModel('loading', {
  default: false,
})

const formRef = ref<CommonFormExpose<T>>()

const emit = defineEmits<{
  submit: [formData: CommonFormExpose<T>['formData']]
  reset: [formData: CommonFormExpose<T>['formData']]
  cancel: []
}>()

const dialogProps = computed(() => {
  const { form, formData, formProps, showResetButton, resetText, resetButtonProps, ...rest } = props
  return rest
})

const mergedFormProps = computed(() => ({
  inline: false,
  ...(props.formProps ?? {}),
  form: props.form,
  formData: props.formData,
  showActionButtons: false,
}))

const mergedConfirmButtonProps = computed(() => ({
  type: 'primary' as const,
  ...props.confirmButtonProps,
}))

const mergedCancelButtonProps = computed(() => ({
  type: 'default' as const,
  ...props.cancelButtonProps,
}))

const mergedResetButtonProps = computed(() => ({
  type: 'default' as const,
  ...props.resetButtonProps,
}))

const formSlotNames = computed<string[]>(() =>
  Object.keys(slots).filter((name) => !['default', 'header', 'footer'].includes(name)),
)

const formData = computed(
  () => (formRef.value?.formData ?? ({} as CommonFormExpose<T>['formData'])) as CommonFormExpose<T>['formData'],
)

const slotProps = computed<CommonDialogFormSlotProps<T>>(() => ({
  visible: visible.value,
  loading: loading.value,
  open,
  close,
  toggle,
  confirm: handleSubmit,
  cancel: handleCancel,
  formData: formData.value,
  submit: handleSubmit,
  reset: handleReset,
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

async function handleSubmit() {
  await formRef.value?.validate()
  emit('submit', formData.value)
}

function handleReset() {
  formRef.value?.resetFields()
  emit('reset', formData.value)
}

function handleCancel() {
  emit('cancel')
  close()
}

const validate: CommonDialogFormExpose<T>['validate'] = (callback) => {
  if (!formRef.value) {
    return Promise.resolve(true)
  }
  return formRef.value.validate(callback)
}

const validateField: CommonDialogFormExpose<T>['validateField'] = (props, callback) => {
  if (!formRef.value) {
    return Promise.resolve(true)
  }
  return formRef.value.validateField(props, callback)
}

const resetFields: CommonDialogFormExpose<T>['resetFields'] = (props) => {
  formRef.value?.resetFields(props)
}

const clearValidate: CommonDialogFormExpose<T>['clearValidate'] = (props) => {
  formRef.value?.clearValidate(props)
}

const scrollToField: CommonDialogFormExpose<T>['scrollToField'] = (prop) => {
  formRef.value?.scrollToField(prop)
}

defineExpose<CommonDialogFormExpose<T>>({
  open,
  close,
  toggle,
  submit: handleSubmit,
  reset: handleReset,
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField,
  get formData() {
    return formData.value
  },
})

defineOptions({
  name: 'CommonDialogForm',
  inheritAttrs: false,
})
</script>

<template>
  <CommonDialog v-model="visible" v-model:loading="loading" v-bind="{ ...dialogProps, ...attrs }">
    <template v-if="slots.header" #header>
      <slot name="header" v-bind="slotProps" />
    </template>

    <CommonForm ref="formRef" v-bind="mergedFormProps">
      <template v-for="slotName in formSlotNames" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps || {}" />
      </template>
    </CommonForm>

    <template v-if="slots.footer || showFooter" #footer>
      <slot name="footer" v-bind="slotProps">
        <div v-if="showFooter" class="common-dialog-form-footer">
          <CommonButton v-if="showCancelButton" v-bind="mergedCancelButtonProps" @click="handleCancel">
            {{ cancelText || config.component.dialog.cancelText }}
          </CommonButton>
          <CommonButton v-if="showResetButton" v-bind="mergedResetButtonProps" @click="handleReset">
            {{ resetText || config.component.form.resetText }}
          </CommonButton>
          <CommonButton
            v-if="showConfirmButton"
            v-bind="mergedConfirmButtonProps"
            :loading="loading"
            @click="handleSubmit"
          >
            {{ confirmText || config.component.dialog.confirmText }}
          </CommonButton>
        </div>
      </slot>
    </template>
  </CommonDialog>
</template>

<style scoped>
.common-dialog-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
