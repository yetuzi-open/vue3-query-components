# 最佳实践

本文档介绍使用 Vue3 Query Components 的最佳实践和常见模式。

## 1. 使用 CommonConfigProvider 统一配置

推荐在应用根组件中使用 CommonConfigProvider 进行全局配置：

```vue
<!-- App.vue -->
<template>
  <CommonConfigProvider :component="appConfig.component">
    <router-view />
  </CommonConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Config } from '@yetuzi/vue3-query-components'

const appConfig = ref<Config>({
  component: {
    placeholder: '--',
    pagination: {
      defaultPageCount: 1,
      defaultPageSize: 20,
    },
    form: {
      submitText: '查询',
      resetText: '重置',
      formItem: {
        components: {
          width: '240px',
        },
      },
    }
  },
})
</script>
```

## 2. 封装通用的数据请求函数

创建一个统一的数据请求函数，处理分页、排序等通用逻辑：

```typescript
// utils/request.ts
import type { ListParam } from '@yetuzi/vue3-query-components'

export interface FetchOptions<T = any> {
  api: (params: any) => Promise<{ list: T[]; total: number }>
  transform?: (params: ListParam) => any
  transformResponse?: (response: any) => { list: T[]; total: number }
}

export function createFetcher<T = any>(options: FetchOptions<T>) {
  return async (params: ListParam): Promise<{ list: T[]; total: number }> => {
    // 转换请求参数
    const requestParams = options.transform?.(params) || params

    // 发起请求
    const response = await options.api(requestParams)

    // 转换响应数据
    return options.transformResponse?.(response) || response
  }
}
```

使用示例：

```typescript
// api/user.ts
import { createFetcher } from '@/utils/request'
import { userApi } from '@/api'

export const fetchUserList = createFetcher({
  api: userApi.getList,
  transform: (params) => ({
    ...params,
    page: params.pageNo,
    size: params.pageSize,
  }),
})
```

## 3. 复用表单和表格配置

创建可复用的配置文件：

```typescript
// config/table.ts
import type { CommonTableArrayColumns, CommonTableColumnRoot } from '@yetuzi/vue3-query-components'

export const baseColumns: CommonTableArrayColumns<any> = [
  {
    type: 'selection',
    width: 55,
  },
  {
    type: 'index',
    label: '序号',
    width: 60,
  },
]

export const operationColumn: CommonTableColumnRoot<any> = {
  label: '操作',
  width: 150,
  fixed: 'right'
}
```

```typescript
// config/form.ts
import type { CommonFormDatePickerItem } from '@yetuzi/vue3-query-components'

export const createTimeRange: CommonFormDatePickerItem<any> = {
  is: 'date-picker',
  prop: 'createTimeRange',
  label: '创建时间',
  props: {
    type: 'daterange',
    rangeSeparator: '至',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    valueFormat: 'YYYY-MM-DD',
    clearable: true
  }
}
```

## 4. 使用组合式函数

创建可复用的组合式函数：

```typescript
// composables/useQueryTable.ts
import { ref, computed } from 'vue'
import type { ListParam } from '@yetuzi/vue3-query-components'

export function useQueryTable(fetchFn: (params: ListParam) => Promise<any>) {
  const loading = ref(false)
  const data = ref([])
  const total = ref(0)

  const currentPage = ref(1)
  const pageSize = ref(10)

  const pagination = computed(() => ({
    pageNo: currentPage.value,
    pageSize: pageSize.value,
    total: total.value,
  }))

  const fetchData = async (params: ListParam) => {
    loading.value = true
    try {
      const response = await fetchFn({
        ...params,
        pageNo: currentPage.value,
        pageSize: pageSize.value,
      })
      data.value = response.list
      total.value = response.total
      return response
    } finally {
      loading.value = false
    }
  }

  const handleCurrentChange = (page: number) => {
    currentPage.value = page
  }

  const handleSizeChange = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
  }

  return {
    loading,
    data,
    total,
    pagination,
    fetchData,
    handleCurrentChange,
    handleSizeChange
  }
}
```

## 5. 处理复杂的表单联动

使用 Composable 处理表单联动：

```typescript
// composables/useFormDependency.ts
import { watch, ref } from 'vue'

export function useFormDependency(formData: any) {
  const cityOptions = ref([])
  const districtOptions = ref([])

  // 监听省份变化，加载城市
  watch(() => formData.province, async (province) => {
    if (province) {
      cityOptions.value = await fetchCities(province)
      formData.city = ''
      formData.district = ''
      districtOptions.value = []
    }
  })

  // 监听城市变化，加载区县
  watch(() => formData.city, async (city) => {
    if (city) {
      districtOptions.value = await fetchDistricts(city)
      formData.district = ''
    }
  })

  return {
    cityOptions,
    districtOptions
  }
}
```

## 6. 自定义插槽的最佳实践

创建可复用的操作列组件：

```vue
<!-- components/TableRowActions.vue -->
<template>
  <div class="table-row-actions">
    <CommonButton
      v-if="showEdit"
      size="small"
      type="primary"
      link
      @click="$emit('edit', row)"
    >
      编辑
    </CommonButton>
    <CommonButton
      v-if="showDelete"
      size="small"
      type="danger"
      link
      @click="$emit('delete', row)"
    >
      删除
    </CommonButton>
    <slot name="extra" :row="row" />
  </div>
</template>

<script setup lang="ts">
import { CommonButton } from '@yetuzi/vue3-query-components'

interface Props {
  row: any
  showEdit?: boolean
  showDelete?: boolean
}

withDefaults(defineProps<Props>(), {
  showEdit: true,
  showDelete: true
})

defineEmits(['edit', 'delete'])
</script>
```

使用：

```vue
<template>
  <CommonQueryTable :fetch="fetchData" :columns="columns">
    <template #table-action="{ row }">
      <TableRowActions
        :row="row"
        @edit="handleEdit"
        @delete="handleDelete"
      >
        <template #extra="{ row }">
          <CommonButton
            v-if="row.status === 1"
            size="small"
            link
            @click="handleDisable(row)"
          >
            禁用
          </CommonButton>
        </template>
      </TableRowActions>
    </template>
  </CommonQueryTable>
</template>

<script setup lang="ts">
import TableRowActions from './components/TableRowActions.vue'

const columns = [
  { prop: 'name', label: '名称' },
  { prop: 'status', label: '状态' },
  { prop: 'action', label: '操作', fixed: 'right', width: 180 },
]
</script>
```

## 7. 错误处理

统一处理请求错误：

```typescript
// utils/errorHandler.ts
import { ElMessage } from 'element-plus'

export function handleFetchError(error: any) {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 400:
        ElMessage.error(data.message || '请求参数错误')
        break
      case 401:
        ElMessage.error('登录已过期，请重新登录')
        // 跳转到登录页
        break
      case 403:
        ElMessage.error('没有权限访问该资源')
        break
      case 500:
        ElMessage.error('服务器错误，请稍后重试')
        break
      default:
        ElMessage.error('请求失败')
    }
  } else {
    ElMessage.error('网络错误，请检查网络连接')
  }
}
```

## 8. 性能优化

1. **使用 computed 缓存计算属性**

```typescript
const columnConfig = computed(() => {
  const base = [...baseColumns]
  if (showOperation) {
    base.push(operationColumn)
  }
  return base
})
```

2. **防抖处理搜索**

```typescript
import { debounce } from 'lodash-es'

const debouncedSearch = debounce((keyword: string) => {
  // 执行搜索
}, 300)
```

3. **大数据量场景切换到更合适的方案**

```vue
<template>
  <!-- 常规场景继续使用 CommonTable -->
  <CommonTable :data="tableData" :columns="columns" />

  <!-- 超大数据量场景建议改用 Element Plus 的 el-table-v2 -->
  <!-- <el-table-v2 :columns="v2Columns" :data="tableData" :width="960" :height="480" /> -->
</template>
```

## 9. 类型安全

充分利用 TypeScript 的类型检查：

```typescript
import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'

interface User {
  id: number
  name: string
  email: string
  status: 0 | 1
  createTime: string
}

const columns: CommonTableArrayColumns<User> = [
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'status',
    label: '状态',
    formatter: (row) => row.status === 1 ? '启用' : '禁用'
  }
]
```

## 10. 验证策略

当前仓库没有单独的单元测试基建，更符合现状的验证方式是：

1. 运行 `npm run type-check`，先确认组件类型和示例写法没有回归。
2. 运行 `npm run build`，同时检查组件包和文档站点能否正常构建。
3. 在 `packages/docs/examples` 中补一个最小复现示例，使用根目录 `npm run dev` 做手动联调。
4. 涉及 `CommonQueryTable`、`CommonForm` 这类组合组件时，优先验证搜索、重置、分页和插槽渲染这几个高频交互。
