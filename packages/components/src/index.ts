import { reactive } from 'vue'
import type { Config } from './types'

// 导出版本号 - 使用占位符，构建时会被替换
export const version: string = '__PACKAGE_VERSION__'

// 导出所有模块（包括组件、类型、工具等）
export * from './components'
export * from './types'
export * from './utils'
export * from './provide'
export * from './hooks'

// #region config
export const config = reactive<Config>({
  component: {
    placeholder: '-',
    pagination: {
      defaultPageCount: 1,
      defaultPageSize: 10,
    },
    table: {},
    form: {
      submitText: '搜索',
      resetText: '重置',
      formItem: {
        components: {
          width: '200px',
        },
      },
    },
  },
})
// #endregion config
