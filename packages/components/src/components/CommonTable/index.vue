<script setup lang="ts" generic="T extends AnyObject">
import { ElEmpty, ElTable, ElTableColumn } from 'element-plus'
import type { TableInstance } from 'element-plus'
import { computed, ref, useAttrs, watch } from 'vue'
import type { VNodeRef } from 'vue'
import { getCommonProviderConfig, getFirstValidValue } from '../../index'
import type { AnyObject } from '../../index'
import { normalizeCommonTableColumns } from './config'
import type { CommonTableColumnRoot, CommonTableExpose, CommonTableProps } from './type'

const NON_CUSTOM_RENDER_COLUMN_TYPES = new Set(['index', 'selection'])

const config = getCommonProviderConfig()

const props = withDefaults(defineProps<CommonTableProps<T>>(), {
  data() {
    return []
  },
})

const attrs = useAttrs()
const elTableRef = ref<TableInstance>()

const tableBindings = computed(() => ({
  ...props,
  ...attrs,
}))

const normalizedColumns = computed(() => normalizeCommonTableColumns(props.columns))

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

const setTableRef: VNodeRef = (el) => {
  elTableRef.value = (el ?? undefined) as TableInstance | undefined
}

const shouldRenderCellSlot = (column: CommonTableColumnRoot<T>) => {
  return !column.type || !NON_CUSTOM_RENDER_COLUMN_TYPES.has(column.type)
}

const getColumnSlotName = (column: CommonTableColumnRoot<T>) => {
  return String(column.prop ?? column.type ?? '')
}

const getCellValue = (row: T, column: CommonTableColumnRoot<T>) => {
  if (!column.prop) {
    return undefined
  }

  return row[column.prop as keyof T]
}

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
