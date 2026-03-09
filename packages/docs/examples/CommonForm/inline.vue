<script setup lang="ts">
import { CommonForm } from '@yetuzi/vue3-query-components'

const form = [
  {
    is: 'input',
    label: '???',
    prop: 'keyword',
    props: {
      placeholder: '??????? / ???',
    },
  },
  {
    is: 'select',
    label: '????',
    prop: 'source',
    props: {
      placeholder: '???????',
      options: [
        { value: 'douyin', label: '??' },
        { value: 'wechat', label: '??' },
        { value: 'offline', label: '????' },
      ],
    },
  },
  {
    is: 'date-picker',
    label: '????',
    prop: 'createdAt',
    props: {
      type: 'date',
      placeholder: '???????',
    },
  },
  {
    is: 'radio',
    label: '????',
    prop: 'status',
    initialValue: 'all',
    props: {
      options: [
        { value: 'all', label: '??' },
        { value: 'pending', label: '???' },
        { value: 'done', label: '???' },
      ],
    },
  },
]
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">????????????????????????????</p>
    <CommonForm :form="form" inline />
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
