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
  form?: CommonFormPropForm<T>
}

/**
 * 表单项类型数组
 * 用于 CommonForm 的 form 属性，也可用于类型标注
 *
 * @example
 * ```ts
 * import type { CommonFormPropForm } from '@yetuzi/vue3-query-components'
 *
 * const form: CommonFormPropForm<MyDataType> = [
 *   { is: 'input', prop: 'name', label: '用户名' },
 *   { is: 'select', prop: 'status', label: '状态' }
 * ]
 * ```
 */
export type CommonFormPropForm<T extends AnyObject> = Array<
  | CommonFormSelectItem<T>
  | CommonFormInputItem<T>
  | CommonFormDatePickerItem<T>
  | CommonFormRadioItem<T>
  | CommonFormCustomComponentsItem<T>
  | CommonFormCheckboxItem<T>
  | CommonFormSwitchItem<T>
>

/**
 * 表单数据类型，支持通过prop访问
 */
export type CommonFormData<T extends AnyObject> = T & {
  [key: string]: any
}

/**
 * 表单项类型守卫辅助函数
 * 用于检查表单项的 is 属性是否为指定类型
 *
 * @param item - 表单项对象
 * @param type - 要检查的类型字符串
 * @returns 是否为指定类型
 *
 * @example
 * ```ts
 * if (isFormItemType(item, 'select')) {
 *   // item 在这里被推断为 CommonFormSelectItem
 * }
 * ```
 */
export function isFormItemType<T extends AnyObject>(
  item: CommonFormPropForm<T>[number],
  type: string,
): item is CommonFormPropForm<T>[number] & { is: string } {
  return item.is === type
}

interface CommonFormSupplement<T, P, D extends AnyObject, V = any> {
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
  extends CommonFormSupplement<'select', CommonSelectProps, T> {}

/**
 * 输入框组件
 */
export interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormSupplement<'input', CommonInputProps, T> {}

/**
 * 日期选择器
 */
export interface CommonFormDatePickerItem<T extends AnyObject>
  extends CommonFormSupplement<'date-picker', CommonDatePickerProps, T> {}

/**
 * 单选框
 */
export interface CommonFormRadioItem<T extends AnyObject>
  extends CommonFormSupplement<'radio', CommonRadioProps, T> {}

/**
 * 多选框
 */
export interface CommonFormCheckboxItem<T extends AnyObject>
  extends CommonFormSupplement<'check-box', CommonCheckboxProps, T> {}

/**
 * 开关
 */
export interface CommonFormSwitchItem<T extends AnyObject>
  extends CommonFormSupplement<'switch', CommonSwitchProps, T> {}

/**
 * 自定义组件
 */
export interface CommonFormCustomComponentsItem<
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
