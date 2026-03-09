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
  { name: '??', status: 1, progress: 85, tags: ['??', 'Vue'] },
  { name: '??', status: 0, progress: 60, tags: ['??', 'Java'] },
  { name: '??', status: 1, progress: 92, tags: ['??', 'Node.js'] },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { prop: 'name', label: '??' },
  { prop: 'status', label: '????' },
  { prop: 'progress', label: '????' },
  { prop: 'tags', label: '????' },
]
</script>

<template>
  <div class="table-demo">
    <p class="demo-description">????????????????????????</p>

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
