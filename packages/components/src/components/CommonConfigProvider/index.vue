<script setup lang="ts">
import { provide, reactive, useAttrs, watchEffect } from 'vue'
import { configInjectKey, getCommonProviderConfig } from '../../index'
import { merge, cloneDeep } from 'lodash-es'
import type { Config } from '../../index'
import type { CommonConfigProviderProps } from './type'

/** 定义组件Props */
defineProps<CommonConfigProviderProps>()

/** 获取全局默认配置 */
const config = getCommonProviderConfig()

/** vue sfc 报错，传递给props的值只能在attrs里取 */
const attrs = useAttrs()

/** 当前配置对象，合并默认配置和传入的attrs */
const currentConfig = reactive<Config>(merge(cloneDeep(config), attrs))

/** 向子组件提供配置对象 */
provide(configInjectKey, currentConfig)

/**
 * 使用 watchEffect 自动追踪依赖
 * 当attrs变化时，自动更新currentConfig配置
 */
watchEffect(() => {
  /** 这里会自动追踪 attrs 和 props 的使用 */
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
