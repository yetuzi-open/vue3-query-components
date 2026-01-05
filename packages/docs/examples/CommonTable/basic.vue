<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import { ElButton } from "element-plus";

const tableData = [
  {
    id: 1,
    name: "张三",
    status: 1,
    createTime: 1705278600000,
  },
  {
    id: 2,
    name: "李四",
    status: 0,
    createTime: 1705377600000,
  },
  {
    id: 3,
    name: "王五",
    status: 1,
    createTime: 1705454100000,
  },
];

const columns = [
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
    label: "姓名",
    sortable: true,
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    formatter: (row: { status: number }) =>
      row.status === 1 ? "启用" : "禁用",
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 180,
    type: "dateTime",
  },
  {
    prop: "operation",
    label: "操作",
    width: 180,
    fixed: "right",
  },
];
</script>

<template>
  <CommonTable :data="tableData" :columns="columns">
    <template #operation="{ row }">
      <el-button text type="primary" @click="console.log('编辑', row)">
        编辑
      </el-button>
      <el-button text type="danger" @click="console.log('删除', row)">
        删除
      </el-button>
    </template>
  </CommonTable>
</template>
