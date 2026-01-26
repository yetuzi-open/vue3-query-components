---
title: CommonForm
---

# CommonForm Form Component

A dynamic form generator based on configuration, supporting multiple form element types with built-in submit and reset functionality. Quickly generate complex form interfaces through simple configuration, greatly improving development efficiency.

## Basic Usage

Basic form usage example, including common form elements. Configure form fields through the `form` attribute, each field supports various validation rules and property configurations.

<demo vue="CommonForm/basic.vue" ssg="true"/>

## Form Validation

CommonForm fully supports Element Plus form validation rules. You can configure `rules` property in `formItem` to implement various validation requirements, including required, length, regex, etc.

<demo vue="CommonForm/validation.vue" ssg="true"/>

## Layout Modes

### Inline Form

Set the `inline` attribute to arrange form elements horizontally, suitable for simple query form scenarios. When there are many form fields, vertical layout is recommended for better user experience.

<demo vue="CommonForm/inline.vue" ssg="true"/>

### Label Position

Adjust the label position through `labelPosition`, supporting three positions: `left`, `right`, and `top`.

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## Custom Slots

You can fully customize form item content through slots to achieve more flexible form configuration. The slot name corresponds to the `prop` attribute of the form item.

<demo vue="CommonForm/slot.vue" ssg="true"/>

## Dynamic Form

Supports dynamically showing or hiding form items based on conditions, achieving complex form interaction logic. Use computed to monitor form data changes and dynamically generate form configuration.

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## Custom Component Integration

Easily integrate any custom component through slots or the `is` attribute.

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## API

### Props

CommonForm component is a secondary wrapper based on Element Plus Form. In addition to the following custom properties, it also supports all native properties of Element Plus Form.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| form | Form configuration array, defining fields and properties of the form | `CommonFormItemArray<T>` | `[]` |
| loading | Loading state, supports v-model two-way binding | `boolean` | `false` |
| inline | Whether it's an inline form | `boolean` | `true` |

> 💡 **Note**: In addition to the custom properties above, CommonForm supports all native properties of Element Plus Form, such as `labelWidth`, `labelPosition`, `size`, `disabled`, etc. For detailed properties, please refer to [Element Plus Form Documentation](https://element-plus.org/en-US/component/form.html).

#### Form Configuration Items

Each form item supports the following configurations:

| Parameter | Description | Type |
| --- | --- | --- |
| is | Component type, supports built-in types or custom components | `string \| Component` |
| label | Form item label | `string` |
| prop | Form field name | `string \| keyof T` |
| props | Properties passed to the component | `object` |
| initialValue | Initial value | `any` |
| formItem | Configuration properties for ElFormItem | `Partial<FormItemProps>` |

#### Built-in Component Types

- `input` - Input field
- `select` - Select
- `date-picker` - Date picker
- `radio` - Radio
- `check-box` - Checkbox
- `switch` - Switch

### Slots

CommonForm supports providing custom slots for each form item, where the slot name corresponds to the `prop` attribute of the form item.

#### Slot Parameters

When using slots, the following parameters are provided:

| Parameter | Description | Type |
| --- | --- | --- |
| props | Props configured in the form item | `object` |
| value | Current form field value | `any` |
| updateValue | Function to update form field value | `(value: any) => void` |

### Exposes

CommonForm exposes form data and all Element Plus Form methods through ref, which can be called directly.

For the complete method list, please refer to [Element Plus Form Documentation](https://element-plus.org/en-US/component/form#form-exposes).

<demo vue="CommonForm/expose.vue" ssg="true"/>

#### Exposed Types

```typescript
interface CommonFormExpose<T = AnyObject> {
  // Form data object
  formData: Reactive<CommonFormData<T>>
  // All methods of ElForm
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  validateField: (props: string | string[], callback?: FormValidateCallback) => void
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
  // ... more ElForm methods
}
```

## FAQ

### Q: How to handle complex form layouts?

A: You can combine the `class` attribute of `formItem` with custom styles to achieve complex layouts. You can also use slots to customize the rendering of the entire form item.

### Q: How to control form item width?

A: Form item width is controlled by the `form.formItem.components.width` configuration in CommonConfigProvider, default is 200px. You can also override styles through CSS.

### Q: How to implement two-way binding for custom components?

A: Custom components need to accept `modelValue` prop and trigger `update:modelValue` event, or use `v-model` approach.

## TypeScript Types

The component exports the following TypeScript type definitions for direct use in your project:

### CommonFormProps

```typescript
interface CommonFormProps<T extends AnyObject> {
  /** Form item configuration array */
  form?: CommonFormItemArray<T>
}
```

### CommonFormItemArray

```typescript
/**
 * Form item type array
 * Used for CommonForm's form property, also for type annotation
 */
type CommonFormItemArray<T extends AnyObject> = Array<
  | CommonFormSelectItem<T>      // Select
  | CommonFormInputItem<T>       // Input
  | CommonFormDatePickerItem<T>  // Date picker
  | CommonFormRadioItem<T>       // Radio
  | CommonFormCustomItem<T>      // Custom component
  | CommonFormCheckboxItem<T>    // Checkbox
  | CommonFormSwitchItem<T>      // Switch
>
```

### Form Item Types

```typescript
/** Select component form item */
interface CommonFormSelectItem<T extends AnyObject>
  extends CommonFormItemBase<'select', CommonSelectProps, T> {}

/** Input component form item */
interface CommonFormInputItem<T extends AnyObject>
  extends CommonFormItemBase<'input', CommonInputProps, T> {}

/** Date picker component form item */
interface CommonFormDatePickerItem<T extends AnyObject>
  extends CommonFormItemBase<'date-picker', CommonDatePickerProps, T> {}

/** Radio component form item */
interface CommonFormRadioItem<T extends AnyObject>
  extends CommonFormItemBase<'radio', CommonRadioProps, T> {}

/** Checkbox component form item */
interface CommonFormCheckboxItem<T extends AnyObject>
  extends CommonFormItemBase<'check-box', CommonCheckboxProps, T> {}

/** Switch component form item */
interface CommonFormSwitchItem<T extends AnyObject>
  extends CommonFormItemBase<'switch', CommonSwitchProps, T> {}

/** Custom component form item */
interface CommonFormCustomItem<
  T extends AnyObject,
  C extends Component = Component,
  P = ComponentProps<C>,
> extends CommonFormItemBase<C, P, T> {}
```

### CommonFormItemBase

```typescript
/**
 * Form item base interface
 * @typeParam T - Component type
 * @typeParam P - Props type of the component
 * @typeParam D - Form data object type
 */
interface CommonFormItemBase<T, P, D extends AnyObject, V = any> {
  /** Component type identifier */
  is: T | (string & {})

  /** Form item label */
  label?: string

  /** Form field name */
  prop: keyof D | (string & {})

  /** Additional properties passed to the component */
  props?: Partial<P>

  /** Field initial value */
  initialValue?: V

  /** Additional property configuration for ElFormItem */
  formItem?: Partial<Omit<FormItemProps, 'prop' | 'label'>>
}
```

### CommonFormExpose

```typescript
/**
 * CommonForm component instance exposed type
 * Inherits all methods from Element Plus FormInstance
 */
interface CommonFormExpose<T extends AnyObject = AnyObject> extends FormInstance {
  /**
   * Form data reactive object
   * Contains current values of all form fields
   */
  formData: Reactive<CommonFormData<T>>
}
```

### CommonFormData

```typescript
/**
 * Form data type
 */
type CommonFormData<T extends AnyObject> = T & Record<string, any>
```

**Usage Example:**

```typescript
import type {
  CommonFormProps,
  CommonFormItemArray,
  CommonFormInputItem,
  CommonFormSelectItem,
} from '@yetuzi/vue3-query-components'

// Define form data type
interface MyFormData {
  name: string
  status: number
  createTime: string
}

// Define form configuration
const form: CommonFormItemArray<MyFormData> = [
  {
    is: 'input',
    prop: 'name',
    label: 'Name',
    props: {
      placeholder: 'Please enter name',
    },
  },
  {
    is: 'select',
    prop: 'status',
    label: 'Status',
    props: {
      options: [
        { label: 'Enabled', value: 1 },
        { label: 'Disabled', value: 0 },
      ],
    },
  },
]

// Use component
const formProps: CommonFormProps<MyFormData> = {
  form
}
```
