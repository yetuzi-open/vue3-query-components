<script setup lang="ts">
import { CommonForm } from "@yetuzi/vue3-query-components";
import { ElRate, ElSlider, ElColorPicker, ElInput } from 'element-plus';

const form = [
  {
    is: "input",
    label: "姓名",
    prop: "name",
    props: {
      placeholder: "请输入姓名",
    },
  },
  {
    is: "input",
    label: "邮箱",
    prop: "email",
    props: {
      placeholder: "请输入邮箱",
      type: "email",
    },
  },
  // 自定义评分组件
  {
    is: "custom-rate",
    label: "评分",
    prop: "rate",
    initialValue: 3,
  },
  // 自定义颜色选择器
  {
    is: "custom-color",
    label: "主题色",
    prop: "color",
    initialValue: "#409EFF",
  },
];

function handleSubmit(formData: any) {
  console.log("表单提交数据:", formData);
  alert("表单提交成功！包含自定义组件的数据。");
}

function handleReset(formData: any) {
  console.log("表单重置后数据:", formData);
}
</script>

<template>
  <CommonForm :form="form" @submit="handleSubmit" @reset="handleReset">
    <!-- 评分组件插槽 -->
    <template #rate="{ value, updateValue }">
      <el-rate
        :model-value="value"
        @update:modelValue="updateValue"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        show-score
        score-template="{value} 分"
      />
    </template>

    <!-- 颜色选择器插槽 -->
    <template #color="{ value, updateValue }">
      <el-color-picker
        :model-value="value"
        @update:modelValue="updateValue"
        show-alpha
        :predefine="[
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          '#409EFF'
        ]"
      />
    </template>
  </CommonForm>
</template>

<style scoped>
</style>