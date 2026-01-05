/** 导入Element Plus单选框组属性类型 */
import type { RadioGroupProps } from 'element-plus'
/** 导入Vue公共属性类型提取工具 */
import type { ExtractPublicPropTypes } from 'vue'

/** CommonRadio组件属性类型，提取自Element Plus RadioGroup组件的公共属性 */
export interface CommonRadioProps extends ExtractPublicPropTypes<RadioGroupProps> {}
