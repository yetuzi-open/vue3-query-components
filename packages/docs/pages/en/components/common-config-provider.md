---
title: CommonConfigProvider
---

# CommonConfigProvider

`CommonConfigProvider` is used to define shared default behavior for the component library, such as empty placeholders, pagination defaults, form button labels, and form control width.

Key features:

- Supports app-level, page-level, and local scoped configuration
- Supports reactive config updates
- Supports nested config merging
- Affects all components that read the shared config

## Basic Usage

### App-level Configuration

Configure once at the application entry and apply it globally.

```vue
<template>
  <CommonConfigProvider :component="appConfig">
    <router-view />
  </CommonConfigProvider>
</template>
```

### Page-level Configuration

Wrap a specific page to override config only for that page and its children.

```vue
<template>
  <CommonConfigProvider :component="pageConfig">
    <CommonQueryTable :fetch="fetch" :columns="columns" :form="form" />
  </CommonConfigProvider>
</template>
```

### Dynamic Configuration

If the config object is reactive, updates take effect immediately.

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

## Best Practices

- Set global defaults in the root of the app
- Override only what is necessary at the page level
- Use `reactive` for mutable runtime config
- Prefer partial overrides instead of redefining the entire config

## API

### Props

| Prop | Description | Type |
| --- | --- | --- |
| `component` | Shared component-library config object | `DeepPartial<Config['component']>` |

## Common Config Fields

| Field | Description | Default |
| --- | --- | --- |
| `component.placeholder` | Empty value placeholder | `'-'` |
| `component.pagination.defaultPageCount` | Default start page | `1` |
| `component.pagination.defaultPageSize` | Default page size | `10` |
| `component.form.submitText` | Form submit button text | `'搜索'` |
| `component.form.resetText` | Form reset button text | `'重置'` |
| `component.form.formItem.components.width` | Default form control width | `'200px'` |

## TypeScript Types

```ts
interface CommonConfigProviderProps extends DeepPartial<Config> {}
```

### `Config`

See the source for the default config and full type definition:

- `packages/components/src/index.ts:15`
- `packages/components/src/types/index.ts:7`