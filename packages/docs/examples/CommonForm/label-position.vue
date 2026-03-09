<script setup lang="ts">
import { ref } from 'vue'
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const labelPosition = ref<'left' | 'right' | 'top'>('right')

const form = [
  { is: 'input', label: '姓名', prop: 'name' },
  {
    is: 'input',
    label: '邮箱',
    prop: 'email',
  },
  {
    is: 'select',
    label: '状态',
    prop: 'status',
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
  <div>
    <el-radio-group v-model="labelPosition" style="margin-bottom: 16px">
      <el-radio-button label="left">left</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
      <el-radio-button label="top">top</el-radio-button>
    </el-radio-group>

    <CommonForm :form="form" :inline="false" :label-position="labelPosition" label-width="100px" />
  </div>
</template>