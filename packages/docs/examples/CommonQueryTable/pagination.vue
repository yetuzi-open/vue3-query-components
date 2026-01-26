<script setup lang="ts">
import { CommonQueryTable } from "@yetuzi/vue3-query-components";
import type { CommonTableArrayColumns } from "@yetuzi/vue3-query-components";
import { ref } from "vue";

// 分页状态
const currentPagination = ref({ pageNo: 1, pageSize: 10 });

// Mock API request
const fetch = async (params: any) => {
  console.log('Fetch with params:', params);

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

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
      {
        id: 4,
        name: "Zhao Liu",
        status: 0,
        createTime: 1705540500000,
      },
      {
        id: 5,
        name: "Sun Qi",
        status: 1,
        createTime: 1705626900000,
      },
    ],
    total: 50,
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

const columns: CommonTableArrayColumns<any> = [
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

// 分页变化事件
function handlePaginationChange(params: { pageNo: number; pageSize: number }) {
  currentPagination.value = params;
  console.log('Pagination changed:', params);
}
</script>

<template>
  <CommonQueryTable
    :fetch="fetch"
    :form="form"
    :columns="columns"
    :pagination-page-size="[10, 20, 50, 100]"
    :pagination-default-page-size="20"
    pagination-layout="total, sizes, prev, pager, next, jumper"
    @pagination-change="handlePaginationChange"
  >
    <!-- 自定义分页插槽 -->
    <template #pagination-prefix>
      <span style="color: var(--el-text-color-secondary); margin-right: 12px;">
        当前第 {{ currentPagination.pageNo }} 页，每页 {{ currentPagination.pageSize }} 条
      </span>
    </template>
  </CommonQueryTable>
</template>
