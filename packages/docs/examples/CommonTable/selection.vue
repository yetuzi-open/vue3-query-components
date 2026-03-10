<script setup lang="ts">
import { computed, ref } from 'vue'
import { CommonTable, type CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface TableRow {
  id: number
  name: string
  department: string
}

const multipleSelection = ref<TableRow[]>([])

const handleSelectionChange = (selection: TableRow[]) => {
  multipleSelection.value = selection
}

const selectedNames = computed(() => multipleSelection.value.map((item) => item.name).join('、'))

const tableData: TableRow[] = [
  { id: 1, name: '张敏', department: '技术部' },
  { id: 2, name: '李婷', department: '产品部' },
  { id: 3, name: '王凯', department: '设计部' },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { prop: 'name', label: '姓名' },
  { prop: 'department', label: '部门' },
]
</script>

<template>
  <div class="selection-example">
    <p class="demo-description">多选列常用于批量审批、批量导出等场景。</p>
    <p class="selection-summary">
      已选择 {{ multipleSelection.length }} 项
      <template v-if="selectedNames">：{{ selectedNames }}</template>
    </p>
    <CommonTable :data="tableData" :columns="columns" @selection-change="handleSelectionChange" />
  </div>
</template>

<style scoped>
.selection-example {
  display: grid;
  gap: 12px;
}

.demo-description,
.selection-summary {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
</style>
