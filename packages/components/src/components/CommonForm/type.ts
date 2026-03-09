import type { FormInstance, FormItemProps, FormProps } from 'element-plus'
import type { Component, Reactive } from 'vue'
import type { ExtractPropTypes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type {
  CommonCascaderProps,
  CommonCheckboxProps,
  CommonDatePickerProps,
  CommonInputNumberProps,
  CommonInputProps,
  CommonRadioProps,
  CommonSelectProps,
  CommonSwitchProps,
  CommonTimePickerProps,
} from '../index'
import type { AnyObject } from '../../index'

/**
 * CommonForm 组件 Props
 *
 * @typeParam T - 表单数据对象类型
 */
export interface CommonFormProps<T extends AnyObject> extends ExtractPropTypes<FormProps> {
  /** 表单项配置数组 */
  form?: CommonFormItemArray<T>
}

/**
 * 表单项数组类型
 * 用于 CommonForm 的 `form` 属性，也可用于独立类型标注
 *
 * @typeParam T - 表单数据对象类型
 */
export type CommonFormItemArray<T extends AnyObject> = Array<
  | CommonFormSelectItem<T>
  | CommonFormInputItem<T>
  | CommonFormInputNumberItem<T>
  | CommonFormDatePickerItem<T>
  | CommonFormTimePickerItem<T>
  | CommonFormCascaderItem<T>
  | CommonFormRadioItem<T>
  | CommonFormCustomItem<T>
  | CommonFormCheckboxItem<T>
  | CommonFormSwitchItem<T>
>

/**
 * 表单数据类型
 * 既支持通过已知字段访问，也允许额外的动态字段
 *
 * @typeParam T - 表单数据对象类型
 */
export type CommonFormData<T extends AnyObject> = T & Record<string, any>

/**
 * 表单项基础接口
 * 定义所有表单项共享的公共属性
 *
 * @typeParam T - 组件类型，可以是内置字符串标识或自定义组件
 * @typeParam P - 组件 Props 类型
 * @typeParam D - 表单数据对象类型
 * @typeParam V - 初始值类型
 */
interface CommonFormItemBase<T, P, D extends AnyObject, V = any> {
  /**
   * 组件类型标识
   * - 内置组件：`input`、`input-number`、`select`、`date-picker`、`time-picker`、`cascader`、`radio`、`check-box`、`switch`
   * - 自定义组件：直接传入组件对象
   */
  is: T | (string & {})
  /** 表单项标签 */
  label?: string
  /** 表单字段名 */
  prop: keyof D | (string & {})
  /** 传递给组件的额外属性 */
  props?: Partial<P>
  /** 字段初始值 */
  initialValue?: V
  /** ElFormItem 的额外配置，不包含 `prop` 和 `label` */
  formItem?: Partial<Omit<FormItemProps, 'prop' | 'label'>>
}

/** 选择器表单项 */
export interface CommonFormSelectItem<T extends AnyObject>
  extends CommonFormItemBase<'select', CommonSelectProps, T> {}

/** 输入框表单项 */
export interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormItemBase<'input', CommonInputProps, T> {}

/** 数字输入框表单项 */
export interface CommonFormInputNumberItem<T extends AnyObject>
  extends CommonFormItemBase<'input-number', CommonInputNumberProps, T> {}

/** 日期选择器表单项 */
export interface CommonFormDatePickerItem<T extends AnyObject>
  extends CommonFormItemBase<'date-picker', CommonDatePickerProps, T> {}

/** 时间选择器表单项 */
export interface CommonFormTimePickerItem<T extends AnyObject>
  extends CommonFormItemBase<'time-picker', CommonTimePickerProps, T> {}

/** 级联选择器表单项 */
export interface CommonFormCascaderItem<T extends AnyObject>
  extends CommonFormItemBase<'cascader', CommonCascaderProps, T> {}

/** 单选框表单项 */
export interface CommonFormRadioItem<T extends AnyObject>
  extends CommonFormItemBase<'radio', CommonRadioProps, T> {}

/** 多选框表单项 */
export interface CommonFormCheckboxItem<T extends AnyObject>
  extends CommonFormItemBase<'check-box', CommonCheckboxProps, T> {}

/** 开关表单项 */
export interface CommonFormSwitchItem<T extends AnyObject>
  extends CommonFormItemBase<'switch', CommonSwitchProps, T> {}

/**
 * 自定义组件表单项
 * 允许任意 Vue 组件作为表单项渲染
 */
export interface CommonFormCustomItem<
  T extends AnyObject,
  C extends Component = Component,
  P = ComponentProps<C>,
> extends CommonFormItemBase<C, P, T> {}

/**
 * CommonForm 暴露实例类型
 * 继承 Element Plus `FormInstance`，并附带 `formData`
 *
 * @typeParam T - 表单数据对象类型
 */
export interface CommonFormExpose<T extends AnyObject = AnyObject> extends FormInstance {
  /** 当前表单响应式数据对象 */
  formData: Reactive<CommonFormData<T>>
}