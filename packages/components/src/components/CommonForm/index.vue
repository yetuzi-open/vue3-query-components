<script setup lang="ts" generic="T extends AnyObject">
import { ElForm, ElFormItem, ElButton } from 'element-plus'
import type { FormInstance } from 'element-plus'

import type { CommonFormProps, CommonFormData, CommonFormExpose, CommonFormItemArray } from './type'

import {
  CommonSelect,
  CommonInput,
  CommonDatePicker,
  CommonRadio,
  getCommonProviderConfig,
  CommonCheckbox,
  CommonSwitch,
  CommonButton,
} from '../../index'
import type { AnyObject } from '../../index'
import type { Component } from 'vue'
import { reactive, ref, useAttrs, getCurrentInstance } from 'vue'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonFormProps<T>>(), {
  labelWidth: 'auto',
  inline: true,
  form() {
    return []
  },
})

/**
 * 内置组件映射
 * 使用 Map 存储组件类型映射
 */
const componentMap = new Map<string, Component>([
  ['select', CommonSelect],
  ['input', CommonInput],
  ['date-picker', CommonDatePicker],
  ['radio', CommonRadio],
  ['check-box', CommonCheckbox],
  ['switch', CommonSwitch],
])

/**
 * 获取对应的组件
 * 如果是内置组件类型，返回对应组件；否则返回 undefined
 */
function getComponent(item: CommonFormItemArray<T>[number]): Component | undefined {
  if (typeof item.is === 'string') {
    return componentMap.get(item.is)
  }
  return undefined
}

const vm = getCurrentInstance()

const attrs = useAttrs()

/** 定义组件事件 */
const emit = defineEmits<{
  /** 表单提交事件，返回表单数据 */
  submit: [formData: AnyObject]
  /** 表单重置事件，返回重置后的表单数据 */
  reset: [formData: AnyObject]
}>()

/** ElForm组件引用，用于调用表单方法 */
const elFormRef = ref<FormInstance>()
/**
 * 表单数据响应式对象
 * 根据form配置动态生成，使用initialValue作为默认值
 */
const formData = reactive<CommonFormData<T>>(
  Object.fromEntries(props.form.map((item) => [item.prop, item.initialValue])) as CommonFormData<T>,
)

/** 获取全局配置 */
const config = getCommonProviderConfig()

/** 加载状态，支持v-model双向绑定 */
const loading = defineModel('loading', {
  default: false,
})

/**
 * 表单提交处理函数
 *
 * 1. 触发表单验证
 * 2. 验证通过后触发表单提交事件
 * 3. 返回当前表单数据
 */
async function handleSubmit() {
  await elFormRef.value?.validate()
  emit('submit', formData)
}

/**
 * 表单重置处理函数
 *
 * 1. 调用 ElForm 的 resetFields 方法重置表单字段
 * 2. 触发表单重置事件
 * 3. 返回重置后的表单数据
 */
function handleReset() {
  elFormRef.value?.resetFields()
  emit('reset', formData)
}


function changeRef(el?: any) {
  if(vm?.exposed){
    Object.assign(vm.exposed, {
      ...el,
      formData,
    })
  }
  elFormRef.value = el
}

/** 暴露表单数据对象和 ElForm 方法，供父组件访问 */
defineExpose<CommonFormExpose>()

/** 组件选项配置 */
defineOptions({
  name: 'CommonForm',
})
</script>

<template>
  <!-- 表单容器，绑定表单数据和验证规则 -->
  <el-form :ref="changeRef" v-bind="{ ...props, ...attrs }" :model="formData" @submit.prevent>
    <!--
      动态表单项渲染
      根据form配置数组动态生成表单项，每个表单项包含：
      - formItem: ElFormItem的配置
      - prop: 表单字段名
      - is: 组件类型（字符串或自定义组件）
      - props: 传递给组件的props
    -->
    <el-form-item
      v-bind="item.formItem"
      :label="item.label"
      :prop="String(item.prop)"
      v-for="item in form"
      :key="item.prop"
    >
      <slot
        :name="item.prop"
        :props="item.props"
        :value="formData[item.prop]"
        :updateValue="(val: any) => (formData[item.prop] = val)"
      >
        <!-- 使用 getComponent 函数获取内置组件 -->
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          v-bind="item.props"
          :modelValue="formData[item.prop]"
          @update:modelValue="(val: any) => (formData[item.prop] = val)"
        />
        <!-- 自定义组件 -->
        <component
          v-else-if="typeof item.is !== 'string'"
          :is="item.is"
          v-bind="item.props"
          :modelValue="formData[item.prop]"
          @update:modelValue="(val: any) => (formData[item.prop] = val)"
        />
      </slot>
    </el-form-item>

    <!-- 操作按钮区域 -->
    <el-form-item label=" ">
      <!-- 提交按钮，触发表单验证和提交 -->
      <CommonButton :loading @click="handleSubmit">
        {{ config.component.form.submitText }}
      </CommonButton>
      <!-- 重置按钮，重置表单数据 -->
      <CommonButton type="default" :loading @click="handleReset">{{
        config.component.form.resetText
      }}</CommonButton>
    </el-form-item>
  </el-form>
</template>

<style scoped>
/**
 * 表单样式调整
 *
 * 解决表单布局问题：
 * 1. 负边距处理：抵消 el-form-item 的默认下边距，保持表单间距一致
 * 2. 内容宽度：通过 CSS 变量绑定配置中的组件宽度
 */
.el-form {
  /* 需要减去 el-form-item 的下边距高度，保持在使用时间距一致 */
  margin-bottom: -18px !important;
}
.el-form .el-form-item :deep(.el-form-item__content) {
  /* 使用配置中的组件宽度，确保表单控件宽度一致 */
  width: v-bind('config.component.form.formItem.components.width');
}
/* 为所有表单控件添加统一宽度 */
.el-form .el-form-item :deep(.el-select),
.el-form .el-form-item :deep(.el-input),
.el-form .el-form-item :deep(.el-date-editor) {
  width: 100%;
}
</style>
