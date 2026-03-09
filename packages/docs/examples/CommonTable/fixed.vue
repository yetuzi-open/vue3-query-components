<script setup lang="ts">
import { ElButton } from 'element-plus'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  name: string
  email: string
  phone: string
  address: string
  department: string
  salary: string
}

const tableData: TableRow[] = [
  {
    name: '??',
    email: 'zhangmin@example.com',
    phone: '13800138001',
    address: '????????? 88 ?',
    department: '???',
    salary: '15000',
  },
  {
    name: '??',
    email: 'liting@example.com',
    phone: '13800138002',
    address: '?????????? 88 ?',
    department: '???',
    salary: '18000',
  },
  {
    name: '??',
    email: 'wangkai@example.com',
    phone: '13800138003',
    address: '??????????',
    department: '???',
    salary: '12000',
  },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '??', width: 100, fixed: 'left' },
  { prop: 'email', label: '??', width: 220 },
  { prop: 'phone', label: '??', width: 140 },
  { prop: 'address', label: '??', width: 260, showOverflowTooltip: true },
  { prop: 'department', label: '??', width: 100 },
  { prop: 'salary', label: '??', width: 100 },
  { prop: 'operation', label: '??', width: 160, fixed: 'right' },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">??????????????????????????????</p>

    <CommonTable :data="tableData" :columns="columns" border>
      <template #operation>
        <ElButton size="small" type="primary">??</ElButton>
        <ElButton size="small" type="danger">??</ElButton>
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
