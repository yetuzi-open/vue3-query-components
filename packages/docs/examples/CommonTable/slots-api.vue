<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import { ElTag } from "element-plus";

const tableData = [
  {
    id: 1,
    name: "Zhang San",
    status: 1,
  },
  {
    id: 2,
    name: "Li Si",
    status: 0,
  },
  {
    id: 3,
    name: "Wang Wu",
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
    label: "Name",
  },
  {
    prop: "status",
    label: "Status",
  },
];
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <!-- 使用 prop 名称作为插槽名，自定义列内容 -->
    <template #status="{ row }">
      <el-tag :type="row.status ? 'success' : 'danger'">
        {{ row.status ? 'Enabled' : 'Disabled' }}
      </el-tag>
    </template>
  </CommonTable>
</template>
