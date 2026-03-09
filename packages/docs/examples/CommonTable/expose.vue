<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import {
  CommonTable,
  type CommonTableArrayColumns,
  type CommonTableExpose,
} from '@yetuzi/vue3-query-components'

interface TableRow {
  id: number
  name: string
  status: number
  createTime: number
}

const tableRef = ref<CommonTableExpose>()

const tableData: TableRow[] = [
  { id: 1, name: '张敏', status: 1, createTime: 1705278600000 },
  { id: 2, name: '李婷', status: 0, createTime: 1705377600000 },
  { id: 3, name: '王凯', status: 1, createTime: 1705454100000 },
  { id: 4, name: '赵磊', status: 0, createTime: 1705540500000 },
  { id: 5, name: '孙航', status: 1, createTime: 1705626900000 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '姓名', sortable: true },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: (row) => (row.status === 1 ? '启用' : '停用'),
  },
  { prop: 'createTime', label: '创建时间', width: 180, type: 'dateTime' },
]

function handleClearSelection() {
  tableRef.value?.clearSelection()
  ElMessage.info('已清空所有选中项')
}

function handleToggleRow() {
  tableRef.value?.toggleRowSelection(tableData[0])
  ElMessage.success('已切换第一行的选中状态')
}

function handleToggleAll() {
  tableRef.value?.toggleAllSelection()
  ElMessage.info('已切换全选状态')
}

function handleSetCurrentRow() {
  tableRef.value?.setCurrentRow(tableData[1])
  ElMessage.success('已将第二行设置为当前行')
}

function handleClearSort() {
  tableRef.value?.clearSort()
  ElMessage.info('已清空排序')
}

function handleSort() {
  tableRef.value?.sort('createTime', 'descending')
  ElMessage.success('已按创建时间降序排序')
}

function handleScrollToTop() {
  tableRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  ElMessage.info('已滚动到顶部')
}
</script>

<template>
  <div class="expose-demo">
    <p class="demo-description">`CommonTable` 通过 `ref` 暴露了大量表格实例方法，方便做交互联动。</p>

    <CommonTable ref="tableRef" :data="tableData" :columns="columns" height="300px" />

    <div class="demo-actions">
      <ElButton @click="handleClearSelection">清空选择</ElButton>
      <ElButton @click="handleToggleRow">切换第一行选中</ElButton>
      <ElButton @click="handleToggleAll">全选 / 取消全选</ElButton>
      <ElButton @click="handleSetCurrentRow">设置当前行</ElButton>
      <ElButton @click="handleClearSort">清空排序</ElButton>
      <ElButton @click="handleSort">按时间降序</ElButton>
      <ElButton @click="handleScrollToTop">滚动到顶部</ElButton>
    </div>
  </div>
</template>

<style scoped>
.expose-demo {
  display: grid;
  gap: 16px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.demo-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
