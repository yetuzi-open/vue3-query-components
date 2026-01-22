/** 导入Element Plus级联选择器属性类型 */
import type { ExtractDefaultPropTypes } from 'vue'
import type { CascaderProps } from 'element-plus'

/** CommonCascader组件属性类型，忽略复杂类型检查 */
export interface CommonCascaderProps extends /* @vue-ignore */ ExtractDefaultPropTypes<CascaderProps> {}
