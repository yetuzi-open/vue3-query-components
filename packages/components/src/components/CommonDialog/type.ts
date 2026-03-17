import type { DialogPropsPublic } from 'element-plus'
import type { VNodeChild } from 'vue'
import type { CommonButtonProps } from '../CommonButton'

export interface CommonDialogProps extends Omit<DialogPropsPublic, 'modelValue'> {
  showFooter?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  confirmText?: string
  cancelText?: string
  confirmButtonProps?: Partial<CommonButtonProps>
  cancelButtonProps?: Partial<CommonButtonProps>
}

export interface CommonDialogExpose {
  open: () => void
  close: () => void
  toggle: (visible?: boolean) => void
}

export interface CommonDialogSlotProps {
  visible: boolean
  loading: boolean
  open: () => void
  close: () => void
  toggle: (visible?: boolean) => void
  confirm: () => void
  cancel: () => void
}

export type CommonDialogRenderContent =
  | string
  | VNodeChild
  | ((context: CommonDialogSlotProps) => VNodeChild)
