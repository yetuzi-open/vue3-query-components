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
    <p class="demo-description">?????? `slot` ?????????????????????????????</p>

    <CommonPagination v-model:pageNo="pageNo" v-model:pageSize="pageSize" :total="total">
      <span class="slot-text">????? {{ start }} - {{ end }} ???</span>
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
