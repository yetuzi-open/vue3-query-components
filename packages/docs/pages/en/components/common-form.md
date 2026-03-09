---
title: CommonForm
---

# CommonForm

`CommonForm` is a configuration-driven dynamic form component for search forms, edit forms, and data entry scenarios.

Key features:

- Builds form structure from configuration
- Includes common built-in form field types
- Supports Element Plus form validation
- Supports named slots for custom field rendering
- Exposes `FormInstance` methods and `formData` through `ref`

## Basic Usage

<demo vue="CommonForm/basic.vue" ssg="true"/>

## Validation

Validation rules can be defined directly in each form item config.

<demo vue="CommonForm/validation.vue" ssg="true"/>

## Layout

### Inline Form

Useful for search form scenarios.

<demo vue="CommonForm/inline.vue" ssg="true"/>

### Label Position

Supports `left`, `right`, and `top` label positions.

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## Custom Slots

Use the field `prop` as the slot name to customize rendering.

<demo vue="CommonForm/slot.vue" ssg="true"/>

## Dynamic Form

You can dynamically add or remove fields based on current form values.

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## Custom Component Integration

You can pass any Vue component through `is`, or integrate custom controls through slots.

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## Exposed Methods

Use `ref` to access `FormInstance` methods and `formData`.

<demo vue="CommonForm/expose.vue" ssg="true"/>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `form` | Form item configuration array | `CommonFormItemArray<T>` | `[]` |
| `loading` | Submit button loading state, supports `v-model:loading` | `boolean` | `false` |
| `inline` | Whether to render as inline form | `boolean` | `true` |

> In addition to the props above, the component also supports most native Element Plus `ElForm` props, such as `label-width`, `label-position`, `size`, and `disabled`.

### Form Item Config

| Field | Description | Type |
| --- | --- | --- |
| `is` | Component type, supports built-in strings or custom components | `string \| Component` |
| `label` | Field label | `string` |
| `prop` | Field name | `string \| keyof T` |
| `props` | Props passed to the component | `object` |
| `initialValue` | Initial value | `any` |
| `formItem` | Extra config passed to `ElFormItem` | `Partial<FormItemProps>` |

### Built-in Types

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
| `updateValue` | Function to update the field value |

### Exposes

`CommonForm` exposes all `FormInstance` methods and also provides:

| Name | Description |
| --- | --- |
| `formData` | Current reactive form data object |

## TypeScript Types

```ts
interface CommonFormProps<T> {
  form?: CommonFormItemArray<T>
}

type CommonFormItemArray<T> = Array<
  | CommonFormSelectItem<T>
  | CommonFormInputItem<T>
  | CommonFormInputNumberItem<T>
  | CommonFormDatePickerItem<T>
  | CommonFormTimePickerItem<T>
  | CommonFormCascaderItem<T>
  | CommonFormRadioItem<T>
  | CommonFormCustomItem<T>
  | CommonFormCheckboxItem<T>
  | CommonFormSwitchItem<T>
>

interface CommonFormExpose<T> extends FormInstance {
  formData: Reactive<CommonFormData<T>>
}
```