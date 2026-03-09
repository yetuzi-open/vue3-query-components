<script setup lang="ts">
import { cloneDeep, merge } from 'lodash-es'
import { reactive, provide, useAttrs, watchEffect } from 'vue'
import { configInjectKey, getCommonProviderConfig } from '../../index'
import type { Config } from '../../index'
import type { CommonConfigProviderProps } from './type'

/**
 * 组件 Props 定义
 * 这里通过 attrs 接收运行时传入的配置对象，并与上层配置合并
 */
defineProps<CommonConfigProviderProps>()

/** 获取上层配置或全局默认配置 */
const config = getCommonProviderConfig()

/**
 * 在 Vue SFC 中，透传给 Provider 的深层对象更适合通过 attrs 读取
 * 这样可以避免模板展开时的类型与响应式限制问题
 */
const attrs = useAttrs()

/**
 * 当前作用域的配置对象
 * 以“上层配置 + 当前传入配置”的方式生成，并保持响应式更新
 */
const currentConfig = reactive<Config>(merge(cloneDeep(config), attrs))

/** 向子组件提供合并后的配置对象 */
provide(configInjectKey, currentConfig)

/**
 * 自动跟踪 attrs 变化
 * 当外部配置发生变化时，实时同步到当前作用域配置
 */
watchEffect(() => {
  Object.assign(currentConfig, merge(cloneDeep(config), attrs))
})

defineOptions({
  name: 'CommonConfigProvider',
  inheritAttrs: false,
})
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>