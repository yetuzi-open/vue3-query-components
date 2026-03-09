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
    <div>
      <div class="pagination-title">紧凑布局</div>
      <CommonPagination
        v-model:pageNo="compactPageNo"
        v-model:pageSize="compactPageSize"
        :total="96"
        layout="prev, pager, next, jumper, ->, total"
      />
    </div>

    <div>
      <div class="pagination-title">默认布局</div>
      <CommonPagination v-model:pageNo="fullPageNo" v-model:pageSize="fullPageSize" :total="320" />
    </div>
  </div>
</template>

<style scoped>
.pagination-group {
  display: grid;
  gap: 20px;
}

.pagination-title {
  margin-bottom: 12px;
  font-weight: 600;
}
</style>
