---
title: CommonConfigProvider
---

# CommonConfigProvider 全局配置

`CommonConfigProvider` 用于统一配置组件库的默认行为，例如空值占位符、分页参数、表单按钮文字和表单控件宽度等。

主要特性：

- 支持应用级、页面级和局部配置
- 支持响应式配置更新
- 支持嵌套配置合并
- 影响所有读取全局配置的组件

## 基础用法

### 应用级配置

在应用入口统一配置，作用于整个应用。

```vue
<template>
  <CommonConfigProvider :component="appConfig">
    <router-view />
  </CommonConfigProvider>
</template>
```

### 页面级配置

在页面内部包裹使用，可覆盖当前页面及子组件配置。

```vue
<template>
  <CommonConfigProvider :component="pageConfig">
    <CommonQueryTable :fetch="fetch" :columns="columns" :form="form" />
  </CommonConfigProvider>
</template>
```

### 动态配置

使用响应式对象时，修改配置后会实时生效。

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

## 最佳实践

- 在应用根组件统一配置默认风格
- 页面级仅覆盖需要定制的配置项
- 使用 `reactive` 管理可变配置对象
- 尽量按需覆盖，不重复声明完整配置

## API

### Props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `component` | 组件库全局配置对象 | `DeepPartial<Config['component']>` |

## 常见配置项

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| `component.placeholder` | 空值占位符 | `'-'` |
| `component.pagination.defaultPageCount` | 默认起始页码 | `1` |
| `component.pagination.defaultPageSize` | 默认每页条数 | `10` |
| `component.form.submitText` | 表单提交按钮文案 | `'搜索'` |
| `component.form.resetText` | 表单重置按钮文案 | `'重置'` |
| `component.form.formItem.components.width` | 表单控件默认宽度 | `'200px'` |

## TypeScript 类型

```ts
interface CommonConfigProviderProps extends DeepPartial<Config> {}
```

### `Config`

默认配置和完整类型定义可参考：

- `packages/components/src/index.ts:15`
- `packages/components/src/types/index.ts:7`