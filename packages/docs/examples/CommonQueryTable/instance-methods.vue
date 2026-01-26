<script setup lang="ts">
import { CommonQueryTable } from '@yetuzi/vue3-query-components'
import type { CommonQueryTableExpose } from '@yetuzi/vue3-query-components'
import { ref } from 'vue'
import { ElMessage, ElButton } from 'element-plus'

// ========== 数据类型定义 ==========
interface UserData {
  id: number
  name: string
  email: string
  status: number
  createTime: number
}

// ========== 组件引用 ==========
const queryTableRef = ref<CommonQueryTableExpose<UserData>>()

// ========== 表格选中行 ==========
const selectedRows = ref<UserData[]>([])

function handleSelectionChange(selection: UserData[]) {
  selectedRows.value = selection
}

// ========== 表单配置 ==========
const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      placeholder: '请选择状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' },
      ],
    },
  },
]

// ========== 表格列配置 ==========
const columns = [
  {
    type: 'selection',
    width: '55px',
  },
  {
    type: 'index',
    label: '序号',
    width: '60px',
  },
  {
    label: 'ID',
    prop: 'id',
    width: '80px',
  },
  {
    label: '用户名',
    prop: 'name',
  },
  {
    label: '邮箱',
    prop: 'email',
  },
  {
    label: '状态',
    prop: 'status',
    formatter: (row: UserData) => (row.status === 1 ? '启用' : '禁用'),
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '180px',
    type: 'dateTime',
  },
]

// ========== Mock 数据请求 ==========
const fetch = async (params: any) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // Mock 数据
  const mockData: UserData[] = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      status: 1,
      createTime: 1705278600000,
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      status: 0,
      createTime: 1705377600000,
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      status: 1,
      createTime: 1705454100000,
    },
  ]

  return {
    list: mockData,
    total: 25,
  }
}

// ========== 实例方法使用示例 ==========

// 1. 刷新列表
function handleRefresh() {
  queryTableRef.value?.refresh()
  ElMessage.success('刷新成功')
}

// 2. 重置查询
function handleReset() {
  queryTableRef.value?.reset()
  ElMessage.success('重置成功')
}

// 3. 获取表单数据
function handleGetFormData() {
  const formData = queryTableRef.value?.getFormData()
  ElMessage.success(`表单数据: ${JSON.stringify(formData)}`)
  console.log('表单数据:', formData)
}

// 4. 获取选中行
function handleGetSelectionRows() {
  const rows = queryTableRef.value?.getSelectionRows() || []
  ElMessage.success(`选中 ${rows.length} 行`)
  console.log('选中行:', rows)
}

// 5. 批量删除示例
function handleBatchDelete() {
  const rows = queryTableRef.value?.getSelectionRows() || []
  if (rows.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }
  ElMessage.success(`模拟删除 ${rows.length} 条数据`)
  console.log('删除的数据:', rows)
  // 删除后刷新
  queryTableRef.value?.refresh()
}
</script>

<template>
  <CommonQueryTable
    ref="queryTableRef"
    :fetch="fetch"
    :form="form"
    :columns="columns"
    @table-selection-change="handleSelectionChange"
  >
    <template #toolbar>
      <el-button type="primary" @click="handleRefresh">
        刷新列表
      </el-button>
      <el-button @click="handleReset">
        重置查询
      </el-button>
      <el-button @click="handleGetFormData">
        获取表单数据
      </el-button>
      <el-button @click="handleGetSelectionRows">
        获取选中行
      </el-button>
      <el-button
        type="danger"
        :disabled="selectedRows.length === 0"
        @click="handleBatchDelete"
      >
        批量删除 ({{ selectedRows.length }})
      </el-button>
    </template>
  </CommonQueryTable>
</template>
