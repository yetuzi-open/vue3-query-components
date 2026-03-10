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
  { name: '张敏', age: 28, department: '技术部', salary: 15000, level: 'P7' },
  { name: '李婷', age: 32, department: '产品部', salary: 18000, level: 'P8' },
  { name: '王凯', age: 26, department: '设计部', salary: 12000, level: 'P6' },
  { name: '赵磊', age: 30, department: '技术部', salary: 20000, level: 'P8' },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'age', label: '年龄', sortable: true },
  {
    prop: 'department',
    label: '部门',
    filters: [
      { text: '技术部', value: '技术部' },
      { text: '产品部', value: '产品部' },
      { text: '设计部', value: '设计部' },
    ],
    filterMethod: (value, row) => row.department === value,
  },
  { prop: 'salary', label: '薪资', sortable: true },
  {
    prop: 'level',
    label: '职级',
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
    <p class="demo-description">原生排序和筛选能力会完整透传，适合中后台数据分析页。</p>
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
