<script setup lang="ts">
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

interface CustomerRow {
  id: number
  name: string
  level: string
  status: number
  createTime: number
}

const fetch = async () => {
  return {
    list: [
      { id: 1, name: '上海智选科技', level: 'A', status: 1, createTime: 1705278600000 },
      { id: 2, name: '杭州云桥数据', level: 'B', status: 0, createTime: 1705377600000 },
      { id: 3, name: '苏州星合信息', level: 'A', status: 1, createTime: 1705454100000 },
    ] as CustomerRow[],
    total: 3,
  }
}

const form = [
  {
    is: 'input',
    prop: 'name',
    label: '客户名称',
    props: {
      placeholder: '请输入客户名称',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '合作状态',
    props: {
      placeholder: '请选择合作状态',
      options: [
        { value: 1, label: '合作中' },
        { value: 0, label: '已暂停' },
      ],
    },
  },
]

const columns = [
  { label: 'ID', prop: 'id', width: 80 },
  { label: '客户名称', prop: 'name', minWidth: 180 },
  { label: '客户等级', prop: 'level', width: 120 },
  {
    label: '合作状态',
    prop: 'status',
    width: 120,
    formatter: (row: CustomerRow) => (row.status === 1 ? '合作中' : '已暂停'),
  },
  { label: '创建时间', prop: 'createTime', width: 180, type: 'dateTime' },
]
</script>

<template>
  <div class="query-table-demo">
    <p class="demo-description">一个组件同时完成查询表单、表格和分页联动，适合作为后台列表页的默认骨架。</p>
    <CommonQueryTable :fetch="fetch" :form="form" :columns="columns" />
  </div>
</template>

<style scoped>
.query-table-demo {
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
