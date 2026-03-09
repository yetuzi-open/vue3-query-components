<script setup lang="ts">
import { CommonPagination } from '@yetuzi/vue3-query-components'
import { ref } from 'vue'

const compactPageNo = ref(1)
const compactPageSize = ref(10)

const fullPageNo = ref(1)
const fullPageSize = ref(20)
</script>

<template>
  <div class="pagination-group">
    <p class="demo-description">通过 `layout` 可以快速切换列表页与报表页常见的分页布局。</p>

    <div class="pagination-card">
      <div class="pagination-title">紧凑布局</div>
      <CommonPagination
        v-model:pageNo="compactPageNo"
        v-model:pageSize="compactPageSize"
        :total="96"
        layout="prev, pager, next, jumper, ->, total"
      />
    </div>

    <div class="pagination-card">
      <div class="pagination-title">默认布局</div>
      <CommonPagination v-model:pageNo="fullPageNo" v-model:pageSize="fullPageSize" :total="320" />
    </div>
  </div>
</template>

<style scoped>
.pagination-group {
  display: grid;
  gap: 16px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.pagination-card {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.pagination-title {
  margin-bottom: 12px;
  font-weight: 600;
}
</style>
