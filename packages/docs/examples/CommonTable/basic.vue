<script setup lang="ts">
import { ElButton } from 'element-plus'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  id: number
  name: string
  status: number
  createTime: number
}

const tableData: TableRow[] = [
  { id: 1, name: '张敏', status: 1, createTime: 1705278600000 },
  { id: 2, name: '李婷', status: 0, createTime: 1705377600000 },
  { id: 3, name: '王凯', status: 1, createTime: 1705454100000 },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: '负责人', sortable: true },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: (row) => (row.status === 1 ? '启用' : '停用'),
  },
  { prop: 'createTime', label: '创建时间', width: 180, type: 'dateTime' },
  { prop: 'operation', label: '操作', width: 160, fixed: 'right' },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">基础表格示例展示了常见的多选、序号、格式化列和操作列组合。</p>

    <CommonTable :data="tableData" :columns="columns">
      <template #operation>
        <ElButton link type="primary" size="small">编辑</ElButton>
        <ElButton link type="danger" size="small">删除</ElButton>
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
</style>
