<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import type { CommonTableArrayColumns } from "@yetuzi/vue3-query-components";
import { ElButton } from "element-plus";

const tableData = [
  {
    id: 1,
    name: "Zhang San",
    status: 1,
    createTime: 1705278600000,
  },
  {
    id: 2,
    name: "Li Si",
    status: 0,
    createTime: 1705377600000,
  },
  {
    id: 3,
    name: "Wang Wu",
    status: 1,
    createTime: 1705454100000,
  },
];

const columns: CommonTableArrayColumns<any> = [
  {
    type: "selection",
    width: 55,
  },
  {
    type: "index",
    width: 55,
  },
  {
    prop: "name",
    label: "Name",
    sortable: true,
  },
  {
    prop: "status",
    label: "Status",
    width: 100,
    formatter: (row: { status: number }) =>
      row.status === 1 ? "Enabled" : "Disabled",
  },
  {
    prop: "createTime",
    label: "Create Time",
    width: 180,
    type: "dateTime",
  },
  {
    prop: "operation",
    label: "Operations",
    width: 180,
    fixed: "right",
  },
];
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #table-operation="{ row }">
      <ElButton link type="primary" size="small">Edit</ElButton>
      <ElButton link type="danger" size="small">Delete</ElButton>
    </template>
  </CommonTable>
</template>
