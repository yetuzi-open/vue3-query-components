# CommonTable 表格

常用的表格组件，基于 Element Plus Table 封装，支持列配置自动转换和数据变化时自动滚动到顶部。

## 基础用法

```vue
<template>
  <CommonTable :data="tableData" :columns="columns" />
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 28, city: '广州' },
])

const columns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'city', label: '城市' },
])
</script>
```

## 列配置对象格式

支持对象格式的列配置，键名作为 prop。

```vue
<template>
  <CommonTable :data="tableData" :columns="columnConfig" />
</template>

<script setup>
const columnConfig = ref({
  name: { label: '姓名', width: 120 },
  age: { label: '年龄', width: 80 },
  city: { label: '城市', width: 100 },
})
</script>
```

## 自定义列模板

使用作用域插槽自定义列内容。

```vue
<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #name="{ row }">
      <el-tag>{{ row.name }}</el-tag>
    </template>
    <template #age="{ row }">
      <span style="color: #409EFF">{{ row.age }}岁</span>
    </template>
    <template #action="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </CommonTable>
</template>

<script setup>
const columns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'action', label: '操作', width: 150 },
])

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = (row) => {
  console.log('删除:', row)
}
</script>
```

## 特殊列类型

支持特殊列类型，如索引、选择框等。

```vue
<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #index="{ $index }">
      <span style="color: #409EFF">{{ $index + 1 }}</span>
    </template>
  </CommonTable>
</template>

<script setup>
const columns = ref([
  { type: 'index', label: '序号', width: 60 },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'city', label: '城市' },
])
</script>
```

## 固定列

通过 `fixed` 属性固定列。

```vue
<template>
  <CommonTable :data="tableData" :columns="columns" />
</template>

<script setup>
const columns = ref([
  { prop: 'name', label: '姓名', width: 120, fixed: true },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'city', label: '城市', width: 100 },
  { prop: 'address', label: '地址' },
  { prop: 'action', label: '操作', width: 120, fixed: 'right' },
])
</script>
```

## 排序

通过 `sortable` 属性启用排序功能。

```vue
<template>
  <CommonTable :data="tableData" :columns="columns" />
</template>

<script setup>
const columns = ref([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄', sortable: true },
  { prop: 'city', label: '城市' },
])
</script>
```

## 筛选

通过 `filters` 和 `filter-method` 实现列筛选。

```vue
<template>
  <CommonTable :data="tableData" :columns="columns" />
</template>

<script setup>
const columns = ref([
  { prop: 'name', label: '姓名' },
  {
    prop: 'city',
    label: '城市',
    filters: [
      { text: '北京', value: '北京' },
      { text: '上海', value: '上海' },
    ],
  },
  { prop: 'age', label: '年龄' },
])
</script>
```

## 空状态

自定义空状态显示。

```vue
<template>
  <CommonTable :data="[]" :columns="columns">
    <template #empty>
      <el-empty description="暂无数据" />
    </template>
  </CommonTable>
</template>
```

## 数据变化自动滚动

当表格数据发生变化时，会自动滚动到顶部。

```vue
<template>
  <div>
    <el-button @click="loadData">加载新数据</el-button>
    <CommonTable :data="tableData" :columns="columns" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])
const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '名称' },
  { prop: 'value', label: '值' },
])

const loadData = () => {
  // 模拟加载新数据
  tableData.value = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `项目${i + 1}`,
    value: Math.random() * 100,
  }))
}
</script>
```

## 完整功能示例

```vue
<template>
  <CommonTable
    :data="tableData"
    :columns="columns"
    :height="400"
    stripe
    border
    highlight-current-row
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <template #selection="{ row }">
      <el-checkbox v-model="row.selected" />
    </template>
    <template #status="{ row }">
      <el-tag :type="row.status === 'active' ? 'success' : 'info'">
        {{ row.status === 'active' ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #action="{ row }">
      <el-button size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </CommonTable>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    age: 25,
    city: '北京',
    status: 'active',
    selected: false,
  },
  {
    id: 2,
    name: '李四',
    age: 30,
    city: '上海',
    status: 'inactive',
    selected: true,
  },
])

const columns = ref([
  { type: 'selection', width: 55 },
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80, sortable: true },
  { prop: 'city', label: '城市', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'action', label: '操作', width: 150, fixed: 'right' },
])

const handleSelectionChange = (selection) => {
  console.log('选择变化:', selection)
}

const handleRowClick = (row) => {
  console.log('行点击:', row)
}

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = (row) => {
  console.log('删除:', row)
}
</script>
```

## 属性

| 属性名                  | 说明                           | 类型          | 可选值     | 默认值                                               |
| ----------------------- | ------------------------------ | ------------- | ---------- | ---------------------------------------------------- |
| data                    | 表格数据                       | array         | -          | []                                                   |
| columns                 | 列配置                         | array/object  | -          | []                                                   |
| height                  | 表格高度                       | string/number | -          | -                                                    |
| max-height              | 表格最大高度                   | string/number | -          | -                                                    |
| stripe                  | 是否为斑马纹                   | boolean       | -          | false                                                |
| border                  | 是否带有纵向边框               | boolean       | -          | false                                                |
| fit                     | 列的宽度是否自撑开             | boolean       | -          | true                                                 |
| show-header             | 是否显示表头                   | boolean       | -          | true                                                 |
| highlight-current-row   | 是否要高亮当前行               | boolean       | -          | false                                                |
| empty-text              | 空数据时显示的文本             | string        | -          | 暂无数据                                             |
| default-expand-all      | 是否默认展开所有行             | boolean       | -          | false                                                |
| default-sort            | 默认的排序列和排序顺序         | object        | -          | -                                                    |
| tooltip-effect          | 表格 tooltip 的 effect 属性    | string        | dark/light | dark                                                 |
| show-summary            | 是否在表尾显示合计行           | boolean       | -          | false                                                |
| sum-text                | 合计行第一列的文本             | string        | -          | 合计                                                 |
| select-on-indeterminate | 控制全选按钮如何展示不确定状态 | boolean       | -          | true                                                 |
| indent                  | 展示树形数据时，每层缩进       | number        | -          | 16                                                   |
| lazy                    | 是否懒加载子节点数据           | boolean       | -          | false                                                |
| load                    | 加载子节点数据的函数           | function      | -          | -                                                    |
| tree-props              | 渲染嵌套数据的配置选项         | object        | -          | { hasChildren: 'hasChildren', children: 'children' } |

## 事件

| 事件名             | 说明                                         | 回调参数                                    |
| ------------------ | -------------------------------------------- | ------------------------------------------- |
| select             | 当用户手动勾选数据行的 Checkbox 时触发的事件 | (selection, row) => void                    |
| select-all         | 当用户手动勾选全选 Checkbox 时触发的事件     | (selection) => void                         |
| selection-change   | 当选择项发生变化时会触发该事件               | (selection) => void                         |
| cell-mouse-enter   | 当单元格 hover 进入时会触发该事件            | (row, column, cell, event) => void          |
| cell-mouse-leave   | 当单元格 hover 退出时会触发该事件            | (row, column, cell, event) => void          |
| cell-click         | 当某个单元格被点击时会触发该事件             | (row, column, cell, event) => void          |
| cell-dblclick      | 当某个单元格被双击击时会触发该事件           | (row, column, cell, event) => void          |
| row-click          | 当某一行被点击时会触发该事件                 | (row, column, event) => void                |
| row-contextmenu    | 当某一行被鼠标右键点击时会触发该事件         | (row, column, event) => void                |
| row-dblclick       | 当某一行被双击时会触发该事件                 | (row, column, event) => void                |
| header-click       | 当某一列的表头被点击时会触发该事件           | (column, event) => void                     |
| header-contextmenu | 当某一列的表头被鼠标右键点击时会触发该事件   | (column, event) => void                     |
| sort-change        | 当表格的排序条件发生变化的时候会触发该事件   | ({ column, prop, order }) => void           |
| filter-change      | 当表格的筛选条件发生变化的时候会触发该事件   | (filters) => void                           |
| current-change     | 当表格的当前行发生变化的时候会触发该事件     | (currentRow, oldCurrentRow) => void         |
| header-dragend     | 当拖动表头改变了列的宽度的时候会触发该事件   | (newWidth, oldWidth, column, event) => void |
| expand-change      | 当用户对某一行展开或者关闭的时候会触发该事件 | (row, expandedRows) => void                 |

## 方法

| 方法名             | 说明                                       | 参数                                  |
| ------------------ | ------------------------------------------ | ------------------------------------- |
| clearSelection     | 用于多选表格，清空用户的选择               | -                                     |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态         | (row, selected) => void               |
| toggleAllSelection | 用于多选表格，切换全选和全不选             | -                                     |
| toggleRowExpansion | 用于可展开表格，切换某一行的展开状态       | (row, expanded) => void               |
| setCurrentRow      | 用于单选表格，设定某一行为选中行           | (row) => void                         |
| clearSort          | 用于清空排序条件，数据会恢复成未排序的状态 | -                                     |
| clearFilter        | 用于清空过滤条件，数据会恢复成未过滤的状态 | (columnKey) => void                   |
| doLayout           | 对 Table 进行重新布局                      | -                                     |
| sort               | 手动对 Table 进行排序                      | (prop: string, order: string) => void |
| scrollTo           | 滚动到一组特定坐标                         | (options: object) => void             |
| setScrollTop       | 设置垂直滚动位置                           | (top: number) => void                 |
| setScrollLeft      | 设置水平滚动位置                           | (left: number) => void                |

## 插槽

| 插槽名  | 说明                                   |
| ------- | -------------------------------------- |
| default | 自定义列模板，使用列的 prop 作为插槽名 |
| empty   | 当数据为空时自定义的内容               |

## 类型定义

```typescript
interface CommonTableProps<T = any> extends TableProps<T> {
  columns: CommonTableColumn<T>[] | Record<string, CommonTableColumn<T>>
  data: T[]
}

interface CommonTableColumn<T = any> extends Partial<TableColumnCtx<T>> {
  type?: 'index' | 'selection' | 'expand' | 'action'
}
```
