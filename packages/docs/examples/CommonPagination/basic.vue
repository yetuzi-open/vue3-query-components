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
    <p class="demo-description">????????????????????????????????</p>

    <CommonPagination v-model:pageNo="pageNo" v-model:pageSize="pageSize" :total="total" />

    <p class="pagination-tip">
      ??? {{ pageNo }} ???? {{ pageSize }} ??? {{ pageCount }} ? / {{ total }} ???
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
