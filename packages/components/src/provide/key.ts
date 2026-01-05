import type { InjectionKey } from 'vue'
import type { Config } from '../types'
/**
 * common 的接收配置项
 */
export const configInjectKey: InjectionKey<Config> = Symbol()
