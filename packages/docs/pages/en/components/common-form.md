---
title: CommonForm
---

# CommonForm Form Component

A dynamic form generator based on configuration, supporting multiple form element types with built-in submit and reset functionality. Quickly generate complex form interfaces through simple configuration.

## Basic Usage

<demo vue="CommonForm/basic.vue" ssg="true"/>

## Form Validation

CommonForm fully supports Element Plus form validation rules.

<demo vue="CommonForm/validation.vue" ssg="true"/>

## Layout Modes

### Inline Form

<demo vue="CommonForm/inline.vue" ssg="true"/>

### Label Position

<demo vue="CommonForm/label-position.vue" ssg="true"/>

## Custom Slots

<demo vue="CommonForm/slot.vue" ssg="true"/>

## Dynamic Form

<demo vue="CommonForm/dynamic.vue" ssg="true"/>

## Custom Component Integration

<demo vue="CommonForm/custom-component.vue" ssg="true"/>

## API

### Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| form | Form configuration array | `CommonFormItemArray<T>` | `[]` |
| loading | Loading state | `boolean` | `false` |
| inline | Inline form | `boolean` | `true` |

For complete API documentation, refer to the [Chinese documentation](/components/common-form) or source code.
