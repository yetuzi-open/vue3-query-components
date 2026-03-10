import type { PaginationProps } from 'element-plus'

/**
 * `CommonPagination` 组件属性类型。
 *
 * 组件在 Element Plus `PaginationProps` 基础上做轻量封装，
 * 因此直接复用其大部分属性定义，并将字段统一声明为可选。
 */
export interface CommonPaginationProps extends Partial<PaginationProps> {}
