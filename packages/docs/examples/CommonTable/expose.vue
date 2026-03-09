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
  { id: 1, name: '??', status: 1, createTime: 1705278600000 },
  { id: 2, name: '??', status: 0, createTime: 1705377600000 },
  { id: 3, name: '??', status: 1, createTime: 1705454100000 },
  { id: 4, name: '??', status: 0, createTime: 1705540500000 },
  { id: 5, name: '??', status: 1, createTime: 1705626900000 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '??', sortable: true },
  {
    prop: 'status',
    label: '??',
    width: 100,
    formatter: (row) => (row.status === 1 ? '??' : '??'),
  },
  { prop: 'createTime', label: '????', width: 180, type: 'dateTime' },
]

function handleClearSelection() {
  tableRef.value?.clearSelection()
  ElMessage.info('????????')
}

function handleToggleRow() {
  tableRef.value?.toggleRowSelection(tableData[0])
  ElMessage.success('???????????')
}

function handleToggleAll() {
  tableRef.value?.toggleAllSelection()
  ElMessage.info('???????')
}

function handleSetCurrentRow() {
  tableRef.value?.setCurrentRow(tableData[1])
  ElMessage.success('???????????')
}

function handleClearSort() {
  tableRef.value?.clearSort()
  ElMessage.info('?????')
}

function handleSort() {
  tableRef.value?.sort('createTime', 'descending')
  ElMessage.success('??????????')
}

function handleScrollToTop() {
  tableRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  ElMessage.info('??????')
}
</script>

<template>
  <div class="expose-demo">
    <p class="demo-description">`CommonTable` ?? `ref` ????????????????????</p>

    <CommonTable ref="tableRef" :data="tableData" :columns="columns" height="300px" />

    <div class="demo-actions">
      <ElButton @click="handleClearSelection">????</ElButton>
      <ElButton @click="handleToggleRow">???????</ElButton>
      <ElButton @click="handleToggleAll">?? / ????</ElButton>
      <ElButton @click="handleSetCurrentRow">?????</ElButton>
      <ElButton @click="handleClearSort">????</ElButton>
      <ElButton @click="handleSort">?????</ElButton>
      <ElButton @click="handleScrollToTop">?????</ElButton>
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
