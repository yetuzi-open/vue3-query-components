import type { TableInstance, TableProps, TableColumnCtx } from 'element-plus'
import type { ExtractPropTypes } from 'vue'
import type { AnyObject, OptionalFields } from '../../index'

/**
 * CommonTable 组件 Props
 * 基于 Element Plus Table 封装，提供开箱即用的表格能力
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```vue
 * <template>
 *   <CommonTable :columns="columns" :data="tableData" />
 * </template>
 *
 * <script setup lang="ts">
 * import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'
 *
 * interface UserData {
 *   id: number
 *   name: string
 *   email: string
 * }
 *
 * const columns: CommonTableArrayColumns<UserData> = [
 *   { prop: 'id', label: 'ID', type: 'index' },
 *   { prop: 'name', label: '姓名' },
 *   { prop: 'email', label: '邮箱' },
 * ]
 *
 * const tableData: UserData[] = []
 * </script>
 * ```
 */
export interface CommonTableProps<T extends AnyObject = AnyObject>
  extends ExtractPropTypes<Omit<TableProps<T>, 'data' | 'headerCellStyle'>> {
  /** 表格列配置 */
  columns: CommonTableColumn<T>
  /** 表格数据 */
  data: T[]
}

/**
 * 表格列配置类型
 * 支持数组形式和对象形式两种列配置写法
 *
 * @typeParam T - 表格行数据类型
 *
 * @example 数组形式
 * ```ts
 * const columns: CommonTableArrayColumns<UserData> = [
 *   { prop: 'name', label: '姓名' },
 *   { prop: 'age', label: '年龄' },
 * ]
 * ```
 *
 * @example 对象形式
 * ```ts
 * const columns: CommonTableObjectColumns<UserData> = {
 *   name: { prop: 'name', label: '姓名' },
 *   age: { prop: 'age', label: '年龄' },
 * }
 * ```
 */
export type CommonTableColumn<T extends AnyObject> =
  | CommonTableArrayColumns<T>
  | CommonTableObjectColumns<T>

/**
 * 表格列数组类型
 * 用于 CommonTable 的 `columns` 属性，也可用于独立类型标注
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'
 *
 * const columns: CommonTableArrayColumns<MyDataType> = [
 *   { prop: 'id', label: 'ID', type: 'index' },
 *   { prop: 'name', label: '用户名' },
 *   { prop: 'createTime', label: '创建时间', type: 'dateTime' },
 * ]
 * ```
 */
export type CommonTableArrayColumns<T extends AnyObject> = Array<CommonTableColumnRoot<T>>

type CommonTableBuiltInColumnType =
  | 'default'
  | 'index'
  | 'selection'
  | 'expand'
  | 'date'
  | 'dateTime'
  | 'dict'

/**
 * 表格列基础接口
 * 定义所有列类型共享的公共属性
 *
 * @typeParam T - 表格行数据类型
 */
interface TableColumnBase<T extends AnyObject>
  extends Partial<Omit<TableColumnCtx<T>, 'prop' | 'type'>> {
  /** 列字段名，支持数据类型的 key 或任意字符串 */
  prop?: keyof T | (string & {})
  /** 列类型 */
  type?: CommonTableBuiltInColumnType | (string & {})
}

/**
 * 默认列类型
 * 普通数据列，通常只需要配置 `prop`、`label` 等基础属性
 */
interface TableColumnTypeDefault<T extends AnyObject>
  extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'default'
}

/**
 * 索引列类型
 * 自动显示行号
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * const indexColumn: TableColumnTypeIndex<UserData> = {
 *   type: 'index',
 *   label: '序号',
 *   width: 60,
 * }
 * ```
 */
interface TableColumnTypeIndex<T extends AnyObject>
  extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'index'
}

/**
 * 选择列类型
 * 提供多选能力
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * const selectionColumn: TableColumnTypeSelection<UserData> = {
 *   type: 'selection',
 *   selectable: (row) => row.status === 'active',
 * }
 * ```
 */
interface TableColumnTypeSelection<T extends AnyObject>
  extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'selection'
  /** 行是否可选的条件函数 */
  selectable?: (row: T, index: number) => boolean
  /** 是否保留之前的选中状态 */
  'reserve-selection'?: boolean
}

/**
 * 展开列类型
 * 提供行展开能力
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * const expandColumn: TableColumnTypeExpand<UserData> = {
 *   type: 'expand',
 *   label: '详情',
 * }
 * ```
 */
interface TableColumnTypeExpand<T extends AnyObject>
  extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'expand'
}

/**
 * 日期列类型
 * 自动格式化日期显示
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * const dateColumn: TableColumnTypeDate<UserData> = {
 *   type: 'date',
 *   prop: 'createTime',
 *   label: '创建日期',
 * }
 * ```
 */
interface TableColumnTypeDate<T extends AnyObject> extends TableColumnBase<T> {
  type: 'date'
}

/**
 * 日期时间列类型
 * 自动格式化日期时间显示
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * const dateTimeColumn: TableColumnTypeDateTime<UserData> = {
 *   type: 'dateTime',
 *   prop: 'updateTime',
 *   label: '更新时间',
 * }
 * ```
 */
interface TableColumnTypeDateTime<T extends AnyObject> extends TableColumnBase<T> {
  type: 'dateTime'
}

/**
 * 字典列类型
 * 根据配置的字典选项，将值转换为对应的标签显示
 *
 * @typeParam T - 表格行数据类型
 *
 * @example 使用 options
 * ```ts
 * const dictColumn: TableColumnTypeDict<UserData> = {
 *   type: 'dict',
 *   prop: 'status',
 *   label: '状态',
 *   options: [
 *     { label: '启用', value: 1 },
 *     { label: '禁用', value: 0 },
 *   ],
 * }
 * ```
 *
 * @example 使用 dictName
 * ```ts
 * const dictColumn: TableColumnTypeDict<UserData> = {
 *   type: 'dict',
 *   prop: 'gender',
 *   label: '性别',
 *   dictName: 'gender',
 * }
 * ```
 */
export interface TableColumnTypeDict<T extends AnyObject> extends TableColumnBase<T> {
  type: 'dict'
  /** 字典选项列表 */
  options?: Array<{ label: string; value: any }>
  /** 字典名称，用于从全局字典服务获取选项 */
  dictName?: string
}

/**
 * 表格列根类型
 * 包含所有列类型的联合定义
 *
 * @typeParam T - 表格行数据类型
 */
export type CommonTableColumnRoot<T extends AnyObject> =
  | TableColumnBase<T>
  | TableColumnTypeDefault<T>
  | TableColumnTypeIndex<T>
  | TableColumnTypeSelection<T>
  | TableColumnTypeExpand<T>
  | TableColumnTypeDate<T>
  | TableColumnTypeDateTime<T>
  | TableColumnTypeDict<T>

/**
 * 表格列类型标识
 * 从 `CommonTableColumnRoot` 中自动提取 `type` 字段类型
 *
 * @example
 * ```ts
 * let columnType: CommonTableColumnType
 *
 * columnType = 'index'
 * columnType = 'selection'
 * columnType = 'expand'
 * columnType = 'date'
 * columnType = 'dateTime'
 * columnType = 'dict'
 * ```
 */
export type CommonTableColumnType = CommonTableBuiltInColumnType

/**
 * 表格列对象形式类型
 * 以键值对的方式配置列，键名通常会作为默认 prop 使用
 *
 * @typeParam T - 表格行数据类型
 *
 * @example
 * ```ts
 * const columns: CommonTableObjectColumns<UserData> = {
 *   name: { prop: 'name', label: '姓名' },
 *   age: { prop: 'age', label: '年龄' },
 * }
 * ```
 */
type CommonTableObjectColumns<T extends AnyObject> = Record<
  keyof T | (string & {}),
  CommonTableColumnRoot<T>
>

/**
 * CommonTable 暴露给父组件的实例类型
 * 包含 ElTable 的所有方法和属性
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import type { CommonTableExpose } from '@yetuzi/vue3-query-components'
 *
 * const tableRef = ref<CommonTableExpose>()
 *
 * const clearSelection = () => {
 *   tableRef.value?.clearSelection()
 * }
 *
 * const toggleRowSelection = (row: UserData) => {
 *   tableRef.value?.toggleRowSelection(row, true)
 * }
 * </script>
 * ```
 */
export interface CommonTableExpose extends TableInstance {}
