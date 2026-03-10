<script setup lang="ts">
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const fetch = async () => {
  return {
    list: [
      { id: 1, name: '上海智选科技', status: 1, createTime: 1705278600000 },
      { id: 2, name: '杭州云桥数据', status: 0, createTime: 1705377600000 },
      { id: 3, name: '苏州星合信息', status: 1, createTime: 1705454100000 },
    ],
    total: 3,
  }
}

const columns = [
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
</script>

<template>
  <div class="layout-demo">
    <p class="demo-description">如果页面不需要查询区，`CommonQueryTable` 也可以只保留表格和分页区域。</p>
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
