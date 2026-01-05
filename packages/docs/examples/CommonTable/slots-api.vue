<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import { ElTag } from "element-plus";

const tableData = [
  {
    id: 1,
    name: "张三",
    status: 1,
  },
  {
    id: 2,
    name: "李四",
    status: 0,
  },
  {
    id: 3,
    name: "王五",
    status: 1,
  },
];

const columns = [
  {
    prop: "id",
    label: "ID",
    width: 80,
  },
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "status",
    label: "状态",
  },
];
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <!-- 使用 prop 名称作为插槽名，自定义列内容 -->
    <template #status="{ row }">
      <el-tag :type="row.status ? 'success' : 'danger'">
        {{ row.status ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </CommonTable>
</template>
