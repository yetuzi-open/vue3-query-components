<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import { ElTag, ElSwitch, ElProgress } from "element-plus";

const tableData = [
  {
    name: "张三",
    status: 1,
    progress: 85,
    tags: ["前端", "Vue"],
  },
  {
    name: "李四",
    status: 0,
    progress: 60,
    tags: ["后端", "Java"],
  },
  {
    name: "王五",
    status: 1,
    progress: 92,
    tags: ["全栈", "Node"],
  },
];

const columns = [
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "status",
    label: "状态",
  },
  {
    prop: "progress",
    label: "进度",
  },
  {
    prop: "tags",
    label: "标签",
  },
];
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <el-switch :model-value="row.status === 1" disabled />
    </template>

    <!-- 自定义进度列 -->
    <template #progress="{ row }">
      <el-progress :percentage="row.progress" :stroke-width="6" />
    </template>

    <!-- 自定义标签列 -->
    <template #tags="{ row }">
      <el-tag v-for="tag in row.tags" :key="tag" style="margin-right: 4px">
        {{ tag }}
      </el-tag>
    </template>
  </CommonTable>
</template>