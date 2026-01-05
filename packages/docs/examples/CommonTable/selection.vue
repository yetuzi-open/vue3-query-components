<script setup lang="ts">
import { ref } from "vue";
import { CommonTable } from "@yetuzi/vue3-query-components";
import { ElButton } from "element-plus";

const multipleSelection = ref([]);

const handleSelectionChange = (selection: any[]) => {
  multipleSelection.value = selection;
};

const tableData = [
  { id: 1, name: "张三", department: "技术部" },
  { id: 2, name: "李四", department: "产品部" },
  { id: 3, name: "王五", department: "设计部" },
];

const columns = [
  {
    type: "selection",
    width: 55,
  },
  {
    prop: "name",
    label: "姓名",
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