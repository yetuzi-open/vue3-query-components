import {
  createVNode,
  defineComponent,
  getCurrentInstance,
  h,
  reactive,
  ref,
  render,
  type AppContext,
  type Ref,
  type VNodeChild,
} from 'vue'
import { CommonDialog } from '../components/CommonDialog'
import type {
  CommonDialogProps,
  CommonDialogRenderContent,
  CommonDialogSlotProps,
} from '../components/CommonDialog'

type Awaitable<T> = T | Promise<T>

export interface UseCommonDialogOptions extends Partial<Omit<CommonDialogProps, 'modelValue'>> {
  content?: CommonDialogRenderContent
  footer?: (context: CommonDialogSlotProps) => VNodeChild
  onConfirm?: (context: CommonDialogSlotProps) => Awaitable<boolean | void>
  onCancel?: (context: CommonDialogSlotProps) => Awaitable<void>
  onClosed?: (context: CommonDialogSlotProps) => Awaitable<void>
  confirmAutoClose?: boolean
  destroyOnClosed?: boolean
}

export interface UseCommonDialogReturn {
  visible: Ref<boolean>
  loading: Ref<boolean>
  open: (options?: Partial<UseCommonDialogOptions>) => void
  close: () => void
  toggle: (visible?: boolean) => void
  update: (options: Partial<UseCommonDialogOptions>) => void
  destroy: () => void
  setLoading: (value: boolean) => void
}

type InternalDialogState = UseCommonDialogOptions & Record<string, unknown>

const dialogStateDefaults = {
  showFooter: true,
  showCancelButton: true,
  showConfirmButton: true,
  modal: true,
  showClose: true,
  destroyOnClose: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  lockScroll: true,
  confirmAutoClose: true,
  destroyOnClosed: true,
} satisfies Record<string, unknown>

export function useCommonDialog(initialOptions: UseCommonDialogOptions = {}): UseCommonDialogReturn {
  const visible = ref(false)
  const loading = ref(false)
  const currentInstance = getCurrentInstance()
  const appContext = currentInstance
    ? ({
        ...currentInstance.appContext,
        provides: (currentInstance as any).provides,
      } as AppContext)
    : undefined

  const state = reactive({
    ...dialogStateDefaults,
    ...(initialOptions as Record<string, unknown>),
  }) as InternalDialogState

  let container: HTMLDivElement | null = null
  let mounted = false

  function open(options: Partial<UseCommonDialogOptions> = {}) {
    update(options)
    ensureMounted()
    visible.value = true
  }

  function close() {
    visible.value = false
  }

  function toggle(nextVisible = !visible.value) {
    visible.value = nextVisible
  }

  function update(options: Partial<UseCommonDialogOptions>) {
    Object.assign(state, options)
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function destroy() {
    visible.value = false
    loading.value = false
    if (container) {
      render(null, container)
      container.remove()
      container = null
    }
    mounted = false
  }

  const dialogContext: CommonDialogSlotProps = {
    get visible() {
      return visible.value
    },
    get loading() {
      return loading.value
    },
    open,
    close,
    toggle,
    confirm: handleConfirm,
    cancel: handleCancel,
  }

  const DialogRenderer = defineComponent({
    name: 'CommonDialogProgrammatic',
    setup() {
      return () => {
        const content = state.content as CommonDialogRenderContent | undefined
        const footer = state.footer as UseCommonDialogOptions['footer']
        const dialogProps = getDialogProps(state)

        const dialogSlots: Record<string, () => VNodeChild> = {}
        if (content) {
          dialogSlots.default = () => renderContent(content, dialogContext)
        }
        if (footer) {
          dialogSlots.footer = () => footer(dialogContext)
        }

        return h(
          CommonDialog,
          {
            ...dialogProps,
            modelValue: visible.value,
            'onUpdate:modelValue': (value: boolean) => {
              visible.value = value
            },
            loading: loading.value,
            'onUpdate:loading': (value: boolean) => {
              loading.value = value
            },
            onConfirm: handleConfirm,
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

    const vnode = createVNode(DialogRenderer)
    if (appContext) {
      vnode.appContext = appContext
    }

    render(vnode, container)
    mounted = true
  }

  async function handleConfirm() {
    if (!state.onConfirm) {
      if (state.confirmAutoClose !== false) {
        close()
      }
      return
    }

    loading.value = true
    try {
      const shouldClose = await state.onConfirm(dialogContext)
      if (state.confirmAutoClose !== false && shouldClose !== false) {
        close()
      }
    } finally {
      loading.value = false
    }
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

  return {
    visible,
    loading,
    open,
    close,
    toggle,
    update,
    destroy,
    setLoading,
  }
}

function renderContent(content: CommonDialogRenderContent, context: CommonDialogSlotProps) {
  if (typeof content === 'function') {
    return content(context)
  }
  return content
}

function getDialogProps(options: InternalDialogState) {
  const dialogProps = { ...(options as Record<string, unknown>) }
  delete dialogProps.content
  delete dialogProps.footer
  delete dialogProps.onConfirm
  delete dialogProps.onCancel
  delete dialogProps.onClosed
  delete dialogProps.confirmAutoClose
  delete dialogProps.destroyOnClosed
  return dialogProps
}
