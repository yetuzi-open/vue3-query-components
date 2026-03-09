<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonPagination } from '@yetuzi/vue3-query-components'
import type { PaginationParam } from '@yetuzi/vue3-query-components'
import { ref } from 'vue'

const total = ref(520)
const pageNo = ref(1)
const pageSize = ref(10)

const handleChange = ({ pageNo, pageSize }: PaginationParam) => {
  ElMessage.success(`分页已更新：第 ${pageNo} 页，每页 ${pageSize} 条`)
}
</script>

<template>
  <CommonPagination
    v-model:pageNo="pageNo"
    v-model:pageSize="pageSize"
    :total="total"
    :page-sizes="[10, 20, 50, 100]"
    @change="handleChange"
  />
</template>
