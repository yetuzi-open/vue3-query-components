# CommonConfigProvider 全局配置

`CommonConfigProvider` 用于统一配置组件库的默认行为，例如空值占位符、分页默认参数、表单按钮文案和表单控件宽度等。

主要特性：

- 支持应用级、页面级和局部作用域配置
- 支持响应式配置更新
- 支持配置嵌套合并
- 作用于所有通过 `inject` 读取配置的组件

## 基础用法

```vue
<template>
  <CommonConfigProvider :component="config">
    <App />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import type { Config } from '@yetuzi/vue3-query-components'

const config: Config = {
  component: {
    placeholder: '--',
    pagination: {
      defaultPageCount: 1,
      defaultPageSize: 20,
    },
    form: {
      submitText: '查询',
      resetText: '重置',
      formItem: {
        components: {
          width: '240px',
        },
      },
    },
  },
}
</script>
```

## 使用场景

### 应用级配置

在应用入口统一配置，作用于整个应用。

### 页面级配置

在局部页面包裹使用，只影响当前页面及其子组件。

### 动态配置

如果配置对象由 `reactive` 创建，则修改配置属性后会实时生效。

## 常见配置项

| 配置项 | 说明 |
| --- | --- |
| `component.placeholder` | 空值占位符 |
| `component.pagination.defaultPageCount` | 默认起始页码 |
| `component.pagination.defaultPageSize` | 默认每页条数 |
| `component.form.submitText` | 表单提交按钮文字 |
| `component.form.resetText` | 表单重置按钮文字 |
| `component.form.formItem.components.width` | 表单控件默认宽度 |

## 响应式示例

组件支持响应式配置更新：

```vue
<template>
  <CommonConfigProvider :component="config">
    <CommonTable :data="tableData" :columns="columns" />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const config = reactive({
  component: {
    placeholder: '--',
  },
})

config.component.placeholder = '暂无数据'
</script>
```

## 类型定义

```ts
interface CommonConfigProviderProps extends DeepPartial<Config> {}

interface Config {
  component: {
    placeholder: string
    pagination: {
      defaultPageCount: number
      defaultPageSize: number
    }
    table: Record<string, any>
    form: {
      submitText: string
      resetText: string
      formItem: {
        components: {
          width: string
        }
      }
    }
  }
}
```