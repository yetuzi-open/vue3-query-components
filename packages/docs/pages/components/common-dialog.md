---
title: CommonDialog
---

# CommonDialog 对话框组件

`CommonDialog` 是基于 Element Plus `ElDialog` 的业务封装，提供统一的页脚按钮、按钮 loading 状态和程序化调用能力，适合新增、编辑、确认等中后台弹窗场景。

主要特性：

- 支持组件式调用，和页面状态、表单、插槽配合使用
- 内置确认/取消按钮和 `v-model:loading`
- 支持通过 `useCommonDialog()` 进行函数式调用
- 透传大部分 Element Plus `ElDialog` 原生属性
- 支持通过 `CommonConfigProvider` 统一设置按钮文案

## 基础用法

<demo vue="CommonDialog/basic.vue" ssg="true"/>

## 函数式调用

不需要在模板中手写 `CommonDialog`，适合确认提示、导出提醒、删除确认这类轻量场景。

<demo vue="CommonDialog/use-dialog.vue" ssg="true"/>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 控制弹窗显示隐藏 | `boolean` | `false` |
| `v-model:loading` | 确认按钮 loading 状态 | `boolean` | `false` |
| `showFooter` | 是否显示默认页脚 | `boolean` | `true` |
| `showCancelButton` | 是否显示取消按钮 | `boolean` | `true` |
| `showConfirmButton` | 是否显示确认按钮 | `boolean` | `true` |
| `cancelText` | 取消按钮文案 | `string` | `config.component.dialog.cancelText` |
| `confirmText` | 确认按钮文案 | `string` | `config.component.dialog.confirmText` |
| `cancelButtonProps` | 透传给取消按钮的属性 | `Partial<CommonButtonProps>` | `{}` |
| `confirmButtonProps` | 透传给确认按钮的属性 | `Partial<CommonButtonProps>` | `{}` |

> 组件还支持大部分 Element Plus `ElDialog` 原生属性，例如 `title`、`width`、`fullscreen`、`destroy-on-close`、`close-on-click-modal` 等。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `confirm` | 点击确认按钮时触发 | `() => void` |
| `cancel` | 点击取消按钮时触发 | `() => void` |

> `close`、`closed`、`open`、`opened` 等 Element Plus 原生事件也可以继续使用。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 弹窗主体内容 |
| `header` | 自定义头部区域 |
| `footer` | 自定义底部区域 |

### Exposes

| 名称 | 说明 |
| --- | --- |
| `open` | 打开弹窗 |
| `close` | 关闭弹窗 |
| `toggle` | 切换弹窗显示状态 |

## useCommonDialog

```ts
import { useCommonDialog } from '@yetuzi/vue3-query-components'
```

```ts
const dialog = useCommonDialog({
  title: '导出提示',
  content: '将根据当前筛选条件创建导出任务。',
  async onConfirm() {
    await api.export()
  },
})

dialog.open()
dialog.update({ title: '重新导出' })
dialog.close()
dialog.destroy()
```

### useCommonDialog 参数

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `title` | 弹窗标题 | `string` |
| `content` | 主体内容，支持字符串、VNode 或渲染函数 | `CommonDialogRenderContent` |
| `footer` | 自定义底部渲染函数 | `(context) => VNodeChild` |
| `onConfirm` | 点击确认后的回调，返回 `false` 可阻止自动关闭 | `(context) => boolean \| void \| Promise<boolean \| void>` |
| `onCancel` | 点击取消后的回调 | `(context) => void \| Promise<void>` |
| `onClosed` | 弹窗完全关闭后的回调 | `(context) => void \| Promise<void>` |
| `confirmAutoClose` | 确认成功后是否自动关闭 | `boolean` |
| `destroyOnClosed` | 关闭后是否销毁实例 | `boolean` |

## TypeScript 类型

```ts
import type {
  CommonDialogProps,
  CommonDialogExpose,
  CommonDialogRenderContent,
  UseCommonDialogOptions,
  UseCommonDialogReturn,
} from '@yetuzi/vue3-query-components'
```

## 参考

- [Element Plus Dialog](https://element-plus.org/zh-CN/component/dialog.html)
