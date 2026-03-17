---
title: CommonDialogForm
---

# CommonDialogForm 弹窗表单组件

`CommonDialogForm` 将 `CommonDialog` 和 `CommonForm` 组合为一个组件，适合新增、编辑、审批等需要在弹窗内完成录入和校验的场景。

主要特性：

- 透传大部分 `CommonDialog` 原生属性和行为
- 通过 `form` + `formProps` 复用 `CommonForm` 的配置驱动模式
- 默认将提交、重置、取消操作收敛到弹窗底部
- 通过 `ref` 同时访问弹窗控制方法和表单校验方法
- 支持通过 `useCommonDialogForm()` 进行函数式调用

## 基础用法

<demo vue="CommonDialogForm/basic.vue" ssg="true"/>

## 函数式调用

适合从表格操作列、工具栏按钮里直接打开新增/编辑弹窗，不需要额外维护模板中的显隐状态。

<demo vue="CommonDialogForm/use-dialog-form.vue" ssg="true"/>

## 编辑回填

常见于表格操作列点击“编辑”后，先根据当前行数据动态生成表单配置，再通过 `open()` 打开弹窗。

<demo vue="CommonDialogForm/edit-backfill.vue" ssg="true"/>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 控制弹窗显示隐藏 | `boolean` | `false` |
| `v-model:loading` | 确认按钮 loading 状态 | `boolean` | `false` |
| `form` | 表单项配置数组 | `CommonFormItemArray<T>` | `[]` |
| `formData` | 独立传入的表单值，优先级高于 `initialValue` | `Partial<CommonFormData<T>>` | - |
| `formProps` | 透传给内部 `CommonForm` 的属性 | `Partial<Omit<CommonFormProps<T>, 'form' \| 'formData' \| 'showActionButtons'>>` | `{}` |
| `showResetButton` | 是否显示重置按钮 | `boolean` | `false` |
| `resetText` | 重置按钮文案 | `string` | `config.component.form.resetText` |
| `resetButtonProps` | 透传给重置按钮的属性 | `Partial<CommonButtonProps>` | `{}` |

> 组件还支持大部分 `CommonDialog` 属性，例如 `title`、`width`、`fullscreen`、`destroy-on-close`、`close-on-click-modal` 等。
>
> 当同时传入 `formData` 和字段 `initialValue` 时，以 `formData` 为准；点击重置或调用 `reset()` / `resetFields()` 时，会回到最近一次传入的 `formData`。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `submit` | 点击确认并通过表单校验后触发 | `(formData) => void` |
| `reset` | 点击重置按钮后触发 | `(formData) => void` |
| `cancel` | 点击取消按钮后触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `header` | 自定义弹窗头部 |
| `footer` | 自定义弹窗底部 |
| `字段 prop` | 与 `CommonForm` 一致，按字段名覆盖单个表单项渲染 |

### Exposes

| 名称 | 说明 |
| --- | --- |
| `open` | 打开弹窗 |
| `close` | 关闭弹窗 |
| `toggle` | 切换弹窗显示状态 |
| `formData` | 当前响应式表单数据 |
| `submit` | 手动触发表单校验并提交 |
| `reset` | 重置表单到初始值 |
| `validate` | 校验整个表单 |
| `validateField` | 校验指定字段 |
| `resetFields` | 重置表单 |
| `clearValidate` | 清除校验结果 |
| `scrollToField` | 滚动到指定字段 |

## useCommonDialogForm

```ts
import { useCommonDialogForm } from '@yetuzi/vue3-query-components'
```

```ts
const dialog = useCommonDialogForm({
  title: '新增成员',
  width: '560px',
  form: formItems,
  formProps: {
    labelWidth: '88px',
  },
  async onSubmit(formData) {
    await api.save(formData)
  },
})

dialog.open({ title: '编辑成员', form: formItems })
dialog.open({
  title: '编辑成员',
  form: () => api.getDetail(id),
})
await dialog.submit()
dialog.close()
dialog.destroy()
```

### useCommonDialogForm 参数

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `title` | 弹窗标题 | `string` |
| `form` | 表单项配置数组，或表单值对象/同步函数/异步函数 | `CommonFormItemArray<T> \| Partial<CommonFormData<T>> \| (() => Partial<CommonFormData<T>> \| Promise<Partial<CommonFormData<T>>>)` |
| `formData` | 独立传入的表单值，适合编辑详情回填 | `Partial<CommonFormData<T>>` |
| `formProps` | 透传给内部 `CommonForm` 的属性 | `Partial<Omit<CommonFormProps<T>, 'form' \| 'formData' \| 'showActionButtons'>>` |
| `header` | 自定义头部渲染函数 | `(context) => VNodeChild` |
| `footer` | 自定义底部渲染函数 | `(context) => VNodeChild` |
| `onSubmit` | 提交后的回调，返回 `false` 可阻止自动关闭 | `(formData, context) => boolean \| void \| Promise<boolean \| void>` |
| `onReset` | 重置后的回调 | `(formData, context) => void \| Promise<void>` |
| `onCancel` | 点击取消后的回调 | `(context) => void \| Promise<void>` |
| `onClosed` | 弹窗完全关闭后的回调 | `(context) => void \| Promise<void>` |
| `confirmAutoClose` | 提交成功后是否自动关闭 | `boolean` |
| `destroyOnClosed` | 关闭后是否销毁实例 | `boolean` |

`useCommonDialogForm` 中的 `form` 有一层额外约定：

- 传数组时：仍然表示表单项配置
- 传对象时：会被当成 `formData`
- 传函数或异步函数时：会先执行，返回值会被当成 `formData`

如果同时传了 `formData`，则以显式的 `formData` 为准。
如果要在 `open()` 里把 `form` 当成对象或函数使用，建议把表单项配置数组提前放在 hook 初始化参数里，或先通过 `update()` 设好。

### useCommonDialogForm 返回值

| 名称 | 说明 |
| --- | --- |
| `visible` | 当前弹窗显示状态 |
| `loading` | 当前确认按钮 loading 状态 |
| `formData` | 当前响应式表单数据 |
| `open` | 打开弹窗，可附带局部覆盖参数 |
| `close` | 关闭弹窗 |
| `toggle` | 切换弹窗显示状态 |
| `update` | 更新当前弹窗配置 |
| `setFormData` | 单独更新表单值，适合异步接口回填 |
| `submit` | 手动触发表单校验并提交 |
| `reset` | 重置表单 |
| `validate` | 校验整个表单 |
| `validateField` | 校验指定字段 |
| `resetFields` | 重置指定字段 |
| `clearValidate` | 清除校验结果 |
| `scrollToField` | 滚动到指定字段 |
| `setLoading` | 手动设置 loading 状态 |
| `destroy` | 销毁函数式实例 |

## TypeScript 类型

```ts
import type {
  CommonDialogFormProps,
  CommonDialogFormExpose,
  CommonDialogFormSlotProps,
  UseCommonDialogFormOptions,
  UseCommonDialogFormReturn,
} from '@yetuzi/vue3-query-components'
```

## 参考

- [Element Plus Dialog](https://element-plus.org/zh-CN/component/dialog.html)
- [Element Plus Form](https://element-plus.org/zh-CN/component/form.html)
