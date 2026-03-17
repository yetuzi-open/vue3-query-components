---
title: CommonConfigProvider
---

# CommonConfigProvider 全局配置

`CommonConfigProvider` 用于统一管理组件库的默认行为，例如空值占位符、分页默认值、表单按钮文案和控件宽度等。它适合放在应用根部，也可以按页面局部覆盖。

主要特性：

- 支持应用级、页面级和局部作用域配置
- 支持嵌套使用，子级会在父级配置基础上继续合并
- 支持响应式配置，修改后会立即影响内部组件
- 适合统一中后台页面的交互细节与展示风格

## 基础用法

### 应用级配置

适合在项目入口统一设置默认风格。

```vue
<template>
  <CommonConfigProvider :component="appConfig">
    <router-view />
  </CommonConfigProvider>
</template>
```

### 页面级配置

适合只覆盖某个页面或某一块业务区域的默认行为。

```vue
<template>
  <CommonConfigProvider :component="pageConfig">
    <CommonQueryTable :fetch="fetch" :columns="columns" :form="form" />
  </CommonConfigProvider>
</template>
```

## 动态配置

当配置对象本身是响应式数据时，内部组件会自动同步最新配置。

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

## 最佳实践

- 在应用根组件统一设置品牌化默认配置
- 在页面级只覆盖当前场景真正需要调整的字段
- 使用 `reactive` 或 `computed` 管理动态配置
- 优先做增量覆盖，避免重复声明完整配置对象

## API

### Props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `component` | 组件库配置对象，通常用于覆盖 `config.component` | `DeepPartial<Config['component']>` |

### 常用配置项

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| `component.placeholder` | 空值占位符 | `'-'` |
| `component.pagination.defaultPageCount` | 默认起始页码 | `1` |
| `component.pagination.defaultPageSize` | 默认每页条数 | `10` |
| `component.form.submitText` | 表单提交按钮文案 | `'搜索'` |
| `component.form.resetText` | 表单重置按钮文案 | `'重置'` |
| `component.form.formItem.components.width` | 表单控件默认宽度 | `'200px'` |
| `component.dialog.confirmText` | 对话框确认按钮文案 | `'确定'` |
| `component.dialog.cancelText` | 对话框取消按钮文案 | `'取消'` |

## TypeScript 类型

```ts
import type {
  CommonConfigProviderProps,
  Config,
} from '@yetuzi/vue3-query-components'
```

```ts
interface CommonConfigProviderProps extends DeepPartial<Config> {}
```

## 参考

- `packages/components/src/index.ts:9`
- `packages/components/src/types/index.ts:5`
