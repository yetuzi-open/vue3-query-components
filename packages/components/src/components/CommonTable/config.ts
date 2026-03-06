import dayjs from 'dayjs'
import type { TableColumnCtx } from 'element-plus'
import type { AnyObject, UnionToRecord } from '../../index'
import type { CommonTableColumn, CommonTableColumnRoot } from './type'

type SupplementType = UnionToRecord<CommonTableColumnRoot<AnyObject>, 'type'>

type ColumnConfigFactory<T = AnyObject> = (originalColumn: T) => Partial<TableColumnCtx>

type BuiltinColumnTypeFactoriesType = {
  [K in keyof SupplementType]: ColumnConfigFactory<SupplementType[K]>
}

const formatDateValue = (value: unknown, format: string) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const date = dayjs(value as string | number | Date | null | undefined)
  return date.isValid() ? date.format(format) : ''
}

const toArrayColumns = <T extends AnyObject>(columns: CommonTableColumn<T>) => {
  if (Array.isArray(columns)) {
    return columns
  }

  return Object.entries(columns).map(([key, value]) => ({
    ...value,
    prop: value.prop ?? key,
  }))
}

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

export const builtinColumnTypeFactories: BuiltinColumnTypeFactoriesType = {
  default: () => ({}),
  index: () => ({
    label: '序号',
    align: 'center'
  }),
  selection: () => ({}),
  expand: () => ({}),
  date: () => ({
    width: '140px',
    formatter(_row, _column, cellValue) {
      return formatDateValue(cellValue, 'YYYY-MM-DD')
    },
  }),
  dateTime: () => ({
    width: '180px',
    formatter(_row, _column, cellValue) {
      return formatDateValue(cellValue, 'YYYY-MM-DD HH:mm:ss')
    },
  }),
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
