<script setup lang="ts" generic="T extends AnyObject">
import { ElEmpty, ElTable, ElTableColumn } from 'element-plus'
import type { TableInstance } from 'element-plus'
import { computed, ref, useAttrs, watch } from 'vue'
import type { VNodeRef } from 'vue'
import { getCommonProviderConfig, getFirstValidValue } from '../../index'
import type { AnyObject } from '../../index'
import { normalizeCommonTableColumns } from './config'
import type { CommonTableColumnRoot, CommonTableExpose, CommonTableProps } from './type'

/**
 * 不渲染默认单元格插槽的内置列类型
 * 这类列由 Element Plus 自身接管渲染，无需再走通用兜底逻辑
 */
const NON_CUSTOM_RENDER_COLUMN_TYPES = new Set(['index', 'selection'])

/** 获取全局配置对象 */
const config = getCommonProviderConfig()

/** 组件 Props 定义，提供默认空数据 */
const props = withDefaults(defineProps<CommonTableProps<T>>(), {
  data() {
    return []
  },
})

/** 透传给 ElTable 的原生属性与事件 */
const attrs = useAttrs()

/** ElTable 组件实例引用，用于调用表格方法 */
const elTableRef = ref<TableInstance>()

/**
 * 表格绑定属性
 * 合并组件 Props 与外部传入 attrs，统一透传给 ElTable
 */
const tableBindings = computed(() => ({
  ...props,
  ...attrs,
}))

/**
 * 标准化列配置
 * 支持数组/对象两种输入形式，并自动合并内置列类型的默认配置
 */
const normalizedColumns = computed(() => normalizeCommonTableColumns(props.columns))

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
 * 表格实例 ref 回调
 * 将 ElTable 实例保存到本地，供内部和外部 expose 共用
 */
const setTableRef: VNodeRef = (el) => {
  elTableRef.value = (el ?? undefined) as TableInstance | undefined
}

/**
 * 是否渲染默认单元格插槽
 * 索引列、选择列等内置列无需渲染通用 slot 模板
 */
const shouldRenderCellSlot = (column: CommonTableColumnRoot<T>) => {
  return !column.type || !NON_CUSTOM_RENDER_COLUMN_TYPES.has(column.type)
}

/**
 * 获取列插槽名
 * 优先使用 prop，若无 prop 则回退到 type，兼容 expand 等特殊列
 */
const getColumnSlotName = (column: CommonTableColumnRoot<T>) => {
  return String(column.prop ?? column.type ?? '')
}

/**
 * 获取单元格原始值
 * 对没有 prop 的列返回 undefined，避免访问异常
 */
const getCellValue = (row: T, column: CommonTableColumnRoot<T>) => {
  if (!column.prop) {
    return undefined
  }

  return row[column.prop as keyof T]
}

/**
 * 获取单元格展示值
 * 优先执行列 formatter，其次使用原始值，最后回退到全局占位符
 */
const getCellDisplayValue = (
  scoped: {
    row: T
    column: Parameters<NonNullable<CommonTableColumnRoot<T>['formatter']>>[1]
    $index: number
  },
  column: CommonTableColumnRoot<T>,
) => {
  if (column.type === 'expand') {
    return ''
  }

  const rawValue = getCellValue(scoped.row, column)
  const value =
    typeof column.formatter === 'function'
      ? column.formatter(scoped.row, scoped.column, rawValue, scoped.$index)
      : rawValue

  return getFirstValidValue(value, config.component.placeholder)
}

/**
 * 暴露给父组件的表格实例代理
 * 保持 CommonTable 的 ref 调用方式与 ElTable 基本一致，同时避免直接覆写 vm.exposed
 */
const exposed = new Proxy({} as CommonTableExpose, {
  get(_, key) {
    const table = elTableRef.value as (Record<PropertyKey, unknown> & TableInstance) | undefined
    const value = table?.[key]
    return typeof value === 'function' ? value.bind(table) : value
  },
  has(_, key) {
    return key in (elTableRef.value ?? {})
  },
  ownKeys() {
    return Reflect.ownKeys(elTableRef.value ?? {})
  },
  getOwnPropertyDescriptor(_, key) {
    return (
      Object.getOwnPropertyDescriptor(elTableRef.value ?? {}, key) ?? {
        configurable: true,
        enumerable: true,
      }
    )
  },
})

/** 暴露 ElTable 方法，供父组件访问 */
defineExpose<CommonTableExpose>(exposed)

defineOptions({
  name: 'CommonTable',
})
</script>

<template>
  <div class="common-table">
    <el-table :ref="setTableRef" v-bind="tableBindings" height="100%">
      <el-table-column
        v-for="column in normalizedColumns"
        :key="column.columnKey || column.prop || column.type"
        v-bind="column"
      >
        <template v-if="shouldRenderCellSlot(column)" #default="scoped">
          <slot
            :name="getColumnSlotName(column)"
            :row="scoped.row"
            :column="scoped.column"
            :index="scoped.$index"
            :value="getCellValue(scoped.row, column)"
          >
            {{ getCellDisplayValue(scoped, column) }}
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