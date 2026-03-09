import type { AnyObject, CommonFormItemArray, CommonTableColumn, ListParam } from '../../index'

/**
 * CommonQueryTable 组件 Props
 * 将查询表单、数据表格和分页能力组合到一个组件中
 *
 * @typeParam T - 表格行数据类型
 */
export interface CommonQueryTableProps<T extends AnyObject = AnyObject> {
  /**
   * 数据获取函数
   * 接收查询参数并返回包含列表和总数的 Promise
   */
  fetch: (params?: ListParam) => Promise<{ list: T[]; total: string | number }>

  /**
   * 表单配置数组
   * 用于定义查询表单的字段结构和属性
   */
  form?: CommonFormItemArray<T>

  /**
   * 表格列配置
   * 定义列表表格的列结构与展示方式
   */
  columns: CommonTableColumn<T>
}

/**
 * CommonQueryTable 组件暴露方法
 * 可通过 `ref` 直接调用
 *
 * @typeParam T - 表格行数据类型
 */
export interface CommonQueryTableExpose<T = AnyObject> {
  /** 使用当前条件刷新列表数据 */
  refresh: () => void

  /** 重置查询条件和分页，并重新获取列表数据 */
  reset: () => void

  /** 获取当前表单数据 */
  getFormData: () => Partial<T>

  /** 获取当前表格选中行数据 */
  getSelectionRows: () => T[]
}