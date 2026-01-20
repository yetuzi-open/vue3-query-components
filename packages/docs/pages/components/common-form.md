---
title: CommonForm
---

# CommonForm 表单组件

基于配置的动态表单生成器，支持多种表单元素类型，内置提交和重置功能。通过简单的配置即可快速生成复杂的表单界面，大大提升开发效率。

## 基础用法

基础的表单使用示例，包含常见的表单元素。通过 `form` 属性配置表单字段，每个字段支持多种验证规则和属性配置。

<demo vue="CommonForm/basic.vue" ssg="true"/>

## 表单验证

CommonForm 完全支持 Element Plus 的表单验证规则。可以在 `formItem` 中配置 `rules` 属性来实现各种验证需求，包括必填、长度、正则表达式等。

<demo vue="CommonForm/validation.vue" ssg="true"/>

## 布局方式

### 行内表单

设置 `inline` 属性可以让表单元素水平排列，适合简单的查询表单场景。当表单字段较多时，建议使用垂直布局以提升用户体验。

<demo vue="CommonForm/inline.vue" ssg="true"/>

### 标签位置

通过 `labelPosition` 可以调整标签的位置，支持 `left`、`right`、`top` 三种位置。

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## 自定义插槽

通过插槽可以完全自定义表单项的内容，实现更灵活的表单配置。插槽名对应表单项的 `prop` 属性。

<demo vue="CommonForm/slot.vue" ssg="true"/>

## 动态表单

支持根据条件动态显示或隐藏表单项，实现复杂的表单交互逻辑。通过 computed 监听表单数据变化，动态生成表单配置。

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## 自定义组件集成

通过插槽或 `is` 属性传递组件，可以轻松集成任何自定义组件。

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## API

### Props

CommonForm 组件基于 Element Plus Form 进行了二次封装，除了以下自定义属性外，还支持所有 Element Plus Form 的原生属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 表单配置数组，定义表单的字段和属性 | `CommonFormItemArray<T>` | `[]` |
| loading | 加载状态，支持 v-model 双向绑定 | `boolean` | `false` |
| inline | 是否为行内表单 | `boolean` | `true` |

> 💡 **提示**：除了上述自定义属性外，CommonForm 支持所有 Element Plus Form 的原生属性，如 `labelWidth`、`labelPosition`、`size`、`disabled` 等。详细属性请参考 [Element Plus Form 文档](https://element-plus.org/zh-CN/component/form.html)。

### Form 配置项

每个表单项支持以下配置：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| is | 组件类型，支持内置类型或自定义组件 | `string \| Component` |
| label | 表单项标签 | `string` |
| prop | 表单字段名 | `string \| keyof T` |
| props | 传递给组件的属性 | `object` |
| initialValue | 初始值 | `any` |
| formItem | ElFormItem 的配置属性 | `Partial<FormItemProps>` |

#### 内置组件类型

- `input` - 输入框
- `select` - 选择器
- `date-picker` - 日期选择器
- `radio` - 单选框
- `check-box` - 复选框
- `switch` - 开关

### Slots

CommonForm 支持为每个表单项提供自定义插槽，插槽名称对应表单项的 `prop` 属性。

#### 插槽参数

使用插槽时，会提供以下参数：

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| props | 表单项配置的 props | `object` |
| value | 当前表单字段的值 | `any` |
| updateValue | 更新表单字段值的函数 | `(value: any) => void` |

### Exposes

CommonForm 通过 ref 暴露了表单数据和所有 Element Plus Form 的方法，可以直接调用。

完整的方法列表请参考 [Element Plus Form 文档](https://cn.element-plus.org/zh-CN/component/form#form-exposes)。

<demo vue="CommonForm/expose.vue" ssg="true"/>

#### 暴露的类型

```typescript
interface CommonFormExpose<T = AnyObject> {
  // 表单数据对象
  formData: Reactive<CommonFormData<T>>
  // ElForm 的所有方法
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  validateField: (props: string | string[], callback?: FormValidateCallback) => void
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
  // ... 更多 ElForm 方法
}
```

## 常见问题

### Q: 如何处理复杂的表单布局？

A: 可以结合 `formItem` 的 `class` 属性和自定义样式来实现复杂布局。也可以使用插槽来自定义整个表单项的渲染。

### Q: 表单项宽度如何控制？

A: 表单项宽度通过 CommonConfigProvider 中的 `form.formItem.components.width` 配置项控制，默认为 200px。也可以通过 CSS 覆盖样式。

<!-- ### Q: 如何实现表单项的显示隐藏？

A: 可以使用 `v-if` 动态控制 form 数组中的项，或者在插槽中使用 `v-show`。 -->

### Q: 自定义组件如何实现双向绑定？

A: 自定义组件需要接收 `modelValue` prop 并触发 `update:modelValue` 事件，或者使用 `v-model` 的方式。

## TypeScript 类型

组件导出了以下 TypeScript 类型定义，可在你的项目中直接使用：

### CommonFormProps

```typescript
interface CommonFormProps<T extends AnyObject> {
  /** 表单项配置数组 */
  form?: CommonFormItemArray<T>
}
```

### CommonFormItemArray

```typescript
/**
 * 表单项类型数组
 * 用于 CommonForm 的 form 属性，也可用于类型标注
 */
type CommonFormItemArray<T extends AnyObject> = Array<
  | CommonFormSelectItem<T>      // 选择器
  | CommonFormInputItem<T>       // 输入框
  | CommonFormDatePickerItem<T>  // 日期选择器
  | CommonFormRadioItem<T>       // 单选框
  | CommonFormCustomItem<T>      // 自定义组件
  | CommonFormCheckboxItem<T>    // 复选框
  | CommonFormSwitchItem<T>      // 开关
>
```

### 表单项类型

```typescript
/** 选择器组件表单项 */
interface CommonFormSelectItem<T extends AnyObject>
  extends CommonFormItemBase<'select', CommonSelectProps, T> {}

/** 输入框组件表单项 */
interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormItemBase<'input', CommonInputProps, T> {}

/** 日期选择器组件表单项 */
interface CommonFormDatePickerItem<T extends AnyObject>
  extends CommonFormItemBase<'date-picker', CommonDatePickerProps, T> {}

/** 单选框组件表单项 */
interface CommonFormRadioItem<T extends AnyObject>
  extends CommonFormItemBase<'radio', CommonRadioProps, T> {}

/** 复选框组件表单项 */
interface CommonFormCheckboxItem<T extends AnyObject>
  extends CommonFormItemBase<'check-box', CommonCheckboxProps, T> {}

/** 开关组件表单项 */
interface CommonFormSwitchItem<T extends AnyObject>
  extends CommonFormItemBase<'switch', CommonSwitchProps, T> {}

/** 自定义组件表单项 */
interface CommonFormCustomItem<
  T extends AnyObject,
  C extends Component = Component,
  P = ComponentProps<C>,
> extends CommonFormItemBase<C, P, T> {}
```

### CommonFormItemBase

```typescript
/**
 * 表单项基础接口
 * @typeParam T - 组件类型
 * @typeParam P - 组件的 Props 类型
 * @typeParam D - 表单数据对象类型
 */
interface CommonFormItemBase<T, P, D extends AnyObject, V = any> {
  /** 组件类型标识 */
  is: T | (string & {})

  /** 表单项标签 */
  label?: string

  /** 表单字段名 */
  prop: keyof D | (string & {})

  /** 传递给组件的额外属性 */
  props?: Partial<P>

  /** 字段初始值 */
  initialValue?: V

  /** ElFormItem 的额外属性配置 */
  formItem?: Partial<Omit<FormItemProps, 'prop' | 'label'>>
}
```

### CommonFormExpose

```typescript
/**
 * CommonForm 组件实例暴露类型
 * 继承 Element Plus FormInstance 的所有方法
 */
interface CommonFormExpose<T extends AnyObject = AnyObject> extends FormInstance {
  /**
   * 表单数据响应式对象
   * 包含所有表单字段的当前值
   */
  formData: Reactive<CommonFormData<T>>
}
```

### CommonFormData

```typescript
/**
 * 表单数据类型
 */
type CommonFormData<T extends AnyObject> = T & Record<string, any>
```

**使用示例：**

```typescript
import type {
  CommonFormProps,
  CommonFormItemArray,
  CommonFormInputItem,
  CommonFormSelectItem,
} from '@yetuzi/vue3-query-components'

// 定义表单数据类型
interface MyFormData {
  name: string
  status: number
  createTime: string
}

// 定义表单配置
const form: CommonFormItemArray<MyFormData> = [
  {
    is: 'input',
    prop: 'name',
    label: '姓名',
    props: {
      placeholder: '请输入姓名',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: '状态',
    props: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
]

// 使用组件
const formProps: CommonFormProps<MyFormData> = {
  form
}
```