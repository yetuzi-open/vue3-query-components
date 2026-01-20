import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'

/**
 * 创建一个可重置的 ref 响应式值
 *
 * 提供一个可以重置到初始值的响应式引用，常用于表单字段或临时状态管理
 *
 * @typeParam T - 值的类型
 * @param value - 初始值
 * @param clone - 克隆函数，默认使用 lodash 的 cloneDeep
 * @returns 包含 state（响应式引用）和 reset（重置函数）的元组
 *
 * @example
 * ```ts
 * // 基本使用
 * const [count, resetCount] = useResettableRef(0)
 * count.value++ // 1
 * count.value++ // 2
 * resetCount() // 重置为 0
 *
 * // 对象使用
 * const [form, resetForm] = useResettableRef({
 *   name: '',
 *   age: 0
 * })
 * form.value.name = '张三'
 * form.value.age = 25
 * resetForm() // 重置为 { name: '', age: 0 }
 *
 * // 自定义克隆函数
 * const [state, reset] = useResettableRef(
 *   { data: [] },
 *   (val) => JSON.parse(JSON.stringify(val))
 * )
 * ```
 */
export function useResettableRef<T>(value: T, clone = cloneDeep) {
  const initialValue = clone(value)
  const state = ref(value)
  const reset = () => {
    state.value = clone(initialValue)
  }
  return <const>[state, reset]
}

/**
 * 创建一个可重置的 reactive 响应式对象
 *
 * 提供一个可以重置到初始值的响应式对象，适用于管理多个相关状态
 *
 * @typeParam T - 对象类型
 * @param value - 初始对象
 * @param clone - 克隆函数，默认使用 lodash 的 cloneDeep
 * @returns 包含 state（响应式对象）和 reset（重置函数）的元组
 *
 * @example
 * ```ts
 * // 基本使用
 * const [state, reset] = useResettableReactive({
 *   count: 0,
 *   name: 'test'
 * })
 * state.count++ // 1
 * state.name = 'updated'
 * reset() // 重置为 { count: 0, name: 'test' }
 *
 * // 分页状态管理
 * const [pagination, resetPagination] = useResettableReactive({
 *   pageNo: 1,
 *   pageSize: 10
 * })
 * pagination.pageNo = 2
 * pagination.pageSize = 20
 * resetPagination() // 重置为 { pageNo: 1, pageSize: 10 }
 *
 * // 嵌套对象
 * const [form, resetForm] = useResettableReactive({
 *   user: { name: '', age: 0 },
 *   settings: { theme: 'light' }
 * })
 * form.user.name = '张三'
 * resetForm() // 完全重置
 *
 * // 动态添加的属性也会被清除
 * const [data, resetData] = useResettableReactive({ id: 1 })
 * data.extra = '临时属性'
 * resetData() // { id: 1 }，extra 被清除
 * ```
 */
export function useResettableReactive<T extends object>(value: T, clone = cloneDeep) {
  const initialValue = clone(value)
  const state = reactive(initialValue)
  const reset = () => {
    // 先删除所有现有属性（包括动态添加的）
    Object.keys(state).forEach((key) => {
      Reflect.deleteProperty(state, key)
    })
    // 然后重新赋值初始值
    Object.assign(state, clone(initialValue))
  }
  return <const>[state, reset]
}
