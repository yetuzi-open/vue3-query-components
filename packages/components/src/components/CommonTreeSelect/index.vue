<script setup lang="ts">
import { ElTreeSelect } from 'element-plus'
import { computed, useSlots } from 'vue'
import type { Slots } from 'vue'
import type { CommonTreeSelectProps, CommonTreeSelectValue } from './type'

const props = withDefaults(defineProps<CommonTreeSelectProps>(), {
  data() {
    return []
  },
})

const modelValue = defineModel<CommonTreeSelectValue>()

const slots: Slots = useSlots()
const slotNames = computed<string[]>(() => Object.keys(slots))

defineOptions({
  name: 'CommonTreeSelect',
})
</script>

<template>
  <ElTreeSelect v-bind="props" v-model="modelValue">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}"></slot>
    </template>
  </ElTreeSelect>
</template>

<style scoped></style>
