---
title: CommonConfigProvider
---


# CommonConfigProvider 全局配置

提供全局配置功能，包括分页默认值、表单文本、表格样式等。

<demo vue="Test/test.vue" ssg="true"/>

## 基础用法

### 1. 应用级别配置

在应用入口处配置，全局生效：

```vue
<!-- App.vue -->
<template>
  <common-config-provider v-bind="appConfig">
    <router-view />
  </common-config-provider>
</template>

<script setup>
import { reactive } from 'vue'

const appConfig = reactive({
  component: {
    placeholder: '--',
    form: {
      submitText: '查询',
      resetText: '重置'
    }
  }
})
</script>
```

### 2. 页面级别配置

在特定页面配置，覆盖页面及其子组件：

```vue
<template>
  <common-config-provider v-bind="pageConfig">
    <common-query-table ... />
  </common-config-provider>
</template>

<script setup>
import { reactive } from 'vue'

const pageConfig = reactive({
  component: {
    placeholder: '--',
    form: {
      submitText: '查询',
      resetText: '重置'
    }
  }
})
</script>
```

### 3. 动态配置

配置支持响应式更新，可以根据用户偏好或运行时条件动态调整：

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

**关键特性：**
- 使用 `reactive` 定义的配置对象，修改属性后立即生效
- 配置变更会实时反映在被包裹的组件上
- 适用于用户偏好设置、主题切换等动态场景

## 最佳实践

1. **统一风格**：在应用根组件使用 CommonConfigProvider，确保整个应用风格一致
2. **合理覆盖**：页面级配置可以覆盖应用级配置，实现个性化定制
3. **响应式更新**：使用 `reactive` 定义配置，直接修改属性即可实时生效
4. **按需配置**：只配置需要覆盖的属性，其他属性使用默认值

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 全局配置对象 | `Config` | 见下方默认配置 |

### Config 配置说明

#### 默认配置

<<< ../../../components/src/index.ts#config

#### TypeScript 类型定义

<<< ../../../components/src/types/index.ts#config

#### 配置项说明

| 配置项 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 空值占位符，用于表格和表单中显示空值 | `string` | `'-'` |
| pagination.defaultPageCount | 默认起始页码 | `number` | `1` |
| pagination.defaultPageSize | 默认每页显示条数 | `number` | `10` |
| form.submitText | 表单提交按钮文本 | `string` | `'搜索'` |
| form.resetText | 表单重置按钮文本 | `string` | `'重置'` |
| form.formItem.components.width | 表单项宽度 | `string` | `'200px'` |


