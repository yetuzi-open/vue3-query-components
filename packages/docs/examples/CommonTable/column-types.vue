<script setup lang="ts">
import { CommonTable } from "@yetuzi/vue3-query-components";
import type { CommonTableArrayColumns } from "@yetuzi/vue3-query-components";

// 字典选项配置
const statusOptions = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 },
];

const genderOptions = [
  { label: "男", value: "male" },
  { label: "女", value: "female" },
];

const tableData = [
  {
    id: 1,
    name: "张三",
    department: "技术部",
    position: "前端工程师",
    status: 1,
    gender: "male",
    birthDate: "1990-05-15",
    hireDate: 1705278600000,
    createTime: 1705278600000,
    email: "zhangsan@example.com",
    phone: "138-0000-0001",
    address: "北京市朝阳区科技园",
  },
  {
    id: 2,
    name: "李四",
    department: "产品部",
    position: "产品经理",
    status: 0,
    gender: "female",
    birthDate: "1988-10-22",
    hireDate: 1705377600000,
    createTime: 1705377600000,
    email: "lisi@example.com",
    phone: "138-0000-0002",
    address: "上海市浦东新区软件园",
  },
  {
    id: 3,
    name: "王五",
    department: "设计部",
    position: "UI设计师",
    status: 1,
    gender: "male",
    birthDate: "1995-03-08",
    hireDate: 1705454100000,
    createTime: 1705454100000,
    email: "wangwu@example.com",
    phone: "138-0000-0003",
    address: "深圳市南山区科技园",
  },
];

const columns: CommonTableArrayColumns<any> = [
  {
    type: "expand",
    width: 55,
  },
  {
    type: "index",
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
  {
    prop: "position",
    label: "职位",
  },
  {
    prop: "status",
    label: "状态",
    type: "dict",
    options: statusOptions,
    width: 100,
  },
  {
    prop: "gender",
    label: "性别",
    type: "dict",
    options: genderOptions,
    width: 100,
  },
  {
    prop: "birthDate",
    label: "出生日期",
    type: "date",
    width: 140,
  },
  {
    prop: "hireDate",
    label: "入职日期",
    type: "date",
    width: 140,
  },
  {
    prop: "createTime",
    label: "创建时间",
    type: "dateTime",
    width: 180,
  },
];
</script>

<template>
  <div class="column-types-example">
    <CommonTable :data="tableData" :columns="columns">
      <template #expand="{ row }">
        <div class="expand-content">
          <p><strong>邮箱：</strong>{{ row.email }}</p>
          <p><strong>电话：</strong>{{ row.phone }}</p>
          <p><strong>地址：</strong>{{ row.address }}</p>
        </div>
      </template>
    </CommonTable>
  </div>
</template>

<style scoped>
.column-types-example {
  padding: 0;
}

.expand-content {
  padding: 20px 40px;
  background-color: #f5f7fa;
}

.expand-content p {
  margin: 8px 0;
  line-height: 1.5;
  color: #606266;
}
</style>
