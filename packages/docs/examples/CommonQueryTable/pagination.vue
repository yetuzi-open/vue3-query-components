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
      { id: 1, name: '??????', status: 1, createTime: 1705278600000 },
      { id: 2, name: '??????', status: 0, createTime: 1705377600000 },
      { id: 3, name: '??????', status: 1, createTime: 1705454100000 },
      { id: 4, name: '??????', status: 0, createTime: 1705540500000 },
      { id: 5, name: '??????', status: 1, createTime: 1705626900000 },
    ],
    total: 50,
  }
}

const form = [
  {
    is: 'input',
    prop: 'name',
    label: '????',
    props: {
      placeholder: '???????',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '????',
    props: {
      placeholder: '???????',
      options: [
        { value: 1, label: '???' },
        { value: 0, label: '???' },
      ],
    },
  },
]

const columns = [
  { type: 'selection', width: 55 },
  { label: 'ID', prop: 'id', width: 80 },
  { label: '????', prop: 'name', minWidth: 180 },
  {
    label: '????',
    prop: 'status',
    width: 120,
    formatter: (row: { status: number }) => (row.status === 1 ? '???' : '???'),
  },
  { label: '????', prop: 'createTime', width: 180, type: 'dateTime' },
]

function handlePaginationChange(params: { pageNo: number; pageSize: number }) {
  currentPagination.value = params
}
</script>

<template>
  <div class="pagination-example">
    <p class="demo-description">?????????????????????????????????</p>
    <p class="pagination-status">?????? {{ currentPagination.pageNo }} ? / ?? {{ currentPagination.pageSize }} ?</p>

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
