/** 导入Element Plus分页属性类型 */
import type { PaginationProps } from 'element-plus'

/**
 * CommonPagination组件属性类型
 * 直接继承Element Plus分页组件的属性，所有属性均为可选
 * Element Plus内部已用ExtractPropTypes处理过类型
 */
export interface CommonPaginationProps extends Partial<PaginationProps> {
  // pageSizes?: number[]
}
