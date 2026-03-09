<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonPagination } from '@yetuzi/vue3-query-components'
import type { PaginationParam } from '@yetuzi/vue3-query-components'
import { ref } from 'vue'

const total = ref(520)
const pageNo = ref(1)
const pageSize = ref(10)

const handleChange = ({ pageNo, pageSize }: PaginationParam) => {
  ElMessage.success(`??????? ${pageNo} ???? ${pageSize} ?`)
}
</script>

<template>
  <div class="events-demo">
    <p class="demo-description">?? `change` ????????????????????????</p>

    <CommonPagination
      v-model:pageNo="pageNo"
      v-model:pageSize="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      @change="handleChange"
    />
  </div>
</template>

<style scoped>
.events-demo {
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
