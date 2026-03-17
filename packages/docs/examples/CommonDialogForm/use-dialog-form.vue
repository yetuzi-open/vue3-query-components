<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonButton, useCommonDialogForm } from '@yetuzi/vue3-query-components'

function createRoleForm(role: { name: string; scope: string; enabled: boolean }) {
  return [
    {
      is: 'input',
      label: '角色名称',
      prop: 'name',
      initialValue: role.name,
      formItem: {
        rules: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
      props: {
        placeholder: '请输入角色名称',
      },
    },
    {
      is: 'select',
      label: '数据权限',
      prop: 'scope',
      initialValue: role.scope,
      props: {
        options: [
          { label: '仅本人', value: 'self' },
          { label: '本部门', value: 'department' },
          { label: '全部数据', value: 'all' },
        ],
        placeholder: '请选择数据权限',
      },
    },
    {
      is: 'switch',
      label: '启用状态',
      prop: 'enabled',
      initialValue: role.enabled,
    },
  ]
}

const dialog = useCommonDialogForm({
  width: '560px',
  showResetButton: true,
  formProps: {
    labelWidth: '88px',
  },
  async onSubmit(formData) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    ElMessage.success(`已保存角色：${formData.name}`)
  },
  onReset(formData) {
    ElMessage.info(`已重置为：${formData.name || '空'}`)
  },
})

function openCreateDialog() {
  dialog.open({
    title: '新增角色',
    form: createRoleForm({
      name: '',
      scope: 'department',
      enabled: true,
    }),
  })
}

function openEditDialog() {
  dialog.open({
    title: '编辑角色',
    form: createRoleForm({
      name: '内容运营',
      scope: 'all',
      enabled: true,
    }),
  })
}
</script>

<template>
  <div class="dialog-form-demo">
    <p class="demo-description">函数式调用适合从列表操作里直接拉起新增、编辑弹窗，而不额外维护页面级可见状态。</p>

    <div class="demo-actions">
      <CommonButton @click="openCreateDialog">新增角色</CommonButton>
      <CommonButton type="default" @click="openEditDialog">编辑角色</CommonButton>
    </div>
  </div>
</template>

<style scoped>
.dialog-form-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
