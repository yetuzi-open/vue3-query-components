<script setup lang="ts">
import { CommonQueryTable } from "@yetuzi/vue3-query-components";

const layouts = ['table', 'pagination']

// 模拟 API 请求
const fetch = async () => {
  return {
    list: [
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
    ],
    total: 4,
  };
};

const columns = [
  {
    label: "ID",
    prop: "id",
  },
  {
    label: "用户名",
    prop: "name",
  },
  {
    label: "状态",
    prop: "status",
    formatter: (row: { status: number }) =>
      row.status === 1 ? "启用" : "禁用",
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 180,
    type: "dateTime",
  },
];
</script>

<template>
  <CommonQueryTable :layouts="layouts" :fetch="fetch" :columns="columns" />
</template>
