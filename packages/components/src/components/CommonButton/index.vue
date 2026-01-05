<script setup lang="ts">
import { ElButton } from 'element-plus';
import type { CommonButtonProps } from './type';

const props = withDefaults(defineProps<CommonButtonProps>(), {
  type: 'primary',
})


defineOptions({
  name: 'CommonButton',
})

</script>

<template>
  <el-button v-bind="props">
    <slot />
  </el-button>
</template>

<style scoped>

</style>
