import type { AnyObject } from '../index'

/**
 * 获取第一个有效值
 *
 * 按优先级返回第一个不为 null、undefined 或空字符串的值
 *
 * @typeParam T - 值的类型
 * @param args - 要检查的值列表
 * @returns 第一个有效值，如果没有则返回 undefined
 *
 * @example
 * ```ts
 * // 基本使用
 * getFirstValidValue(undefined, null, '', 'hello', 'world') // 'hello'
 *
 * // 返回 0（0 是有效值）
 * getFirstValidValue('', 0, false) // 0
 *
 * // 返回 false（false 是有效值）
 * getFirstValidValue(null, undefined, false) // false
 *
 * // 全部无效值返回 undefined
 * getFirstValidValue(null, undefined, '') // undefined
 * ```
 */
export function getFirstValidValue<T>(...args: T[]): T | undefined {
  return args.find((arg) => arg !== null && arg !== undefined && arg !== '')
}

/**
 * 过滤对象中的空值
 *
 * 移除对象中值为 null、undefined 或空字符串的属性，返回新对象
 *
 * @typeParam T - 对象类型
 * @param obj - 要过滤的对象
 * @returns 新对象，不包含 null、undefined 或空字符串的属性
 *
 * @example
 * ```ts
 * // 基本使用
 * filterNullAndUndefined({
 *   name: '张三',
 *   age: null,
 *   email: '',
 *   address: undefined
 * })
 * // { name: '张三' }
 *
 * // 保留 0 和 false
 * filterNullAndUndefined({
 *   count: 0,
 *   active: false,
 *   name: ''
 * })
 * // { count: 0, active: false }
 *
 * // 用于清理表单数据
 * const formData = {
 *   keyword: '搜索',
 *   page: 1,
 *   filter: '',  // 空字符串
 *   extra: null
 * }
 * filterNullAndUndefined(formData)
 * // { keyword: '搜索', page: 1 }
 * ```
 */
export function filterNullAndUndefined<T extends AnyObject>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    ),
  ) as T
}
