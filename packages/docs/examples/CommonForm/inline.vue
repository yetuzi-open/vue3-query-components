<script setup lang="ts">
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '关键词',
    prop: 'keyword',
    props: {
      placeholder: '请输入客户名称 / 手机号',
    },
  },
  {
    is: 'select',
    label: '线索来源',
    prop: 'source',
    props: {
      placeholder: '请选择线索来源',
      options: [
        { value: 'douyin', label: '抖音' },
        { value: 'wechat', label: '微信' },
        { value: 'offline', label: '线下活动' },
      ],
    },
  },
  {
    is: 'date-picker',
    label: '创建日期',
    prop: 'createdAt',
    props: {
      type: 'date',
      placeholder: '请选择创建日期',
    },
  },
  {
    is: 'radio',
    label: '跟进状态',
    prop: 'status',
    initialValue: 'all',
    props: {
      options: [
        { value: 'all', label: '全部' },
        { value: 'pending', label: '待跟进' },
        { value: 'done', label: '已完成' },
      ],
    },
  },
]
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">行内表单更适合查询条件较少的列表页，能节省页面纵向空间。</p>
    <CommonForm :form="form" inline />
  </div>
</template>

<style scoped>
.form-demo {
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
