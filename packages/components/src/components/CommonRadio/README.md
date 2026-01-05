# CommonRadio 单选框

常用的单选框组件，基于 Element Plus Radio 封装。

## 基础用法

```vue
<template>
  <CommonRadio v-model="radio" label="1">选项1</CommonRadio>
  <CommonRadio v-model="radio" label="2">选项2</CommonRadio>
</template>

<script setup>
import { ref } from 'vue'

const radio = ref('1')
</script>
```

## 单选框组

使用 `el-radio-group` 结合 `el-radio` 实现单选框组。

```vue
<template>
  <CommonRadio v-model="radio">
    <el-radio label="1">选项1</el-radio>
    <el-radio label="2">选项2</el-radio>
    <el-radio label="3">选项3</el-radio>
  </CommonRadio>
</template>

<script setup>
const radio = ref('1')
</script>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态。

```vue
<template>
  <CommonRadio v-model="radio" disabled>
    <el-radio label="1">禁用选项1</el-radio>
    <el-radio label="2">禁用选项2</el-radio>
  </CommonRadio>
</template>
```

## 单选框按钮样式

设置 `el-radio-button` 实现按钮样式的单选框。

```vue
<template>
  <CommonRadio v-model="radio">
    <el-radio-button label="1">选项1</el-radio-button>
    <el-radio-button label="2">选项2</el-radio-button>
    <el-radio-button label="3">选项3</el-radio-button>
  </CommonRadio>
</template>
```

## 带有边框

设置 `border` 属性可以渲染为带有边框的单选框。

```vue
<template>
  <CommonRadio v-model="radio">
    <el-radio label="1" border>选项1</el-radio>
    <el-radio label="2" border>选项2</el-radio>
    <el-radio label="3" border>选项3</el-radio>
  </CommonRadio>
</template>
```

## 尺寸

提供三种尺寸：大、默认、小。通过 `size` 属性设置。

```vue
<template>
  <CommonRadio v-model="radio1" size="large">
    <el-radio label="1">大尺寸</el-radio>
    <el-radio label="2">大尺寸</el-radio>
  </CommonRadio>

  <CommonRadio v-model="radio2">
    <el-radio label="1">默认尺寸</el-radio>
    <el-radio label="2">默认尺寸</el-radio>
  </CommonRadio>

  <CommonRadio v-model="radio3" size="small">
    <el-radio label="1">小尺寸</el-radio>
    <el-radio label="2">小尺寸</el-radio>
  </CommonRadio>
</template>
```

## 自定义内容

可以在单选框中显示自定义内容。

```vue
<template>
  <CommonRadio v-model="radio">
    <el-radio label="1">
      <el-icon><CircleCheck /></el-icon>
      选项1
    </el-radio>
    <el-radio label="2">
      <el-icon><Warning /></el-icon>
      选项2
    </el-radio>
  </CommonRadio>
</template>
```

## 属性

| 属性名     | 说明                                    | 类型                  | 可选值              | 默认值  |
| ---------- | --------------------------------------- | --------------------- | ------------------- | ------- |
| v-model    | 绑定值                                  | string/number/boolean | -                   | -       |
| size       | 单选框组尺寸                            | string                | large/default/small | default |
| disabled   | 是否禁用                                | boolean               | -                   | false   |
| text-color | 按钮形式的 Radio 激活时的文本颜色       | string                | -                   | #ffffff |
| fill       | 按钮形式的 Radio 激活时的填充色和边框色 | string                | -                   | #409EFF |

## 事件

| 事件名 | 说明                   | 回调参数                               |
| ------ | ---------------------- | -------------------------------------- |
| change | 绑定值变化时触发的事件 | (value: string/number/boolean) => void |

## Radio 属性

| 属性名   | 说明           | 类型                  | 可选值              | 默认值  |
| -------- | -------------- | --------------------- | ------------------- | ------- |
| label    | Radio 的 value | string/number/boolean | -                   | -       |
| disabled | 是否禁用       | boolean               | -                   | false   |
| border   | 是否显示边框   | boolean               | -                   | false   |
| size     | Radio 尺寸     | string                | large/default/small | default |

## Radio 事件

| 事件名 | 说明         | 回调参数                               |
| ------ | ------------ | -------------------------------------- |
| change | 值变更时触发 | (value: string/number/boolean) => void |

## 插槽

| 插槽名  | 说明                                                   |
| ------- | ------------------------------------------------------ |
| default | 自定义单选框内容，通常放置 el-radio 或 el-radio-button |

## 类型定义

```typescript
interface CommonRadioProps extends ExtractPublicPropTypes<RadioGroupProps> {}
```
