<script setup lang="ts">
import { CommonPagination } from '@yetuzi/vue3-query-components'
import { computed, ref } from 'vue'

const total = ref(245)
const pageNo = ref(1)
const pageSize = ref(20)

const start = computed(() => (pageNo.value - 1) * pageSize.value + 1)
const end = computed(() => Math.min(pageNo.value * pageSize.value, total.value))
</script>

<template>
  <div class="slot-demo">
    <p class="demo-description">默认布局内置 `slot` 区域，适合展示“当前显示范围”“数据更新时间”等补充说明。</p>

    <CommonPagination v-model:pageNo="pageNo" v-model:pageSize="pageSize" :total="total">
      <span class="slot-text">当前显示第 {{ start }} - {{ end }} 条记录</span>
    </CommonPagination>
  </div>
</template>

<style scoped>
.slot-demo {
  display: grid;
  gap: 12px;
}

.demo-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

.slot-text {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
