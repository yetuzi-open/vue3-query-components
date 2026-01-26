<script setup lang="ts">
import { CommonQueryTable } from '@components-src'
import type { CommonQueryTableExpose } from '@components-src'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

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
  console.log('选中行变化:', selection)
}

// ========== 表单配置 ==========
const form = [
  {
    is: 'input',
    prop: 'name',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
      initialValue: '',
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
      initialValue: null,
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
  console.log('请求参数:', params)

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
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      status: 1,
      createTime: 1705540500000,
    },
    {
      id: 5,
      name: '孙七',
      email: 'sunqi@example.com',
      status: 0,
      createTime: 1705626900000,
    },
  ]

  return {
    list: mockData,
    total: 25,
  }
}

// ========== 实例方法测试 ==========
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

// 6. 获取并操作表单
function handleQueryWithFormData() {
  const formData = queryTableRef.value?.getFormData()
  console.log('使用表单数据进行查询:', formData)
  ElMessage.success(`查询条件: ${JSON.stringify(formData)}`)
  // refresh 会自动使用当前表单数据进行查询
  queryTableRef.value?.refresh()
}
</script>

<template>
  <div class="test-page">
    <h1>CommonQueryTable 功能测试</h1>

    <!-- ========== 测试操作面板 ========== -->
    <div class="test-panel">
      <h3>实例方法测试</h3>
      <div class="button-group">
        <el-button type="primary" @click="handleRefresh">
          刷新列表 (refresh)
        </el-button>
        <el-button type="warning" @click="handleReset">
          重置查询 (reset)
        </el-button>
        <el-button type="info" @click="handleGetFormData">
          获取表单数据 (getFormData)
        </el-button>
        <el-button type="success" @click="handleGetSelectionRows">
          获取选中行 (getSelectionRows)
        </el-button>
        <el-button @click="handleQueryWithFormData">
          使用表单数据查询
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          批量删除选中
        </el-button>
      </div>

      <div class="info-panel">
        <p>当前选中行数: <strong>{{ selectedRows.length }}</strong></p>
        <p v-if="selectedRows.length > 0">
          选中ID: {{ selectedRows.map(row => row.id).join(', ') }}
        </p>
      </div>
    </div>

    <!-- ========== CommonQueryTable 组件 ========== -->
    <CommonQueryTable
      ref="queryTableRef"
      :fetch="fetch"
      :form="form"
      :columns="columns"
      @table-selection-change="handleSelectionChange"
    >
      <!-- 1. Header 插槽 -->
      <template #header>
        <div class="custom-header">
          <el-alert
            title="这是 Header 插槽区域"
            type="info"
            :closable="false"
            show-icon
          />
        </div>
      </template>

      <!-- 2. Toolbar 插槽 -->
      <template #toolbar>
        <el-button type="primary" size="small">
          新增用户
        </el-button>
        <el-button
          type="danger"
          size="small"
          :disabled="selectedRows.length === 0"
        >
          批量删除 ({{ selectedRows.length }})
        </el-button>
        <el-button size="small" @click="handleRefresh">
          刷新
        </el-button>
      </template>

      <!-- 3. Pagination 自定义前缀 -->
      <template #pagination-prefix>
        <span style="margin-right: 12px; color: var(--el-text-color-secondary);">
          共 {{ selectedRows.length }} 项选中
        </span>
      </template>

      <!-- 4. Footer 插槽 -->
      <template #footer>
        <div class="custom-footer">
          <el-text size="small" type="info">
            这是 Footer 插槽区域 - Copyright © 2024
          </el-text>
        </div>
      </template>
    </CommonQueryTable>

    <!-- ========== 使用说明 ========== -->
    <div class="usage-panel">
      <h3>新功能说明</h3>
      <el-collapse>
        <el-collapse-item title="1. 默认插槽（无需 layouts prop）" name="1">
          <p>组件现在默认提供 6 个插槽，无需通过 layouts 配置：</p>
          <ul>
            <li><code>header</code> - 头部区域</li>
            <li><code>form</code> - 表单区域</li>
            <li><code>toolbar</code> - 工具栏区域</li>
            <li><code>table</code> - 表格区域（默认显示）</li>
            <li><code>pagination</code> - 分页区域</li>
            <li><code>footer</code> - 底部区域</li>
          </ul>
        </el-collapse-item>

        <el-collapse-item title="2. 实例方法" name="2">
          <ul>
            <li><code>refresh()</code> - 刷新列表数据</li>
            <li><code>reset()</code> - 重置查询条件和分页</li>
            <li><code>getFormData()</code> - 获取当前表单数据</li>
            <li><code>getSelectionRows()</code> - 获取表格选中行</li>
          </ul>
        </el-collapse-item>

        <el-collapse-item title="3. 事件透传" name="3">
          <p>通过 <code>@组件名-事件名</code> 监听内部组件事件：</p>
          <ul>
            <li><code>@table-selection-change</code> - 表格选择变化</li>
            <li><code>@form-submit</code> - 表单提交</li>
            <li><code>@form-reset</code> - 表单重置</li>
            <li><code>@pagination-change</code> - 分页变化</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style scoped>
.test-page {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  margin: 0;
  font-size: 24px;
  color: var(--el-text-color-primary);
}

/* 测试面板 */
.test-panel {
  background: var(--el-bg-color-page);
  border-radius: 8px;
  padding: 16px;
}

.test-panel h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.info-panel {
  padding: 12px;
  background: var(--el-fill-color-light);
  border-radius: 4px;
}

.info-panel p {
  margin: 4px 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.info-panel strong {
  color: var(--el-color-primary);
}

/* 自定义插槽内容 */
.custom-header {
  margin-bottom: 12px;
}

.custom-footer {
  text-align: center;
  padding: 12px 0;
}

/* 使用说明面板 */
.usage-panel {
  background: var(--el-bg-color-page);
  border-radius: 8px;
  padding: 16px;
}

.usage-panel h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.usage-panel code {
  padding: 2px 6px;
  background: var(--el-fill-color-light);
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: var(--el-color-danger);
}

.usage-panel ul {
  margin: 8px 0;
  padding-left: 20px;
}

.usage-panel li {
  margin: 4px 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
</style>
