<script setup lang="ts">
import { CommonForm } from "@yetuzi/vue3-query-components";
import { ref } from "vue";
import { ElRadioGroup, ElRadio } from 'element-plus';

const currentPosition = ref("right");

const form = [
  {
    is: "input",
    label: "用户名",
    prop: "username",
    props: {
      placeholder: "请输入用户名",
    },
  },
  {
    is: "select",
    label: "城市",
    prop: "city",
    props: {
      placeholder: "请选择城市",
      options: [
        { value: "beijing", label: "北京" },
        { value: "shanghai", label: "上海" },
        { value: "guangzhou", label: "广州" },
      ],
    },
  },
  {
    is: "date-picker",
    label: "生日",
    prop: "birthday",
    props: {
      type: "date",
      placeholder: "请选择生日",
    },
  },
];
</script>

<template>
  <div class="label-position-demo">
    <div class="control-panel">
      <span>标签位置：</span>
      <el-radio-group v-model="currentPosition">
        <el-radio label="left">左对齐</el-radio>
        <el-radio label="right">右对齐</el-radio>
        <el-radio label="top">顶部对齐</el-radio>
      </el-radio-group>
    </div>

    <CommonForm
      :form="form"
      :label-position="currentPosition"
      :inline="false"
      label-width="100px"
    />
  </div>
</template>

<style scoped>
.control-panel {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>