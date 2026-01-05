<script setup lang="ts">
import { CommonForm } from "@yetuzi/vue3-query-components";

const form = [
  {
    is: "input",
    label: "用户名",
    prop: "username",
    formItem: {
      rules: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, message: "长度至少3个字符", trigger: "blur" },
      ],
    },
  },
  {
    is: "input",
    label: "密码",
    prop: "password",
    formItem: {
      rules: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, message: "密码至少6位", trigger: "blur" },
      ],
    },
    props: {
      type: "password",
      showPassword: true,
    },
  },
  {
    is: "input",
    label: "确认密码",
    prop: "confirmPassword",
    formItem: {
      rules: [
        {
          validator: (rule: any, value: string, callback: Function, formData: any) => {
            if (value !== formData.password) {
              callback(new Error("两次密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ],
    },
    props: {
      type: "password",
      showPassword: true,
    },
  },
];

function handleSubmit(formData: any) {
  console.log("表单验证通过:", formData);
}

function handleReset(formData: any) {
  console.log("重置表单:", formData);
}


</script>

<template>
  <CommonForm
    :form="form"
    :inline="false"
    label-width="100px"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>