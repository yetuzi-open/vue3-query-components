<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonButton, useCommonDialog } from '@yetuzi/vue3-query-components'

const exportDialog = useCommonDialog({
  width: '460px',
  confirmText: '开始导出',
  async onConfirm() {
    await new Promise((resolve) => setTimeout(resolve, 800))
    ElMessage.success('导出任务已创建')
  },
})

function openMonthDialog() {
  exportDialog.open({
    title: '导出 3 月报表',
    content: '将按当前筛选条件导出 2026 年 3 月报表，导出完成后会通过站内消息通知。',
  })
}

function openQuarterDialog() {
  exportDialog.open({
    title: '导出季度汇总',
    content: '将导出本季度的客户跟进汇总，包含明细数据和负责人统计信息。',
  })
}
</script>

<template>
  <div class="dialog-demo">
    <p class="demo-description">函数式调用适合确认框、导出提示、二次确认这类轻量交互。</p>

    <div class="demo-actions">
      <CommonButton @click="openMonthDialog">导出月报</CommonButton>
      <CommonButton type="default" @click="openQuarterDialog">导出季度汇总</CommonButton>
    </div>
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

.demo-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
