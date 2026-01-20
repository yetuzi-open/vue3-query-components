<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import type { CommonTableArrayColumns } from "@yetuzi/vue3-query-components";
import { ElTag, ElSwitch, ElProgress } from "element-plus";

const tableData = [
  {
    name: "Zhang San",
    status: 1,
    progress: 85,
    tags: ["前端", "Vue"],
  },
  {
    name: "Li Si",
    status: 0,
    progress: 60,
    tags: ["后端", "Java"],
  },
  {
    name: "Wang Wu",
    status: 1,
    progress: 92,
    tags: ["全栈", "Node"],
  },
];

const columns: CommonTableArrayColumns<any> = [
  {
    prop: "name",
    label: "Name",
  },
  {
    prop: "status",
    label: "Status",
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
    <!-- 自定义Status列 -->
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