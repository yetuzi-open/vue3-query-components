<script setup lang="ts">
import { ElButton } from 'element-plus'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  id: number
  name: string
  status: number
  createTime: number
}

const tableData: TableRow[] = [
  { id: 1, name: '??', status: 1, createTime: 1705278600000 },
  { id: 2, name: '??', status: 0, createTime: 1705377600000 },
  { id: 3, name: '??', status: 1, createTime: 1705454100000 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '???', sortable: true },
  {
    prop: 'status',
    label: '??',
    width: 100,
    formatter: (row) => (row.status === 1 ? '??' : '??'),
  },
  { prop: 'createTime', label: '????', width: 180, type: 'dateTime' },
  { prop: 'operation', label: '??', width: 160, fixed: 'right' },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">?????????????????????????????</p>

    <CommonTable :data="tableData" :columns="columns">
      <template #operation>
        <ElButton link type="primary" size="small">??</ElButton>
        <ElButton link type="danger" size="small">??</ElButton>
      </template>
    </CommonTable>
  </div>
</template>

<style scoped>
.table-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
</style>
