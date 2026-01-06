# 更新日志

## [1.2.0] - 2025-01-06

### 优化
- ✨ CommonForm - 优化类型命名，提升代码可读性
  - `CommonFormPropForm` → `CommonFormItemArray`
  - `CommonFormSupplement` → `CommonFormItemBase`
  - `CommonFormCustomComponentsItem` → `CommonFormCustomItem`
- ✨ CommonTable - 优化类型命名，与 CommonForm 保持一致
  - `TableColumnSupplement` → `TableColumnBase`
- 📝 为所有类型定义添加详细的 JSDoc 注释
- 📝 添加类型参数说明和使用示例
- 📝 改善 IDE 智能提示体验

### 文档
- 📝 优化文档内容和结构
- 📝 添加 CSS 引入说明
- 📝 修复文档中的无效 demo 标签

### 修复
- 🔧 替换 sass 为 sass-embedded，解决 Dart Sass 弃用警告
- 🔧 更新依赖锁定文件

## [1.1.38] - 2024-12-XX

### 重构
- ♻️ 重构 CommonTable 类型系统
- ♻️ 重构 CommonForm 类型系统

### 新增
- 🔧 添加 vue-component-type-helpers 依赖

## [1.0.4] - 2024-12-11

### 修复
- 🔧 修复 Element Plus 组件样式缺失问题
- 📝 为所有组件手动添加对应的 Element Plus CSS 导入

### 优化
- ✨ CommonQueryTable - 添加 ElLoading 样式
- ✨ CommonTable - 添加 ElTable、ElEmpty、ElTableColumn 样式
- ✨ CommonForm - 添加 ElForm、ElFormItem、ElButton 样式
- ✨ CommonInput - 添加 ElInput 样式
- ✨ CommonSelect - 添加 ElSelect、ElOption 样式
- ✨ CommonDatePicker - 添加 ElDatePicker 样式
- ✨ CommonPagination - 添加 ElPagination 样式
- ✨ CommonRadio - 添加 ElRadioGroup、ElRadio 样式
- ✨ CommonCheckbox - 添加 ElCheckboxGroup、ElCheckbox 样式
- ✨ CommonSwitch - 添加 ElSwitch 样式
- ✨ CommonButton - 添加 ElButton 样式

## [1.0.1] - 2024-12-10

### 更新
- 📝 更新 README.md 包名引用
- ✨ 完善文档和使用示例
- 🔧 优化组件配置系统

## [1.0.0] - 2024-12-09

### 新增
- 🎉 vue3-query-components 初始版本发布
- ✨ CommonTable 查询表格组件
  - 支持分页配置
  - 支持自定义表头样式
  - 支持数据加载状态
  - 支持空数据占位符
- ✨ CommonForm 通用表单组件
  - 支持多种表单控件类型
  - 支持表单验证
  - 支持搜索和重置功能
  - 支持自定义布局
- 🔧 工具函数库
  - 日期格式化工具
  - 数据处理工具
  - 通用验证工具
- 🎯 Vue 3 Composition API Hooks
  - useTable 表格 hooks
  - useForm 表单 hooks
  - useHttp 请求 hooks
- 📦 TypeScript 支持
  - 完整的类型定义
  - 类型推导支持
- 🎨 Element Plus 主题集成
  - 自定义主题配置
  - 响应式设计支持

### 技术栈
- Vue 3.5+
- Element Plus 2.11+
- TypeScript 5.9+
- Vite 6.0+
- alova 3.3+ (HTTP 客户端)
- dayjs 1.11+ (日期处理)
- lodash-es 4.17+ (工具函数)
- vue-hooks-plus 2.4+ (Vue Hooks)

### 特性
- 📦 开箱即用
- 🎨 基于 Element Plus 设计
- 🔧 高度可配置
- 📝 TypeScript 支持
- 🌳 树摇优化
- 🔥 热更新支持（开发模式）