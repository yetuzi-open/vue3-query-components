# 常见问题

这里收集了用户在使用过程中遇到的常见问题及解决方案。

## 安装与配置

### Q: 安装后样式没有生效？

**A:** 确保你已经正确导入了组件库的 CSS 文件：

```typescript
// main.ts
import '@yetuzi/vue3-query-components/dist/index.css'
```

如果仍然不生效，请检查：

1. 确认 CSS 文件路径正确
2. 确认宿主项目已安装 `element-plus`
3. 检查浏览器的开发者工具，确认 CSS 文件是否被加载

### Q: TypeScript 报错 "Cannot find module"？

**A:** 请检查以下几点：

1. 确认已安装 `@yetuzi/vue3-query-components`
2. 在 `tsconfig.json` 中确保 `compilerOptions.moduleResolution` 设置为 `"bundler"` 或 `"node"`
3. 重启 TypeScript 服务器（VSCode 中按 `Ctrl+Shift+P` 输入 "Restart TS Server"）

### Q: 与 Element Plus 版本兼容性问题？

**A:** 组件库要求：

| 组件库版本 | Vue 版本 | Element Plus 版本 |
|-----------|---------|------------------|
| 1.x | 3.4+ | 2.11+ |

请确保版本匹配，不兼容的版本可能导致功能异常。

## 使用问题

### Q: CommonQueryTable 如何自定义表格列的渲染？

**A:** 使用插槽可以自定义列的渲染：

```vue
<template>
  <CommonQueryTable :fetch="fetch" :form="form" :columns="columns">
    <!-- 自定义状态列 -->
    <template #table-status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>

    <!-- 自定义操作列 -->
    <template #table-operation="{ row }">
      <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
const columns = [
  // ... 其他列
  {
    label: '状态',
    prop: 'status',
  },
  {
    label: '操作',
    prop: 'operation',
  }
]
</script>
```

### Q: 如何在查询表单中添加自定义组件？

**A:** 直接把自定义 Vue 组件传给 `is` 字段：

```typescript
import UserSelector from './UserSelector.vue'

const form = [
  // ... 其他表单项
  {
    is: UserSelector,
    prop: 'customField',
    label: '自定义字段',
    props: {
      placeholder: '请选择',
    }
  }
]
```

如果只是想覆盖单个字段的渲染，也可以直接使用对应 `prop` 的插槽：

```vue
<template #form-customField="{ value, updateValue }">
  <el-input
    :model-value="value"
    placeholder="自定义输入"
    @update:modelValue="updateValue"
  />
</template>
```

### Q: CommonForm 的表单验证不生效？

**A:** 确保以下几点：

1. 为每个表单项设置 `prop` 属性
2. 如果需要校验规则，请把校验配置写到 `formItem.rules` 中：

```typescript
const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    formItem: {
      rules: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
      ]
    }
  }
]
```

### Q: 分页组件如何自定义每页条数选项？

**A:** 直接给 `CommonPagination` 传 `page-sizes`，或者给 `CommonQueryTable` 透传 `pagination-page-sizes`：

```vue
<CommonPagination
  v-model:page-no="page.pageNo"
  v-model:page-size="page.pageSize"
  :total="total"
  :page-sizes="[10, 20, 50, 100]"
/>
```

```vue
<CommonQueryTable
  :fetch="fetch"
  :columns="columns"
  pagination-page-sizes="[10, 20, 50, 100]"
/>
```

## 样式问题

### Q: 如何自定义组件主题？

**A:** 组件库基于 Element Plus，可以通过 CSS 变量自定义主题：

```css
/* 自定义主色 */
:root {
  --el-color-primary: #409eff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
}
```

也可以通过 CSS 覆盖：

```css
/* 修改表格样式 */
.common-query-table .el-table {
  font-size: 14px;
}
```

### Q: 组件样式被其他样式覆盖了？

**A:** 使用更高优先级的选择器或 `!important`：

```css
.common-query-table .el-table {
  font-size: 14px !important;
}
```

或者使用 `:deep()` 深度选择器：

```vue
<style scoped>
/* 使用 :deep() 修改子组件样式 */
.common-query-table :deep(.el-table) {
  font-size: 14px;
}
</style>
```

## 性能问题

### Q: 表格数据量大时卡顿怎么办？

**A:** 建议采取以下优化措施：

1. **使用分页**：限制每页显示的数据量
2. **改用更适合的大数据方案**：`CommonTable` 适合常规业务表格，超大数据量场景建议结合服务端分页，或直接切换到 `el-table-v2`
3. **减少列数**：只显示必要的列
4. **优化 formatter**：避免在 formatter 中进行复杂计算

```typescript
// ❌ 不好的做法
const columns = [
  {
    formatter: (row) => {
      // 复杂计算
      return heavyComputation(row.data)
    }
  }
]

// ✅ 好的做法 - 预先计算好数据
const columns = [
  {
    prop: 'computedField'  // 直接使用预计算的值
  }
]
```

### Q: 页面首次加载慢？

**A:** 可以采取以下措施：

1. **按需导入**：只导入使用的组件
2. **CDN 加速**：将 Element Plus 等依赖放到 CDN
3. **代码分割**：使用路由懒加载

```typescript
// 路由懒加载
const routes = [
  {
    path: '/users',
    component: () => import('./views/UserList.vue')
  }
]
```

## 类型问题

### Q: 如何正确使用 TypeScript 泛型？

**A:** 组件库支持泛型，可以获得完整的类型提示：

```typescript
import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

// 定义你的数据类型
interface User {
  id: number
  name: string
  status: number
}

// 使用泛型获得类型提示
const columns: CommonTableArrayColumns<User> = [
  {
    label: 'ID',
    prop: 'id'  // 自动提示 User 的属性
  }
]
```

### Q: 表格 formatter 的类型如何定义？

**A:** 使用泛型约束行数据类型：

```typescript
import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface User {
  id: number
  name: string
  status: number
}

const columns: CommonTableArrayColumns<User> = [
  {
    label: '状态',
    prop: 'status',
    formatter: (row) => {
      // row 自动推断为 User 类型
      return row.status === 1 ? '启用' : '禁用'
    }
  }
]
```

## 还没有找到答案？

如果你遇到的问题不在 FAQ 中，可以：

- 📖 查看 [组件文档](/components/common-query-table)
- 💬 在 [GitHub Discussions](https://github.com/yetuzi-open/vue3-query-components/discussions) 提问
- 🐛 在 [GitHub Issues](https://github.com/yetuzi-open/vue3-query-components/issues) 报告问题
