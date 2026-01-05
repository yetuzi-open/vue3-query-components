import { configInjectKey } from './key'
import { config } from '../index'
import { inject } from 'vue'

export * from './key'

/** 获取上层配置的 config */
export function getCommonProviderConfig() {
  return inject(configInjectKey, config)
}
