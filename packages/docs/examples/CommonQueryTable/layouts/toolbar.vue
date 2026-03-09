<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus'
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

const handleCreate = () => ElMessage.success('点击了新增客户')
const handleBatchDelete = () => ElMessage.warning('点击了批量删除')
</script>

<template>
  <div class="layout-demo">
    <p class="demo-description">工具栏适合承载新增、导出、批量操作等列表页常见动作。</p>

    <CommonQueryTable :fetch="fetch" :form="form" :columns="columns">
      <template #toolbar>
        <ElButton type="primary" @click="handleCreate">新增客户</ElButton>
        <ElButton @click="handleBatchDelete">批量删除</ElButton>
      </template>
    </CommonQueryTable>
  </div>
</template>

<style scoped>
.layout-demo {
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
