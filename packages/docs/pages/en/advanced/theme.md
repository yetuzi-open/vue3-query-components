# Custom Theme

Vue3 Query Components is built on Element Plus and supports theme customization via CSS variables.

## CSS Variable Override

```css
/* styles/theme.css */
:root {
  /* Theme colors */
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-info: #909399;

  /* Typography */
  --el-font-size-base: 14px;
  --el-font-size-small: 13px;
  --el-font-size-large: 16px;

  /* Border */
  --el-border-color: #dcdfe6;
  --el-border-radius-base: 4px;
  --el-border-radius-small: 2px;

  /* Spacing */
  --el-spacing-base: 16px;
  --el-spacing-small: 8px;
  --el-spacing-large: 24px;
}
```

## Table Theme Customization

```css
/* Table theme */
.common-table {
  --table-header-bg-color: #f5f7fa;
  --table-header-text-color: #606266;
  --table-header-font-weight: 600;
  --table-border-color: #ebeef5;
  --table-hover-bg-color: #f5f7fa;
}

/* Header styles */
.common-table .el-table__header {
  background-color: var(--table-header-bg-color);
}

.common-table .el-table__header th {
  background-color: var(--table-header-bg-color);
  color: var(--table-header-text-color);
  font-weight: var(--table-header-font-weight);
}
```

## Form Theme Customization

```css
/* Form theme */
.common-form {
  --form-label-color: #606266;
  --form-input-bg-color: #ffffff;
  --form-input-border-color: #dcdfe6;
  --form-input-focus-border-color: #409eff;
  --form-error-color: #f56c6c;
}

/* Label styles */
.common-form .el-form-item__label {
  color: var(--form-label-color);
}

/* Input styles */
.common-form .el-input__inner {
  background-color: var(--form-input-bg-color);
  border-color: var(--form-input-border-color);
}

.common-form .el-input.is-focus .el-input__inner {
  border-color: var(--form-input-focus-border-color);
}
```

## Pagination Theme Customization

```css
/* Pagination theme */
.common-pagination {
  --pagination-bg-color: #ffffff;
  --pagination-text-color: #606266;
  --pagination-active-bg-color: #409eff;
  --pagination-active-text-color: #ffffff;
  --pagination-hover-bg-color: #f5f7fa;
}

/* Pagination buttons */
.common-pagination .el-pager li {
  background-color: var(--pagination-bg-color);
  color: var(--pagination-text-color);
}

.common-pagination .el-pager li.active {
  background-color: var(--pagination-active-bg-color);
  color: var(--pagination-active-text-color);
}
```

## Dark Theme

```css
/* Dark theme */
[data-theme="dark"] {
  --el-bg-color: #1a1a1a;
  --el-bg-color-page: #0a0a0a;
  --el-text-color-primary: #e5eaf3;
  --el-text-color-regular: #cfd3dc;
  --el-border-color: #4c4d4f;

  /* Table dark theme */
  --table-header-bg-color: #2b2b2b;
  --table-header-text-color: #e5eaf3;
  --table-border-color: #4c4d4f;
  --table-hover-bg-color: #363636;
}

/* Table in dark mode */
[data-theme="dark"] .common-table {
  background-color: var(--el-bg-color);
  color: var(--el-text-color-primary);
}

[data-theme="dark"] .common-table .el-table__header th {
  background-color: var(--table-header-bg-color);
  color: var(--table-header-text-color);
  border-color: var(--table-border-color);
}
```

## Theme Toggle Implementation

```vue
<!-- ThemeToggle.vue -->
<template>
  <el-switch
    v-model="isDark"
    :active-icon="Moon"
    :inactive-icon="Sunny"
    @change="toggleTheme"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'

const isDark = ref(false)

const toggleTheme = (dark: boolean) => {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  if (savedTheme) {
    toggleTheme(savedTheme === 'dark')
  }
})
</script>
```

## SCSS Variable Customization

If you use SCSS, you can customize the theme by modifying variables:

```scss
// styles/variables.scss

// Theme colors
$--color-primary: #409eff;
$--color-success: #67c23a;
$--color-warning: #e6a23c;
$--color-danger: #f56c6c;
$--color-info: #909399;

// Font sizes
$--font-size-base: 14px;
$--font-size-small: 13px;
$--font-size-large: 16px;

// Border radius
$--border-radius-base: 4px;
$--border-radius-small: 2px;

// Table related
$--table-border: 1px solid #ebeef5;
$--table-header-bg-color: #f5f7fa;
$--table-row-hover-bg-color: #f5f7fa;
$--table-current-row-bg-color: #ecf5ff;

// Form related
$--form-label-font-size: 14px;
$--form-item-margin-bottom: 22px;

// Import Element Plus styles
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': $--color-primary,
    ),
    'success': (
      'base': $--color-success,
    ),
    'warning': (
      'base': $--color-warning,
    ),
    'danger': (
      'base': $--color-danger,
    ),
    'info': (
      'base': $--color-info,
    ),
  )
);

// Import component styles
@import '@/styles/components.scss';
```

## Component-Level Theme Override

```vue
<!-- CustomTable.vue -->
<template>
  <common-query-table
    :fetch="fetchData"
    :form="formConfig"
    :columns="columns"
    class="custom-table"
  />
</template>

<style lang="scss">
.custom-table {
  /* Override table theme */
  --table-header-bg-color: #f0f9eb;
  --table-header-text-color: #67c23a;

  .el-table__header th {
    background-color: var(--table-header-bg-color);
    color: var(--table-header-text-color);
  }

  /* Custom action button styles */
  .table-actions {
    .el-button {
      margin-left: 8px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
```
