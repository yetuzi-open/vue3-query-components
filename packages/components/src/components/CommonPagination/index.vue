<script setup lang="ts">
import { watch } from 'vue'
import type { CommonPaginationProps } from './type'
import { ElPagination } from 'element-plus'
import { useAttrs } from 'vue'
import type { PaginationParam } from '../../index'

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonPaginationProps>(), {
  /** 总数 */
  total: 0,
  /** 带有背景色的分页 */
  background: true,
  /** 是否将下拉菜单teleport至 body */
  teleported: true,
  /** 组件布局，子组件名用逗号分隔 */
  layout: 'slot, ->, total, sizes, prev, pager, next, jumper',
  /** 每页显示个数选择器的选项设置 */
  pageSizes: () => [10, 20, 30, 40, 50],
})

const attrs = useAttrs()

/** 定义组件事件 */
const emit = defineEmits<{
  /** 分页变化事件，返回当前页码和每页条数 */
  change: [PaginationParam]
}>()

/** 当前页码，支持v-model双向绑定 */
const pageNo = defineModel('pageNo', {
  /** 数值类型 */
  type: Number,
  /** 必填项 */
  required: true,
})
/** 每页显示条数，支持v-model双向绑定 */
const pageSize = defineModel('pageSize', {
  /** 数值类型 */
  type: Number,
  /** 必填项 */
  required: true,
})

/**
 * 每页条数变化监听
 * 当每页显示条数改变时，自动重置为第一页，确保数据正确显示
 */
watch(
  () => pageSize.value,
  () => {
    if(pageNo.value === 1){
      emit('change', {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      })
    }else {
      pageNo.value = 1
    }
  },
)

/**
 * 页码变化监听
 * 当页码改变时，触发change事件，返回当前分页参数
 */
watch(
  () => pageNo.value,
  () => {
    emit('change', {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
    })
  },
)

defineOptions({
  name: 'CommonPagination',
})
</script>

<template>
  <el-pagination v-bind="{ ...props, ...attrs }" v-model:page-size="pageSize" v-model:current-page="pageNo">
    <slot></slot>
  </el-pagination>
</template>

<style scoped></style>
