import type { Config, DeepPartial } from '../../index'

/**
 * CommonConfigProvider 组件 Props 类型
 * 支持以深度可选的方式覆盖任意层级配置项
 */
export interface CommonConfigProviderProps extends /* @vue-ignore */ DeepPartial<Config> {}