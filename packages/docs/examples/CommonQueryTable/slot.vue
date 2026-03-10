<script setup lang="ts">
import { ElTag } from 'element-plus'
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
]

const columns = [
  { label: 'ID', prop: 'id', width: 80 },
  { label: '客户名称', prop: 'name', minWidth: 180 },
  { label: '合作状态', prop: 'status', width: 120 },
  { label: '创建时间', prop: 'createTime', width: 180, type: 'dateTime' },
]
</script>

<template>
  <div class="query-table-demo">
    <p class="demo-description">通过具名前缀插槽可以定制内部子组件的渲染，例如自定义表格列、空状态或工具栏。</p>

    <CommonQueryTable :fetch="fetch" :form="form" :columns="columns">
      <template #table-status="{ row }">
        <ElTag :type="row.status ? 'success' : 'info'">
          {{ row.status ? '合作中' : '已暂停' }}
        </ElTag>
      </template>
    </CommonQueryTable>
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
