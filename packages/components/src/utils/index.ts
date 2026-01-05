import type { AnyObject } from '../index'

/**
 * 返回所有参数中首位不为 null undefined ''的 值
 * @param args
 * @returns
 */
export function getFirstValidValue<T>(...args: T[]): T | undefined {
  return args.find((arg) => arg !== null && arg !== undefined && arg !== '')
}

/**
 * 过滤对象中的 null 和 undefined 值
 * @param obj 要过滤的对象
 * @returns 新对象，不包含 null 或 undefined 值的属性
 */
export function filterNullAndUndefined<T extends AnyObject>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    ),
  ) as T
}
