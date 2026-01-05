# 自定义主题

Vue3 Query Components 基于 Element Plus 构建，支持通过 CSS 变量自定义主题。

## CSS 变量覆盖

```css
/* styles/theme.css */
:root {
  /* 主题色 */
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-info: #909399;

  /* 字体 */
  --el-font-size-base: 14px;
  --el-font-size-small: 13px;
  --el-font-size-large: 16px;

  /* 边框 */
  --el-border-color: #dcdfe6;
  --el-border-radius-base: 4px;
  --el-border-radius-small: 2px;

  /* 间距 */
  --el-spacing-base: 16px;
  --el-spacing-small: 8px;
  --el-spacing-large: 24px;
}
```

## 表格主题自定义

```css
/* 表格主题 */
.common-table {
  --table-header-bg-color: #f5f7fa;
  --table-header-text-color: #606266;
  --table-header-font-weight: 600;
  --table-border-color: #ebeef5;
  --table-hover-bg-color: #f5f7fa;
}

/* 表头样式 */
.common-table .el-table__header {
  background-color: var(--table-header-bg-color);
}

.common-table .el-table__header th {
  background-color: var(--table-header-bg-color);
  color: var(--table-header-text-color);
  font-weight: var(--table-header-font-weight);
}
```

## 表单主题自定义

```css
/* 表单主题 */
.common-form {
  --form-label-color: #606266;
  --form-input-bg-color: #ffffff;
  --form-input-border-color: #dcdfe6;
  --form-input-focus-border-color: #409eff;
  --form-error-color: #f56c6c;
}

/* 标签样式 */
.common-form .el-form-item__label {
  color: var(--form-label-color);
}

/* 输入框样式 */
.common-form .el-input__inner {
  background-color: var(--form-input-bg-color);
  border-color: var(--form-input-border-color);
}

.common-form .el-input.is-focus .el-input__inner {
  border-color: var(--form-input-focus-border-color);
}
```

## 分页主题自定义

```css
/* 分页主题 */
.common-pagination {
  --pagination-bg-color: #ffffff;
  --pagination-text-color: #606266;
  --pagination-active-bg-color: #409eff;
  --pagination-active-text-color: #ffffff;
  --pagination-hover-bg-color: #f5f7fa;
}

/* 分页按钮 */
.common-pagination .el-pager li {
  background-color: var(--pagination-bg-color);
  color: var(--pagination-text-color);
}

.common-pagination .el-pager li.active {
  background-color: var(--pagination-active-bg-color);
  color: var(--pagination-active-text-color);
}
```

## 暗色主题

```css
/* 暗色主题 */
[data-theme="dark"] {
  --el-bg-color: #1a1a1a;
  --el-bg-color-page: #0a0a0a;
  --el-text-color-primary: #e5eaf3;
  --el-text-color-regular: #cfd3dc;
  --el-border-color: #4c4d4f;

  /* 表格暗色主题 */
  --table-header-bg-color: #2b2b2b;
  --table-header-text-color: #e5eaf3;
  --table-border-color: #4c4d4f;
  --table-hover-bg-color: #363636;
}

/* 暗色模式下的表格 */
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

## 主题切换实现

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

## SCSS 变量自定义

如果您使用 SCSS，可以通过修改变量来自定义主题：

```scss
// styles/variables.scss

// 主题色
$--color-primary: #409eff;
$--color-success: #67c23a;
$--color-warning: #e6a23c;
$--color-danger: #f56c6c;
$--color-info: #909399;

// 字体大小
$--font-size-base: 14px;
$--font-size-small: 13px;
$--font-size-large: 16px;

// 边框圆角
$--border-radius-base: 4px;
$--border-radius-small: 2px;

// 表格相关
$--table-border: 1px solid #ebeef5;
$--table-header-bg-color: #f5f7fa;
$--table-row-hover-bg-color: #f5f7fa;
$--table-current-row-bg-color: #ecf5ff;

// 表单相关
$--form-label-font-size: 14px;
$--form-item-margin-bottom: 22px;

// 导入 Element Plus 样式
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

// 导入组件样式
@import '@/styles/components.scss';
```

## 组件级主题覆盖

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
  /* 覆盖表格主题 */
  --table-header-bg-color: #f0f9eb;
  --table-header-text-color: #67c23a;

  .el-table__header th {
    background-color: var(--table-header-bg-color);
    color: var(--table-header-text-color);
  }

  /* 自定义操作按钮样式 */
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