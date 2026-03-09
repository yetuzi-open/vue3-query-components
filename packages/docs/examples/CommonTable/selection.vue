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

const selectedNames = computed(() => multipleSelection.value.map((item) => item.name).join('?'))

const tableData: TableRow[] = [
  { id: 1, name: '??', department: '???' },
  { id: 2, name: '??', department: '???' },
  { id: 3, name: '??', department: '???' },
]

const columns: CommonTableArrayColumns<TableRow> = [
  { type: 'selection', width: 55 },
  { prop: 'name', label: '??' },
  { prop: 'department', label: '??' },
]
</script>

<template>
  <div class="selection-example">
    <p class="demo-description">???????????????????</p>
    <p class="selection-summary">
      ??? {{ multipleSelection.length }} ?
      <template v-if="selectedNames">?{{ selectedNames }}</template>
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
