import { computed, useSlots, useAttrs } from 'vue'
import type { AnyObject } from '../index'
import { kebabCase, camelCase, merge } from 'lodash-es'

export function useGetComponentsChildrenSlots<K extends string>(keys: K[]) {
  const slots = useSlots()
  return computed(() => {
    const o = Object.fromEntries(keys.map((item) => [item, {}])) as Record<K, AnyObject>
    for (const key in slots) {
      if (!Object.prototype.hasOwnProperty.call(slots, key) && !keys.some((i) => i.startsWith(key)))
        continue
      const k = kebabCase(key)
      const value = slots[key]
      const index = k.indexOf('-')
      // 如果没有 - 则是单个插槽,不属于子组件的插槽
      if (index === -1 && !value) return
      const name = k.slice(0, index)
      const slotKey = k.slice(index + 1)
      merge(o, {
        [name]: {
          [camelCase(slotKey)]: key,
        },
      })
    }

    return o
  })
}


export function useGetComponentsChildrenAttrs<K extends string>(keys: K[]){
  const attrs = useAttrs()
  return computed(() => {
    const o = Object.fromEntries(keys.map((item) => [item, {}])) as Record<K, AnyObject>

    for (const attrKey in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, attrKey)) {
        continue
      }

      const attrValue = attrs[attrKey]

      // 将属性名转换为 camelCase，便于统一处理
      const camelAttrKey = camelCase(attrKey)

      // 遍历所有组件名称，找到匹配的前缀
      for (const componentName of keys) {
        const prefix = componentName.charAt(0).toUpperCase() + componentName.slice(1)

        // 使用不区分大小写的匹配（在 camelCase 格式上进行匹配）
        const lowerAttrKey = camelAttrKey.toLowerCase()
        const lowerPrefix = prefix.toLowerCase()

        if (lowerAttrKey.includes(lowerPrefix)) {
          // 查找前缀在属性名中的位置（使用 camelCase 格式）
          const prefixIndex = lowerAttrKey.indexOf(lowerPrefix)

          // 检查是否是事件处理器：camelCase 属性名以 "on" 开头，且 "on" 后面紧跟组件前缀
          const isEvent = camelAttrKey.startsWith('on') && prefixIndex === 2

          let finalKey: string

          if (isEvent) {
            // 对于事件处理器，保留 "on" 前缀，移除组件前缀，保留后续部分
            const afterPrefix = camelAttrKey.slice(prefixIndex + prefix.length) // 移除 onTable 前缀，得到 SelectionChange
            // 智能转换后续部分：如果已经是大写开头，保持原样；否则转为小写开头
            const convertedPart = afterPrefix.charAt(0).toUpperCase() + afterPrefix.slice(1)
            finalKey = 'on' + convertedPart
          } else {
            // 对于普通属性，移除组件前缀后智能转换
            const remainingKey = camelAttrKey.slice(prefixIndex + prefix.length)

            // 如果剩余部分为空，则跳过
            if (!remainingKey) {
              continue
            }

            // 对于普通属性，总是转为小写开头的驼峰格式
            finalKey = remainingKey.charAt(0).toLowerCase() + remainingKey.slice(1)
          }

          // 将属性添加到对应组件的对象中，使用 merge 避免覆盖
          o[componentName] = {
            ...o[componentName],
            [finalKey]: attrValue
          }

          // 找到匹配后跳出内层循环
          break
        }
      }
    }

    return o
  })
}
