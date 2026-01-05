<script setup lang="ts">
import { CommonForm } from "@yetuzi/vue3-query-components";
import { ElInputNumber, ElRate, ElColorPicker } from 'element-plus';

const form = [
  {
    is: "input",
    label: "名称",
    prop: "name",
  },
  // 方式一：直接传递 Element Plus 组件
  {
    is: ElInputNumber,
    label: "数量",
    prop: "quantity",
    initialValue: 1,
  },

  // 方式二：使用插槽自定义组件
  {
    is: "rate",
    label: "评分",
    prop: "rating",
    initialValue: 3,
  },
  {
    is: "color-picker",
    label: "颜色",
    prop: "color",
    initialValue: "#409EFF",
  },
];
</script>

<template>
  <div class="custom-component-demo">
    <!-- 方式二：使用插槽自定义
         rate 和 color-picker 使用插槽自定义渲染 -->
    <CommonForm
      :form="form"
      :inline="false"
      label-width="100px"
    >
      <!-- 评分组件插槽 - prop 为 "rating" -->
      <template #rating="{ value, updateValue }">
        <el-rate
          :model-value="value"
          @update:modelValue="updateValue"
          show-score
        />
      </template>

      <!-- 颜色选择器插槽 - prop 为 "color" -->
      <template #color="{ value, updateValue }">
        <el-color-picker
          :model-value="value"
          @update:modelValue="updateValue"
        />
      </template>
    </CommonForm>
  </div>
</template>

