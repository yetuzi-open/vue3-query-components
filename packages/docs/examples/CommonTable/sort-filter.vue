<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";

const tableData = [
  {
    name: "张三",
    age: 28,
    department: "技术部",
    salary: 15000,
    level: "P7",
  },
  {
    name: "李四",
    age: 32,
    department: "产品部",
    salary: 18000,
    level: "P8",
  },
  {
    name: "王五",
    age: 26,
    department: "设计部",
    salary: 12000,
    level: "P6",
  },
  {
    name: "赵六",
    age: 30,
    department: "技术部",
    salary: 20000,
    level: "P8",
  },
];

const columns = [
  {
    prop: "name",
    label: "姓名",
    sortable: true,
  },
  {
    prop: "age",
    label: "年龄",
    sortable: true,
  },
  {
    prop: "department",
    label: "部门",
    filters: [
      { text: "技术部", value: "技术部" },
      { text: "产品部", value: "产品部" },
      { text: "设计部", value: "设计部" },
    ],
    filterMethod: (value: string, row: any) => row.department === value,
  },
  {
    prop: "salary",
    label: "薪资",
    sortable: true,
  },
  {
    prop: "level",
    label: "级别",
    filters: [
      { text: "P6", value: "P6" },
      { text: "P7", value: "P7" },
      { text: "P8", value: "P8" },
    ],
    filterMethod: (value: string, row: any) => row.level === value,
  },
];
</script>

<template>
  <CommonTable :data="tableData" :columns="columns" />
</template>