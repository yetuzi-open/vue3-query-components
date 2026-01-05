# CommonCheckbox 复选框

常用的复选框组件，基于 Element Plus Checkbox 封装，支持多选、禁用状态、全选等功能。

## 基础用法

```vue
<template>
  <CommonCheckbox v-model="checked" label="选项" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
```

## 复选框组

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1', 'option3'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
])
</script>
```

## 禁用状态

```vue
<template>
  <CommonCheckbox v-model="checked1" label="选项1" disabled />
  <CommonCheckbox v-model="checked2" label="选项2" :disabled="true" />
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
</script>
```

## 复选框组禁用

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" disabled />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
])
</script>
```

## 单个选项禁用

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2', disabled: true },
  { label: '复选框 C', value: 'option3' },
])
</script>
```

## 全选功能

```vue
<template>
  <div>
    <CommonCheckbox
      v-model="checkAll"
      label="全选"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    />
    <CommonCheckbox v-model="checkedList" :options="options" @change="handleCheckedChange" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const checkAll = ref(false)
const checkedList = ref([])
const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
  { label: '复选框 D', value: 'option4' },
])

const isIndeterminate = computed(() => {
  const checkedCount = checkedList.value.length
  return checkedCount > 0 && checkedCount < options.value.length
})

const handleCheckAllChange = (val) => {
  checkedList.value = val ? options.value.map((item) => item.value) : []
}

const handleCheckedChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === options.value.length
}
</script>
```

## 按钮样式

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" button />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1', 'option3'])

const options = ref([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
])
</script>
```

## 带边框

```vue
<template>
  <CommonCheckbox v-model="checked1" label="选项1" border />
  <CommonCheckbox v-model="checked2" label="选项2" border />
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
</script>
```

## 复选框组边框样式

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" border />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1', 'option3'])

const options = ref([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
])
</script>
```

## 尺寸大小

```vue
<template>
  <div>
    <CommonCheckbox v-model="checked1" label="大尺寸" size="large" />
    <CommonCheckbox v-model="checked2" label="默认尺寸" />
    <CommonCheckbox v-model="checked3" label="小尺寸" size="small" />
  </div>

  <div>
    <CommonCheckbox v-model="checkedList" :options="options" size="large" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(true)
const checkedList = ref(['option1'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
])
</script>
```

## 自定义颜色

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" fill="#67C23A" text-color="#fff" />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1', 'option3'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
])
</script>
```

## 最小/最大选择数量

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" :min="1" :max="2" />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
  { label: '复选框 D', value: 'option4' },
])
</script>
```

## 垂直布局

```vue
<template>
  <CommonCheckbox v-model="checkedList" :options="options" vertical />
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['option1', 'option3'])

const options = ref([
  { label: '复选框 A', value: 'option1' },
  { label: '复选框 B', value: 'option2' },
  { label: '复选框 C', value: 'option3' },
])
</script>
```

## 自定义内容

```vue
<template>
  <CommonCheckbox v-model="checked">
    <span>自定义内容</span>
    <span style="color: #409EFF; margin-left: 5px">(提示信息)</span>
  </CommonCheckbox>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
```

## 完整功能示例

```vue
<template>
  <div>
    <h4>基础复选框</h4>
    <CommonCheckbox v-model="checked1" label="同意用户协议" size="large" border />

    <h4>复选框组</h4>
    <CommonCheckbox
      v-model="checkedList"
      :options="options"
      button
      fill="#409EFF"
      text-color="#fff"
      :min="1"
      :max="3"
    />

    <h4>全选功能</h4>
    <CommonCheckbox
      v-model="checkAll"
      label="全选"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    />
    <CommonCheckbox
      v-model="checkedItems"
      :options="itemOptions"
      vertical
      @change="handleCheckedChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const checked1 = ref(true)
const checkedList = ref(['option1', 'option3'])
const checkAll = ref(false)
const checkedItems = ref([])

const options = ref([
  { label: '北京', value: 'option1' },
  { label: '上海', value: 'option2' },
  { label: '广州', value: 'option3' },
  { label: '深圳', value: 'option4' },
])

const itemOptions = ref([
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b' },
  { label: '选项 C', value: 'c' },
  { label: '选项 D', value: 'd' },
])

const isIndeterminate = computed(() => {
  const checkedCount = checkedItems.value.length
  return checkedCount > 0 && checkedCount < itemOptions.value.length
})

const handleCheckAllChange = (val) => {
  checkedItems.value = val ? itemOptions.value.map((item) => item.value) : []
}

const handleCheckedChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === itemOptions.value.length
}
</script>
```

## 属性

| 属性名                | 说明                                    | 类型                              | 可选值                  | 默认值  |
| --------------------- | --------------------------------------- | --------------------------------- | ----------------------- | ------- |
| model-value / v-model | 绑定值                                  | string / number / boolean / array | -                       | -       |
| label                 | 复选框的文本内容                        | string / number / boolean         | -                       | -       |
| disabled              | 是否禁用                                | boolean                           | -                       | false   |
| border                | 是否显示边框                            | boolean                           | -                       | false   |
| size                  | 尺寸                                    | string                            | large / default / small | -       |
| name                  | 原生 name 属性                          | string                            | -                       | -       |
| checked               | 当前是否勾选                            | boolean                           | -                       | false   |
| indeterminate         | 设置 indeterminate 状态，只负责样式控制 | boolean                           | -                       | false   |
| options               | 复选框组选项                            | array                             | -                       | -       |
| button                | 是否使用按钮样式                        | boolean                           | -                       | false   |
| fill                  | 按钮样式时的填充色和边框色              | string                            | -                       | #409EFF |
| text-color            | 按钮样式时的文本颜色                    | string                            | -                       | #ffffff |
| min                   | 可被勾选的 checkbox 的最小数量          | number                            | -                       | -       |
| max                   | 可被勾选的 checkbox 的最大数量          | number                            | -                       | -       |
| vertical              | 是否垂直布局                            | boolean                           | -                       | false   |

## 事件

| 事件名 | 说明                     | 回调参数                                           |
| ------ | ------------------------ | -------------------------------------------------- |
| change | 当绑定值变化时触发的事件 | (value: string / number / boolean / array) => void |

## 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

## 类型定义

```typescript
interface CommonCheckboxProps {
  modelValue?: string | number | boolean | any[]
  label?: string | number | boolean
  disabled?: boolean
  border?: boolean
  size?: ComponentSize
  name?: string
  checked?: boolean
  indeterminate?: boolean
  options?: OptionItem[]
  button?: boolean
  fill?: string
  textColor?: string
  min?: number
  max?: number
  vertical?: boolean
}

interface OptionItem {
  label: string
  value: string | number | boolean
  disabled?: boolean
}
```
