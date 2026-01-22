<script setup lang="ts">
import {
  CommonQueryTable,
  CommonForm,
  CommonConfigProvider,
  CommonInputNumber,
  CommonTimePicker,
  CommonCascader,
  type CommonFormItemArray,
} from "@components-src";
import { ref } from "vue";

const a: CommonFormItemArray<any> = [
  {
    is: "aaaaa",
    prop: "name",
    label: "Username",
    props: { placeholder: "Please enterUsername" },
  },
];

// 示例：模拟 API 请求
const fetch = async () => {
  return {
    list: [
      { id: 1, name: "Zhang San", status: 1, createTime: 1705278600000 },
      { id: 2, name: "Li Si", status: 0, createTime: 1705377600000 },
    ],
    total: 2,
  };
};

// Search表单配置
const form = [
  {
    is: "input",
    prop: "name",
    label: "Username",
    props: { placeholder: "Please enterUsername" },
  },
  {
    is: "select",
    prop: "status",
    label: "Status",
    props: {
      placeholder: "Please selectStatus",
      options: [
        { value: 1, label: "Enabled" },
        { value: 0, label: "Disabled" },
      ],
    },
  },
];

// 表格列配置
const columns = [
  { label: "ID", prop: "id" },
  { label: "Username", prop: "name" },
  {
    label: "Status",
    prop: "status",
    formatter: (row: { status: number }) =>
      row.status === 1 ? "Enabled" : "Disabled",
  },
  { label: "Create Time", prop: "createTime", type: "dateTime" },
];

// 字典列测试配置
const statusOptions = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 },
];

const columnsWithDict = [
  { label: "ID", prop: "id", type: "index" },
  { label: "Username", prop: "name" },
  {
    label: "Status (dict)",
    prop: "status",
    type: "dict",
    options: statusOptions,
  },
  { label: "Create Time", prop: "createTime", type: "dateTime" },
];

// ==================== 新组件测试 ====================

// CommonInputNumber 测试数据
const testNumber = ref(0);
const testNumberWithStep = ref(5);

// CommonTimePicker 测试数据
const testTime = ref("");
const testTimeRange = ref([]);

// CommonCascader 测试数据
const testCascader = ref([]);
const cascaderOptions = [
  {
    value: "zh",
    label: "中国",
    children: [
      {
        value: "bj",
        label: "北京",
        children: [
          { value: "cyq", label: "朝阳区" },
          { value: "hdq", label: "海淀区" },
        ],
      },
      {
        value: "sh",
        label: "上海",
        children: [
          { value: "pdxq", label: "浦东新区" },
          { value: "mhq", label: "闵行区" },
        ],
      },
    ],
  },
  {
    value: "us",
    label: "美国",
    children: [
      {
        value: "ny",
        label: "纽约",
        children: [
          { value: "mnht", label: "曼哈顿" },
          { value: "bkln", label: "布鲁克林" },
        ],
      },
    ],
  },
];

// CommonForm 中使用新组件的测试
const testForm: CommonFormItemArray<any> = [
  {
    is: "input-number",
    prop: "age",
    label: "年龄",
    props: {
      min: 0,
      max: 150,
      step: 1,
    },
  },
  {
    is: "time-picker",
    prop: "workTime",
    label: "工作时间",
    props: {
      placeholder: "请选择时间",
    },
  },
  {
    is: "cascader",
    prop: "region",
    label: "地区",
    props: {
      options: cascaderOptions,
      placeholder: "请选择地区",
      clearable: true,
    },
  },
];
</script>

<template>
  <div>
    <h2>原组件测试</h2>
    <CommonForm :form="form"></CommonForm>
    <CommonQueryTable :fetch="fetch" :form="form" :columns="columns" />

    <hr style="margin: 40px 0" />

    <h2>字典列测试 (dict type)</h2>
    <CommonQueryTable :fetch="fetch" :form="form" :columns="columnsWithDict" />

    <hr style="margin: 40px 0" />

    <h2>CommonForm 中使用新组件</h2>
    <CommonForm :form="testForm"></CommonForm>

    <hr style="margin: 40px 0" />

    <h2>独立组件测试</h2>

    <!-- CommonInputNumber 测试 -->
    <h3>CommonInputNumber - 数字输入框</h3>
    <div style="display: flex; gap: 20px; align-items: center">
      <div>
        <label>基础用法：</label>
        <CommonInputNumber v-model="testNumber" style="width: 180px" />
        <span>值：{{ testNumber }}</span>
      </div>
      <div>
        <label>步进设置：</label>
        <CommonInputNumber
          v-model="testNumberWithStep"
          :step="5"
          :min="0"
          :max="100"
          style="width: 180px"
        />
        <span>值：{{ testNumberWithStep }}</span>
      </div>
    </div>

    <hr style="margin: 40px 0" />

    <!-- CommonTimePicker 测试 -->
    <h3>CommonTimePicker - 时间选择器</h3>
    <div style="display: flex; gap: 20px; align-items: center">
      <div>
        <label>时间选择：</label>
        <CommonTimePicker
          v-model="testTime"
          placeholder="请选择时间"
          style="width: 200px"
        />
        <span>值：{{ testTime }}</span>
      </div>
      <div>
        <label>时间范围：</label>
        <CommonTimePicker
          v-model="testTimeRange"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="width: 280px"
        />
        <span>值：{{ testTimeRange }}</span>
      </div>
    </div>

    <hr style="margin: 40px 0" />

    <!-- CommonCascader 测试 -->
    <h3>CommonCascader - 级联选择器</h3>
    <div style="display: flex; gap: 20px; align-items: center">
      <div>
        <label>地区选择：</label>
        <CommonCascader
          v-model="testCascader"
          :options="cascaderOptions"
          placeholder="请选择地区"
          clearable
          style="width: 250px"
        />
        <span>值：{{ testCascader }}</span>
      </div>
      <div>
        <label>任意级可选：</label>
        <CommonCascader
          v-model="testCascader"
          :options="cascaderOptions"
          :props="{ checkStrictly: true }"
          placeholder="可选择任意级别"
          clearable
          style="width: 250px"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* 样式已在 .vitepress/theme/index.ts 中全局导入 */
</style>
