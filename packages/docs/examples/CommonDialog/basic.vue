<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElInput, ElMessage, ElSwitch } from 'element-plus'
import { CommonButton, CommonDialog } from '@yetuzi/vue3-query-components'

const visible = ref(false)
const loading = ref(false)

const formData = reactive({
  name: '华北大区',
  enabled: true,
})

async function handleConfirm() {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  loading.value = false
  visible.value = false
  ElMessage.success(`已保存：${formData.name}`)
}
</script>

<template>
  <div class="dialog-demo">
    <p class="demo-description">组件式调用适合和页面状态、表单校验、插槽内容一起维护。</p>

    <CommonButton @click="visible = true">打开编辑弹窗</CommonButton>

    <CommonDialog
      v-model="visible"
      v-model:loading="loading"
      title="编辑分组"
      width="520px"
      @confirm="handleConfirm"
    >
      <div class="dialog-form">
        <label class="dialog-field">
          <span>分组名称</span>
          <ElInput v-model="formData.name" placeholder="请输入分组名称" />
        </label>
        <label class="dialog-field dialog-field-inline">
          <span>状态</span>
          <ElSwitch v-model="formData.enabled" />
        </label>
      </div>
    </CommonDialog>
  </div>
</template>

<style scoped>
.dialog-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.dialog-form {
  display: grid;
  gap: 16px;
}

.dialog-field {
  display: grid;
  gap: 8px;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.dialog-field-inline {
  grid-template-columns: 80px auto;
  align-items: center;
}
</style>
