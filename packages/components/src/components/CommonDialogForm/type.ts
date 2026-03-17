import type { CommonButtonProps } from '../CommonButton'
import type { CommonDialogExpose, CommonDialogProps, CommonDialogSlotProps } from '../CommonDialog'
import type { CommonFormData, CommonFormExpose, CommonFormItemArray, CommonFormProps } from '../CommonForm'
import type { AnyObject } from '../../index'

export interface CommonDialogFormProps<T extends AnyObject>
  extends Omit<CommonDialogProps, 'modelValue'> {
  form?: CommonFormItemArray<T>
  formData?: Partial<CommonFormData<T>>
  formProps?: Partial<Omit<CommonFormProps<T>, 'form' | 'formData' | 'showActionButtons'>>
  showResetButton?: boolean
  resetText?: string
  resetButtonProps?: Partial<CommonButtonProps>
}

export interface CommonDialogFormSlotProps<T extends AnyObject = AnyObject>
  extends CommonDialogSlotProps {
  formData: CommonFormExpose<T>['formData']
  submit: () => Promise<void>
  reset: () => void
}

export interface CommonDialogFormExpose<T extends AnyObject = AnyObject> extends CommonDialogExpose {
  formData: CommonFormExpose<T>['formData']
  submit: () => Promise<void>
  reset: () => void
  validate: CommonFormExpose<T>['validate']
  validateField: CommonFormExpose<T>['validateField']
  resetFields: CommonFormExpose<T>['resetFields']
  clearValidate: CommonFormExpose<T>['clearValidate']
  scrollToField: CommonFormExpose<T>['scrollToField']
}
