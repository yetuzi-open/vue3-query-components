<script setup lang="ts">
import { CommonQueryTable, CommonForm, CommonConfigProvider, type CommonFormPropForm } from '@components-src'
import { ElButton } from 'element-plus'

const a: CommonFormPropForm<any> = [
    {
        is: 'aaaaa',
        prop: 'name',
        label: 'Username',
        props: { placeholder: 'Please enterUsername' }
    }
]

console.log(ElButton)

// 示例：模拟 API 请求
const fetch = async () => {
  return {
    list: [
      { id: 1, name: 'Zhang San', status: 1, createTime: 1705278600000 },
      { id: 2, name: 'Li Si', status: 0, createTime: 1705377600000 },
    ],
    total: 2
  }
}

// Search表单配置
const form = [
  {
    is: 'input',
    prop: 'name',
    label: 'Username',
    props: { placeholder: 'Please enterUsername' }
  },
  {
    is: 'select',
    prop: 'status',
    label: 'Status',
    props: {
      placeholder: 'Please selectStatus',
      options: [
        { value: 1, label: 'Enabled' },
        { value: 0, label: 'Disabled' }
      ]
    }
  }
]

// 表格列配置
const columns = [
  { label: 'ID', prop: 'id' },
  { label: 'Username', prop: 'name' },
  {
    label: 'Status',
    prop: 'status',
    formatter: (row: { status: number }) => row.status === 1 ? 'Enabled' : 'Disabled'
  },
  { label: 'Create Time', prop: 'createTime', type: 'dateTime' }
]
</script>

<template>
    <div>
        <CommonForm :form="form"></CommonForm>
        <CommonQueryTable
            :fetch="fetch"
            :form="form"
            :columns="columns"
        />
    </div>

</template>

<style>
/* 样式已在 .vitepress/theme/index.ts 中全局导入 */
</style>