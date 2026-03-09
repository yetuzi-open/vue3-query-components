<script setup lang="ts">
import { ElTag } from 'element-plus'
import { CommonQueryTable } from '@yetuzi/vue3-query-components'

const fetch = async () => {
  return {
    list: [
      { id: 1, name: '张三', status: 1, createTime: 1705278600000 },
      { id: 2, name: '李四', status: 0, createTime: 1705377600000 },
      { id: 3, name: '王五', status: 1, createTime: 1705454100000 },
    ],
    total: 3,
  }
}

const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
    },
  },
]

const columns = [
  { label: 'ID', prop: 'id' },
  { label: '用户名', prop: 'name' },
  { label: '状态', prop: 'status' },
  { label: '创建时间', prop: 'createTime', width: 180, type: 'dateTime' },
]
</script>

<template>
  <CommonQueryTable :fetch="fetch" :form="form" :columns="columns">
    <template #table-status="{ row }">
      <ElTag :type="row.status ? 'success' : 'danger'">
        {{ row.status ? '启用' : '禁用' }}
      </ElTag>
    </template>
  </CommonQueryTable>
</template>