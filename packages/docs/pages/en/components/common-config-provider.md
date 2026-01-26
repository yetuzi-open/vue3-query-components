---
title: CommonConfigProvider
---


# CommonConfigProvider Global Configuration

Provides global configuration functionality, including pagination defaults, form text, table styles, etc.

## Basic Usage

### 1. Application-level Configuration

Configure at the application entry point, effective globally:

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
      submitText: 'Search',
      resetText: 'Reset'
    }
  }
})
</script>
```

### 2. Page-level Configuration

Configure on a specific page, overriding the page and its child components:

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
      submitText: 'Search',
      resetText: 'Reset'
    }
  }
})
</script>
```

### 3. Dynamic Configuration

Configuration supports reactive updates and can be dynamically adjusted based on user preferences or runtime conditions:

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

**Key Features:**
- Configuration objects defined with `reactive` take effect immediately after modification
- Configuration changes are reflected in real-time on wrapped components
- Suitable for dynamic scenarios such as user preference settings and theme switching

## Best Practices

1. **Unified Style**: Use CommonConfigProvider in the application root component to ensure consistent application-wide styling
2. **Reasonable Override**: Page-level configuration can override application-level configuration for personalized customization
3. **Reactive Updates**: Use `reactive` to define configuration, directly modify properties for real-time effectiveness
4. **Configure as Needed**: Only configure properties that need to be overridden, other properties use default values

## API

### Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| config | Global configuration object | `Config` | See default configuration below |

### Config Configuration Description

#### Default Configuration

<<< ../../../../components/src/index.ts#config

#### TypeScript Type Definition

<<< ../../../../components/src/types/index.ts#config

#### Configuration Items Description

| Configuration Item | Description | Type | Default |
| --- | --- | --- | --- |
| placeholder | Empty value placeholder, used to display empty values in tables and forms | `string` | `'-'` |
| pagination.defaultPageCount | Default starting page number | `number` | `1` |
| pagination.defaultPageSize | Default number of items per page | `number` | `10` |
| form.submitText | Form submit button text | `string` | `'Search'` |
| form.resetText | Form reset button text | `string` | `'Reset'` |
| form.formItem.components.width | Form item width | `string` | `'200px'` |

## TypeScript Types

The component exports the following TypeScript type definitions for direct use in your project:

### Config

```typescript
/**
 * Global configuration type
 */
interface Config {
  component: {
    /** Empty value placeholder */
    placeholder: string

    /** Pagination component default pagination data */
    pagination: {
      /** Default request starting page number */
      defaultPageCount: number
      /** Default number of items per page */
      defaultPageSize: number
    }

    /** Table component */
    table: {}

    /** Form component */
    form: {
      /** Submit button text */
      submitText: string
      /** Reset button text */
      resetText: string
      /** Form item configuration */
      formItem: {
        components: {
          width: string
        }
      }
    }
  }
}
```

### CommonConfigProviderProps

```typescript
/**
 * CommonConfigProvider component Props
 */
interface CommonConfigProviderProps extends Partial<Config> {}
```

**Usage Example:**

```typescript
import { reactive } from 'vue'
import type { Config } from '@yetuzi/vue3-query-components'

// Define global configuration
const appConfig: Config = {
  component: {
    placeholder: 'No data',
    pagination: {
      defaultPageCount: 1,
      defaultPageSize: 20,
    },
    table: {},
    form: {
      submitText: 'Search',
      resetText: 'Reset',
      formItem: {
        components: {
          width: '240px',
        },
      },
    },
  },
}

// Use reactive configuration
const config = reactive(appConfig)

// Dynamically update configuration
config.component.pagination.defaultPageSize = 50
```
