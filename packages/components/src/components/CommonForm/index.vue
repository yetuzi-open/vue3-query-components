<script setup lang="ts" generic="T extends AnyObject">
import { ElForm, ElFormItem } from 'element-plus'
import type { FormInstance } from 'element-plus'
import type { Component, VNodeRef } from 'vue'
import { getCurrentInstance, reactive, ref, useAttrs } from 'vue'
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
  CommonTimePicker,
  getCommonProviderConfig,
} from '../../index'
import type { AnyObject } from '../../index'
import type { CommonFormData, CommonFormExpose, CommonFormItemArray, CommonFormProps } from './type'

/** 缁勪欢 Props 瀹氫箟锛屾彁渚涢粯璁ゆ爣绛惧搴︺€佸竷灞€鍜岀┖琛ㄥ崟閰嶇疆 */
const props = withDefaults(defineProps<CommonFormProps<T>>(), {
  labelWidth: 'auto',
  inline: true,
  form() {
    return []
  },
})

/**
 * 鍐呯疆缁勪欢鏄犲皠琛? * 鏍规嵁 `is` 鐨勫瓧绗︿覆鏍囪瘑锛屾槧灏勫埌瀵瑰簲鐨勭粍浠跺疄鐜? */
const componentMap = new Map<string, Component>([
  ['select', CommonSelect],
  ['input', CommonInput],
  ['input-number', CommonInputNumber],
  ['date-picker', CommonDatePicker],
  ['time-picker', CommonTimePicker],
  ['cascader', CommonCascader],
  ['radio', CommonRadio],
  ['check-box', CommonCheckbox],
  ['switch', CommonSwitch],
])

/**
 * 鑾峰彇琛ㄥ崟椤瑰搴旂殑缁勪欢
 * 濡傛灉鏄唴缃粍浠跺瓧绗︿覆锛屽垯浠庢槧灏勮〃涓煡鎵撅紱鑷畾涔夌粍浠剁敱妯℃澘鐩存帴娓叉煋
 */
function getComponent(item: CommonFormItemArray<T>[number]): Component | undefined {
  if (typeof item.is === 'string') {
    return componentMap.get(item.is)
  }
  return undefined
}

const vm = getCurrentInstance()

/** 閫忎紶缁?ElForm 鐨勫睘鎬т笌浜嬩欢 */
const attrs = useAttrs()

/** 缁勪欢浜嬩欢瀹氫箟 */
const emit = defineEmits<{
  /** 琛ㄥ崟鎻愪氦浜嬩欢锛岃繑鍥炲綋鍓嶈〃鍗曟暟鎹?*/
  submit: [formData: AnyObject]
  /** 琛ㄥ崟閲嶇疆浜嬩欢锛岃繑鍥為噸缃悗鐨勮〃鍗曟暟鎹?*/
  reset: [formData: AnyObject]
}>()

/** ElForm 瀹炰緥寮曠敤锛岀敤浜庤皟鐢ㄦ牎楠屽拰閲嶇疆绛夋柟娉?*/
const elFormRef = ref<FormInstance>()

/**
 * 琛ㄥ崟鏁版嵁鍝嶅簲寮忓璞? * 鏍规嵁 `form` 閰嶇疆涓殑 `initialValue` 鍔ㄦ€佺敓鎴愰粯璁ゅ€? */
const formData = reactive<CommonFormData<T>>(
  Object.fromEntries(props.form.map((item) => [item.prop, item.initialValue])) as CommonFormData<T>,
)

/** 鑾峰彇鍏ㄥ眬閰嶇疆 */
const config = getCommonProviderConfig()

/** 鎻愪氦鎸夐挳 loading 鐘舵€侊紝鏀寔 `v-model:loading` 鍙屽悜缁戝畾 */
const loading = defineModel('loading', {
  default: false,
})

/**
 * 琛ㄥ崟鎻愪氦澶勭悊
 * 鍏堣繘琛岃〃鍗曟牎楠岋紝鏍￠獙閫氳繃鍚庡啀瑙﹀彂 submit 浜嬩欢
 */
async function handleSubmit() {
  await elFormRef.value?.validate()
  emit('submit', formData)
}

/**
 * 琛ㄥ崟閲嶇疆澶勭悊
 * 璋冪敤 ElForm 鐨?`resetFields`锛屽苟瑙﹀彂 reset 浜嬩欢
 */
function handleReset() {
  elFormRef.value?.resetFields()
  emit('reset', formData)
}

/**
 * 鍚屾 ElForm 瀹炰緥寮曠敤
 * 鍏煎缁勪欢瀵瑰鏆撮湶 FormInstance 鏂规硶鍜?formData
 */
const changeRef: VNodeRef = (el) => {
  if (vm?.exposed) {
    Object.assign(vm.exposed, {
      ...el,
      formData,
    })
  }
  elFormRef.value = (el ?? undefined) as FormInstance | undefined
}

/** 鏆撮湶琛ㄥ崟鏁版嵁瀵硅薄鍜?ElForm 鏂规硶锛屼緵鐖剁粍浠惰闂?*/
defineExpose<CommonFormExpose>()

defineOptions({
  name: 'CommonForm',
})
</script>

<template>
  <el-form :ref="changeRef" v-bind="{ ...props, ...attrs }" :model="formData" @submit.prevent>
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

    <el-form-item label=" ">
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
/**
 * 琛ㄥ崟鏍峰紡璋冩暣
 * 缁熶竴澶勭悊琛ㄥ崟椤归棿璺濆拰鎺т欢瀹藉害锛屼繚鎸佸悇绫荤粍浠剁殑甯冨眬涓€鑷? */
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