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
    <p class="demo-description">??????????????????????????????</p>

    <CommonQueryTable :fetch="fetch" :form="form" :columns="columns">
      <template #footer>
        <div class="footer-summary">
          ????? 3 ??????????? 2 ??????? 1 ??
        </div>
      </template>
    </CommonQueryTable>
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

.footer-summary {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
