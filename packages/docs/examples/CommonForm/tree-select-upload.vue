<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CommonForm } from '@yetuzi/vue3-query-components'

const departmentTree = [
  {
    label: '总部',
    value: 'hq',
    children: [
      {
        label: '产品中心',
        value: 'product',
      },
      {
        label: '研发中心',
        value: 'rd',
        children: [
          {
            label: '前端组',
            value: 'fe',
          },
          {
            label: '后端组',
            value: 'be',
          },
        ],
      },
    ],
  },
]

const form = [
  {
    is: 'tree-select',
    label: '归属部门',
    prop: 'departmentId',
    initialValue: 'rd',
    props: {
      data: departmentTree,
      nodeKey: 'value',
      checkStrictly: true,
      clearable: true,
      filterable: true,
      placeholder: '请选择归属部门',
      props: {
        label: 'label',
        children: 'children',
      },
    },
  },
  {
    is: 'upload',
    label: '附件资料',
    prop: 'attachments',
    initialValue: [
      {
        name: '产品方案.pdf',
        url: 'https://example.com/files/product-plan.pdf',
      },
    ],
    props: {
      action: '#',
      autoUpload: false,
      multiple: true,
      limit: 3,
      onExceed: () => ElMessage.warning('最多上传 3 个文件'),
    },
  },
]

function handleSubmit(formData: any) {
  ElMessage.success(`已选择部门 ${formData.departmentId}，共 ${formData.attachments?.length ?? 0} 个文件`)
}
</script>

<template>
  <div class="form-demo">
    <p class="demo-description">
      `tree-select` 适合部门、分类、区域等树形数据；`upload` 适合附件、图片和导入文件场景。
    </p>
    <CommonForm :form="form" :inline="false" label-width="88px" @submit="handleSubmit" />
    <p class="demo-tip">示例中的上传组件使用 `auto-upload=false`，仅展示文件选择与列表管理。</p>
  </div>
</template>

<style scoped>
.form-demo {
  display: grid;
  gap: 12px;
}

.demo-description,
.demo-tip {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}
</style>
