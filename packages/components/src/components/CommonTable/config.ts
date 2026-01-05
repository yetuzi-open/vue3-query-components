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

/**
 * 内置列的补充类型 or 优化原先列的样式
 */
export const columnSupplementType: SupplementTypeObject = {
  index: {
    label: '序号'
  },
  selection: {},
  expand: {},
  date: {
    width: '140px',
    formatter(row, column, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD')
    },
  },
  dateTime: {
    width: '180px',
    formatter(row, column, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
