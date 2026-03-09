<script setup lang="ts">
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  { is: 'input', label: '姓名', prop: 'name' },
  {
    is: 'select',
    label: '性别',
    prop: 'gender',
    props: {
      placeholder: '请选择性别',
      options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
      ],
    },
  },
  {
    is: 'date-picker',
    label: '生日',
    prop: 'birthday',
    props: {
      type: 'date',
      placeholder: '请选择生日',
    },
  },
  {
    is: 'radio',
    label: '状态',
    prop: 'status',
    initialValue: 1,
    props: {
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' },
      ],
    },
  },
]
</script>

<template>
  <CommonForm :form="form" inline />
</template>