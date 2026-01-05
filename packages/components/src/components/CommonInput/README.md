# CommonInput 输入框

常用的输入框组件，基于 Element Plus Input 封装。

## 基础用法

```vue
<template>
  <CommonInput v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

## 可清空

添加 `clearable` 属性即可创建一个可清空的输入框。

```vue
<template>
  <CommonInput v-model="value" clearable placeholder="请输入内容" />
</template>
```

## 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框。

```vue
<template>
  <CommonInput v-model="password" show-password placeholder="请输入密码" />
</template>
```

## 带图标

可以通过 `prefix-icon` 和 `suffix-icon` 属性在输入框中添加图标。

```vue
<template>
  <CommonInput v-model="value" prefix-icon="Search" placeholder="搜索" />
  <CommonInput v-model="value" suffix-icon="Calendar" placeholder="选择日期" />
</template>
```

## 文本域

用于输入多行文本，将 `type` 属性设置为 `textarea`。

```vue
<template>
  <CommonInput v-model="value" type="textarea" :rows="4" placeholder="请输入内容" />
</template>
```

## 输入长度限制

使用 `maxlength` 和 `minlength` 属性可以限制输入长度。

```vue
<template>
  <CommonInput v-model="value" maxlength="10" show-word-limit placeholder="最多输入10个字符" />
</template>
```

## 尺寸

提供三种输入框尺寸：大、默认、小。通过 `size` 属性设置。

```vue
<template>
  <CommonInput v-model="value" size="large" placeholder="大尺寸" />
  <CommonInput v-model="value" placeholder="默认尺寸" />
  <CommonInput v-model="value" size="small" placeholder="小尺寸" />
</template>
```

## 事件处理

支持监听 `enter` 事件，当用户按下回车键时触发。

```vue
<template>
  <CommonInput v-model="value" placeholder="按回车搜索" @enter="handleSearch" />
</template>

<script setup>
const handleSearch = (event) => {
  console.log('搜索:', event.target.value)
}
</script>
```

## 插槽

支持 Element Plus Input 的所有插槽。

```vue
<template>
  <CommonInput v-model="value" placeholder="请输入内容">
    <template #prefix>
      <el-icon><Search /></el-icon>
    </template>
    <template #suffix>
      <el-icon><Calendar /></el-icon>
    </template>
  </CommonInput>
</template>
```

## 属性

| 属性名          | 说明                                      | 类型             | 可选值              | 默认值  |
| --------------- | ----------------------------------------- | ---------------- | ------------------- | ------- |
| v-model         | 绑定值                                    | string           | -                   | ''      |
| clearable       | 是否可清空                                | boolean          | -                   | true    |
| placeholder     | 输入框占位文本                            | string           | -                   | -       |
| type            | 类型                                      | string           | text/textarea       | text    |
| size            | 尺寸                                      | string           | large/default/small | default |
| maxlength       | 最大输入长度                              | string/number    | -                   | -       |
| minlength       | 最小输入长度                              | string/number    | -                   | -       |
| show-word-limit | 是否显示输入字数统计                      | boolean          | -                   | false   |
| show-password   | 是否显示切换密码图标                      | boolean          | -                   | false   |
| prefix-icon     | 输入框头部图标                            | string/Component | -                   | -       |
| suffix-icon     | 输入框尾部图标                            | string/Component | -                   | -       |
| rows            | 输入框行数，只对 type="textarea" 有效     | number           | -                   | 2       |
| autosize        | 自适应内容高度，只对 type="textarea" 有效 | boolean/object   | -                   | false   |
| disabled        | 是否禁用                                  | boolean          | -                   | false   |
| readonly        | 是否只读                                  | boolean          | -                   | false   |

## 事件

| 事件名 | 说明             | 回调参数                       |
| ------ | ---------------- | ------------------------------ |
| enter  | 回车键按下时触发 | (event: KeyboardEvent) => void |

## 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

## 类型定义

```typescript
interface CommonInputProps extends InputProps {}
```
