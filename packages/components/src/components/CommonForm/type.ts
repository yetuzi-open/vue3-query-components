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
 * form 组件props
 */
export interface CommonFormProps<T extends AnyObject> extends ExtractPropTypes<FormProps> {
  form?: CommonFormItemArray<T>
}

/**
 * 表单项类型数组
 * 用于 CommonForm 的 form 属性，也可用于类型标注
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
 * 表单数据类型，支持通过prop访问
 */
export type CommonFormData<T extends AnyObject> = T & {
  [key: string]: any
}


interface CommonFormItemBase<T, P, D extends AnyObject, V = any> {
  is: T | (string & {})
  label?: string
  prop: keyof D | (string & {})
  props?: Partial<P>
  initialValue?: V
  formItem?: Partial<Omit<FormItemProps, 'prop' | 'label'>>
}

/**
 * 选择器组件
 */
export interface CommonFormSelectItem<T extends AnyObject>
  extends CommonFormItemBase<'select', CommonSelectProps, T> {}

/**
 * 输入框组件
 */
export interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormItemBase<'input', CommonInputProps, T> {}

/**
 * 日期选择器
 */
export interface CommonFormDatePickerItem<T extends AnyObject>
  extends CommonFormItemBase<'date-picker', CommonDatePickerProps, T> {}

/**
 * 单选框
 */
export interface CommonFormRadioItem<T extends AnyObject>
  extends CommonFormItemBase<'radio', CommonRadioProps, T> {}

/**
 * 多选框
 */
export interface CommonFormCheckboxItem<T extends AnyObject>
  extends CommonFormItemBase<'check-box', CommonCheckboxProps, T> {}

/**
 * 开关
 */
export interface CommonFormSwitchItem<T extends AnyObject>
  extends CommonFormItemBase<'switch', CommonSwitchProps, T> {}

/**
 * 自定义组件
 */
export interface CommonFormCustomItem<
  T extends AnyObject,
  C extends Component = Component,
  P = ComponentProps<C>,
> extends CommonFormItemBase<C, P, T> {}

/**
 * CommonForm 组件实例暴露类型
 * 继承 FormInstance 的所有方法，可直接调用 validate()、resetFields() 等
 * 并且 导出 formData 数据
 */
export interface CommonFormExpose<T extends AnyObject = AnyObject> extends FormInstance {
  /** 表单数据对象 */
  formData: Reactive<CommonFormData<T>>
}
