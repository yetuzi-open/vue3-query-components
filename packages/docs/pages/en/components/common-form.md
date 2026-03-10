---
title: CommonForm
---

# CommonForm

`CommonForm` is a configuration-driven dynamic form component for search, edit, create, and approval scenarios. You only maintain field config and the component handles the rendering structure.

Key features:

- Generates form structure from configuration
- Includes common built-in field types
- Supports Element Plus validation rules
- Supports named slots for custom field rendering
- Exposes `FormInstance` methods and `formData` through `ref`

## Basic Usage

<demo vue="CommonForm/basic.vue" ssg="true"/>

## Validation

Validation rules can be declared directly in field config.

<demo vue="CommonForm/validation.vue" ssg="true"/>

## Layouts

### Inline Form

Useful for lightweight search bars and filters.

<demo vue="CommonForm/inline.vue" ssg="true"/>

### Label Position

Supports `left`, `right`, and `top` label positions.

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## Custom Slots

Use the field `prop` as the slot name to customize a single field.

<demo vue="CommonForm/slot.vue" ssg="true"/>

## Dynamic Form

Fields can be added or removed based on current form values.

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## Custom Components

You can also pass any Vue component directly as a form control.

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## Exposed Methods

Use `ref` to access internal `FormInstance` methods and current form data.

<demo vue="CommonForm/expose.vue" ssg="true"/>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `form` | Form item configuration array | `CommonFormItemArray<T>` | `[]` |
| `loading` | Submit button loading state, supports `v-model:loading` | `boolean` | `false` |
| `inline` | Whether to render as an inline form | `boolean` | `true` |

> The component also supports most native Element Plus `ElForm` props such as `label-width`, `label-position`, `size`, and `disabled`.

### Form Item Config

| Field | Description | Type |
| --- | --- | --- |
| `is` | Field component type, built-in string key or custom component | `string \| Component` |
| `label` | Field label | `string` |
| `prop` | Field name | `string \| keyof T` |
| `props` | Props passed to the field component | `object` |
| `initialValue` | Initial field value | `any` |
| `formItem` | Extra config passed to `ElFormItem` | `Partial<FormItemProps>` |

### Built-in Field Types

- `input`
- `input-number`
- `select`
- `date-picker`
- `time-picker`
- `cascader`
- `radio`
- `check-box`
- `switch`

### Slots

Slot names match the field `prop`.

| Param | Description |
| --- | --- |
| `props` | Current field `props` config |
| `value` | Current field value |
| `updateValue` | Function that updates the field value |

### Exposes

| Name | Description |
| --- | --- |
| `formData` | Current reactive form data |
| `validate` | Validate the whole form |
| `validateField` | Validate a specific field |
| `resetFields` | Reset all fields |
| `clearValidate` | Clear validation state |
| `scrollToField` | Scroll to a specific field |

## TypeScript Types

```ts
import type {
  CommonFormProps,
  CommonFormItemArray,
  CommonFormExpose,
} from '@yetuzi/vue3-query-components'
```

```ts
interface CommonFormProps<T> {
  form?: CommonFormItemArray<T>
}

interface CommonFormExpose<T> extends FormInstance {
  formData: Reactive<CommonFormData<T>>
}
```

## References

- [Element Plus Form](https://element-plus.org/en-US/component/form.html)
