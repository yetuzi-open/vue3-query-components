<script setup lang="ts">
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

const statusOptions = [
  { label: '??', value: 1 },
  { label: '??', value: 0 },
]

const genderOptions = [
  { label: '?', value: 'male' },
  { label: '?', value: 'female' },
]

interface TableRow {
  id: number
  name: string
  department: string
  position: string
  status: number
  gender: 'male' | 'female'
  birthDate: string
  hireDate: string
  createTime: number
  email: string
  phone: string
  address: string
}

const tableData: TableRow[] = [
  {
    id: 1,
    name: '??',
    department: '???',
    position: '?????',
    status: 1,
    gender: 'male',
    birthDate: '1990-05-15',
    hireDate: '2024-01-15',
    createTime: 1705278600000,
    email: 'zhangmin@example.com',
    phone: '138-0000-0001',
    address: '????????? A ?',
  },
  {
    id: 2,
    name: '??',
    department: '???',
    position: '????',
    status: 0,
    gender: 'female',
    birthDate: '1988-10-22',
    hireDate: '2024-01-16',
    createTime: 1705377600000,
    email: 'liting@example.com',
    phone: '138-0000-0002',
    address: '?????????? 2 ??',
  },
  {
    id: 3,
    name: '??',
    department: '???',
    position: 'UI ???',
    status: 1,
    gender: 'male',
    birthDate: '1995-03-08',
    hireDate: '2024-01-17',
    createTime: 1705454100000,
    email: 'wangkai@example.com',
    phone: '138-0000-0003',
    address: '????????? C ?',
  },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'expand', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '??' },
  { prop: 'department', label: '??' },
  { prop: 'position', label: '??' },
  { prop: 'status', label: '????', type: 'dict', options: statusOptions, width: 110 },
  { prop: 'gender', label: '??', type: 'dict', options: genderOptions, width: 90 },
  { prop: 'birthDate', label: '????', type: 'date', width: 140 },
  { prop: 'hireDate', label: '????', type: 'date', width: 140 },
  { prop: 'createTime', label: '????', type: 'dateTime', width: 180 },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">????????????????????????????</p>

    <CommonTable :data="tableData" :columns="columns">
      <template #expand="{ row }">
        <div class="expand-content">
          <p><strong>???</strong>{{ row.email }}</p>
          <p><strong>???</strong>{{ row.phone }}</p>
          <p><strong>???</strong>{{ row.address }}</p>
        </div>
      </template>
    </CommonTable>
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

.expand-content {
  padding: 20px 40px;
  background-color: var(--vp-c-bg-soft);
}

.expand-content p {
  margin: 8px 0;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
</style>
