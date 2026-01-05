/**
 * 指定的字段变为必填，其他字段保持不变。
 * @example
 * type User = { id: number; name?: string; age?: number };
 * type UserWithRequiredName = RequiredSomeFields<User, 'name'>; // { id: number; name: string; age?: number }
 */
export type RequiredSomeFields<T extends object, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P]
}

/**
 * 指定的字段变为可选，其他字段保持不变。
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 提取指定属性的联合类型，自动过滤掉没有该属性的类型
 */
export type PickProperty<T, K extends PropertyKey> = T extends { [P in K]: infer U } ? U : never

/**
 * 将联合类型中某个字段的值当作key， 类型当作value
 */
export type UnionToRecord<T, K extends keyof any> = {
  [P in T extends any
    ? T extends Record<K, infer U extends PropertyKey>
      ? U
      : never
    : never]: Extract<T, Record<K, P>>
}

/**
 * 深度 Partial 类型
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
