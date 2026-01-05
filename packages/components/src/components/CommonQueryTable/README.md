# CommonQueryTable 查询表格

查询表格组件，基于 Element Plus Table 封装，集成了查询表单、分页、数据展示等功能。

## 基础用法

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'address',
    label: '地址',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
  },
  {
    is: 'input',
    prop: 'age',
    label: '年龄',
  },
]

const fetchData = async (params?: any) => {
  // 模拟API调用
  return {
    list: [
      { name: '张三', age: 25, address: '北京市' },
      { name: '李四', age: 30, address: '上海市' },
      { name: '王五', age: 28, address: '广州市' },
    ],
    total: 3,
  }
}
</script>
```

## 自定义布局

通过 `layouts` 属性可以自定义组件的布局顺序和内容。默认布局为 `['form', 'table', 'pagination']`：

```vue
<template>
  <!-- 只显示表单和表格，不显示分页 -->
  <CommonQueryTable
    :columns="columns"
    :fetch="fetchData"
    :form="formConfig"
    :layouts="['form', 'table']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
  },
]

const fetchData = async (params?: any) => {
  return {
    list: [
      { name: '张三', age: 25 },
      { name: '李四', age: 30 },
    ],
    total: 2,
  }
}
</script>
```

## 完整功能示例

````vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig">
    <template #header>
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="handleRefresh">刷新</el-button>
    </template>

    <template #table="{ data }">
      <CommonTable :columns="columns" :data="data?.list">
        <template #status="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>

        <template #action="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </CommonTable>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    type: 'selection',
    width: 55,
  },
  {
    prop: 'id',
    label: 'ID',
    width: 80,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'email',
    label: '邮箱',
    showOverflowTooltip: true,
  },
  {
    prop: 'status',
    label: '状态',
    width: 80,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 180,
  },
  {
    prop: 'action',
    label: '操作',
    width: 120,
    fixed: 'right',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
    placeholder: '请输入姓名',
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    placeholder: '请选择状态',
    props: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
      ],
    },
  },
  {
    is: 'date-picker',
    prop: 'createTime',
    label: '创建时间',
  },
]

const fetchData = async (params?: any) => {
  console.log('查询参数:', params)
  // 模拟API调用
  await new Promise((resolve) => setTimeout(resolve, 500))

  const list = Array.from({ length: params.pageSize || 20 }, (_, i) => ({
    id: (params.currentPage - 1) * (params.pageSize || 20) + i + 1,
    name: `用户${(params.currentPage - 1) * (params.pageSize || 20) + i + 1}`,
    email: `user${(params.currentPage - 1) * (params.pageSize || 20) + i + 1}@example.com`,
    status: i % 3 === 0 ? 'inactive' : 'active',
    createTime: new Date().toLocaleString(),
  }))

  return {
    list,
    total: 95,
  }
}

const handleAdd = () => {
  console.log('新增')
}

const handleExport = () => {
  console.log('导出')
}

const handleRefresh = () => {
  console.log('刷新')
}

const handleEdit = (row: any) => {
  console.log('编辑:', row)
}

const handleDelete = (row: any) => {
  console.log('删除:', row)
}
</script>

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

// 表格列配置
const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80,
  },
  {
    prop: 'address',
    label: '地址',
  },
]

// 查询表单配置
const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
    props: {
      placeholder: '请输入姓名',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
      ],
    },
  },
]

// 数据获取函数
const fetchData = async (params?: any) => {
  // 模拟API调用
  console.log('查询参数:', params)
  return {
    list: [
      { name: '张三', age: 25, address: '北京市' },
      { name: '李四', age: 30, address: '上海市' },
    ],
    total: 2,
  }
}
</script>
````

## 带操作列

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig">
    <template #table="{ data }">
      <CommonTable :columns="columns" :data="data?.list">
        <template #action="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </CommonTable>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80,
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'action',
    label: '操作',
    width: 150,
    fixed: 'right',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
    props: {
      placeholder: '请输入姓名',
    },
  },
]

const fetchData = async (params?: any) => {
  return {
    list: [
      { name: '张三', age: 25, address: '北京市' },
      { name: '李四', age: 30, address: '上海市' },
    ],
    total: 2,
  }
}

const handleEdit = (row: any) => {
  console.log('编辑:', row)
}

const handleDelete = (row: any) => {
  console.log('删除:', row)
}
</script>
```

## 自定义列模板

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig">
    <template #table="{ data }">
      <CommonTable :columns="columns" :data="data?.list">
        <template #name="{ row }">
          <el-tag>{{ row.name }}</el-tag>
        </template>

        <template #status="{ row }">
          <el-switch v-model="row.status" active-value="active" inactive-value="inactive" />
        </template>
      </CommonTable>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
  },
  {
    prop: 'age',
    label: '年龄',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
  },
]

const fetchData = async (params?: any) => {
  return {
    list: [
      { name: '张三', age: 25, status: 'active' },
      { name: '李四', age: 30, status: 'inactive' },
    ],
    total: 2,
  }
}
</script>
```

## 自定义查询表单

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig">
    <template #form="{ formData }">
      <CommonForm :form="customForm" v-model="formData">
        <template #dateRange="{ formData }">
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="formData.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </template>
      </CommonForm>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'date',
    label: '日期',
    width: 120,
  },
  {
    prop: 'name',
    label: '名称',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '名称',
  },
]

const customForm: CommonFormPropForm<any> = [
  ...formConfig,
  {
    is: 'custom',
    prop: 'dateRange',
    label: '日期范围',
  },
]

const fetchData = async (params?: any) => {
  console.log('查询参数:', params)
  return {
    list: [
      { date: '2024-01-01', name: '项目1' },
      { date: '2024-01-02', name: '项目2' },
    ],
    total: 2,
  }
}
</script>
```

## 数据导出

```vue
<template>
  <CommonQueryTable
    :columns="columns"
    :fetch="fetchData"
    :form="formConfig"
    @export="handleExport"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '名称',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '名称',
  },
]

const fetchData = async (params?: any) => {
  return {
    list: [{ name: '项目1' }, { name: '项目2' }],
    total: 2,
  }
}

const handleExport = (data: any) => {
  console.log('导出数据:', data)
}
</script>
```

## 响应式布局

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '名称',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '名称',
  },
]

const fetchData = async (params?: any) => {
  return {
    list: [{ name: '项目1' }, { name: '项目2' }],
    total: 2,
  }
}
</script>
```

## 表格操作按钮

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig">
    <template #header>
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="handleRefresh">刷新</el-button>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const columns: CommonTableColumn<any> = [
  {
    prop: 'name',
    label: '姓名',
  },
]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
  },
]

const fetchData = async (params?: any) => {
  return {
    list: [{ name: '张三' }, { name: '李四' }],
    total: 2,
  }
}

const handleAdd = () => {
  console.log('新增')
}

const handleExport = () => {
  console.log('导出')
}

const handleRefresh = () => {
  console.log('刷新')
}
</script>
```

## 属性

| 属性名  | 说明         | 类型     | 可选值 | 默认值                          |
| ------- | ------------ | -------- | ------ | ------------------------------- |
| columns | 表格列配置   | array    | -      | -                               |
| form    | 查询表单配置 | array    | -      | []                              |
| fetch   | 加载数据函数 | function | -      | -                               |
| layouts | 布局配置数组 | array    | -      | ['form', 'table', 'pagination'] |

## 使用说明

### layouts 属性

`layouts` 属性支持以下布局选项：

- `'header'` - 头部区域，通常用于放置操作按钮
- `'form'` - 查询表单区域
- `'toolbar'` - 工具栏区域
- `'table'` - 表格区域
- `'pagination'` - 分页区域
- `'footer'` - 底部区域

默认布局为 `['form', 'table', 'pagination']`。

### 如何访问子组件的事件和方法

CommonQueryTable 是一个组合组件，它内部使用了 CommonForm、CommonTable 和 CommonPagination 组件。由于 CommonQueryTable 本身没有定义事件和方法，如果你需要使用这些子组件的事件和方法，需要通过插槽来访问：

```vue
<template>
  <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig">
    <!-- 访问 CommonTable 的事件和方法 -->
    <template #table="{ data }">
      <CommonTable
        :columns="columns"
        :data="data"
        @selection-change="handleSelectionChange"
        ref="tableRef"
      >
        <!-- 表格内容 -->
      </CommonTable>
    </template>

    <!-- 访问 CommonForm 的事件 -->
    <template #form="{ form }">
      <CommonForm :form="form" @submit="handleCustomSubmit">
        <!-- 表单内容 -->
      </CommonForm>
    </template>

    <!-- 访问 CommonPagination 的事件 -->
    <template #pagination="{ total }">
      <CommonPagination :total="total" @change="handlePageChange">
        <!-- 分页内容 -->
      </CommonPagination>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableRef = ref()

// 访问 CommonTable 的方法
const clearSelection = () => {
  tableRef.value?.clearSelection()
}

const handleSelectionChange = (selection: any[]) => {
  console.log('选择项变化:', selection)
}

const handleCustomSubmit = (formData: any) => {
  console.log('自定义提交:', formData)
}

const handlePageChange = (page: any) => {
  console.log('分页变化:', page)
}
</script>
```

## 插槽

| 插槽名        | 说明                            |
| ------------- | ------------------------------- |
| default       | 自定义表格内容                  |
| header        | 自定义头部内容（操作按钮区域）  |
| form-\*       | 自定义查询表单内容              |
| table-\*      | 自定义表格区域，参数为 { data } |
| pagination-\* | 自定义分页内容                  |
