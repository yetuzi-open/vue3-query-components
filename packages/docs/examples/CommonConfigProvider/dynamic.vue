<script setup lang="ts">
import { reactive } from 'vue'
import { CommonConfigProvider, CommonForm, CommonTable } from '@yetuzi/vue3-query-components'

const dynamicConfig = reactive({
  placeholder: '--',
  form: {
    submitText: '????',
    resetText: '????',
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
    label: '?????',
    prop: 'placeholder',
    initialValue: dynamicConfig.placeholder,
  },
  {
    is: 'input',
    label: '??????',
    prop: 'submitText',
    initialValue: dynamicConfig.form.submitText,
  },
  {
    is: 'input',
    label: '??????',
    prop: 'resetText',
    initialValue: dynamicConfig.form.resetText,
  },
  {
    is: 'input',
    label: '??????',
    prop: 'width',
    initialValue: dynamicConfig.form.formItem.components.width,
  },
]

const tableData = [
  { id: 1, name: '????', owner: '??', phone: '13800001234' },
  { id: 2, name: '', owner: null, phone: '13800005678' },
  { id: 3, name: '????', owner: '??', phone: '' },
]

const tableColumns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '????', width: 160 },
  { prop: 'owner', label: '???', width: 120 },
  { prop: 'phone', label: '????' },
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
    <p class="demo-description">????????????????????????????????????????????</p>

    <CommonConfigProvider :component="dynamicConfig">
      <CommonForm :form="configForm" :inline="true" @submit="syncConfig" @reset="syncConfig" />

      <div class="current-config">
        <h4>????</h4>
        <pre>{{ JSON.stringify(dynamicConfig, null, 2) }}</pre>
      </div>

      <div class="table-section">
        <h4>????</h4>
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
