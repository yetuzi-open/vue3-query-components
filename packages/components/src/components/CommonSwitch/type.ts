/** 导入Element Plus开关属性类型 */
import type { SwitchProps } from 'element-plus'
/** 导入Vue公共属性类型提取工具 */
import type { ExtractPublicPropTypes } from 'vue'

/**
 * CommonSwitch组件属性类型
 * 继承自Element Plus Switch组件的公共属性，并扩展自定义颜色配置
 */
export interface CommonSwitchProps extends ExtractPublicPropTypes<SwitchProps> {
  /**
   * 活跃状态时的背景颜色
   */
  activeColor?: string
  /**
   * 不活跃状态时的背景颜色
   */
  inactiveColor?: string
  /**
   * 开关的边框颜色
   */
  borderColor?: string
}
