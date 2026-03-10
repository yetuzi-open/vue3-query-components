# Installation

## Requirements

- Vue 3.4+
- Element Plus 2.11+
- TypeScript 5.9+ (Recommended)

## Installation

::: code-group

```sh [npm]
npm install @yetuzi/vue3-query-components
```

```sh [yarn]
yarn add @yetuzi/vue3-query-components
```

```sh  [pnpm]
pnpm add @yetuzi/vue3-query-components
```

:::

## Import CSS

```sh  [main.ts]
import '@yetuzi/vue3-query-components/dist/style.css'
```

## Monorepo Development

If you are developing this component library inside the monorepo and want examples in `packages/docs` to use the source code from `packages/components` directly, run this at the repository root:

```sh
npm run dev
```

Notes:

- In development mode, `@yetuzi/vue3-query-components` inside `packages/docs` points to `packages/components/src/index.ts`
- Logic changes in the component source take effect directly in docs examples
- Component styles still come from `packages/components/dist/index.css`, so the recommended command is the root `npm run dev`, which starts both the component watch build and the docs site
- If you run only `packages/docs`, script logic can still be debugged, but style changes may not update in time

## Browser Compatibility

- Modern browsers with ES2018+ and ES Modules support
- No IE browser support

## Version Matrix

| Version | Vue Version | Element Plus Version |
|---------|-------------|----------------------|
| 1.x | 3.4+ | 2.11+ |
