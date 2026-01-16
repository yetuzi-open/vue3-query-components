<script setup lang="ts">
import { ref } from 'vue'
import { CommonTable, type CommonTableExpose } from '@yetuzi/vue3-query-components'
import { ElButton, ElMessage } from 'element-plus'

const tableRef = ref<CommonTableExpose>()

const tableData = [
  { id: 1, name: 'Zhang San', status: 1, createTime: 1705278600000 },
  { id: 2, name: 'Li Si', status: 0, createTime: 1705377600000 },
  { id: 3, name: 'Wang Wu', status: 1, createTime: 1705454100000 },
  { id: 4, name: '赵六', status: 0, createTime: 1705540500000 },
  { id: 5, name: '孙七', status: 1, createTime: 1705626900000 },
]

const columns = [
  { type: 'selection', width: 55 },
  { type: 'index', width: 55 },
  { prop: 'name', label: 'Name', sortable: true },
  {
    prop: 'status',
    label: 'Status',
    width: 100,
    formatter: (row: { status: number }) => (row.status === 1 ? 'Enabled' : 'Disabled'),
  },
  { prop: 'createTime', label: 'Create Time', width: 180, type: 'dateTime' },
]

// 清空选择
function handleClearSelection() {
  tableRef.value?.clearSelection()
  ElMessage.info('已清空所有选择')
}

// 切换第一行选中Status
function handleToggleRow() {
  tableRef.value?.toggleRowSelection(tableData[0])
}

// 全选
function handleToggleAll() {
  tableRef.value?.toggleAllSelection()
}

// 设置当前行
function handleSetCurrentRow() {
  tableRef.value?.setCurrentRow(tableData[1])
  ElMessage.success('已设置第二行为当前行')
}

// 清空排序
function handleClearSort() {
  tableRef.value?.clearSort()
  ElMessage.info('已清空排序')
}

// 手动排序
function handleSort() {
  tableRef.value?.sort('createTime', 'descending')
  ElMessage.success('已按Create Time降序排列')
}

// 滚动到顶部
function handleScrollToTop() {
  tableRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  ElMessage.info('已滚动到顶部')
}
</script>

<template>
  <div class="expose-demo">
    <CommonTable ref="tableRef" :data="tableData" :columns="columns" height="300px" />

    <div class="demo-actions">
      <el-button @click="handleClearSelection">清空选择</el-button>
      <el-button @click="handleToggleRow">切换第一行选中</el-button>
      <el-button @click="handleToggleAll">全选/取消全选</el-button>
      <el-button @click="handleSetCurrentRow">设置当前行</el-button>
      <el-button @click="handleClearSort">清空排序</el-button>
      <el-button @click="handleSort">按时间降序</el-button>
      <el-button @click="handleScrollToTop">滚动到顶部</el-button>
    </div>
  </div>
</template>

<style scoped>
.expose-demo {
  padding: 20px;
}

.demo-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
