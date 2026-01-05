<script setup lang="ts">
import { CommonForm } from "@yetuzi/vue3-query-components";

const form = [
  {
    is: "input",
    label: "姓名",
    prop: "name",
  },
  {
    is: "select",
    label: "性别",
    prop: "gender",
    initialValue: "",
    props: {
      placeholder: "请选择性别",
      options: [
        { value: "male", label: "男" },
        { value: "female", label: "女" },
      ],
    },
  },
  {
    is: "date-picker",
    label: "生日",
    prop: "birthday",
    props: {
      type: "date",
      placeholder: "请选择生日",
    },
  },
  {
    is: "radio",
    label: "状态",
    prop: "status",
    initialValue: 1,
    props: {
      options: [
        { value: 1, label: "启用" },
        { value: 0, label: "禁用" },
      ],
    },
  },
  {
    is: "check-box",
    label: "爱好",
    prop: "hobbies",
    initialValue: [],
    props: {
      options: [
        { value: "reading", label: "阅读" },
        { value: "music", label: "音乐" },
        { value: "sports", label: "运动" },
        { value: "travel", label: "旅行" },
      ],
    },
  },
  {
    is: "switch",
    label: "是否订阅",
    prop: "subscribe",
    initialValue: true,
    props: {
      activeText: "是",
      inactiveText: "否",
      activeValue: true,
      inactiveValue: false,
    },
  },
];

function handleSubmit(formData: any) {
  console.log("表单提交数据:", formData);
  alert("表单提交成功！请查看控制台输出。");
}

function handleReset(formData: any) {
  console.log("表单重置后数据:", formData);
}
</script>

<template>
  <CommonForm :form="form" :inline="false" @submit="handleSubmit" @reset="handleReset" />
</template>