<script setup lang="ts">
import { ElColorPicker, ElInputNumber, ElRate } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '????',
    prop: 'name',
    props: {
      placeholder: '???????',
    },
  },
  {
    is: ElInputNumber,
    label: '?????',
    prop: 'threshold',
    initialValue: 10,
    props: {
      min: 1,
      max: 999,
    },
  },
  {
    is: ElRate,
    label: '????',
    prop: 'rating',
    initialValue: 4,
    props: {
      showScore: true,
    },
  },
  {
    is: ElColorPicker,
    label: '???',
    prop: 'color',
    initialValue: '#409EFF',
  },
]
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">???????????????? Vue ?????????????</p>
    <CommonForm :form="form" :inline="false" label-width="100px" />
  </div>
</template>

<style scoped>
.form-demo {
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
