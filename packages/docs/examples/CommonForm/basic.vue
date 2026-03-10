<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '联系人',
    prop: 'name',
    formItem: {
      rules: [
        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '姓名长度需为 2 - 10 个字符', trigger: 'blur' },
      ],
    },
    props: {
      placeholder: '请输入联系人姓名',
    },
  },
  {
    is: 'select',
    label: '客户等级',
    prop: 'level',
    initialValue: 'a',
    props: {
      placeholder: '请选择客户等级',
      options: [
        { value: 'a', label: 'A级' },
        { value: 'b', label: 'B级' },
        { value: 'c', label: 'C级' },
      ],
      clearable: true,
    },
  },
  {
    is: 'date-picker',
    label: '跟进日期',
    prop: 'followDate',
    props: {
      type: 'date',
      placeholder: '请选择跟进日期',
      clearable: true,
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    is: 'radio',
    label: '跟进状态',
    prop: 'status',
    initialValue: 'pending',
    props: {
      options: [
        { value: 'pending', label: '待联系' },
        { value: 'tracking', label: '跟进中' },
        { value: 'done', label: '已成交' },
      ],
    },
  },
  {
    is: 'check-box',
    label: '关注渠道',
    prop: 'channels',
    initialValue: ['wechat'],
    props: {
      options: [
        { value: 'wechat', label: '微信' },
        { value: 'phone', label: '电话' },
        { value: 'email', label: '邮件' },
        { value: 'visit', label: '到访' },
      ],
    },
  },
  {
    is: 'switch',
    label: '订阅提醒',
    prop: 'subscribe',
    initialValue: true,
    props: {
      activeText: '开启',
      inactiveText: '关闭',
      activeValue: true,
      inactiveValue: false,
    },
  },
]

function handleSubmit(formData: any) {
  console.log('提交的表单数据：', formData)
  ElMessage.success('提交成功，请查看控制台输出')
}

function handleReset(formData: any) {
  console.log('重置后的表单数据：', formData)
  ElMessage.info('表单已重置')
}
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">基础示例展示了查询/录入场景最常见的字段组合，适合作为业务表单的起点。</p>
    <CommonForm :form="form" @submit="handleSubmit" @reset="handleReset" />
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
