<script setup lang="ts">
import { CommonForm } from "@yetuzi/vue3-query-components";
import { computed, ref } from "vue";

const formRef = ref();

const baseForm = [
  {
    is: "select",
    label: "类型",
    prop: "type",
    initialValue: "personal",
    props: {
      options: [
        { value: "personal", label: "个人" },
        { value: "company", label: "企业" },
      ],
    },
  },
  {
    is: "input",
    label: "名称",
    prop: "name",
    formItem: {
      rules: [{ required: true, message: "Please enter名称" }],
    },
  },
];

const companyFields = computed(() => {
  if (formRef.value?.formData?.type === "company") {
    return [
      {
        is: "input",
        label: "公司名称",
        prop: "companyName",
        formItem: {
          rules: [{ required: true, message: "Please enter公司名称" }],
        },
      },
    ];
  }
  return [];
});

const dynamicForm = computed(() => [
  ...baseForm,
  ...companyFields.value,
]);
</script>

<template>
  <CommonForm
    ref="formRef"
    :form="dynamicForm"
    :inline="false"
    label-width="120px"
  />
</template>

