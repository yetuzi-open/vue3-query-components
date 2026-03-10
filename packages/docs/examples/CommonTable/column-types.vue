<script setup lang="ts">
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

const statusOptions = [
  { label: '在职', value: 1 },
  { label: '离职', value: 0 },
]

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
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
    name: '张敏',
    department: '技术部',
    position: '前端工程师',
    status: 1,
    gender: 'male',
    birthDate: '1990-05-15',
    hireDate: '2024-01-15',
    createTime: 1705278600000,
    email: 'zhangmin@example.com',
    phone: '138-0000-0001',
    address: '北京市朝阳区科技园 A 座',
  },
  {
    id: 2,
    name: '李婷',
    department: '产品部',
    position: '产品经理',
    status: 0,
    gender: 'female',
    birthDate: '1988-10-22',
    hireDate: '2024-01-16',
    createTime: 1705377600000,
    email: 'liting@example.com',
    phone: '138-0000-0002',
    address: '上海市浦东新区软件园 2 号楼',
  },
  {
    id: 3,
    name: '王凯',
    department: '设计部',
    position: 'UI 设计师',
    status: 1,
    gender: 'male',
    birthDate: '1995-03-08',
    hireDate: '2024-01-17',
    createTime: 1705454100000,
    email: 'wangkai@example.com',
    phone: '138-0000-0003',
    address: '深圳市南山区创意园 C 栋',
  },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'expand', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '姓名' },
  { prop: 'department', label: '部门' },
  { prop: 'position', label: '岗位' },
  { prop: 'status', label: '在职状态', type: 'dict', options: statusOptions, width: 110 },
  { prop: 'gender', label: '性别', type: 'dict', options: genderOptions, width: 90 },
  { prop: 'birthDate', label: '出生日期', type: 'date', width: 140 },
  { prop: 'hireDate', label: '入职日期', type: 'date', width: 140 },
  { prop: 'createTime', label: '创建时间', type: 'dateTime', width: 180 },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">内置列类型适合快速搭建通用后台表格，减少重复格式化逻辑。</p>

    <CommonTable :data="tableData" :columns="columns">
      <template #expand="{ row }">
        <div class="expand-content">
          <p><strong>邮箱：</strong>{{ row.email }}</p>
          <p><strong>电话：</strong>{{ row.phone }}</p>
          <p><strong>地址：</strong>{{ row.address }}</p>
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
