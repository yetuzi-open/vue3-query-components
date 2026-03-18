# 文档站点

这是 `@yetuzi/vue3-query-components` 的 VitePress 文档站点。

## 开发命令

在仓库根目录执行：

```bash
npm install
npm run dev:docs
```

如需联动组件源码，另开一个终端执行：

```bash
npm run dev:components
```

仅构建文档站点：

```bash
npm run build:docs
```

## 目录说明

- `pages/`：文档页面
- `examples/`：示例文件
- `.vitepress/`：站点配置与主题
- `update-latest.js`：把文档站点依赖的组件包版本同步到 npm 最新版

## 协作约定

- 文档和组件源码跟随 `main` 主干一起演进
- 不再维护长期 `docs` 分支
- 组件 API 变更时，需要同步更新对应页面和示例
- 正式文档部署由 GitHub Actions 在版本 tag 推送后的 release workflow 中自动触发
