<script setup lang="ts">
import { ElProgress, ElSwitch, ElTag } from 'element-plus'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  name: string
  status: number
  progress: number
  tags: string[]
}

const tableData: TableRow[] = [
  { name: '张三', status: 1, progress: 85, tags: ['前端', 'Vue'] },
  { name: '李四', status: 0, progress: 60, tags: ['后端', 'Java'] },
  { name: '王五', status: 1, progress: 92, tags: ['全栈', 'Node.js'] },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '姓名' },
  { prop: 'status', label: '启用状态' },
  { prop: 'progress', label: '进度' },
  { prop: 'tags', label: '标签' },
]
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #status="{ row }">
      <ElSwitch :model-value="row.status === 1" disabled />
    </template>

    <template #progress="{ row }">
      <ElProgress :percentage="row.progress" :stroke-width="6" />
    </template>

    <template #tags="{ row }">
      <ElTag v-for="tag in row.tags" :key="tag" style="margin-right: 4px">
        {{ tag }}
      </ElTag>
    </template>
  </CommonTable>
</template>