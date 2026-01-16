---
title: CommonConfigProvider
---

# CommonConfigProvider Global Config

Provides global configuration functionality, including pagination defaults, form text, table styles, etc.

## Dynamic Configuration

Configuration supports reactive updates and can be dynamically adjusted based on user preferences or runtime conditions:

<demo vue="CommonConfigProvider/dynamic.vue" ssg="true"/>

**Key Features:**
- Configuration objects defined with `reactive` take effect immediately after modification
- Configuration changes are reflected in real-time on wrapped components
- Suitable for dynamic scenarios such as user preference settings and theme switching

For complete API documentation, refer to the [Chinese documentation](/components/common-config-provider) or source code.
