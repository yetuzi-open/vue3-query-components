<script setup lang="ts">
import type { CommonQueryTableProps, CommonQueryTableExpose } from './type'
import {
  CommonTable,
  CommonPagination,
  CommonForm,
  getCommonProviderConfig,
  useResettableReactive,
  filterNullAndUndefined,
  useGetComponentsChildrenSlots,
  useGetComponentsChildrenAttrs
} from '../../index'
import type { PaginationParam, CommonFormExpose, CommonTableExpose } from '../../index'
import { useRequest } from 'vue-hooks-plus'
import { ref, useSlots, type Slots } from 'vue'
import { ElLoading } from 'element-plus'

const vLoading = ElLoading.directive

/** 组件Props定义，提供默认值 */
const props = withDefaults(defineProps<CommonQueryTableProps>(), {
  /** 默认空表单配置 */
  form() {
    return []
  },
})

/** 获取当前组件的插槽 */
const slots: Slots = useSlots()

/** CommonForm组件引用，用于获取表单数据 */
const CommonFormRef = ref<CommonFormExpose>()

/** CommonTable组件引用，用于获取表格选中的行 */
const CommonTableRef = ref<CommonTableExpose>()

/** 获取子组件插槽，支持向内部组件传递插槽 */
const childrenSlots = useGetComponentsChildrenSlots(['table', 'form', 'pagination'])

const childrenAttrs = useGetComponentsChildrenAttrs(['table', 'form', 'pagination'])

/**
 * 初始查询参数
 * 提取表单配置中的初始值作为首次请求的参数
 */
const initFetchParams = Object.fromEntries(props.form.map((item) => [item.prop, item.initialValue]))

/** 获取全局配置 */
const config = getCommonProviderConfig()
/**
 * 分页状态管理
 * 使用可重置的响应式状态管理分页参数
 */
const [page, resetPage] = useResettableReactive<PaginationParam>({
  pageNo: config.component.pagination.defaultPageCount,
  pageSize: config.component.pagination.defaultPageSize,
})

/**
 * 数据请求管理
 * 使用vue-hooks-plus的useRequest管理异步数据请求
 * 自动处理加载状态、错误处理等
 */
const { data, loading, run } = useRequest(props.fetch, {
  /** 默认请求参数，包含分页和表单初始值 */
  defaultParams: [
    {
      ...page,
      ...initFetchParams,
    },
  ],
  /** 初始数据，避免undefined问题 */
  initialData: {
    list: [],
    total: 0,
  },
  /** 错误处理，重置数据 */
  onError() {
    data.value.total = 0
    data.value.list = []
  },
})

/**
 * 表单提交处理函数
 * 当用户点击查询按钮时触发，重新获取数据
 */
function handleFormSubmit() {
  fetchListData()
}

/**
 * 表单重置处理函数
 * 当用户点击重置按钮时触发：
 * 1. 如果分页参数是初始状态，直接重新请求数据
 * 2. 如果分页参数被修改过，重置分页到初始状态（会触发watch重新请求）
 */
function handleFormReset() {
  // 如果页数条数还是初始状态,直接调用请求
  if (
    page.pageNo === config.component.pagination.defaultPageCount &&
    page.pageSize === config.component.pagination.defaultPageSize
  ) {
    fetchListData()
  } else {
    resetPage()
  }
}

/**
 * 分页变化处理函数
 * 当用户切换页码或每页条数时触发
 * @param event - 分页参数对象
 */
function handlePaginationChange(event: PaginationParam) {
  page.pageNo = event.pageNo
  page.pageSize = event.pageSize
  fetchListData()
}

/**
 * 获取列表数据的核心函数
 * 合并分页参数和表单查询参数，过滤空值后发起请求
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

/**
 * 刷新列表数据
 * 使用当前查询条件和分页参数重新请求数据
 */
function refresh() {
  fetchListData()
}

/**
 * 重置查询条件和分页
 * 重置表单字段到初始值，重置分页到第一页，并重新请求数据
 */
function reset() {
  handleFormReset()
}

/**
 * 获取表单数据
 * @returns 当前表单的值对象
 */
function getFormData() {
  return CommonFormRef.value?.formData || {}
}

/**
 * 获取表格选中的行数据
 * @returns 选中的行数据数组
 */
function getSelectionRows() {
  return CommonTableRef.value?.getSelectionRows() || []
}

defineOptions({
  name: 'CommonQueryTable',
})

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

    <!-- Form 表单区域 -->
    <div v-if="slots.form || form.length > 0" class="common-query-table-form">
      <slot name="form">
        <CommonForm ref="CommonFormRef" inline :form="form" v-bind="childrenAttrs.form" v-model:loading="loading" @submit="handleFormSubmit"
          @reset="handleFormReset">
          <template v-for="(name, key) in childrenSlots?.form" :key="key" #[key]="scoped">
            <slot :name="name" v-bind="scoped"> </slot>
          </template>
        </CommonForm>
      </slot>
    </div>

    <!-- Toolbar 工具栏区域 -->
    <div v-if="slots.toolbar" class="common-query-table-toolbar">
      <slot name="toolbar"></slot>
    </div>

    <!-- Table 表格区域 -->
    <div class="common-query-table-table">
      <slot name="table">
        <CommonTable ref="CommonTableRef" v-bind="childrenAttrs.table" :columns="columns" :data="data?.list" v-loading="loading">
          <template v-for="(name, key) in childrenSlots?.table" :key="key" #[key]="scoped">
            <slot :name="name" v-bind="scoped"> </slot>
          </template>
        </CommonTable>
      </slot>
    </div>

    <!-- Pagination 分页区域 -->
    <div v-if="slots.pagination || data?.total" class="common-query-table-pagination">
      <slot name="pagination">
        <CommonPagination v-bind="childrenAttrs.pagination" v-model:page-no="page.pageNo" v-model:page-size="page.pageSize" :total="Number(data?.total)"
          @change="handlePaginationChange">
          <template v-for="(name, key) in childrenSlots?.pagination" :key="key" #[key]="scoped">
            <slot :name="name" v-bind="scoped"> </slot>
          </template>
        </CommonPagination>
      </slot>
    </div>

    <!-- Footer 底部区域 -->
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

[class^='common-query-table-']+[class^='common-query-table-'] {
  margin-top: var(--spacing);
}

.common-query-table .common-query-table-table {
  flex: 1;
  overflow: hidden;
}
</style>
