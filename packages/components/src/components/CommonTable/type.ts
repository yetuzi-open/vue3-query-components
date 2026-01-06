import type { TableProps, TableInstance } from 'element-plus'
import type { ExtractPropTypes, Ref } from 'vue'
import type { AnyObject, OptionalFields } from '../../index'
import type { TableColumnCtx } from 'element-plus'

/**
 * CommonTable 组件 Props
 * 基于 Element Plus Table 封装，提供开箱即用的表格功能
 *
 * @typeParam T - 表格数据行类型
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
 *   { prop: 'email', label: '邮箱' }
 * ]
 *
 * const tableData: UserData[] = [...]
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
 * 支持数组形式和对象形式的列配置
 *
 * @typeParam T - 表格数据行类型
 *
 * @example 数组形式
 * ```ts
 * const columns: CommonTableArrayColumns<UserData> = [
 *   { prop: 'name', label: '姓名' },
 *   { prop: 'age', label: '年龄' }
 * ]
 * ```
 *
 * @example 对象形式
 * ```ts
 * const columns: CommonTableObjectColumns<UserData> = {
 *   name: { prop: 'name', label: '姓名' },
 *   age: { prop: 'age', label: '年龄' }
 * }
 * ```
 */
export type CommonTableColumn<T extends AnyObject> =
  | CommonTableArrayColumns<T>
  | CommonTableObjectColumns<T>

/**
 * 表格列类型数组
 * 用于 CommonTable 的 columns 属性，也可用于类型标注
 *
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * import type { CommonTableArrayColumns } from '@yetuzi/vue3-query-components'
 *
 * const columns: CommonTableArrayColumns<MyDataType> = [
 *   { prop: 'id', label: 'ID', type: 'index' },
 *   { prop: 'name', label: '用户名' },
 *   { prop: 'createTime', label: '创建时间', type: 'dateTime' }
 * ]
 * ```
 */
export type CommonTableArrayColumns<T extends AnyObject> = Array<CommonTableColumnRoot<T>>

/**
 * 表格列基础接口
 * 所有列类型的公共属性定义
 *
 * @typeParam T - 表格数据行类型
 */
interface TableColumnBase<T extends AnyObject>
  extends Partial<Omit<TableColumnCtx<T>, 'prop' | 'type'>> {
  /** 列字段名，支持数据类型的 key 或任意字符串 */
  prop: keyof T | (string & {})
  /** 列类型 */
  type?: TableColumnType | (string & {})
}

/**
 * 索引列类型
 * 自动显示行号
 *
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * const indexColumn: TableColumnTypeIndex<UserData> = {
 *   type: 'index',
 *   label: '序号',
 *   width: 60
 * }
 * ```
 */
interface TableColumnTypeIndex<T extends AnyObject> extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'index'
}

/**
 * 选择列类型
 * 提供多选功能
 *
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * const selectionColumn: TableColumnTypeSelection<UserData> = {
 *   type: 'selection',
 *   selectable: (row, index) => row.status === 'active'
 * }
 * ```
 */
interface TableColumnTypeSelection<T extends AnyObject> extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'selection'
  /** 行可选择的条件函数 */
  selectable?: (row: T, index: number) => boolean
  /** 是否保留之前的选择 */
  'reserve-selection'?: boolean
}

/**
 * 展开列类型
 * 提供行展开功能
 *
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * const expandColumn: TableColumnTypeExpand<UserData> = {
 *   type: 'expand',
 *   label: '详情'
 * }
 * ```
 */
interface TableColumnTypeExpand<T extends AnyObject> extends OptionalFields<TableColumnBase<T>, 'prop'> {
  type: 'expand'
}

/**
 * 日期列类型
 * 自动格式化日期显示
 *
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * const dateColumn: TableColumnTypeDate<UserData> = {
 *   type: 'date',
 *   prop: 'createTime',
 *   label: '创建日期'
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
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * const dateTimeColumn: TableColumnTypeDateTime<UserData> = {
 *   type: 'dateTime',
 *   prop: 'updateTime',
 *   label: '更新时间'
 * }
 * ```
 */
interface TableColumnTypeDateTime<T extends AnyObject> extends TableColumnBase<T> {
  type: 'dateTime'
}

/**
 * 表格列定义根类型
 * 包含所有列类型的联合类型
 *
 * @typeParam T - 表格数据行类型
 */
export type CommonTableColumnRoot<T extends AnyObject> =
  | TableColumnBase<T>
  | TableColumnTypeIndex<T>
  | TableColumnTypeSelection<T>
  | TableColumnTypeExpand<T>
  | TableColumnTypeDate<T>
  | TableColumnTypeDateTime<T>

/**
 * 表格列类型标识
 * 从 CommonTableColumnRoot 中自动提取 type 字段的类型
 *
 * @example
 * ```ts
 * let columnType: TableColumnType
 *
 * columnType = 'index'      // ✓ 索引列
 * columnType = 'selection'  // ✓ 选择列
 * columnType = 'expand'     // ✓ 展开列
 * columnType = 'date'       // ✓ 日期列
 * columnType = 'dateTime'   // ✓ 日期时间列
 * ```
 */
export type TableColumnType = Extract<CommonTableColumnRoot<AnyObject>, { type: any }>['type']

/**
 * 表格列对象形式类型
 * 以键值对的方式配置列
 *
 * @typeParam T - 表格数据行类型
 *
 * @example
 * ```ts
 * const columns: CommonTableObjectColumns<UserData> = {
 *   name: { prop: 'name', label: '姓名' },
 *   age: { prop: 'age', label: '年龄' }
 * }
 * ```
 */
type CommonTableObjectColumns<T extends AnyObject> = Record<
  keyof T | (string & {}),
  CommonTableColumnRoot<T>
>

/**
 * CommonTable 组件实例暴露类型
 * 提供 Element Plus Table 实例访问
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 *
 * const tableRef = ref<CommonTableInstance>()
 *
 * const scrollToBottom = () => {
 *   tableRef.value?.elTableRef.value?.scrollTo({
 *     top: 10000,
 *     behavior: 'smooth'
 *   })
 * }
 * </script>
 * ```
 */
export interface CommonTableInstance {
  /** ElTable 组件实例引用 */
  elTableRef: Ref<TableInstance | undefined>
}

/**
 * CommonTable 暴露给父组件的实例类型
 * 包含 ElTable 的所有方法和属性
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
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
