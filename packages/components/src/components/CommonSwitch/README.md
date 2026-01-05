# CommonSwitch 开关

常用的开关组件，基于 Element Plus Switch 封装，支持自定义颜色配置。

## 基础用法

```vue
<template>
  <CommonSwitch v-model="value" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>
```

## 文字描述

使用 `active-text` 和 `inactive-text` 属性来设置开关的文字描述。

```vue
<template>
  <CommonSwitch v-model="value" active-text="开启" inactive-text="关闭" />
</template>
```

## 自定义颜色

通过 `active-color` 和 `inactive-color` 属性自定义开关的背景颜色。

```vue
<template>
  <CommonSwitch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
</template>
```

## 自定义边框颜色

通过 `border-color` 属性自定义开关的边框颜色。

```vue
<template>
  <CommonSwitch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    border-color="#409EFF"
  />
</template>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态。

```vue
<template>
  <CommonSwitch v-model="value" disabled />
</template>
```

## 尺寸

提供两种尺寸：默认和小号。通过 `size` 属性设置。

```vue
<template>
  <CommonSwitch v-model="value" />
  <CommonSwitch v-model="value2" size="small" />
</template>
```

## 自定义显示内容

使用 `active-text` 和 `inactive-text` 属性来自定义显示内容。

```vue
<template>
  <CommonSwitch v-model="value" active-text="按月付费" inactive-text="按年付费" />
</template>
```

## 自定义图标

使用 `active-icon` 和 `inactive-icon` 属性来自定义图标。

```vue
<template>
  <CommonSwitch v-model="value" :active-icon="Check" :inactive-icon="Close" />
</template>

<script setup>
import { Check, Close } from '@element-plus/icons-vue'
</script>
```

## 异步控制

通过 `before-change` 属性可以在状态改变前进行验证或其他操作。

```vue
<template>
  <CommonSwitch v-model="value" :before-change="beforeChange" />
</template>

<script setup>
const beforeChange = () => {
  return new Promise((resolve) => {
    // 模拟异步操作
    setTimeout(() => {
      resolve(true) // 返回true允许改变，返回false阻止改变
    }, 1000)
  })
}
</script>
```

## 属性

| 属性名         | 说明                 | 类型                  | 可选值              | 默认值  |
| -------------- | -------------------- | --------------------- | ------------------- | ------- |
| v-model        | 绑定值               | boolean/string/number | -                   | -       |
| disabled       | 是否禁用             | boolean               | -                   | false   |
| loading        | 是否显示加载中       | boolean               | -                   | false   |
| size           | 开关尺寸             | string                | large/default/small | default |
| width          | 开关的宽度           | number/string         | -                   | -       |
| active-icon    | 打开时所显示图标     | string/Component      | -                   | -       |
| inactive-icon  | 关闭时所显示图标     | string/Component      | -                   | -       |
| active-text    | 打开时的文字描述     | string                | -                   | -       |
| inactive-text  | 关闭时的文字描述     | string                | -                   | -       |
| active-value   | 打开时的值           | boolean/string/number | -                   | true    |
| inactive-value | 关闭时的值           | boolean/string/number | -                   | false   |
| active-color   | 打开时的背景色       | string                | -                   | -       |
| inactive-color | 关闭时的背景色       | string                | -                   | -       |
| border-color   | 开关的边框颜色       | string                | -                   | -       |
| name           | 原生 name 属性       | string                | -                   | -       |
| validate-event | 是否触发表单验证     | boolean               | -                   | true    |
| before-change  | 开关切换前的钩子函数 | function              | -                   | -       |

## 事件

| 事件名 | 说明                    | 回调参数                             |
| ------ | ----------------------- | ------------------------------------ |
| change | 值改变时触发            | (val: boolean/string/number) => void |
| blur   | 当 input 失去焦点时触发 | (event: Event) => void               |
| focus  | 当 input 获得焦点时触发 | (event: Event) => void               |

## 类型定义

```typescript
interface CommonSwitchProps extends ExtractPublicPropTypes<SwitchProps> {
  /**
   * 活跃状态时的背景颜色
   */
  activeColor?: string
  /**
   * 不活跃状态时的背景颜色
   */
  inactiveColor?: string
  /**
   * 开关的边框颜色
   */
  borderColor?: string
}
```
