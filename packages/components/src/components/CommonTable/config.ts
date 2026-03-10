import dayjs from 'dayjs'
import type { TableColumnCtx } from 'element-plus'
import type { AnyObject, UnionToRecord } from '../../index'
import type { CommonTableColumn, CommonTableColumnRoot } from './type'

type SupplementType = UnionToRecord<CommonTableColumnRoot<AnyObject>, 'type'>

/**
 * 列类型配置工厂函数类型
 * 接收原始列配置，返回 Element Plus Table 列的部分配置
 */
type ColumnConfigFactory<T = AnyObject> = (originalColumn: T) => Partial<TableColumnCtx>

/**
 * 内置列类型配置工厂映射类型
 * 将列类型标识映射到对应的配置工厂函数
 */
type BuiltinColumnTypeFactoriesType = {
  [K in keyof SupplementType]: ColumnConfigFactory<SupplementType[K]>
}

/**
 * 格式化日期值
 * 对空值和非法日期统一返回空字符串，避免渲染 Invalid Date
 */
const formatDateValue = (value: unknown, format: string) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const date = dayjs(value as string | number | Date | null | undefined)
  return date.isValid() ? date.format(format) : ''
}

/**
 * 将列配置统一转换为数组结构
 * 支持数组格式直传，也支持对象格式自动补齐 prop
 */
const toArrayColumns = <T extends AnyObject>(columns: CommonTableColumn<T>) => {
  if (Array.isArray(columns)) {
    return columns
  }

  return Object.entries(columns).map(([key, value]) => ({
    ...value,
    prop: value.prop ?? key,
  }))
}

/**
 * 标准化 CommonTable 列配置
 * 在统一列结构后，自动合并内置列类型对应的默认配置
 *
 * @param columns - 原始列配置，支持数组和对象两种形式
 * @returns 标准化后的列配置数组
 */
export function normalizeCommonTableColumns<T extends AnyObject>(columns: CommonTableColumn<T>) {
  return toArrayColumns(columns).map((column) => {
    const prop = column.prop as string | undefined
    const type = column.type as keyof BuiltinColumnTypeFactoriesType | undefined
    const builtinConfig = type ? builtinColumnTypeFactories[type]?.(column as never) : undefined

    return {
      ...builtinConfig,
      ...column,
      prop,
    }
  })
}

/**
 * 内置列类型配置工厂映射
 * 统一管理所有内置列类型的默认配置生成逻辑
 */
export const builtinColumnTypeFactories: BuiltinColumnTypeFactoriesType = {
  default: () => ({}),

  /** 索引列 - 自动显示行号 */
  index: () => ({
    label: '序号',
    align: 'center',
  }),

  /** 选择列 - 提供多选功能 */
  selection: () => ({}),

  /** 展开列 - 提供行展开功能 */
  expand: () => ({}),

  /** 日期列 - 自动格式化日期显示 */
  date: () => ({
    width: '140px',
    formatter(_row, _column, cellValue) {
      return formatDateValue(cellValue, 'YYYY-MM-DD')
    },
  }),

  /** 日期时间列 - 自动格式化日期时间显示 */
  dateTime: () => ({
    width: '180px',
    formatter(_row, _column, cellValue) {
      return formatDateValue(cellValue, 'YYYY-MM-DD HH:mm:ss')
    },
  }),

  /**
   * 字典列 - 根据配置的字典选项，将值转换为对应的标签显示
   * 优先使用 options 映射，未命中时回退到原始值
   */
  dict: (originalColumn) => {
    const optionMap = new Map(
      originalColumn.options?.map((option) => [option.value, option.label]) ?? [],
    )

    return {
      width: '120px',
      formatter(_row, _column, cellValue) {
        if (Array.isArray(originalColumn.options)) {
          return optionMap.get(cellValue) ?? (cellValue ?? '')
        }

        return cellValue ?? ''
      },
    }
  },
}