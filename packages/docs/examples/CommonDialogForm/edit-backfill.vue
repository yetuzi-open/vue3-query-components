<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { CommonButton, useCommonDialogForm } from '@yetuzi/vue3-query-components'

interface MemberRow {
  id: number
  name: string
  department: string
  enabled: boolean
}

const members = reactive<MemberRow[]>([
  {
    id: 1,
    name: '张敏',
    department: 'product',
    enabled: true,
  },
  {
    id: 2,
    name: '王晨',
    department: 'rd',
    enabled: true,
  },
  {
    id: 3,
    name: '李悦',
    department: 'ops',
    enabled: false,
  },
])

const departmentOptions = [
  { label: '产品中心', value: 'product' },
  { label: '研发中心', value: 'rd' },
  { label: '运营中心', value: 'ops' },
]

const memberForm = [
  {
    is: 'input',
    label: '成员姓名',
    prop: 'name',
    initialValue: '',
    formItem: {
      rules: [{ required: true, message: '请输入成员姓名', trigger: 'blur' }],
    },
    props: {
      placeholder: '请输入成员姓名',
    },
  },
  {
    is: 'select',
    label: '所属部门',
    prop: 'department',
    initialValue: '',
    props: {
      options: departmentOptions,
      placeholder: '请选择所属部门',
    },
  },
  {
    is: 'switch',
    label: '启用状态',
    prop: 'enabled',
    initialValue: false,
  },
] as const

let editingId: number | null = null

const dialog = useCommonDialogForm<MemberRow>({
  width: '560px',
  form: memberForm,
  showResetButton: true,
  formProps: {
    labelWidth: '88px',
  },
  async onSubmit(formData) {
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (editingId === null) {
      return false
    }

    const target = members.find((item) => item.id === editingId)
    if (!target) {
      return false
    }

    target.name = formData.name
    target.department = formData.department
    target.enabled = formData.enabled
    ElMessage.success(`已更新成员：${formData.name}`)
  },
})

async function fetchMemberDetail(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const target = members.find((item) => item.id === id)
  return target ? { ...target } : undefined
}

function getDepartmentLabel(value: string) {
  return departmentOptions.find((item) => item.value === value)?.label || value
}

async function handleEdit(row: MemberRow) {
  editingId = row.id

  dialog.open({
    title: `编辑成员 · ${row.name}`,
    form: async () => {
      const detail = await fetchMemberDetail(row.id)
      if (!detail) {
        ElMessage.error('未获取到成员详情')
      }
      return detail
    },
  })
}
</script>

<template>
  <div class="edit-backfill-demo">
    <p class="demo-description">
      点击列表里的编辑按钮后，`open()` 里的 `form` 直接传异步函数，返回值会自动作为 `formData`
      完成初始化和回填。
    </p>

    <div class="member-list">
      <div v-for="item in members" :key="item.id" class="member-card">
        <div class="member-meta">
          <strong>{{ item.name }}</strong>
          <span>{{ getDepartmentLabel(item.department) }}</span>
          <span>{{ item.enabled ? '已启用' : '已停用' }}</span>
        </div>

        <CommonButton type="default" @click="handleEdit(item)">编辑</CommonButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-backfill-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.member-list {
  display: grid;
  gap: 12px;
}

.member-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.member-meta {
  display: grid;
  gap: 4px;
}

.member-meta strong {
  color: var(--vp-c-text-1);
}

.member-meta span {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
</style>
