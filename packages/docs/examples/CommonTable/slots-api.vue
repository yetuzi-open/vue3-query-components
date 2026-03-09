<script setup lang="ts">
import { ElTag } from 'element-plus'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  id: number
  name: string
  status: number
}

const tableData: TableRow[] = [
  { id: 1, name: '张三', status: 1 },
  { id: 2, name: '李四', status: 0 },
  { id: 3, name: '王五', status: 1 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '状态' },
]
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #status="{ row }">
      <ElTag :type="row.status ? 'success' : 'danger'">
        {{ row.status ? '启用' : '禁用' }}
      </ElTag>
    </template>
  </CommonTable>
</template>