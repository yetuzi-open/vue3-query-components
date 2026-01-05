# CommonSelect 选择器

常用的选择器组件，基于 Element Plus Select 封装。

## 基础用法

```vue
<template>
  <CommonSelect v-model="value" :options="options" placeholder="请选择" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
])
</script>
```

## 可清空

添加 `clearable` 属性即可创建一个可清空的选择器。

```vue
<template>
  <CommonSelect v-model="value" :options="options" clearable placeholder="请选择" />
</template>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态。

```vue
<template>
  <CommonSelect v-model="value" :options="options" disabled placeholder="请选择" />
</template>
```

## 多选

设置 `multiple` 属性即可启用多选。

```vue
<template>
  <CommonSelect v-model="value" :options="options" multiple placeholder="请选择" />
</template>

<script setup>
const value = ref([]) // 多选时v-model为数组
</script>
```

## 自定义模板

可以通过插槽自定义选项的模板。

```vue
<template>
  <CommonSelect v-model="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </el-option>
  </CommonSelect>
</template>
```

## 分组选择

使用 `el-option-group` 对选项进行分组。

```vue
<template>
  <CommonSelect v-model="value" placeholder="请选择">
    <el-option-group v-for="group in optionGroups" :key="group.label" :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </CommonSelect>
</template>

<script setup>
const optionGroups = ref([
  {
    label: '热门城市',
    options: [
      { label: '上海', value: 'shanghai' },
      { label: '北京', value: 'beijing' },
    ],
  },
  {
    label: '城市名',
    options: [
      { label: '成都', value: 'chengdu' },
      { label: '深圳', value: 'shenzhen' },
    ],
  },
])
</script>
```

## 可搜索

设置 `filterable` 属性即可启用搜索功能。

```vue
<template>
  <CommonSelect v-model="value" :options="options" filterable placeholder="请输入关键词搜索" />
</template>
```

## 远程搜索

通过 `remote` 和 `remote-method` 实现远程搜索。

```vue
<template>
  <CommonSelect
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in remoteOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </CommonSelect>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const loading = ref(false)
const remoteOptions = ref([])

const remoteMethod = (query) => {
  if (query !== '') {
    loading.value = true
    // 模拟远程搜索
    setTimeout(() => {
      loading.value = false
      remoteOptions.value = [
        { label: `${query}结果1`, value: `${query}1` },
        { label: `${query}结果2`, value: `${query}2` },
      ]
    }, 200)
  } else {
    remoteOptions.value = []
  }
}
</script>
```

## 尺寸

提供三种尺寸：大、默认、小。通过 `size` 属性设置。

```vue
<template>
  <CommonSelect v-model="value1" :options="options" size="large" placeholder="大尺寸" />
  <CommonSelect v-model="value2" :options="options" placeholder="默认尺寸" />
  <CommonSelect v-model="value3" :options="options" size="small" placeholder="小尺寸" />
</template>
```

## 属性

| 属性名         | 说明                   | 类型                | 可选值              | 默认值  |
| -------------- | ---------------------- | ------------------- | ------------------- | ------- |
| v-model        | 绑定值                 | string/number/array | -                   | -       |
| options        | 选项数组               | array               | -                   | []      |
| clearable      | 是否可清空             | boolean             | -                   | true    |
| placeholder    | 占位符                 | string              | -                   | -       |
| disabled       | 是否禁用               | boolean             | -                   | false   |
| multiple       | 是否多选               | boolean             | -                   | false   |
| filterable     | 是否可搜索             | boolean             | -                   | false   |
| remote         | 是否为远程搜索         | boolean             | -                   | false   |
| remote-method  | 远程搜索方法           | function            | -                   | -       |
| size           | 尺寸                   | string              | large/default/small | default |
| loading        | 是否正在从远程获取数据 | boolean             | -                   | false   |
| allow-create   | 是否允许用户创建新条目 | boolean             | -                   | false   |
| validate-event | 是否触发表单验证       | boolean             | -                   | true    |

## 事件

| 事件名         | 说明                                     | 回调参数                             |
| -------------- | ---------------------------------------- | ------------------------------------ |
| change         | 选中值发生变化时触发                     | (value: string/number/array) => void |
| visible-change | 下拉框出现/隐藏时触发                    | (visible: boolean) => void           |
| remove-tag     | 多选模式下移除tag时触发                  | (removedTag: string/number) => void  |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | () => void                           |
| blur           | 当 input 失去焦点时触发                  | (event: Event) => void               |
| focus          | 当 input 获得焦点时触发                  | (event: Event) => void               |

## 插槽

| 插槽名  | 说明                        |
| ------- | --------------------------- |
| default | 选项列表，同 el-option 组件 |
| empty   | 无选项时的空状态内容        |

## 类型定义

```typescript
interface CommonSelectProps extends Partial<SelectProps> {}

interface OptionItem {
  label: string
  value: string | number
  disabled?: boolean
}
```
