<script setup lang="ts">
import { CommonPagination } from '@yetuzi/vue3-query-components'
import { computed, ref } from 'vue'

const total = ref(168)
const pageNo = ref(1)
const pageSize = ref(10)

const pageCount = computed(() => Math.ceil(total.value / pageSize.value))
</script>

<template>
  <CommonPagination v-model:pageNo="pageNo" v-model:pageSize="pageSize" :total="total" />

  <p class="pagination-tip">
    当前第 {{ pageNo }} 页，每页 {{ pageSize }} 条，共 {{ pageCount }} 页 / {{ total }} 条
  </p>
</template>

<style scoped>
.pagination-tip {
  margin-top: 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
