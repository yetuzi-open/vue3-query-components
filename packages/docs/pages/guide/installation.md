# 安装

## 环境要求

- Vue 3.4+
- Element Plus 2.11+
- TypeScript 5.9+ (推荐)

## 安装方式

::: code-group

```sh [npm]
npm install @yetuzi/vue3-query-components element-plus
```

```sh [yarn]
yarn add @yetuzi/vue3-query-components element-plus
```

```sh  [pnpm]
pnpm add @yetuzi/vue3-query-components element-plus
```

:::

> 说明
> `vue` 和 `element-plus` 是 peer dependencies，需要由宿主项目自行安装。

## 引入CSS

```sh  [main.ts]
import '@yetuzi/vue3-query-components/dist/index.css'
```

## 仓库内联调

如果你正在这个 monorepo 里开发组件库，并且希望 `packages/docs` 里的示例直接联调 `packages/components` 源码，可以直接在仓库根目录运行：

```sh
npm run dev
```

说明：

- 开发模式下，`packages/docs` 中的 `@yetuzi/vue3-query-components` 会自动指向 `packages/components/src/index.ts`
- 文档示例里的组件逻辑修改会直接从源码生效，便于调试
- 组件库样式仍然使用 `packages/components/dist/index.css`，因此推荐使用根目录的 `npm run dev`，它会同时启动组件库 watch 和文档站点
- 如果只单独运行 `packages/docs`，脚本逻辑可以联调，但样式变更可能不会同步更新

## 浏览器兼容性

- 现代浏览器，支持 ES2018+ 和 ES Modules
- 不支持 IE 浏览器

## 版本说明

| 版本 | Vue 版本 | Element Plus 版本 |
|-----|---------|------------------|
| 1.x | 3.4+ | 2.11+ |
