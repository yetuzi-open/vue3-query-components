import type { FormProps, FormItemProps, FormInstance } from 'element-plus'
import type { Reactive } from 'vue'
import type { ExtractPropTypes } from 'vue'
import type {
  CommonSelectProps,
  CommonInputProps,
  CommonDatePickerProps,
  CommonRadioProps,
  CommonCheckboxProps,
  CommonSwitchProps,
} from '../index'
import type { AnyObject } from '../../index'
import type { Component } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

/**
 * CommonForm 组件 Props
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```vue
 * <template>
 *   <CommonForm :form="formConfig" v-model="formData" />
 * </template>
 * ```
 */
export interface CommonFormProps<T extends AnyObject> extends ExtractPropTypes<FormProps> {
  /** 表单项配置数组 */
  form?: CommonFormItemArray<T>
}

/**
 * 表单项类型数组
 * 用于 CommonForm 的 form 属性，也可用于类型标注
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * import type { CommonFormItemArray } from '@yetuzi/vue3-query-components'
 *
 * const form: CommonFormItemArray<MyDataType> = [
 *   { is: 'input', prop: 'name', label: '用户名' },
 *   { is: 'select', prop: 'status', label: '状态' }
 * ]
 * ```
 */
export type CommonFormItemArray<T extends AnyObject> = Array<
  | CommonFormSelectItem<T>
  | CommonFormInputItem<T>
  | CommonFormDatePickerItem<T>
  | CommonFormRadioItem<T>
  | CommonFormCustomItem<T>
  | CommonFormCheckboxItem<T>
  | CommonFormSwitchItem<T>
>

/**
 * 表单数据类型
 * 支持通过 prop 访问表单字段值，并允许额外的字符串索引
 *
 * @typeParam T - 表单数据对象类型
 */
export type CommonFormData<T extends AnyObject> = T & Record<string, any>

/**
 * 表单项基础接口
 * 所有表单项类型的公共属性定义
 *
 * @typeParam T - 组件类型，可以是内置组件类型字符串或自定义组件
 * @typeParam P - 组件的 Props 类型
 * @typeParam D - 表单数据对象类型
 * @typeParam V - 初始值的类型，默认为 any
 *
 * @example 内置组件
 * ```ts
 * const inputItem: CommonFormInputItem<UserData> = {
 *   is: 'input',
 *   prop: 'name',
 *   label: '姓名'
 * }
 * ```
 *
 * @example 自定义组件
 * ```ts
 * import MyComponent from './MyComponent.vue'
 *
 * const customItem: CommonFormCustomItem<UserData> = {
 *   is: MyComponent,
 *   prop: 'custom',
 *   label: '自定义字段'
 * }
 * ```
 */
interface CommonFormItemBase<T, P, D extends AnyObject, V = any> {
  /**
   * 组件类型标识
   * - 内置组件：'input' | 'select' | 'date-picker' | 'radio' | 'check-box' | 'switch'
   * - 自定义组件：直接传入组件对象
   */
  is: T | (string & {})
  /** 表单项标签 */
  label?: string
  /** 表单字段名，支持表单数据类型的 key 或任意字符串 */
  prop: keyof D | (string & {})
  /** 传递给组件的额外属性 */
  props?: Partial<P>
  /** 字段初始值 */
  initialValue?: V
  /** ElFormItem 的额外属性配置（不包含 prop 和 label） */
  formItem?: Partial<Omit<FormItemProps, 'prop' | 'label'>>
}

/**
 * 选择器组件表单项
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * const selectItem: CommonFormSelectItem<UserData> = {
 *   is: 'select',
 *   prop: 'city',
 *   label: '城市',
 *   props: {
 *     options: [
 *       { label: '北京', value: 'beijing' },
 *       { label: '上海', value: 'shanghai' }
 *     ]
 *   }
 * }
 * ```
 */
export interface CommonFormSelectItem<T extends AnyObject>
  extends CommonFormItemBase<'select', CommonSelectProps, T> {}

/**
 * 输入框组件表单项
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * const inputItem: CommonFormInputItem<UserData> = {
 *   is: 'input',
 *   prop: 'name',
 *   label: '姓名',
 *   props: {
 *     placeholder: '请输入姓名',
 *     clearable: true
 *   }
 * }
 * ```
 */
export interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormItemBase<'input', CommonInputProps, T> {}

/**
 * 日期选择器组件表单项
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * const dateItem: CommonFormDatePickerItem<UserData> = {
 *   is: 'date-picker',
 *   prop: 'birthday',
 *   label: '生日',
 *   props: {
 *     type: 'date',
 *     placeholder: '请选择日期'
 *   }
 * }
 * ```
 */
export interface CommonFormDatePickerItem<T extends AnyObject>
  extends CommonFormItemBase<'date-picker', CommonDatePickerProps, T> {}

/**
 * 单选框组件表单项
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * const radioItem: CommonFormRadioItem<UserData> = {
 *   is: 'radio',
 *   prop: 'gender',
 *   label: '性别',
 *   props: {
 *     options: [
 *       { label: '男', value: 'male' },
 *       { label: '女', value: 'female' }
 *     ]
 *   }
 * }
 * ```
 */
export interface CommonFormRadioItem<T extends AnyObject>
  extends CommonFormItemBase<'radio', CommonRadioProps, T> {}

/**
 * 多选框组件表单项
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * const checkboxItem: CommonFormCheckboxItem<UserData> = {
 *   is: 'check-box',
 *   prop: 'hobbies',
 *   label: '爱好',
 *   props: {
 *     options: [
 *       { label: '阅读', value: 'reading' },
 *       { label: '运动', value: 'sports' }
 *     ]
 *   }
 * }
 * ```
 */
export interface CommonFormCheckboxItem<T extends AnyObject>
  extends CommonFormItemBase<'check-box', CommonCheckboxProps, T> {}

/**
 * 开关组件表单项
 *
 * @typeParam T - 表单数据对象类型
 *
 * @example
 * ```ts
 * const switchItem: CommonFormSwitchItem<UserData> = {
 *   is: 'switch',
 *   prop: 'enabled',
 *   label: '是否启用',
 *   initialValue: true
 * }
 * ```
 */
export interface CommonFormSwitchItem<T extends AnyObject>
  extends CommonFormItemBase<'switch', CommonSwitchProps, T> {}

/**
 * 自定义组件表单项
 * 允许使用任意 Vue 组件作为表单项
 *
 * @typeParam T - 表单数据对象类型
 * @typeParam C - 自定义组件类型，默认为 Component
 * @typeParam P - 组件 Props 类型，默认从组件推导
 *
 * @example
 * ```ts
 * import MyCustomComponent from './MyCustomComponent.vue'
 *
 * const customItem: CommonFormCustomItem<UserData> = {
 *   is: MyCustomComponent,
 *   prop: 'custom',
 *   label: '自定义字段',
 *   props: {
 *     // 传递给自定义组件的属性
 *     customProp: 'value'
 *   }
 * }
 * ```
 */
export interface CommonFormCustomItem<
  T extends AnyObject,
  C extends Component = Component,
  P = ComponentProps<C>,
> extends CommonFormItemBase<C, P, T> {}

/**
 * CommonForm 组件实例暴露类型
 * 继承 Element Plus FormInstance 的所有方法，并提供表单数据访问
 *
 * @typeParam T - 表单数据对象类型，默认为 AnyObject
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 *
 * const formRef = ref<CommonFormExpose<UserData>>()
 *
 * const handleSubmit = async () => {
 *   // 调用 FormInstance 方法
 *   await formRef.value?.validate()
 *
 *   // 访问表单数据
 *   console.log(formRef.value?.formData)
 * }
 * </script>
 * ```
 */
export interface CommonFormExpose<T extends AnyObject = AnyObject> extends FormInstance {
  /**
   * 表单数据响应式对象
   * 包含所有表单字段的当前值
   */
  formData: Reactive<CommonFormData<T>>
}
