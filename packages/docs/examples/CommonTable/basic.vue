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
  { id: 1, name: '张三', status: 1, createTime: 1705278600000 },
  { id: 2, name: '李四', status: 0, createTime: 1705377600000 },
  { id: 3, name: '王五', status: 1, createTime: 1705454100000 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '姓名', sortable: true },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: (row) => (row.status === 1 ? '启用' : '禁用'),
  },
  { prop: 'createTime', label: '创建时间', width: 180, type: 'dateTime' },
  { prop: 'operation', label: '操作', width: 160, fixed: 'right' },
]
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #operation>
      <ElButton link type="primary" size="small">编辑</ElButton>
      <ElButton link type="danger" size="small">删除</ElButton>
    </template>
  </CommonTable>
</template>