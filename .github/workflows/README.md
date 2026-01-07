# CI/CD 说明

本项目使用 GitHub Actions 自动构建和部署文档到 GitHub Pages。

## 🚀 工作流程

当 `docs` 分支的代码有变化时，会自动触发以下流程：

1. **构建组件库** - 构建组件库到 `packages/components/dist`
2. **构建文档站点** - 使用 VitePress 构建文档
3. **部署到 GitHub Pages** - 自动部署到 GitHub Pages

## 📝 使用方法

### 方法一：推荐 - 使用专用分支

1. **创建并切换到 `docs` 分支**：
   ```bash
   git checkout -b docs
   ```

2. **修改文档内容**：
   - 在 `packages/docs/` 目录下修改文档
   - 可以修改示例、页面内容等

3. **提交并推送到 `docs` 分支**：
   ```bash
   git add packages/docs/
   git commit -m "docs: 更新文档内容"
   git push origin docs
   ```

4. **等待 GitHub Actions 自动构建部署**
   - 访问 https://github.com/yetuzi-open/vue3-query-components/actions 查看构建状态
   - 构建成功后，文档会自动发布到 GitHub Pages

### 方法二：手动触发

1. 访问 GitHub Actions 页面
2. 选择 "Deploy Docs to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮
4. 选择分支并运行

## 🔧 配置说明

### 触发条件

工作流在以下情况触发：

- 推送代码到 `docs` 分支
- 且修改了以下路径的文件：
  - `packages/docs/**`
  - `.github/workflows/deploy-docs.yml`

### 构建环境

- **Node.js**: v22
- **包管理器**: npm
- **构建命令**:
  - `npm run build:components` - 构建组件库
  - `npm run build:docs` - 构建文档站点

### 部署配置

- **部署目标**: GitHub Pages
- **构建产物目录**: `packages/docs/.vitepress/dist`
- **并发控制**: 自动取消之前的构建

## 📦 注意事项

### 组件库版本

在 CI/CD 环境中，文档使用的是**构建后的组件库**（`packages/components/dist`），而不是源码。

如果需要使用最新的组件库功能，请确保：

1. 组件库已构建（`npm run build:components`）
2. 构建产物已提交到 `docs` 分支

### 本地预览

在推送之前，建议先本地预览：

```bash
# 构建组件库
npm run build:components

# 启动文档预览
cd packages/docs
npm run dev
```

### 构建失败排查

如果构建失败，检查以下内容：

1. **Node.js 版本**：确保本地和 CI 环境版本一致
2. **依赖安装**：确保 `package-lock.json` 已提交
3. **构建脚本**：确保 `npm run build:docs` 可以正常执行
4. **TypeScript 错误**：组件库类型检查通过

## 🌐 访问地址

文档发布后，可以通过以下地址访问：

- **GitHub Pages**: `https://yetuzi-open.github.io/vue3-query-components/`
- **Gitee Pages**: 需要单独配置（参考 Gitee Pages 文档）

## 🔄 开发流程

推荐的开发工作流程：

```bash
# 1. 在 main 分支开发组件库功能
git checkout main
# ... 修改组件库代码 ...

# 2. 提交组件库修改
git add packages/components/
git commit -m "feat: 添加新功能"
git push

# 3. 切换到 docs 分支更新文档
git checkout docs
git merge main

# 4. 更新文档
# ... 修改文档内容 ...

# 5. 提交文档修改
git add packages/docs/
git commit -m "docs: 更新组件文档"
git push origin docs

# 6. GitHub Actions 自动构建部署
# 等待构建完成...
```

## 🛠️ 故障排除

### 构建超时

如果构建超时，可以：

1. 增加构建超时时间
2. 优化构建脚本
3. 减少不必要的依赖

### 类型错误

如果遇到 TypeScript 类型错误：

```bash
# 本地运行类型检查
npm run type-check

# 修复错误后再推送
```

### 权限问题

确保 GitHub 仓库配置：

1. Settings → Pages → Source 选择 "GitHub Actions"
2. Settings → Actions → General → Workflow permissions
   - 勾选 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"
