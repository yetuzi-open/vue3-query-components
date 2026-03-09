<script setup lang="ts">
import type { CommonQueryTableExpose, CommonQueryTableProps } from './type'
import {
  CommonForm,
  CommonPagination,
  CommonTable,
  filterNullAndUndefined,
  getCommonProviderConfig,
  useGetComponentsChildrenAttrs,
  useGetComponentsChildrenSlots,
  useResettableReactive,
} from '../../index'
import type { CommonFormExpose, CommonTableExpose, PaginationParam } from '../../index'
import { ElLoading } from 'element-plus'
import { useRequest } from 'vue-hooks-plus'
import { ref, type Slots, useSlots } from 'vue'

const vLoading = ElLoading.directive

/** 组件 Props 定义，默认不传表单配置时使用空数组 */
const props = withDefaults(defineProps<CommonQueryTableProps>(), {
  form() {
    return []
  },
})

/** 当前组件的布局插槽 */
const slots: Slots = useSlots()

/** 内部 CommonForm 实例引用，用于读取表单值 */
const CommonFormRef = ref<CommonFormExpose>()

/** 内部 CommonTable 实例引用，用于读取表格选中项 */
const CommonTableRef = ref<CommonTableExpose>()

/**
 * 子组件插槽映射
 * 支持通过 `form-*`、`table-*`、`pagination-*` 的方式向内部组件透传插槽
 */
const childrenSlots = useGetComponentsChildrenSlots(['table', 'form', 'pagination'])

/**
 * 子组件属性映射
 * 支持通过前缀属性和事件向内部组件透传额外配置
 */
const childrenAttrs = useGetComponentsChildrenAttrs(['table', 'form', 'pagination'])

/**
 * 初始查询参数
 * 从表单项配置中提取 `initialValue` 作为首次请求参数
 */
const initFetchParams = Object.fromEntries(props.form.map((item) => [item.prop, item.initialValue]))

/** 获取全局配置 */
const config = getCommonProviderConfig()

/**
 * 分页状态管理
 * 使用可重置的响应式对象，便于在 reset 场景下恢复默认分页参数
 */
const [page, resetPage] = useResettableReactive<PaginationParam>({
  pageNo: config.component.pagination.defaultPageCount,
  pageSize: config.component.pagination.defaultPageSize,
})

/**
 * 列表请求管理
 * 使用 `useRequest` 统一处理首次加载、手动刷新和错误兜底
 */
const { data, loading, run } = useRequest(props.fetch, {
  defaultParams: [
    {
      ...page,
      ...initFetchParams,
    },
  ],
  initialData: {
    list: [],
    total: 0,
  },
  onError() {
    data.value.total = 0
    data.value.list = []
  },
})

/** 表单提交时重新获取列表数据 */
function handleFormSubmit() {
  fetchListData()
}

/**
 * 表单重置处理
 * 如果分页本身就是默认值，则直接请求；否则先重置分页，再触发后续请求流程
 */
function handleFormReset() {
  if (
    page.pageNo === config.component.pagination.defaultPageCount &&
    page.pageSize === config.component.pagination.defaultPageSize
  ) {
    fetchListData()
  } else {
    resetPage()
  }
}

/** 分页变化时同步分页状态，并重新获取列表数据 */
function handlePaginationChange(event: PaginationParam) {
  page.pageNo = event.pageNo
  page.pageSize = event.pageSize
  fetchListData()
}

/**
 * 获取列表数据
 * 合并分页参数和表单参数，并过滤空值后再发起请求
 */
function fetchListData() {
  const formData = CommonFormRef.value?.formData || {}
  run(
    filterNullAndUndefined({
      ...page,
      ...formData,
    }),
  )
}

/** 使用当前查询条件刷新列表 */
function refresh() {
  fetchListData()
}

/** 重置表单和分页，并重新获取列表 */
function reset() {
  handleFormReset()
}

/** 获取当前表单值 */
function getFormData() {
  return CommonFormRef.value?.formData || {}
}

/** 获取当前表格选中行 */
function getSelectionRows() {
  return CommonTableRef.value?.getSelectionRows() || []
}

defineOptions({
  name: 'CommonQueryTable',
})

/** 暴露组合组件常用方法，供父组件通过 ref 调用 */
defineExpose<CommonQueryTableExpose>({
  refresh,
  reset,
  getFormData,
  getSelectionRows,
})
</script>

<template>
  <div class="common-query-table">
    <!-- Header 区域 -->
    <div v-if="slots.header" class="common-query-table-header">
      <slot name="header"></slot>
    </div>

    <!-- Form 区域 -->
    <div v-if="slots.form || form.length > 0" class="common-query-table-form">
      <slot name="form">
        <CommonForm
          ref="CommonFormRef"
          inline
          :form="form"
          v-bind="childrenAttrs.form"
          v-model:loading="loading"
          @submit="handleFormSubmit"
          @reset="handleFormReset"
        >
          <template v-for="(name, key) in childrenSlots?.form" :key="key" #[key]="scoped">
            <slot :name="name" v-bind="scoped"></slot>
          </template>
        </CommonForm>
      </slot>
    </div>

    <!-- Toolbar 区域 -->
    <div v-if="slots.toolbar" class="common-query-table-toolbar">
      <slot name="toolbar"></slot>
    </div>

    <!-- Table 区域 -->
    <div class="common-query-table-table">
      <slot name="table">
        <CommonTable
          ref="CommonTableRef"
          v-bind="childrenAttrs.table"
          :columns="columns"
          :data="data?.list"
          v-loading="loading"
        >
          <template v-for="(name, key) in childrenSlots?.table" :key="key" #[key]="scoped">
            <slot :name="name" v-bind="scoped"></slot>
          </template>
        </CommonTable>
      </slot>
    </div>

    <!-- Pagination 区域 -->
    <div v-if="slots.pagination || data?.total" class="common-query-table-pagination">
      <slot name="pagination">
        <CommonPagination
          v-bind="childrenAttrs.pagination"
          v-model:page-no="page.pageNo"
          v-model:page-size="page.pageSize"
          :total="Number(data?.total)"
          @change="handlePaginationChange"
        >
          <template v-for="(name, key) in childrenSlots?.pagination" :key="key" #[key]="scoped">
            <slot :name="name" v-bind="scoped"></slot>
          </template>
        </CommonPagination>
      </slot>
    </div>

    <!-- Footer 区域 -->
    <div v-if="slots.footer" class="common-query-table-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.common-query-table {
  --spacing: 15px;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: var(--spacing) 12px;
  overflow: hidden;
}

[class^='common-query-table-'] {
  width: 100%;
}

[class^='common-query-table-'] + [class^='common-query-table-'] {
  margin-top: var(--spacing);
}

.common-query-table .common-query-table-table {
  flex: 1;
  overflow: hidden;
}
</style>