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
      { id: 1, name: '上海智选科技', status: 1, createTime: 1705278600000 },
      { id: 2, name: '杭州云桥数据', status: 0, createTime: 1705377600000 },
      { id: 3, name: '苏州星合信息', status: 1, createTime: 1705454100000 },
      { id: 4, name: '南京数联未来', status: 0, createTime: 1705540500000 },
      { id: 5, name: '宁波合信网络', status: 1, createTime: 1705626900000 },
    ],
    total: 50,
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
  { type: 'selection', width: 55 },
  { label: 'ID', prop: 'id', width: 80 },
  { label: '客户名称', prop: 'name', minWidth: 180 },
  {
    label: '合作状态',
    prop: 'status',
    width: 120,
    formatter: (row: { status: number }) => (row.status === 1 ? '合作中' : '已暂停'),
  },
  { label: '创建时间', prop: 'createTime', width: 180, type: 'dateTime' },
]

function handlePaginationChange(params: { pageNo: number; pageSize: number }) {
  currentPagination.value = params
}
</script>

<template>
  <div class="pagination-example">
    <p class="demo-description">分页参数会自动参与列表请求，并支持通过前缀属性透传给内部分页组件。</p>
    <p class="pagination-status">当前分页：第 {{ currentPagination.pageNo }} 页 / 每页 {{ currentPagination.pageSize }} 条</p>

    <CommonQueryTable
      :fetch="fetch"
      :form="form"
      :columns="columns"
      :pagination-page-sizes="[10, 20, 50]"
      pagination-layout="total, sizes, prev, pager, next, jumper"
      @pagination-change="handlePaginationChange"
    />
  </div>
</template>

<style scoped>
.pagination-example {
  display: grid;
  gap: 12px;
}

.demo-description,
.pagination-status {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
</style>
