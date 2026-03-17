import { ElUpload } from 'element-plus'
import type { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile, UploadRequestHandler, UploadUserFile } from 'element-plus'
import type { ComponentProps } from 'vue-component-type-helpers'

type UploadProps = Omit<ComponentProps<typeof ElUpload>, 'fileList'>

export interface CommonUploadProps extends /* @vue-ignore */ UploadProps {
  action?: UploadProps['action']
  drag?: UploadProps['drag']
}

export type CommonUploadValue = UploadUserFile[]

export type {
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestHandler,
  UploadUserFile,
}
