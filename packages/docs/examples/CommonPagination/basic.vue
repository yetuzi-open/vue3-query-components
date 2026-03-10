<script setup lang="ts">
import { CommonPagination } from '@yetuzi/vue3-query-components'
import { computed, ref } from 'vue'

const total = ref(168)
const pageNo = ref(1)
const pageSize = ref(10)

const pageCount = computed(() => Math.ceil(total.value / pageSize.value))
</script>

<template>
  <div class="pagination-demo">
    <p class="demo-description">适合列表页的基础分页场景，页码和每页条数会通过双向绑定自动同步。</p>

    <CommonPagination v-model:pageNo="pageNo" v-model:pageSize="pageSize" :total="total" />

    <p class="pagination-tip">
      当前第 {{ pageNo }} 页，每页 {{ pageSize }} 条，共 {{ pageCount }} 页 / {{ total }} 条数据
    </p>
  </div>
</template>

<style scoped>
.pagination-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.pagination-tip {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
