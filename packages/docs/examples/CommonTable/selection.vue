<script setup lang="ts">
import { ref } from "vue";
import { CommonTable } from "@yetuzi/vue3-query-components";
import type { CommonTableArrayColumns } from "@yetuzi/vue3-query-components";
import { ElButton } from "element-plus";

const multipleSelection = ref([]);

const handleSelectionChange = (selection: any[]) => {
  multipleSelection.value = selection;
};

const tableData = [
  { id: 1, name: "Zhang San", department: "技术部" },
  { id: 2, name: "Li Si", department: "产品部" },
  { id: 3, name: "Wang Wu", department: "设计部" },
];

const columns: CommonTableArrayColumns<any> = [
  {
    type: "selection",
    width: 55,
  },
  {
    prop: "name",
    label: "Name",
  },
  {
    prop: "department",
    label: "部门",
  },
];
</script>

<template>
  <div class="selection-example">
    <p>已选择 {{ multipleSelection.length }} 项</p>
    <CommonTable
      :data="tableData"
      :columns="columns"
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<style scoped>
.selection-example p {
  margin-bottom: 16px;
  color: #606266;
}
</style>