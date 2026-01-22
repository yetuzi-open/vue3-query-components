<script setup lang="ts" generic="T extends AnyObject">
import { ElTable, ElEmpty, ElTableColumn } from 'element-plus'
import type { CommonTableProps, CommonTableExpose } from './type'
import { computed, ref, watch, useAttrs, getCurrentInstance } from 'vue'
import { getCommonProviderConfig, getFirstValidValue } from '../../index'
import type { AnyObject } from '../../index'
import type { TableInstance } from 'element-plus'
import { getColumnSupplementType } from './config'

/** 全局配置对象 */
const config = getCommonProviderConfig()

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonTableProps<T>>(), {
  /** 默认空数据数组 */
  data() {
    return []
  },
})

const vm = getCurrentInstance()

const attrs = useAttrs()

/** ElTable组件引用，用于调用表格方法 */
const elTableRef = ref<TableInstance>()

/**
 * 数据变化监听
 * 当表格数据更新时，自动滚动到表格顶部，提升用户体验
 */
watch(
  () => props.data,
  () => {
    elTableRef.value?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  },
)

/**
 * 列配置计算属性
 *
 * 处理两种列配置格式：
 * 1. 数组格式：直接使用
 * 2. 对象格式：转换为数组格式
 *
 * 同时处理特殊列类型（如索引、选择框等）的默认配置合并
 *
 * @returns 标准化后的列配置数组
 */
const arrayColumns = computed(() => {
  let columns = props.columns

  // 对象格式转数组格式
  if (!Array.isArray(columns)) {
    columns = Object.entries(columns).map(([key, value]) => ({
      ...value,
      prop: key,
    }))
  }

  // 处理特殊列类型的默认配置
  return columns.map((item) => {
    if (item.type) {
      const supplementConfig = getColumnSupplementType(item.type)
      if (supplementConfig) {
        return Object.assign(supplementConfig, {
          ...item,
          prop: item.prop as string,
        })
      }
    }
    return {
      ...item,
      prop: item.prop as string,
    }
  })
})


function changeRef(el?: any) {
  if(vm?.exposed && el){
    vm.exposed = el
  }
  elTableRef.value = el
}

/** 暴露 ElTable 方法，供父组件访问 */
defineExpose<CommonTableExpose>()

defineOptions({
  name: 'CommonTable',
})

</script>

<template>
  <div class="common-table">
    <el-table
      :ref="changeRef"
      v-bind="{ ...props, ...attrs }"
      height="100%"
    >
      <el-table-column v-bind="column" v-for="column in arrayColumns" :key="column.prop">
        <template v-if="!column.formatter" #default="scoped">
          <slot
            :name="column.prop"
            :row="scoped.row"
            :column="scoped.column"
            :index="scoped.$index"
            :value="scoped.row[column.prop]"
            v-if="column.type ? !['index', 'selection', 'expand'].includes(column.type) : true"
          >
            {{ getFirstValidValue(scoped.row[column.prop], config.component.placeholder) }}
          </slot>
        </template>
      </el-table-column>

      <template #empty>
        <slot name="empty">
          <el-empty description="暂无数据" />
        </slot>
      </template>
    </el-table>
  </div>
</template>

<style scoped>
.common-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
