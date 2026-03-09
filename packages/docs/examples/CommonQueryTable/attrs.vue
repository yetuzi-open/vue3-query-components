<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const fetch = async () => {
  return {
    list: [
      { id: 1, name: '上海智选科技', status: 1, createTime: 1705278600000 },
      { id: 2, name: '杭州云桥数据', status: 0, createTime: 1705377600000 },
      { id: 3, name: '苏州星合信息', status: 1, createTime: 1705454100000 },
    ],
    total: 3,
  }
}

const form = [
  {
    is: 'input',
    prop: 'name',
    label: '客户名称',
    props: {
      placeholder: '请输入客户名称',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '合作状态',
    props: {
      placeholder: '请选择合作状态',
      options: [
        { value: 1, label: '合作中' },
        { value: 0, label: '已暂停' },
      ],
    },
  },
]

const columns = [
  { type: 'selection', width: 55 },
  { label: 'ID', prop: 'id', width: 80 },
  { label: '客户名称', prop: 'name', minWidth: 180 },
  {
    label: '合作状态',
    prop: 'status',
    width: 120,
    formatter: (row: { status: number }) => (row.status === 1 ? '合作中' : '已暂停'),
  },
  { label: '创建时间', prop: 'createTime', width: 180, type: 'dateTime' },
]

function handleSelectionChange(selection: any[]) {
  ElMessage.info('当前已选 ' + selection.length + ' 条数据')
}
</script>

<template>
  <div class="query-table-demo">
    <p class="demo-description">带前缀的属性和事件会自动透传到内部组件，便于精细控制表单和表格行为。</p>

    <CommonQueryTable
      :fetch="fetch"
      :form="form"
      :columns="columns"
      :form-inline="false"
      table-border
      @table-selection-change="handleSelectionChange"
    />
  </div>
</template>

<style scoped>
.query-table-demo {
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
