# CommonConfigProvider 全局配置

全局配置组件，用于统一配置组件库的全局参数，如组件默认分页、表格样式、表单配置等。

## 基础用法

```vue
<template>
  <CommonConfigProvider :component="config">
    <App />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config } from 'vue3-common'

const config: Config = {
  component: {
    placeholder: '暂无数据',
    pagination: {
      defaultPageCount: 1,
      defaultPageSize: 20,
    },
    table: {
      headerCellStyle: {
        backgroundColor: '#f5f7fa',
        color: '#606266',
        fontWeight: 'bold',
      },
    },
    form: {
      submitText: '查询',
      resetText: '清空',
      formItem: {
        components: {
          width: '240px',
        },
      },
    },
  },
}
</script>
```

## 配置分页默认值

```vue
<template>
  <CommonConfigProvider :component="config">
    <CommonQueryTable :columns="columns" :fetch="fetchData" :form="formConfig" />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config, CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const config: Config = {
  component: {
    pagination: {
      defaultPageCount: 1, // 默认起始页码
      defaultPageSize: 50, // 默认每页条数
    },
  },
}

const columns: CommonTableColumn<any> = [
  { prop: 'name', label: '名称' },
  { prop: 'status', label: '状态' },
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
    list: [
      { name: '项目1', status: '正常' },
      { name: '项目2', status: '异常' },
    ],
    total: 2,
  }
}
</script>
```

## 配置表格样式

```vue
<template>
  <CommonConfigProvider :component="config">
    <CommonTable :columns="columns" :data="tableData" />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config, CommonTableColumn } from 'vue3-common'

const config: Config = {
  component: {
    table: {
      headerCellStyle: {
        backgroundColor: '#f1f6ff',
        color: '#000000',
        fontWeight: 'normal',
        height: '48px',
      },
    },
  },
}

const columns: CommonTableColumn<any> = [
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '地址' },
]

const tableData = [
  { date: '2024-01-01', name: '张三', address: '北京市' },
  { date: '2024-01-02', name: '李四', address: '上海市' },
]
</script>
```

## 配置表单组件

```vue
<template>
  <CommonConfigProvider :component="config">
    <CommonForm :form="formConfig" @submit="handleSubmit" @reset="handleReset" />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config, CommonFormPropForm } from 'vue3-common'

const config: Config = {
  component: {
    form: {
      submitText: '搜索', // 提交按钮文本
      resetText: '重置', // 重置按钮文本
      formItem: {
        components: {
          width: '200px', // 表单组件默认宽度
        },
      },
    },
  },
}

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'keyword',
    label: '关键词',
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      options: [
        { label: '全部', value: '' },
        { label: '正常', value: 'normal' },
        { label: '异常', value: 'abnormal' },
      ],
    },
  },
]

const handleSubmit = (formData: any) => {
  console.log('表单提交:', formData)
}

const handleReset = () => {
  console.log('表单重置')
}
</script>
```

## 配置空值占位符

```vue
<template>
  <CommonConfigProvider :component="config">
    <CommonTable :columns="columns" :data="[]" />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config, CommonTableColumn } from 'vue3-common'

const config: Config = {
  component: {
    placeholder: '--', // 空值占位符
  },
}

const columns: CommonTableColumn<any> = [
  { prop: 'name', label: '名称' },
  { prop: 'value', label: '数值' },
]
</script>
```

## 嵌套配置

配置支持嵌套，内层配置会合并外层配置：

```vue
<template>
  <CommonConfigProvider :component="globalConfig">
    <div>
      <h3>外层配置 - 每页 20 条</h3>
      <CommonQueryTable :columns="columns1" :fetch="fetchData1" :form="formConfig" />

      <CommonConfigProvider :component="localConfig">
        <h3>内层配置 - 每页 50 条（覆盖外层配置）</h3>
        <CommonQueryTable :columns="columns2" :fetch="fetchData2" :form="formConfig" />
      </CommonConfigProvider>
    </div>
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config, CommonTableColumn, CommonFormPropForm } from 'vue3-common'

const globalConfig: Config = {
  component: {
    pagination: {
      defaultPageSize: 20, // 外层配置
    },
  },
}

const localConfig: Config = {
  component: {
    pagination: {
      defaultPageSize: 50, // 内层配置覆盖外层配置
    },
  },
}

const columns1: CommonTableColumn<any> = [{ prop: 'name', label: '外层表格' }]

const columns2: CommonTableColumn<any> = [{ prop: 'name', label: '内层表格' }]

const formConfig: CommonFormPropForm<any> = [
  {
    is: 'input',
    prop: 'keyword',
    label: '关键词',
  },
]

const fetchData1 = async () => {
  return {
    list: Array.from({ length: 25 }, (_, i) => ({ name: `外层项目${i + 1}` })),
    total: 25,
  }
}

const fetchData2 = async () => {
  return {
    list: Array.from({ length: 60 }, (_, i) => ({ name: `内层项目${i + 1}` })),
    total: 60,
  }
}
</script>
```

## 完整配置示例

```vue
<template>
  <CommonConfigProvider :component="config">
    <App />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config } from 'vue3-common'

const config: Config = {
  component: {
    // 空值占位符
    placeholder: '-',

    // 分页配置
    pagination: {
      defaultPageCount: 1, // 默认起始页码
      defaultPageSize: 10, // 默认每页条数
    },

    // 表格配置
    table: {
      headerCellStyle: {
        backgroundColor: '#f5f7fa',
        color: '#606266',
        fontWeight: 'bold',
        height: '48px',
      },
    },

    // 表单配置
    form: {
      submitText: '搜索',
      resetText: '重置',
      formItem: {
        components: {
          width: '200px',
        },
      },
    },
  },
}
</script>
```

## 属性

| 属性名    | 说明             | 类型   | 可选值 | 默认值 |
| --------- | ---------------- | ------ | ------ | ------ |
| component | 组件全局配置对象 | Config | -      | -      |

## 类型定义

```typescript
interface CommonConfigProviderProps extends DeepPartial<Config> {}

interface Config {
  component: {
    /** 空值占位符 */
    placeholder: string
    /** 分页组件默认配置 */
    pagination: {
      /** 默认请求起始页数 */
      defaultPageCount: number
      /** 默认每页请求的条数 */
      defaultPageSize: number
    }
    /** 表格组件默认配置 */
    table: {
      /** 表头单元格样式 */
      headerCellStyle: CSSProperties
    }
    /** 表单组件默认配置 */
    form: {
      /** 提交按钮文本 */
      submitText: string
      /** 重置按钮文本 */
      resetText: string
      formItem: {
        /** 表单组件的每个 formItem */
        components: {
          /** 组件默认宽度 */
          width: string
        }
      }
    }
  }
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
```
