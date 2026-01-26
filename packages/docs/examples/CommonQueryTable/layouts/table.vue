<script setup lang="ts">
import { CommonQueryTable } from "@yetuzi/vue3-query-components";

// Mock API request
const fetch = async () => {
  return {
    list: [
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
    label: "Username",
    prop: "name",
  },
  {
    label: "Status",
    prop: "status",
    formatter: (row: { status: number }) =>
      row.status === 1 ? "Enabled" : "Disabled",
  },
  {
    label: "Create Time",
    prop: "createTime",
    width: 180,
    type: "dateTime",
  },
];
</script>

<template>
  <!-- 不传 form prop，只显示表格和分页 -->
  <CommonQueryTable :fetch="fetch" :columns="columns" />
</template>
