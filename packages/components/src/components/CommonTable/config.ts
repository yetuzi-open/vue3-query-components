import type { VNode } from 'vue'
import type { AnyObject, UnionToRecord } from '../../index'
import dayjs from 'dayjs'
import type { CommonTableColumnRoot } from './type'

type SupplementType = UnionToRecord<CommonTableColumnRoot<AnyObject>, 'type'>

export type SupplementTypeObject = {
  [K in keyof SupplementType]: Partial<Omit<SupplementType[K], 'prop' | 'formatter'>> & {
    formatter?: (
      row: AnyObject,
      column: SupplementType[K],
      cellValue: any,
      index: number,
    ) => VNode | string | number
  }
}

type ColumnConfig = {
  label?: string
  width?: string
  formatter?: (row: AnyObject, column: any, cellValue: any, index: number) => VNode | string | number
}

/**
 * 内置列的补充类型配置
 * 使用 Map 存储类型到配置的映射
 */
const columnSupplementTypeMap = new Map<string, ColumnConfig>([
  ['index', { label: '序号' }],
  ['selection', {}],
  ['expand', {}],
  ['date', {
    width: '140px',
    formatter(row, column, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD')
    },
  }],
  ['dateTime', {
    width: '180px',
    formatter(row, column, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
  }],
])

/**
 * 获取列类型的补充配置
 * @param type - 列类型
 * @returns 对应的配置，如果类型不存在则返回 undefined
 */
export function getColumnSupplementType(type: string): ColumnConfig | undefined {
  return columnSupplementTypeMap.get(type)
}
