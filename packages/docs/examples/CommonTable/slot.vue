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
  { name: '张敏', status: 1, progress: 85, tags: ['前端', 'Vue'] },
  { name: '李婷', status: 0, progress: 60, tags: ['后端', 'Java'] },
  { name: '王凯', status: 1, progress: 92, tags: ['全栈', 'Node.js'] },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '成员' },
  { prop: 'status', label: '启用状态' },
  { prop: 'progress', label: '项目进度' },
  { prop: 'tags', label: '技能标签' },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">具名插槽可以让每一列用最合适的展示组件呈现数据。</p>

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
