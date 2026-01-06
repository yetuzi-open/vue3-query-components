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

  /**
   * 页面布局配置
   * 控制页面中各个组件的显示顺序
   * @default ['form', 'table', 'pagination']
   */
  layouts?: Array<CommonQueryTableLayoutsUnite>
}

/** 布局名 联合类型 */
export type CommonQueryTableLayoutsUnite =
  | 'header'
  | 'form'
  | 'toolbar'
  | 'table'
  | 'pagination'
  | 'footer'
