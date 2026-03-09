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
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    address: '北京市朝阳区建国路 88 号',
    department: '技术部',
    salary: '15000',
  },
  {
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138002',
    address: '上海市浦东新区陆家嘴金融中心',
    department: '产品部',
    salary: '18000',
  },
  {
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138003',
    address: '广州市天河区珠江新城',
    department: '设计部',
    salary: '12000',
  },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '姓名', width: 100, fixed: 'left' },
  { prop: 'email', label: '邮箱', width: 220 },
  { prop: 'phone', label: '电话', width: 140 },
  { prop: 'address', label: '地址', width: 260, showOverflowTooltip: true },
  { prop: 'department', label: '部门', width: 100 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'operation', label: '操作', width: 160, fixed: 'right' },
]
</script>

<template>
  <CommonTable :data="tableData" :columns="columns" border>
    <template #operation>
      <ElButton size="small" type="primary">编辑</ElButton>
      <ElButton size="small" type="danger">删除</ElButton>
    </template>
  </CommonTable>
</template>