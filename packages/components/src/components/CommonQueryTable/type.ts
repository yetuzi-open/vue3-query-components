import type { AnyObject, ListParam, CommonTableColumn, CommonFormItemArray } from '../../index'

export interface CommonQueryTableProps<T extends AnyObject = AnyObject> {
  /**
   * 数据获取函数
   * @param params - 查询参数，包含分页和表单查询条件
   * @returns Promise 包含数据列表和总数的对象
   */
  fetch: (params?: ListParam) => Promise<{ list: T[]; total: string | number }>

  /**
   * 表单配置数组
   * 定义查询表单的字段和属性
   */
  form?: CommonFormItemArray<T>

  /**
   * 表格列配置
   * 定义表格的列结构和展示方式
   */
  columns: CommonTableColumn<T>
}

/**
 * CommonQueryTable 组件实例方法
 */
export interface CommonQueryTableExpose<T = AnyObject> {
  /**
   * 刷新列表数据
   * 使用当前查询条件和分页参数重新请求数据
   */
  refresh: () => void

  /**
   * 重置查询条件和分页
   * 重置表单字段到初始值，重置分页到第一页，并重新请求数据
   */
  reset: () => void

  /**
   * 获取表单数据
   * @returns 当前表单的值对象
   */
  getFormData: () => Partial<T>

  /**
   * 获取表格选中的行数据
   * @returns 选中的行数据数组
   */
  getSelectionRows: () => T[]
}