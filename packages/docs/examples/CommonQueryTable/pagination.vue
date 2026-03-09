<script setup lang="ts">
import { ref } from 'vue'
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const currentPagination = ref({ pageNo: 1, pageSize: 10 })

const fetch = async (params?: { pageNo?: number; pageSize?: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  currentPagination.value = {
    pageNo: params?.pageNo ?? 1,
    pageSize: params?.pageSize ?? 10,
  }

  return {
    list: [
      { id: 1, name: '张三', status: 1, createTime: 1705278600000 },
      { id: 2, name: '李四', status: 0, createTime: 1705377600000 },
      { id: 3, name: '王五', status: 1, createTime: 1705454100000 },
      { id: 4, name: '赵六', status: 0, createTime: 1705540500000 },
      { id: 5, name: '孙七', status: 1, createTime: 1705626900000 },
    ],
    total: 50,
  }
}

const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' },
      ],
    },
  },
]

const columns = [
  { type: 'selection' },
  { label: 'ID', prop: 'id' },
  { label: '用户名', prop: 'name' },
  {
    label: '状态',
    prop: 'status',
    formatter: (row: { status: number }) => (row.status === 1 ? '启用' : '禁用'),
  },
  { label: '创建时间', prop: 'createTime', width: 180, type: 'dateTime' },
]

function handlePaginationChange(params: { pageNo: number; pageSize: number }) {
  currentPagination.value = params
}
</script>

<template>
  <div class="pagination-example">
    <p>当前分页：第 {{ currentPagination.pageNo }} 页 / 每页 {{ currentPagination.pageSize }} 条</p>
    <CommonQueryTable
      :fetch="fetch"
      :form="form"
      :columns="columns"
      :pagination-page-size="[10, 20, 50]"
      pagination-layout="total, sizes, prev, pager, next, jumper"
      @pagination-change="handlePaginationChange"
    />
  </div>
</template>

<style scoped>
.pagination-example p {
  margin-bottom: 16px;
  color: #606266;
}
</style>