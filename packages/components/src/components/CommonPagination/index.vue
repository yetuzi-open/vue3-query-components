<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { computed, useAttrs, watch } from 'vue'
import type { PaginationParam } from '../../index'
import type { CommonPaginationProps } from './type'

/**
 * 组件 Props 定义。
 *
 * 在 Element Plus 原生分页属性基础上补充默认值，
 * 让业务场景下可以直接使用常见分页布局。
 */
const props = withDefaults(defineProps<CommonPaginationProps>(), {
  /** 数据总条数。 */
  total: 0,
  /** 是否显示带背景色的分页按钮。 */
  background: true,
  /** 下拉面板是否挂载到 body。 */
  teleported: true,
  /** 默认分页布局。 */
  layout: 'slot, ->, total, sizes, prev, pager, next, jumper',
  /** 默认每页条数选项。 */
  pageSizes: () => [10, 20, 30, 40, 50],
})

/** 透传给 `ElPagination` 的原生属性与事件。 */
const attrs = useAttrs()

/**
 * 分页组件变更事件。
 *
 * 当页码或每页条数变化时，统一抛出当前分页参数。
 */
const emit = defineEmits<{
  change: [PaginationParam]
}>()

/** 当前页码，支持 `v-model:pageNo`。 */
const pageNo = defineModel('pageNo', {
  type: Number,
  required: true,
})

/** 每页条数，支持 `v-model:pageSize`。 */
const pageSize = defineModel('pageSize', {
  type: Number,
  required: true,
})

/**
 * 透传给 `ElPagination` 的最终绑定对象。
 *
 * 组件默认值优先提供常用行为，外部 `attrs` 仍可覆盖同名配置。
 */
const paginationBindings = computed(() => ({
  ...props,
  ...attrs,
}))

/** 抛出最新的分页参数。 */
const emitChange = () => {
  emit('change', {
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  })
}

/**
 * 监听每页条数变化。
 *
 * - 当前已经在第一页时，直接抛出变更事件。
 * - 当前不在第一页时，先重置到第一页，再由页码监听统一抛出事件。
 */
watch(
  () => pageSize.value,
  () => {
    if (pageNo.value === 1) {
      emitChange()
      return
    }

    pageNo.value = 1
  },
)

/** 监听页码变化，并统一抛出分页参数。 */
watch(
  () => pageNo.value,
  () => {
    emitChange()
  },
)

defineOptions({
  name: 'CommonPagination',
})
</script>

<template>
  <el-pagination
    v-bind="paginationBindings"
    v-model:page-size="pageSize"
    v-model:current-page="pageNo"
  >
    <slot></slot>
  </el-pagination>
</template>

<style scoped></style>
