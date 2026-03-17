<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CommonButton, CommonDialogForm } from '@yetuzi/vue3-query-components'

const visible = ref(false)
const loading = ref(false)

const form = [
  {
    is: 'input',
    label: '角色名称',
    prop: 'name',
    initialValue: '内容运营',
    formItem: {
      required: true,
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
    initialValue: 'department',
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
    initialValue: true,
  },
]

async function handleSubmit(formData: any) {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  loading.value = false
  visible.value = false
  ElMessage.success(`已保存角色：${formData.name}`)
}

function handleReset() {
  ElMessage.info('表单已恢复初始值')
}
</script>

<template>
  <div class="dialog-form-demo">
    <p class="demo-description">适合新增、编辑、审批这类需要在弹窗中完成录入和校验的场景。</p>

    <CommonButton @click="visible = true">打开弹窗表单</CommonButton>

    <CommonDialogForm
      v-model="visible"
      v-model:loading="loading"
      title="编辑角色"
      width="560px"
      :form="form"
      :form-props="{ labelWidth: '88px' }"
      show-reset-button
      @submit="handleSubmit"
      @reset="handleReset"
    />
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
</style>
