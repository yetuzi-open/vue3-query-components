# CommonDatePicker 日期选择器

常用的日期选择器组件，基于 Element Plus DatePicker 封装。

## 基础用法

```vue
<template>
  <CommonDatePicker v-model="date" placeholder="选择日期" />
</template>

<script setup>
import { ref } from 'vue'

const date = ref('')
</script>
```

## 日期格式

通过 `value-format` 属性设置日期格式，默认为 `YYYY-MM-DD`。

```vue
<template>
  <CommonDatePicker v-model="date" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
</template>
```

## 日期时间选择

设置 `type="datetime"` 可以选择日期和时间。

```vue
<template>
  <CommonDatePicker v-model="datetime" type="datetime" placeholder="选择日期时间" />
</template>
```

## 时间选择

设置 `type="time"` 可以选择时间。

```vue
<template>
  <CommonDatePicker v-model="time" type="time" placeholder="选择时间" />
</template>
```

## 日期范围选择

设置 `type="daterange"` 可以选择日期范围。

```vue
<template>
  <CommonDatePicker
    v-model="dateRange"
    type="daterange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />
</template>

<script setup>
const dateRange = ref([])
</script>
```

## 日期时间范围选择

设置 `type="datetimerange"` 可以选择日期时间范围。

```vue
<template>
  <CommonDatePicker
    v-model="datetimeRange"
    type="datetimerange"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />
</template>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态。

```vue
<template>
  <CommonDatePicker v-model="date" disabled placeholder="禁用状态" />
</template>
```

## 可清空

添加 `clearable` 属性即可创建一个可清空的日期选择器。

```vue
<template>
  <CommonDatePicker v-model="date" clearable placeholder="选择日期" />
</template>
```

## 显示底部操作栏

通过 `show-footer` 属性控制是否显示底部操作栏，默认为 `true`。

```vue
<template>
  <CommonDatePicker v-model="date" :show-footer="false" placeholder="选择日期" />
</template>
```

## 自定义占位符

可以自定义各种类型选择器的占位符文本。

```vue
<template>
  <CommonDatePicker
    v-model="dateRange"
    type="daterange"
    placeholder="请选择日期"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  />
</template>
```

## 禁用特定日期

通过 `disabled-date` 函数设置禁用的日期。

```vue
<template>
  <CommonDatePicker v-model="date" placeholder="选择日期" :disabled-date="disabledDate" />
</template>

<script setup>
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用今天之前的日期
}
</script>
```

## 尺寸

提供三种尺寸：大、默认、小。通过 `size` 属性设置。

```vue
<template>
  <CommonDatePicker v-model="date" size="large" placeholder="大尺寸" />
  <CommonDatePicker v-model="date" placeholder="默认尺寸" />
  <CommonDatePicker v-model="date" size="small" placeholder="小尺寸" />
</template>
```

## 属性

| 属性名            | 说明                       | 类型         | 可选值                                                                 | 默认值       |
| ----------------- | -------------------------- | ------------ | ---------------------------------------------------------------------- | ------------ |
| v-model           | 绑定值                     | string/array | -                                                                      | -            |
| type              | 选择器类型                 | string       | year/month/date/dates/datetime/week/datetimerange/daterange/monthrange | date         |
| placeholder       | 占位符                     | string       | -                                                                      | '请选择日期' |
| start-placeholder | 范围选择时开始日期的占位符 | string       | -                                                                      | '开始日期'   |
| end-placeholder   | 范围选择时结束日期的占位符 | string       | -                                                                      | '结束日期'   |
| value-format      | 绑定值的格式               | string       | -                                                                      | 'YYYY-MM-DD' |
| clearable         | 是否可清空                 | boolean      | -                                                                      | true         |
| show-footer       | 是否显示底部操作栏         | boolean      | -                                                                      | true         |
| disabled          | 是否禁用                   | boolean      | -                                                                      | false        |
| size              | 尺寸                       | string       | large/default/small                                                    | default      |
| validate-event    | 是否触发表单验证           | boolean      | -                                                                      | true         |
| format            | 显示在输入框中的格式       | string       | -                                                                      | 'YYYY-MM-DD' |
| disabled-date     | 禁用日期的函数             | function     | -                                                                      | -            |
| disabled-time     | 禁用时间的函数             | function     | -                                                                      | -            |

## 事件

| 事件名          | 说明                    | 回调参数                      |
| --------------- | ----------------------- | ----------------------------- |
| change          | 值发生变化时触发        | (value: string/array) => void |
| blur            | 当 input 失去焦点时触发 | (event: Event) => void        |
| focus           | 当 input 获得焦点时触发 | (event: Event) => void        |
| calendar-change | 选中日历中日期时触发    | (date: Date[]) => void        |
| visible-change  | 下拉框出现/隐藏时触发   | (visible: boolean) => void    |

## 类型定义

```typescript
interface CommonDatePickerProps extends DatePickerProps {}
```
