<script setup lang="ts">
import { CommonQueryTable } from "@yetuzi/vue3-query-components";
import { ElButton } from 'element-plus'

const layouts = ["form", "toolbar", "table", "pagination"];

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

const form = [
  {
    is: "input",
    prop: "name",
    label: "用户名",
    props: {
      placeholder: "请输入用户名",
    },
  },
  {
    is: "select",
    prop: "status",
    label: "状态",
    props: {
      placeholder: "请选择状态",
      options: [
        { value: 1, label: "启用" },
        { value: 0, label: "禁用" },
      ],
    },
  },
];

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
  <CommonQueryTable
    :layouts="layouts"
    :fetch="fetch"
    :form="form"
    :columns="columns"
  >
    <template #toolbar> 
        <el-button type="primary">新增</el-button>    
        <el-button type="danger">删除</el-button>    
    </template>
  </CommonQueryTable>
</template>
