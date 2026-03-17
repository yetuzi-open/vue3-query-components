<script setup lang="ts" generic="T extends AnyObject">
import { ElForm, ElFormItem } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import type { Component, VNodeRef } from 'vue'
import { computed, getCurrentInstance, nextTick, reactive, ref, useAttrs, watch } from 'vue'
import {
  CommonButton,
  CommonCascader,
  CommonCheckbox,
  CommonDatePicker,
  CommonInput,
  CommonInputNumber,
  CommonRadio,
  CommonSelect,
  CommonSwitch,
  CommonTreeSelect,
  CommonTimePicker,
  CommonUpload,
  getCommonProviderConfig,
} from '../../index'
import type { AnyObject } from '../../index'
import type { CommonFormData, CommonFormExpose, CommonFormItemArray, CommonFormProps } from './type'

const props = withDefaults(defineProps<CommonFormProps<T>>(), {
  labelWidth: 'auto',
  inline: true,
  showActionButtons: true,
  form() {
    return []
  },
})

const componentMap = new Map<string, Component>([
  ['select', CommonSelect],
  ['input', CommonInput],
  ['input-number', CommonInputNumber],
  ['date-picker', CommonDatePicker],
  ['time-picker', CommonTimePicker],
  ['cascader', CommonCascader],
  ['tree-select', CommonTreeSelect],
  ['radio', CommonRadio],
  ['check-box', CommonCheckbox],
  ['switch', CommonSwitch],
  ['upload', CommonUpload],
])

function getComponent(item: CommonFormItemArray<T>[number]): Component | undefined {
  if (typeof item.is === 'string') {
    return componentMap.get(item.is)
  }
  return undefined
}

const vm = getCurrentInstance()
const attrs = useAttrs()

const emit = defineEmits<{
  submit: [formData: AnyObject]
  reset: [formData: AnyObject]
}>()

const elFormRef = ref<FormInstance>()
const formData = reactive<CommonFormData<T>>({} as CommonFormData<T>)
const initialFormData = ref<CommonFormData<T>>({} as CommonFormData<T>)

const config = getCommonProviderConfig()

const loading = defineModel('loading', {
  default: false,
})

const elFormProps = computed(() => {
  const { form, formData: _formData, showActionButtons, ...rest } = props
  return rest
})

watch([() => props.form, () => props.formData], syncFormStateFromProps, {
  deep: true,
  immediate: true,
})

function buildFormState() {
  const nextFormData = cloneDeep((props.formData ?? {}) as AnyObject)

  for (const item of props.form) {
    const key = String(item.prop)
    if (!Object.prototype.hasOwnProperty.call(nextFormData, key)) {
      nextFormData[key] = cloneDeep(item.initialValue)
    }
  }

  return nextFormData as CommonFormData<T>
}

function applyFormState(nextFormData: AnyObject) {
  const nextKeys = new Set(Object.keys(nextFormData))

  for (const key of Object.keys(formData)) {
    if (!nextKeys.has(key)) {
      delete (formData as AnyObject)[key]
    }
  }

  for (const [key, value] of Object.entries(nextFormData)) {
    ;(formData as AnyObject)[key] = value
  }
}

function syncFormStateFromProps() {
  const nextFormData = buildFormState()
  initialFormData.value = cloneDeep(nextFormData) as CommonFormData<T>
  applyFormState(cloneDeep(nextFormData) as AnyObject)
  nextTick(() => {
    elFormRef.value?.clearValidate()
  })
}

function normalizeFieldProps(propsToReset?: Parameters<CommonFormExpose<T>['resetFields']>[0]) {
  if (propsToReset == null) {
    return undefined
  }
  return Array.isArray(propsToReset) ? propsToReset : [propsToReset]
}

const validate: CommonFormExpose<T>['validate'] = (callback) => {
  if (!elFormRef.value) {
    return Promise.resolve(true)
  }
  return elFormRef.value.validate(callback)
}

const validateField: CommonFormExpose<T>['validateField'] = (propsToValidate, callback) => {
  if (!elFormRef.value) {
    return Promise.resolve(true)
  }
  return elFormRef.value.validateField(propsToValidate, callback)
}

const resetFields: CommonFormExpose<T>['resetFields'] = (propsToReset) => {
  const normalizedProps = normalizeFieldProps(propsToReset)

  if (!normalizedProps) {
    applyFormState(cloneDeep(initialFormData.value) as AnyObject)
  } else {
    for (const prop of normalizedProps) {
      const key = String(prop)
      if (Object.prototype.hasOwnProperty.call(initialFormData.value, key)) {
        ;(formData as AnyObject)[key] = cloneDeep((initialFormData.value as AnyObject)[key])
      } else {
        delete (formData as AnyObject)[key]
      }
    }
  }

  nextTick(() => {
    elFormRef.value?.clearValidate(normalizedProps)
  })
}

const clearValidate: CommonFormExpose<T>['clearValidate'] = (propsToClear) => {
  elFormRef.value?.clearValidate(propsToClear)
}

const scrollToField: CommonFormExpose<T>['scrollToField'] = (prop) => {
  elFormRef.value?.scrollToField(prop)
}

async function handleSubmit() {
  await validate()
  emit('submit', formData)
}

function handleReset() {
  resetFields()
  emit('reset', formData)
}

const changeRef: VNodeRef = (el) => {
  if (vm?.exposed) {
    Object.assign(vm.exposed, {
      ...el,
      formData,
      validate,
      validateField,
      resetFields,
      clearValidate,
      scrollToField,
    })
  }
  elFormRef.value = (el ?? undefined) as FormInstance | undefined
}

defineExpose<CommonFormExpose<T>>()

defineOptions({
  name: 'CommonForm',
})
</script>

<template>
  <el-form :ref="changeRef" v-bind="{ ...elFormProps, ...attrs }" :model="formData" @submit.prevent>
    <el-form-item
      v-for="item in form"
      :key="item.prop"
      v-bind="item.formItem"
      :label="item.label"
      :prop="String(item.prop)"
    >
      <slot
        :name="item.prop"
        :props="item.props"
        :value="formData[item.prop]"
        :updateValue="(val: any) => (formData[item.prop] = val)"
      >
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          v-bind="item.props"
          :modelValue="formData[item.prop]"
          @update:modelValue="(val: any) => (formData[item.prop] = val)"
        />
        <component
          v-else-if="typeof item.is !== 'string'"
          :is="item.is"
          v-bind="item.props"
          :modelValue="formData[item.prop]"
          @update:modelValue="(val: any) => (formData[item.prop] = val)"
        />
      </slot>
    </el-form-item>

    <el-form-item v-if="showActionButtons" label=" ">
      <CommonButton :loading @click="handleSubmit">
        {{ config.component.form.submitText }}
      </CommonButton>
      <CommonButton type="default" :loading @click="handleReset">
        {{ config.component.form.resetText }}
      </CommonButton>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-form {
  margin-bottom: -18px !important;
}

.el-form .el-form-item :deep(.el-form-item__content) {
  width: v-bind('config.component.form.formItem.components.width');
}

.el-form .el-form-item :deep(.el-select),
.el-form .el-form-item :deep(.el-input),
.el-form .el-form-item :deep(.el-date-editor) {
  width: 100%;
}
</style>
