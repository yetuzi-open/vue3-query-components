<script setup lang="ts">
import { reactive } from 'vue'
import { CommonConfigProvider, CommonForm, CommonTable } from '@yetuzi/vue3-query-components'

const dynamicConfig = reactive({
  placeholder: '--',
  form: {
    submitText: '保存配置',
    resetText: '恢复默认',
    formItem: {
      components: {
        width: '240px',
      },
    },
  },
})

const configForm = [
  {
    is: 'input',
    label: '空值占位符',
    prop: 'placeholder',
    initialValue: dynamicConfig.placeholder,
  },
  {
    is: 'input',
    label: '提交按钮文案',
    prop: 'submitText',
    initialValue: dynamicConfig.form.submitText,
  },
  {
    is: 'input',
    label: '重置按钮文案',
    prop: 'resetText',
    initialValue: dynamicConfig.form.resetText,
  },
  {
    is: 'input',
    label: '控件默认宽度',
    prop: 'width',
    initialValue: dynamicConfig.form.formItem.components.width,
  },
]

const tableData = [
  { id: 1, name: '华北大区', owner: '张敏', phone: '13800001234' },
  { id: 2, name: '', owner: null, phone: '13800005678' },
  { id: 3, name: '华东大区', owner: '李婷', phone: '' },
]

const tableColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '区域名称', width: 160 },
  { prop: 'owner', label: '负责人', width: 120 },
  { prop: 'phone', label: '联系电话' },
]

const syncConfig = (values: Record<string, string>) => {
  dynamicConfig.placeholder = values.placeholder || dynamicConfig.placeholder
  dynamicConfig.form.submitText = values.submitText || dynamicConfig.form.submitText
  dynamicConfig.form.resetText = values.resetText || dynamicConfig.form.resetText
  dynamicConfig.form.formItem.components.width = values.width || dynamicConfig.form.formItem.components.width
}
</script>

<template>
  <div class="dynamic-config-demo">
    <p class="demo-description">通过全局配置可以统一控制表单按钮文案、控件宽度和空值展示风格，修改后会立即影响内部组件。</p>

    <CommonConfigProvider :component="dynamicConfig">
      <CommonForm :form="configForm" :inline="true" @submit="syncConfig" @reset="syncConfig" />

      <div class="current-config">
        <h4>当前配置</h4>
        <pre>{{ JSON.stringify(dynamicConfig, null, 2) }}</pre>
      </div>

      <div class="table-section">
        <h4>联动预览</h4>
        <CommonTable :data="tableData" :columns="tableColumns" border />
      </div>
    </CommonConfigProvider>
  </div>
</template>

<style scoped>
.dynamic-config-demo {
  display: grid;
  gap: 16px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.current-config,
.table-section {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.current-config h4,
.table-section h4 {
  margin: 0 0 12px;
  font-size: 14px;
}

.current-config pre {
  margin: 0;
  padding: 12px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 12px;
  overflow-x: auto;
}
</style>
