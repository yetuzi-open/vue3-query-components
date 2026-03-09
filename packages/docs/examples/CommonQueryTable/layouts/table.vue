<script setup lang="ts">
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const fetch = async () => {
  return {
    list: [
      { id: 1, name: '??????', status: 1, createTime: 1705278600000 },
      { id: 2, name: '??????', status: 0, createTime: 1705377600000 },
      { id: 3, name: '??????', status: 1, createTime: 1705454100000 },
    ],
    total: 3,
  }
}

const columns = [
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
</script>

<template>
  <div class="layout-demo">
    <p class="demo-description">???????????`CommonQueryTable` ??????????????</p>
    <CommonQueryTable :fetch="fetch" :columns="columns" />
  </div>
</template>

<style scoped>
.layout-demo {
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
