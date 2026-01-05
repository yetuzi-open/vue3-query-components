/** 导入Element Plus输入框属性类型 */
import type { InputProps } from 'element-plus'
import type { ExtractDefaultPropTypes } from 'vue'

/** CommonInput组件属性类型，忽略复杂类型检查 */
export interface CommonInputProps extends /* @vue-ignore */ ExtractDefaultPropTypes<InputProps> {}
