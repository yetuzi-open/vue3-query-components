# Best Practices

This document introduces best practices and common patterns for using Vue3 Query Components.

## 1. Use CommonConfigProvider for Unified Configuration

Recommended to use CommonConfigProvider in the application root component for global configuration:

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
    defaultPageSize: 20  // Adjust according to business requirements
  },
  form: {
    submitText: 'Search',
    resetText: 'Reset'
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

## 2. Encapsulate Generic Data Request Functions

Create a unified data request function to handle common logic like pagination and sorting:

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
    // Transform request parameters
    const requestParams = options.transform?.(params) || params

    // Make request
    const response = await options.api(requestParams)

    // Transform response data
    return options.transformResponse?.(response) || response
  }
}
```

Usage example:

```typescript
// api/user.ts
import { createFetcher } from '@/utils/request'
import { userApi } from '@/api'

export const fetchUserList = createFetcher({
  api: userApi.getList,
  transform: (params) => ({
    ...params,
    pageNum: params.pageNum - 1  // Backend page numbers start from 0
  })
})
```

## 3. Reuse Form and Table Configurations

Create reusable configuration files:

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
    label: 'No.',
    width: 60
  }
]

export const operationColumn: CommonTableColumn = {
  label: 'Operations',
  width: 150,
  fixed: 'right'
}
```

```typescript
// config/form.ts
import type { CommonFormPropForm } from 'vue3-query-components'

export const createTimeRange = {
  field: 'createTimeRange',
  label: 'Create Time',
  type: 'date-picker' as const,
  props: {
    type: 'daterange',
    rangeSeparator: 'to',
    startPlaceholder: 'Start date',
    endPlaceholder: 'End date',
    valueFormat: 'YYYY-MM-DD',
    clearable: true
  }
}
```

## 4. Use Composables

Create reusable composables:

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

## 5. Handle Complex Form Dependencies

Use Composable to handle form dependencies:

```typescript
// composables/useFormDependency.ts
import { watch, ref } from 'vue'

export function useFormDependency(formData: any) {
  const cityOptions = ref([])
  const districtOptions = ref([])

  // Watch province changes, load cities
  watch(() => formData.province, async (province) => {
    if (province) {
      cityOptions.value = await fetchCities(province)
      formData.city = ''
      formData.district = ''
      districtOptions.value = []
    }
  })

  // Watch city changes, load districts
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

## 6. Best Practices for Custom Slots

Create reusable action column components:

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
      Edit
    </common-button>
    <common-button
      v-if="showDelete"
      size="small"
      type="danger"
      link
      @click="$emit('delete', row)"
    >
      Delete
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

Usage:

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
            Disable
          </common-button>
        </template>
      </table-row-actions>
    </template>
  </common-query-table>
</template>
```

## 7. Error Handling

Unified request error handling:

```typescript
// utils/errorHandler.ts
import { ElMessage } from 'element-plus'

export function handleFetchError(error: any) {
  if (error.response) {
    const { status, data } = error.response
    switch (status) {
      case 400:
        ElMessage.error(data.message || 'Invalid request parameters')
        break
      case 401:
        ElMessage.error('Login expired, please login again')
        // Redirect to login page
        break
      case 403:
        ElMessage.error('No permission to access this resource')
        break
      case 500:
        ElMessage.error('Server error, please try again later')
        break
      default:
        ElMessage.error('Request failed')
    }
  } else {
    ElMessage.error('Network error, please check your connection')
  }
}
```

## 8. Performance Optimization

1. **Use computed to cache computed properties**

```typescript
const columnConfig = computed(() => {
  const base = [...baseColumns]
  if (showOperation) {
    base.push(operationColumn)
  }
  return base
})
```

2. **Debounce search**

```typescript
import { debounce } from 'lodash-es'

const debouncedSearch = debounce((keyword: string) => {
  // Execute search
}, 300)
```

3. **Virtual scrolling for large data**

```vue
<common-table
  :data="tableData"
  :columns="columns"
  height="400"
>
  <!-- Use virtual scrolling -->
</common-table>
```

## 9. Type Safety

Make full use of TypeScript's type checking:

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
    label: 'Name'
  },
  {
    prop: 'status',
    label: 'Status',
    formatter: (row: User) => row.status === 1 ? 'Enabled' : 'Disabled'
  }
]
```

## 10. Testing Strategy

Write unit tests for components:

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

    // Trigger search
    await wrapper.find('[data-testid="search-button"]').trigger('click')

    expect(mockFetch).toHaveBeenCalled()
  })
})
```
