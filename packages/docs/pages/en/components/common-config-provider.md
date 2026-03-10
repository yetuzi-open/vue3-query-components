---
title: CommonConfigProvider
---

# CommonConfigProvider

`CommonConfigProvider` centralizes default behavior across the component library, such as placeholders, pagination defaults, form button labels, and input widths. It works well at the app root and can also be scoped to a single page.

Key features:

- Supports app-level, page-level, and local configuration scopes
- Supports nested providers with merged configuration
- Supports reactive config updates
- Helps keep admin pages visually and behaviorally consistent

## Basic Usage

### App-Level Configuration

Use it at the application entry to define global defaults.

```vue
<template>
  <CommonConfigProvider :component="appConfig">
    <router-view />
  </CommonConfigProvider>
</template>
```

### Page-Level Configuration

Use it inside a page when only that area needs custom defaults.

```vue
<template>
  <CommonConfigProvider :component="pageConfig">
    <CommonQueryTable :fetch="fetch" :columns="columns" :form="form" />
  </CommonConfigProvider>
</template>
```

## Reactive Configuration

When the config object is reactive, internal components update automatically.

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

## Best Practices

- Define brand-level defaults at the app root
- Override only the fields needed for a specific page
- Use `reactive` or `computed` for dynamic config
- Prefer incremental overrides instead of repeating the full config object

## API

### Props

| Prop | Description | Type |
| --- | --- | --- |
| `component` | Component-level configuration, typically used to override `config.component` | `DeepPartial<Config['component']>` |

### Common Config Fields

| Field | Description | Default |
| --- | --- | --- |
| `component.placeholder` | Placeholder for empty values | `'-'` |
| `component.pagination.defaultPageCount` | Default initial page number | `1` |
| `component.pagination.defaultPageSize` | Default page size | `10` |
| `component.form.submitText` | Form submit button text | `'搜索'` |
| `component.form.resetText` | Form reset button text | `'重置'` |
| `component.form.formItem.components.width` | Default form control width | `'200px'` |

## TypeScript Types

```ts
import type {
  CommonConfigProviderProps,
  Config,
} from '@yetuzi/vue3-query-components'
```

```ts
interface CommonConfigProviderProps extends DeepPartial<Config> {}
```
