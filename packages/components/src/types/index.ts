export * from './utils'
export * from './expand'
import type { CSSProperties } from 'vue'
import type { AnyObject } from './expand'

// #region config
export interface Config {
  component: {
    /** 空值占位 */
    placeholder: string
    /** 分页组件默认分页数据 */
    pagination: {
      /** 默认请求起始页数 */
      defaultPageCount: number
      /** 默认每页请求的条数 */
      defaultPageSize: number
    }
    /** 表格组件 */
    table: {}
    /** 表单组件 */
    form: {
      /** 表单组件的每个 formItem */
      formItem: {
        /** 表单组件 formItem 里的组件 如 input select date */
        components: {
          width: string
        }
      }
      /** 提交按钮文本 */
      submitText: string
      /** 重置按钮文本 */
      resetText: string
    }
  }
}
// #endregion config



/**
 * 分页请求 参数要求
 */
export type PaginationParam = {
  pageNo: number
  pageSize: number
}

/**
 * 列表请求 参数要求,包含分页
 */
export type ListParam<T extends AnyObject = AnyObject> = PaginationParam & T
