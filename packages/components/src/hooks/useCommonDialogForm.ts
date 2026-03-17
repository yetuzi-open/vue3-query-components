import {
  computed,
  createVNode,
  defineComponent,
  getCurrentInstance,
  h,
  reactive,
  ref,
  render,
  type AppContext,
  type ComputedRef,
  type Ref,
  type VNodeChild,
} from 'vue'
import { cloneDeep } from 'lodash-es'
import { CommonDialogForm } from '../components/CommonDialogForm'
import type {
  CommonDialogFormExpose,
  CommonDialogFormProps,
  CommonDialogFormSlotProps,
} from '../components/CommonDialogForm'
import type { CommonFormData, CommonFormExpose } from '../components/CommonForm'
import type { AnyObject } from '../index'

type Awaitable<T> = T | Promise<T>
type FormDataResolver<T extends AnyObject> =
  | Partial<CommonFormData<T>>
  | (() => Awaitable<Partial<CommonFormData<T>> | undefined>)

export interface UseCommonDialogFormOptions<T extends AnyObject = AnyObject>
  extends Partial<Omit<CommonDialogFormProps<T>, 'modelValue' | 'form'>> {
  form?: CommonDialogFormProps<T>['form'] | FormDataResolver<T>
  header?: (context: CommonDialogFormSlotProps<T>) => VNodeChild
  footer?: (context: CommonDialogFormSlotProps<T>) => VNodeChild
  onSubmit?: (
    formData: CommonFormExpose<T>['formData'],
    context: CommonDialogFormSlotProps<T>,
  ) => Awaitable<boolean | void>
  onReset?: (formData: CommonFormExpose<T>['formData'], context: CommonDialogFormSlotProps<T>) => Awaitable<void>
  onCancel?: (context: CommonDialogFormSlotProps<T>) => Awaitable<void>
  onClosed?: (context: CommonDialogFormSlotProps<T>) => Awaitable<void>
  confirmAutoClose?: boolean
  destroyOnClosed?: boolean
}

export interface UseCommonDialogFormReturn<T extends AnyObject = AnyObject> {
  visible: Ref<boolean>
  loading: Ref<boolean>
  formData: ComputedRef<CommonFormExpose<T>['formData']>
  open: (options?: Partial<UseCommonDialogFormOptions<T>>) => void
  close: () => void
  toggle: (visible?: boolean) => void
  update: (options: Partial<UseCommonDialogFormOptions<T>>) => void
  setFormData: (formData: Partial<CommonFormData<T>>) => void
  destroy: () => void
  setLoading: (value: boolean) => void
  submit: () => Promise<void>
  reset: () => void
  validate: CommonDialogFormExpose<T>['validate']
  validateField: CommonDialogFormExpose<T>['validateField']
  resetFields: CommonDialogFormExpose<T>['resetFields']
  clearValidate: CommonDialogFormExpose<T>['clearValidate']
  scrollToField: CommonDialogFormExpose<T>['scrollToField']
}

type InternalDialogFormState<T extends AnyObject> = UseCommonDialogFormOptions<T> & Record<string, unknown>

const dialogFormStateDefaults = {
  showFooter: true,
  showCancelButton: true,
  showConfirmButton: true,
  showResetButton: false,
  modal: true,
  showClose: true,
  destroyOnClose: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  lockScroll: true,
  confirmAutoClose: true,
  destroyOnClosed: true,
} satisfies Record<string, unknown>

export function useCommonDialogForm<T extends AnyObject = AnyObject>(
  initialOptions: UseCommonDialogFormOptions<T> = {},
): UseCommonDialogFormReturn<T> {
  const visible = ref(false)
  const loading = ref(false)
  const dialogFormRef = ref<CommonDialogFormExpose<T>>()
  const currentInstance = getCurrentInstance()
  const appContext = currentInstance
    ? ({
        ...currentInstance.appContext,
        provides: (currentInstance as any).provides,
      } as AppContext)
    : undefined

  const state = reactive({
    ...dialogFormStateDefaults,
    ...(initialOptions as Record<string, unknown>),
  }) as InternalDialogFormState<T>

  const formData = computed(
    () =>
      (dialogFormRef.value?.formData ?? ({} as CommonFormExpose<T>['formData'])) as CommonFormExpose<T>['formData'],
  )

  let container: HTMLDivElement | null = null
  let mounted = false
  let formResolveRequestId = 0

  function open(options: Partial<UseCommonDialogFormOptions<T>> = {}) {
    applyOptions(options, true)
  }

  function close() {
    formResolveRequestId += 1
    visible.value = false
  }

  function toggle(nextVisible = !visible.value) {
    if (!nextVisible) {
      formResolveRequestId += 1
    }
    visible.value = nextVisible
  }

  function update(options: Partial<UseCommonDialogFormOptions<T>>) {
    applyOptions(options, false)
  }

  function setFormData(nextFormData: Partial<CommonFormData<T>>) {
    update({
      formData: nextFormData,
    })
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function destroy() {
    formResolveRequestId += 1
    visible.value = false
    loading.value = false
    if (container) {
      render(null, container)
      container.remove()
      container = null
    }
    mounted = false
    dialogFormRef.value = undefined
  }

  function applyOptions(options: Partial<UseCommonDialogFormOptions<T>>, openAfterResolved: boolean) {
    const requestId = ++formResolveRequestId
    const { nextOptions, formDataResolver } = normalizeOptions(options)

    const finalize = (resolvedFormData?: Partial<CommonFormData<T>>) => {
      if (requestId !== formResolveRequestId) {
        return
      }

      Object.assign(state, nextOptions)

      if (!Object.prototype.hasOwnProperty.call(nextOptions, 'formData') && resolvedFormData !== undefined) {
        state.formData = cloneDeep(resolvedFormData) as Partial<CommonFormData<T>>
      }

      if (openAfterResolved) {
        ensureMounted()
        visible.value = true
      }
    }

    if (!formDataResolver || Object.prototype.hasOwnProperty.call(nextOptions, 'formData')) {
      finalize()
      return
    }

    try {
      const resolved =
        typeof formDataResolver === 'function' ? formDataResolver() : cloneDeep(formDataResolver)

      if (isPromiseLike(resolved)) {
        resolved.then((result) => finalize(result)).catch((error) => {
          if (requestId !== formResolveRequestId) {
            return
          }
          console.error('[useCommonDialogForm] resolve form data failed:', error)
        })
        return
      }

      finalize(resolved)
    } catch (error) {
      if (requestId !== formResolveRequestId) {
        return
      }
      console.error('[useCommonDialogForm] resolve form data failed:', error)
    }
  }

  const dialogContext: CommonDialogFormSlotProps<T> = {
    get visible() {
      return visible.value
    },
    get loading() {
      return loading.value
    },
    open,
    close,
    toggle,
    confirm: submit,
    cancel: handleCancel,
    get formData() {
      return formData.value
    },
    submit,
    reset,
  }

  const DialogFormRenderer = defineComponent({
    name: 'CommonDialogFormProgrammatic',
    setup() {
      return () => {
        const dialogFormProps = getDialogFormProps(state)
        const header = state.header as UseCommonDialogFormOptions<T>['header']
        const footer = state.footer as UseCommonDialogFormOptions<T>['footer']

        const dialogSlots: Record<string, () => VNodeChild> = {}
        if (header) {
          dialogSlots.header = () => header(dialogContext)
        }
        if (footer) {
          dialogSlots.footer = () => footer(dialogContext)
        }

        return h(
          CommonDialogForm,
          {
            ref: dialogFormRef,
            ...dialogFormProps,
            modelValue: visible.value,
            'onUpdate:modelValue': (value: boolean) => {
              visible.value = value
            },
            loading: loading.value,
            'onUpdate:loading': (value: boolean) => {
              loading.value = value
            },
            onSubmit: (nextFormData: CommonFormExpose<AnyObject>['formData']) =>
              handleSubmit(nextFormData as CommonFormExpose<T>['formData']),
            onReset: (nextFormData: CommonFormExpose<AnyObject>['formData']) =>
              handleReset(nextFormData as CommonFormExpose<T>['formData']),
            onCancel: handleCancel,
            onClosed: handleClosed,
          },
          dialogSlots,
        )
      }
    },
  })

  function ensureMounted() {
    if (mounted || typeof document === 'undefined') {
      return
    }

    container = document.createElement('div')
    document.body.appendChild(container)

    const vnode = createVNode(DialogFormRenderer)
    if (appContext) {
      vnode.appContext = appContext
    }

    render(vnode, container)
    mounted = true
  }

  async function submit() {
    await dialogFormRef.value?.submit()
  }

  function reset() {
    dialogFormRef.value?.reset()
  }

  async function handleSubmit(nextFormData: CommonFormExpose<T>['formData']) {
    if (!state.onSubmit) {
      if (state.confirmAutoClose !== false) {
        close()
      }
      return
    }

    loading.value = true
    try {
      const shouldClose = await state.onSubmit(nextFormData, dialogContext)
      if (state.confirmAutoClose !== false && shouldClose !== false) {
        close()
      }
    } finally {
      loading.value = false
    }
  }

  async function handleReset(nextFormData?: CommonFormExpose<T>['formData']) {
    await state.onReset?.(nextFormData ?? formData.value, dialogContext)
  }

  async function handleCancel() {
    await state.onCancel?.(dialogContext)
  }

  async function handleClosed() {
    await state.onClosed?.(dialogContext)
    if (state.destroyOnClosed) {
      destroy()
    }
  }

  const validate: CommonDialogFormExpose<T>['validate'] = (callback) => {
    if (!dialogFormRef.value) {
      return Promise.resolve(true)
    }
    return dialogFormRef.value.validate(callback)
  }

  const validateField: CommonDialogFormExpose<T>['validateField'] = (props, callback) => {
    if (!dialogFormRef.value) {
      return Promise.resolve(true)
    }
    return dialogFormRef.value.validateField(props, callback)
  }

  const resetFields: CommonDialogFormExpose<T>['resetFields'] = (props) => {
    dialogFormRef.value?.resetFields(props)
  }

  const clearValidate: CommonDialogFormExpose<T>['clearValidate'] = (props) => {
    dialogFormRef.value?.clearValidate(props)
  }

  const scrollToField: CommonDialogFormExpose<T>['scrollToField'] = (prop) => {
    dialogFormRef.value?.scrollToField(prop)
  }

  return {
    visible,
    loading,
    formData,
    open,
    close,
    toggle,
    update,
    setFormData,
    destroy,
    setLoading,
    submit,
    reset,
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField,
  }
}

function getDialogFormProps<T extends AnyObject>(options: InternalDialogFormState<T>) {
  const dialogFormProps = { ...(options as Record<string, unknown>) }
  delete dialogFormProps.header
  delete dialogFormProps.footer
  delete dialogFormProps.onSubmit
  delete dialogFormProps.onReset
  delete dialogFormProps.onCancel
  delete dialogFormProps.onClosed
  delete dialogFormProps.confirmAutoClose
  delete dialogFormProps.destroyOnClosed
  return dialogFormProps
}

function normalizeOptions<T extends AnyObject>(options: Partial<UseCommonDialogFormOptions<T>>) {
  const nextOptions = { ...(options as Record<string, unknown>) }
  const nextForm = nextOptions.form as UseCommonDialogFormOptions<T>['form']

  if (nextForm === undefined || Array.isArray(nextForm)) {
    return {
      nextOptions,
      formDataResolver: undefined,
    }
  }

  delete nextOptions.form

  return {
    nextOptions,
    formDataResolver: nextForm,
  }
}

function isPromiseLike<T>(value: T | PromiseLike<T>): value is PromiseLike<T> {
  return typeof value === 'object' && value !== null && 'then' in value
}
