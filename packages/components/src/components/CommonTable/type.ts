import type { TableProps, TableInstance } from 'element-plus'
import type { ExtractPropTypes, Ref } from 'vue'
import type { AnyObject, OptionalFields } from '../../index'
import type { TableColumnCtx } from 'element-plus'

export interface CommonTableProps<T extends AnyObject = AnyObject>
  extends ExtractPropTypes<Omit<TableProps<T>, 'data' | 'headerCellStyle'>> {
  /** table 表格需要的表头 */
  columns: CommonTableColumn<T>
  data: T[]
}

export type CommonTableColumn<T extends AnyObject> =
  | CommonTableArrayColumns<T>
  | CommonTableObjectColumns<T>

/** 增强 TableColumn 的类型 */
interface TableColumnSupplement<T extends AnyObject>
  extends Partial<Omit<TableColumnCtx<T>, 'prop' | 'type'>> {
  prop: keyof T | (string & {})
  type?: 'index' | 'selection' | 'expand' | 'date' | 'dateTime'
}

/**
 * 下标
 */
interface TableColumnTypeIndex<T extends AnyObject> extends OptionalFields<TableColumnSupplement<T>, 'prop'>  {
  type: 'index'
}

/**
 * 选择器
 */
interface TableColumnTypeSelection<T extends AnyObject> extends  OptionalFields<TableColumnSupplement<T>, 'prop'> {
  type: 'selection'
  selectable?: (row: T, index: number) => boolean
  'reserve-selection'?: boolean
}

/**
 * 可展开的按钮
 */
interface TableColumnTypeExpand<T extends AnyObject> extends OptionalFields<TableColumnSupplement<T>, 'prop'> {
  type: 'expand'
}

/**
 * 日期时间
 */
interface TableColumnTypeDate<T extends AnyObject> extends TableColumnSupplement<T> {
  /** 时间内容 */
  type: 'date'
}

/**
 * 日期时间
 */
interface TableColumnTypeDateTime<T extends AnyObject> extends TableColumnSupplement<T> {
  /** 时间内容 */
  type: 'dateTime'
}

/**
 * Column 根类型 要求 prop 、label 为必传
 */
export type CommonTableColumnRoot<T extends AnyObject> =
  | TableColumnSupplement<T>
  | TableColumnTypeIndex<T>
  | TableColumnTypeSelection<T>
  | TableColumnTypeExpand<T>
  | TableColumnTypeDate<T>
  | TableColumnTypeDateTime<T>

/** Columns 为 Array 时的ts类型 */
export type CommonTableArrayColumns<T extends AnyObject> = Array<CommonTableColumnRoot<T>>

/** Columns 为 Object 时的ts类型 */
type CommonTableObjectColumns<T extends AnyObject> = Record<
  keyof T | (string & {}),
  CommonTableColumnRoot<T>
>

/**
 * CommonTable 组件实例暴露类型
 */
export interface CommonTableInstance {
  /** ElTable 组件实例引用 */
  elTableRef: Ref<TableInstance | undefined>
}


/** CommonTable 暴露给父组件的实例类型（包含 ElTable 所有方法） */
export interface CommonTableExpose extends TableInstance {}
