# Frequently Asked Questions

Here are common questions and solutions encountered by users.

## Installation & Configuration

### Q: Styles not working after installation?

**A:** Make sure you have correctly imported the component library's CSS file:

```typescript
// main.ts
import '@yetuzi/vue3-query-components/dist/style.css'
```

If it still doesn't work, check:

1. Confirm the CSS file path is correct
2. Confirm Element Plus component styles are imported
3. Check your browser's developer tools to confirm the CSS file is loaded

### Q: TypeScript error "Cannot find module"?

**A:** Please check the following:

1. Confirm `@yetuzi/vue3-query-components` is installed
2. In `tsconfig.json`, ensure `compilerOptions.moduleResolution` is set to `"bundler"` or `"node"`
3. Restart TypeScript server (Press `Ctrl+Shift+P` in VSCode and type "Restart TS Server")

### Q: Element Plus version compatibility issues?

**A:** Component library requirements:

| Component Library Version | Vue Version | Element Plus Version |
|---------------------------|-------------|----------------------|
| 1.x | 3.4+ | 2.11+ |

Please ensure version compatibility. Incompatible versions may cause functional issues.

## Usage Issues

### Q: How to customize table column rendering in CommonQueryTable?

**A:** Use slots to customize column rendering:

```vue
<template>
  <CommonQueryTable :fetch="fetch" :form="form" :columns="columns">
    <!-- Custom status column -->
    <template #table-status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? 'Enabled' : 'Disabled' }}
      </el-tag>
    </template>

    <!-- Custom operation column -->
    <template #table-operation="{ row }">
      <el-button link type="primary" @click="handleEdit(row)">Edit</el-button>
      <el-button link type="danger" @click="handleDelete(row)">Delete</el-button>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
const columns = [
  // ... other columns
  {
    label: 'Status',
    prop: 'status',
    slot: 'status'  // Specify using slot
  },
  {
    label: 'Operations',
    prop: 'operation',
    slot: 'operation'
  }
]
</script>
```

### Q: How to add custom components in query form?

**A:** Use `custom` type form items:

```typescript
const form = [
  // ... other form items
  {
    is: 'custom',
    prop: 'customField',
    label: 'Custom Field',
    // Use defaultContent slot to customize content
  }
]
```

Then use `#form-customField` slot in template:

```vue
<template #form-customField="{ formData }">
  <el-input v-model="formData.customField" placeholder="Custom input" />
</template>
```

### Q: CommonForm form validation not working?

**A:** Ensure the following:

1. Set `prop` attribute for each form item
2. If required, add `rules` in form item configuration:

```typescript
const form = [
  {
    is: 'input',
    prop: 'name',
    label: 'Username',
    required: true,  // Required
    rules: [
      { min: 2, max: 10, message: 'Length between 2 and 10 characters', trigger: 'blur' }
    ]
  }
]
```

### Q: How to customize page size options in pagination?

**A:** Configure globally via `CommonConfigProvider` or pass through attrs on component:

```vue
<!-- Global configuration -->
<CommonConfigProvider :config="{
  component: {
    pagination: {
      pageSizes: [10, 20, 50, 100]  // Custom options
    }
  }
}">
  <App />
</CommonConfigProvider>
```

Or configure separately:

```vue
<CommonPagination
  v-model:page-no="page.pageNo"
  v-model:page-size="page.pageSize"
  :total="total"
  :page-sizes="[10, 20, 50, 100]"
/>
```

## Style Issues

### Q: How to customize component theme?

**A:** The component library is based on Element Plus, you can customize the theme via CSS variables:

```css
/* Custom primary color */
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
}
```

Or via CSS override:

```css
/* Modify table styles */
.common-query-table .el-table {
  font-size: 14px;
}
```

### Q: Component styles are overridden by other styles?

**A:** Use higher priority selectors or `!important`:

```css
.common-query-table .el-table {
  font-size: 14px !important;
}
```

Or use `:deep()` deep selector:

```vue
<style scoped>
/* Use :deep() to modify child component styles */
.common-query-table :deep(.el-table) {
  font-size: 14px;
}
</style>
```

## Performance Issues

### Q: Table lag with large data volume?

**A:** Recommended optimization measures:

1. **Use pagination**: Limit the amount of data displayed per page
2. **Virtual scrolling**: Consider using virtual scrolling table (like `el-table-v2`)
3. **Reduce columns**: Only display necessary columns
4. **Optimize formatter**: Avoid complex computations in formatter

```typescript
// ❌ Bad practice
const columns = [
  {
    formatter: (row) => {
      // Complex computation
      return heavyComputation(row.data)
    }
  }
]

// ✅ Good practice - pre-compute data
const columns = [
  {
    prop: 'computedField'  // Use pre-computed value directly
  }
]
```

### Q: Slow initial page load?

**A:** You can take the following measures:

1. **Import on demand**: Only import used components
2. **CDN acceleration**: Put Element Plus and other dependencies on CDN
3. **Code splitting**: Use route lazy loading

```typescript
// Route lazy loading
const routes = [
  {
    path: '/users',
    component: () => import('./views/UserList.vue')
  }
]
```

## Type Issues

### Q: How to correctly use TypeScript generics?

**A:** The component library supports generics for complete type hints:

```typescript
import type { CommonQueryTableProps } from '@yetuzi/vue3-query-components'

// Define your data type
interface User {
  id: number
  name: string
  status: number
}

// Use generics for type hints
const columns: CommonTableColumn<User>[] = [
  {
    label: 'ID',
    prop: 'id'  // Auto-suggest User properties
  }
]
```

### Q: How to define table formatter types?

**A:** Use generics to constrain row data type:

```typescript
interface User {
  id: number
  name: string
  status: number
}

const columns: CommonTableColumn<User>[] = [
  {
    label: 'Status',
    prop: 'status',
    formatter: (row: User) => {
      // row automatically inferred as User type
      return row.status === 1 ? 'Enabled' : 'Disabled'
    }
  }
]
```

## Still haven't found an answer?

If your question is not in the FAQ, you can:

- 📖 Check [Component Documentation](/en/components/common-query-table)
- 💬 Ask on [GitHub Discussions](https://github.com/yetuzi-open/vue3-query-components/discussions)
- 🐛 Report issues on [GitHub Issues](https://github.com/yetuzi-open/vue3-query-components/issues)
