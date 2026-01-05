import type { FormProps, FormItemProps, FormInstance, FormValidateCallback } from 'element-plus'
import type { Ref, Reactive } from 'vue'
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
 * form 组件props
 */
export interface CommonFormProps<T extends AnyObject> extends ExtractPropTypes<FormProps> {
  form?: CommonFormPropForm<T>
}

export type CommonFormPropForm<T extends AnyObject> = Array<
  | CommonFormSelectItem<T>
  | CommonFormInputItem<T>
  | CommonDatePickerItem<T>
  | CommonRadioItem<T>
  | CommonCustomComponentsItem<T>
  | CommonCheckboxItem<T>
  | CommonSwitchItem<T>
>

/**
 * 表单数据类型，支持通过prop访问
 */
export type CommonFormData<T extends AnyObject> = T & {
  [key: string]: any
}

interface CommonFormSupplement<T, P, D extends AnyObject, V = any> {
  is: T
  label?: string
  prop: keyof D | (string & {})
  props?: Partial<P>
  initialValue?: V
  formItem?: Partial<Omit<FormItemProps, 'prop' | 'label'>>
}

/**
 * 选择器组件
 */
interface CommonFormSelectItem<T extends AnyObject>
  extends CommonFormSupplement<'select', CommonSelectProps, T> {}

/**
 * 输入框组件
 */
interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormSupplement<'input', CommonInputProps, T> {}

/**
 * 日期选择器
 */
interface CommonDatePickerItem<T extends AnyObject>
  extends CommonFormSupplement<'date-picker', CommonDatePickerProps, T> {}

/**
 * 单选框
 */
interface CommonRadioItem<T extends AnyObject>
  extends CommonFormSupplement<'radio', CommonRadioProps, T> {}

/**
 * 多选框
 */
interface CommonCheckboxItem<T extends AnyObject>
  extends CommonFormSupplement<'check-box', CommonCheckboxProps, T> {}

/**
 * 开关
 */
interface CommonSwitchItem<T extends AnyObject>
  extends CommonFormSupplement<'switch', CommonSwitchProps, T> {}

/**
 * 自定义组件
 */
interface CommonCustomComponentsItem<
  T extends AnyObject,
  C extends Component = Component,
  P = ComponentProps<C>,
> extends CommonFormSupplement<C, P, T> {}

/**
 * CommonForm 组件实例暴露类型
 * 继承 FormInstance 的所有方法，可直接调用 validate()、resetFields() 等
 * 并且 导出 formData 数据
 */
export interface CommonFormExpose<T extends AnyObject = AnyObject> extends FormInstance {
  /** 表单数据对象 */
  formData: Reactive<CommonFormData<T>>
}
