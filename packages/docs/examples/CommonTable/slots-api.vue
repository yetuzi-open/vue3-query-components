<script setup lang="ts">
import { ElTag } from 'element-plus'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  id: number
  name: string
  status: number
}

const tableData: TableRow[] = [
  { id: 1, name: '??', status: 1 },
  { id: 2, name: '??', status: 0 },
  { id: 3, name: '??', status: 1 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '??' },
  { prop: 'status', label: '??' },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">???????????????????????????????</p>

    <CommonTable :data="tableData" :columns="columns">
      <template #status="{ row }">
        <ElTag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '??' : '??' }}
        </ElTag>
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
