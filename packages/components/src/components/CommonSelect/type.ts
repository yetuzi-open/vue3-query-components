/** 导入Element Plus选择器属性类型 */
import type { SelectProps } from 'element-plus'
import type { ExtractDefaultPropTypes } from 'vue'

/**
 * CommonSelect组件属性类型
 * 继承自Element Plus Select组件的属性，所有属性均为可选
 */
export interface CommonSelectProps extends /* @vue-ignore */ ExtractDefaultPropTypes<SelectProps> {
  options?: { label: string; value: any; disabled?: boolean }[]
}

