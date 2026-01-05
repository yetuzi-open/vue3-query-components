<script setup lang="ts">
import { CommonQueryTable, CommonForm, CommonConfigProvider } from '@components-src'
import { reactive } from 'vue'
import { ElButton } from 'element-plus'

console.log(ElButton)

// 示例：模拟 API 请求
const fetch = async () => {
  return {
    list: [
      { id: 1, name: '张三', status: 1, createTime: 1705278600000 },
      { id: 2, name: '李四', status: 0, createTime: 1705377600000 },
    ],
    total: 2
  }
}

// 查询表单配置
const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    props: { placeholder: '请输入用户名' }
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ]
    }
  }
]

// 表格列配置
const columns = [
  { label: 'ID', prop: 'id' },
  { label: '用户名', prop: 'name' },
  {
    label: '状态',
    prop: 'status',
    formatter: (row: { status: number }) => row.status === 1 ? '启用' : '禁用'
  },
  { label: '创建时间', prop: 'createTime', type: 'dateTime' }
]
</script>

<template>
  <CommonQueryTable
    :fetch="fetch"
    :form="form"
    :columns="columns"
  />
</template>

<style>
/* 样式已在 .vitepress/theme/index.ts 中全局导入 */
</style>