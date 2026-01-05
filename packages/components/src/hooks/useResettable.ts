import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'

/**
 * 创建一个可重置的值
 * @param value 初始值
 * @param format 格式化函数
 * @returns 一个数组，包含 state 和 reset 方法
 * @example
 * // 基本使用
 * const [state, reset] = useResettableRef({ count: 0 })
 * state.value.count++ // 1
 * reset() // 重置为初始值 { count: 0 }
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
 * 创建一个可重置的响应式对象
 * @param value 初始值
 * @param clone 克隆函数
 * @returns 一个数组，包含 state 和 reset 方法
 * @example
 * const [state, reset] = useResettableReactive({ count: 0 })
 * state.count++ // 1
 * reset() // 重置为初始值 { count: 0 }
 */
export function useResettableReactive<T extends object>(value: T, clone = cloneDeep) {
  const state = reactive(clone(value))
  const reset = () => {
    Object.keys(state).forEach((key) => {
      Reflect.deleteProperty(state, key)
    })
    Object.assign(state, clone(value))
  }
  return <const>[state, reset]
}
