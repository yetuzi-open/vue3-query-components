# useGetComponentsChildrenAttrs 函数

## 功能说明

`useGetComponentsChildrenAttrs` 函数用于根据组件名称前缀，将父组件传递的属性自动分组到对应的子组件中。

## 工作原理

函数会遍历 `useAttrs()` 返回的所有属性，根据属性名的前缀（首字母大写的组件名）将属性分配到对应的组件对象中。

## 调用示例

```typescript
// 调用函数
const childrenAttrs = useGetComponentsChildrenAttrs(['table', 'form', 'pagination'])

// 假设 useAttrs() 返回
{
  onTableSelectionChange: function() { ... },
  tableName: '111',
  formData: { name: 'test' },
  onFormSubmit: function() { ... },
  paginationPageSize: 10
}
```

## 转换规则

### 属性名处理
1. **匹配前缀**：属性名以组件名的首字母大写形式开头
2. **提取属性名**：移除前缀，将剩余部分转换为 camelCase
3. **分配到组件**：将处理后的属性添加到对应组件的对象中

### 转换示例

```javascript
// 输入属性
{
  onTableSelectionChange: func,    // -> table: { onSelectionChange: func }
  tableName: '111',                // -> table: { name: '111' }
  formData: { name: 'test' },      // -> form: { data: { name: 'test' } }
  onFormSubmit: func,              // -> form: { onSubmit: func }
  paginationPageSize: 10           // -> pagination: { pageSize: 10 }
}

// 输出结果
{
  table: {
    onSelectionChange: func,
    name: '111'
  },
  form: {
    data: { name: 'test' },
    onSubmit: func
  },
  pagination: {
    pageSize: 10
  }
}
```

## 使用示例

```vue
<template>
  <!-- 父组件传递属性 -->
  <CommonQueryTable
    :table-name="'users'"
    :on-table-selection-change="handleSelection"
    :form-data="formData"
    :on-form-submit="handleSubmit"
  />

  <!-- 子组件内部使用 -->
  <CommonTable v-bind="childrenAttrs.table" />
  <CommonForm v-bind="childrenAttrs.form" />
  <CommonPagination v-bind="childrenAttrs.pagination" />
</template>

<script setup>
// 处理后的 childrenAttrs 值
// childrenAttrs.table = { name: 'users', onSelectionChange: handleSelection }
// childrenAttrs.form = { data: formData, onSubmit: handleSubmit }
</script>
```

## 注意事项

1. **前缀匹配**：属性名必须以组件名的首字母大写形式开头
2. **camelCase 转换**：剩余部分会自动转换为 camelCase 格式
3. **Vue3 支持**：转换后的对象可以直接用于 `v-bind`，Vue3 会自动区分属性和事件
4. **未匹配属性**：不匹配任何组件前缀的属性会被忽略

## 优势

1. **自动分组**：根据前缀自动将属性分配到对应组件
2. **类型安全**：完整的 TypeScript 支持
3. **Vue3 兼容**：生成的对象可直接用于 `v-bind`
4. **简化开发**：无需手动处理属性传递