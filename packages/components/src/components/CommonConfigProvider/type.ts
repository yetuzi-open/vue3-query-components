/** 导入配置类型和深度部分类型 */
import type { Config, DeepPartial } from '../../index'

/**
 * CommonConfigProvider组件属性类型
 * 继承自深度部分配置类型，支持配置项的部分覆盖
 * 使用@vue-ignore忽略Vue类型检查
 */
export interface CommonConfigProviderProps extends /* @vue-ignore */ DeepPartial<Config> {}
