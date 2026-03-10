# CI/CD 说明

本项目使用 GitHub Actions 自动构建和部署文档到 GitHub Pages。

## 🚀 工作流程

当 `main` 分支中与组件库、文档站点或部署配置相关的代码发生变化时，会自动触发以下流程：

1. **构建组件库** - 构建组件库到 `packages/components/dist`
2. **构建文档站点** - 使用 VitePress 构建文档
3. **部署到 GitHub Pages** - 自动部署到 GitHub Pages

## 📝 使用方法

### 方法一：推荐 - 直接走主干工作流

1. **从 `main` 拉出短期开发分支**：
   ```bash
   git checkout main
   git pull origin main
   git checkout -b docs/your-change
   ```

2. **修改代码或文档内容**：
   - 组件源码位于 `packages/components/`
   - 文档与示例位于 `packages/docs/`

3. **提交并合并到 `main`**：
   ```bash
   git add .
   git commit -m "docs: 更新组件文档"
   git push origin docs/your-change
   ```

4. **等待合并到 `main` 后自动构建部署**
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

- 推送代码到 `main` 分支
- 且修改了以下路径的文件：
  - `packages/docs/**`
  - `packages/components/**`
  - `package.json`
  - `package-lock.json`
  - `.github/workflows/deploy-docs.yml`
  - `.github/workflows/README.md`

### 构建环境

- **Node.js**: 20.19.0
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

在 CI/CD 环境中，文档会先构建组件库，再构建文档站点。

如果需要使用最新的组件库功能，请确保：

1. 组件库已构建（`npm run build:components`）
2. 组件源码和文档示例已经合并到 `main`

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
# 1. 从 main 拉取最新代码
git checkout main
git pull origin main

# 2. 创建短期分支
git checkout -b feat/your-change

# 3. 开发组件或文档
# ... 修改 packages/components/ 或 packages/docs/ ...

# 4. 本地验证
npm run type-check
npm run build

# 5. 提交并推送分支
git add .
git commit -m "feat: 添加新功能"
git push origin feat/your-change

# 6. 发起 PR 合并到 main
# 7. 合并后 GitHub Actions 自动构建部署文档
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
