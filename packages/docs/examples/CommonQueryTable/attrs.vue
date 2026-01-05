<script setup lang="ts">
import { CommonQueryTable } from "@yetuzi/vue3-query-components";

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
    type: 'selection'
  },
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
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 180,
    type: "dateTime",
  },
];

function selectionChange(e: any[]){
  console.log('案例：选择了哪些内容', e);
}

</script>

<template>
  <CommonQueryTable
    :fetch="fetch"
    :form="form"
    :columns="columns"
    :form-inline="false"
    @table-selection-change="selectionChange"
  > 
  </CommonQueryTable>
</template>
