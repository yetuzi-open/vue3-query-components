# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 VitePress 构建的 Vue3 Query Components 组件库文档站点。该站点包含了组件库的完整使用指南、API 文档和实时示例。

## 常用命令

### 开发命令
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建文档站点
- `pnpm serve` - 预览构建结果
- `pnpm preview` - 预览构建结果（同 serve）

### 包管理
- `pnpm install` - 安装依赖
- `pnpm add <package>` - 添加新依赖
- `pnpm remove <package>` - 移除依赖

## 项目架构

### 目录结构
- `docs/.vitepress/config.ts` - VitePress 主配置文件，包含导航、侧边栏、主题等配置
- `docs/pages/` - 页面文件目录
  - `guide/` - 使用指南（介绍、安装、开发指南）
  - `components/` - 组件文档，分为核心组件、基础组件和其他组件
  - `advanced/` - 进阶主题（主题定制、最佳实践）
  - `changelog/` - 更新日志
  - `index.md` - 首页

### 技术栈
- **文档框架**: VitePress 1.6.4
- **UI 框架**: Vue 3.5.25
- **组件库**: Element Plus 2.12.0 + @yetuzi/vue3-query-components
- **插件**: vitepress-plugin-tabs（用于 Tab 选项卡）

### 重要配置
- 页面源码目录：`srcDir: 'pages'`（在 .vitepress/config.ts 中配置）
- 使用了 vitepress-plugin-tabs 插件支持 Tab 选项卡功能
- 已配置 Element Plus 的优化依赖

### 组件文档特点
- 所有组件文档都包含实时示例（使用 `<script setup>` 语法）
- 使用 Tabs 插件展示不同安装方式的代码示例
- 文档中直接引用 @yetuzi/vue3-query-components 组件进行演示

## 注意事项

- 页面文件应放在 `docs/pages/` 目录下
- 组件示例中使用 `<script setup>` 语法糖
- 文档中使用 `::: tabs` 语法创建选项卡
- 图片和静态资源应放在 `docs/public/` 目录下
- 所有组件文档都应包含实时示例和完整的 API 说明