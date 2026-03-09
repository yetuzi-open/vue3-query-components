<script setup lang="ts">
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  name: string
  age: number
  department: string
  salary: number
  level: string
}

const tableData: TableRow[] = [
  { name: '??', age: 28, department: '???', salary: 15000, level: 'P7' },
  { name: '??', age: 32, department: '???', salary: 18000, level: 'P8' },
  { name: '??', age: 26, department: '???', salary: 12000, level: 'P6' },
  { name: '??', age: 30, department: '???', salary: 20000, level: 'P8' },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '??', sortable: true },
  { prop: 'age', label: '??', sortable: true },
  {
    prop: 'department',
    label: '??',
    filters: [
      { text: '???', value: '???' },
      { text: '???', value: '???' },
      { text: '???', value: '???' },
    ],
    filterMethod: (value, row) => row.department === value,
  },
  { prop: 'salary', label: '??', sortable: true },
  {
    prop: 'level',
    label: '??',
    filters: [
      { text: 'P6', value: 'P6' },
      { text: 'P7', value: 'P7' },
      { text: 'P8', value: 'P8' },
    ],
    filterMethod: (value, row) => row.level === value,
  },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">??????????????????????????</p>
    <CommonTable :data="tableData" :columns="columns" />
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
