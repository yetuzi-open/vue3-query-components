# 最佳实践

本文档介绍使用 Vue3 Query Components 的最佳实践和常见模式。

## 1. 使用 CommonConfigProvider 统一配置

推荐在应用根组件中使用 CommonConfigProvider 进行全局配置：

```vue
<!-- App.vue -->
<template>
  <common-config-provider :config="appConfig">
    <router-view />
  </common-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommonConfig } from 'vue3-query-components'

const appConfig = ref<CommonConfig>({
  placeholder: '--',
  pagination: {
    defaultPageCount: 1,
    defaultPageSize: 20  // 根据业务需求调整
  },
  form: {
    submitText: '查询',
    resetText: '重置'
  },
  table: {
    headerCellStyle: {
      backgroundColor: '#fafafa',
      fontWeight: 600
    }
  }
})
</script>
```

## 2. 封装通用的数据请求函数

创建一个统一的数据请求函数，处理分页、排序等通用逻辑：

```typescript
// utils/request.ts
import type { ListParam, ListResponse } from 'vue3-query-components'

export interface FetchOptions<T = any> {
  api: (params: any) => Promise<ListResponse<T>>
  transform?: (params: ListParam) => any
  transformResponse?: (response: any) => ListResponse<T>
}

export function createFetcher<T = any>(options: FetchOptions<T>) {
  return async (params: ListParam): Promise<ListResponse<T>> => {
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
    pageNum: params.pageNum - 1  // 后端页码从0开始
  })
})
```

## 3. 复用表单和表格配置

创建可复用的配置文件：

```typescript
// config/table.ts
import type { CommonTableColumn } from 'vue3-query-components'

export const baseColumns: CommonTableColumn[] = [
  {
    type: 'selection',
    width: 55
  },
  {
    type: 'index',
    label: '序号',
    width: 60
  }
]

export const operationColumn: CommonTableColumn = {
  label: '操作',
  width: 150,
  fixed: 'right'
}
```

```typescript
// config/form.ts
import type { CommonFormPropForm } from 'vue3-query-components'

export const createTimeRange = {
  field: 'createTimeRange',
  label: '创建时间',
  type: 'date-picker' as const,
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
import type { ListParam } from 'vue3-query-components'

export function useQueryTable(fetchFn: (params: ListParam) => Promise<any>) {
  const loading = ref(false)
  const data = ref([])
  const total = ref(0)

  const currentPage = ref(1)
  const pageSize = ref(10)

  const pagination = computed(() => ({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    total: total.value
  }))

  const fetchData = async (params: ListParam) => {
    loading.value = true
    try {
      const response = await fetchFn({
        ...params,
        pageNum: currentPage.value,
        pageSize: pageSize.value
      })
      data.value = response.data
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
    <common-button
      v-if="showEdit"
      size="small"
      type="primary"
      link
      @click="$emit('edit', row)"
    >
      编辑
    </common-button>
    <common-button
      v-if="showDelete"
      size="small"
      type="danger"
      link
      @click="$emit('delete', row)"
    >
      删除
    </common-button>
    <slot name="extra" :row="row" />
  </div>
</template>

<script setup lang="ts">
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
  <common-query-table :fetch="fetchData" :columns="columns">
    <template #default="{ row }">
      <table-row-actions
        :row="row"
        @edit="handleEdit"
        @delete="handleDelete"
      >
        <template #extra="{ row }">
          <common-button
            v-if="row.status === 1"
            size="small"
            link
            @click="handleDisable(row)"
          >
            禁用
          </common-button>
        </template>
      </table-row-actions>
    </template>
  </common-query-table>
</template>
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

3. **虚拟滚动处理大数据量**

```vue
<common-table
  :data="tableData"
  :columns="columns"
  height="400"
>
  <!-- 使用虚拟滚动 -->
</common-table>
```

## 9. 类型安全

充分利用 TypeScript 的类型检查：

```typescript
interface User {
  id: number
  name: string
  email: string
  status: 0 | 1
  createTime: string
}

type UserListResponse = ListResponse<User>

const columns: CommonTableColumn<User>[] = [
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'status',
    label: '状态',
    formatter: (row: User) => row.status === 1 ? '启用' : '禁用'
  }
]
```

## 10. 测试策略

为组件编写单元测试：

```typescript
// tests/components/CommonQueryTable.spec.ts
import { mount } from '@vue/test-utils'
import CommonQueryTable from '@/components/CommonQueryTable'

describe('CommonQueryTable', () => {
  it('should render correctly', () => {
    const wrapper = mount(CommonQueryTable, {
      props: {
        fetch: jest.fn(),
        form: {},
        columns: []
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('should call fetch when search', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ data: [], total: 0 })

    const wrapper = mount(CommonQueryTable, {
      props: {
        fetch: mockFetch,
        form: {},
        columns: []
      }
    })

    // 触发搜索
    await wrapper.find('[data-testid="search-button"]').trigger('click')

    expect(mockFetch).toHaveBeenCalled()
  })
})
```