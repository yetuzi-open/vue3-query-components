import { ElTreeSelect } from 'element-plus'
import type { ComponentProps } from 'vue-component-type-helpers'

type TreeSelectProps = ComponentProps<typeof ElTreeSelect>

export interface CommonTreeSelectProps extends /* @vue-ignore */ Omit<TreeSelectProps, 'modelValue'> {
  data?: TreeSelectProps['data']
}

export type CommonTreeSelectValue = TreeSelectProps['modelValue']
