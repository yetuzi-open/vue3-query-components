<script setup lang="ts">
import { reactive } from 'vue'
import { CommonConfigProvider, CommonForm, CommonTable } from '@yetuzi/vue3-query-components'

// 动态配置 - 直接使用 reactive 定义
const dynamicConfig = reactive({
  placeholder: '--',
  form: {
    submitText: '保存',
    resetText: 'Reset',
    formItem: {
      components: {
        width: '260px'
      }
    }
  }
})

// 表单配置 - 用于配置 dynamicConfig，使用全局配置的占位符
const formConfig = [
  {
    is: 'input',
    label: '占位符',
    prop: 'placeholder',
    initialValue: dynamicConfig.placeholder,
  },
  {
    is: 'input',
    label: '提交按钮文本',
    prop: 'submitText',
    initialValue: dynamicConfig.form.submitText,
  },
  {
    is: 'input',
    label: 'Reset按钮文本',
    prop: 'resetText',
    initialValue: dynamicConfig.form.resetText,
  },
  {
    is: 'input',
    label: '组件宽度',
    prop: 'width',
    initialValue: dynamicConfig.form.formItem.components.width,
  }
]

// 表格数据 - 包含空值来展示 placeholder 效果
const tableData = [
  {
    id: 1,
    name: 'Zhang San',
    age: 25,
    email: 'zhangsan@example.com'
  },
  {
    id: 2,
    name: '',
    age: null,
    email: 'lisi@example.com'
  },
  {
    id: 3,
    name: 'Wang Wu',
    age: 30,
    email: ''
  },
  {
    id: 4,
    name: null,
    age: null,
    email: null
  }
]

// 表格列配置
const tableColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: 'Name', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱' }
]

const handleSubmit = (data: any) => {
  console.log('表单提交:', data)
  // 根据用户输入更新 dynamicConfig
  if (data.placeholder) {
    dynamicConfig.placeholder = data.placeholder
  }
  if (data.submitText) {
    dynamicConfig.form.submitText = data.submitText
  }
  if (data.resetText) {
    dynamicConfig.form.resetText = data.resetText
  }
  if (data.width) {
    dynamicConfig.form.formItem.components.width = data.width
  }
}
</script>

<template>
  <div class="dynamic-config-demo">
    <div class="current-config">
        <h4>当前配置：</h4>
        <pre>{{ JSON.stringify(dynamicConfig, null, 2) }}</pre>
      </div>

    <CommonConfigProvider :component="dynamicConfig">
      <CommonForm
        :form="formConfig"
        :inline="true"
        @submit="handleSubmit"
        @reset="handleSubmit"
      />

      <div class="table-section">
        <h4>表格展示 - 空值占位符效果：</h4>
        <CommonTable :data="tableData" :columns="tableColumns" />
      </div>
    </CommonConfigProvider>
  </div>
</template>

<style scoped>
.current-config {
  margin-top: 16px;
  padding: 12px;
  background-color: #fff;
  border-radius: 4px;
}

.current-config h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #303133;
}

.current-config pre {
  margin: 0;
  padding: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
  overflow-x: auto;
}

.table-section {
  margin-top: 20px;
}

.table-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #303133;
}
</style>
