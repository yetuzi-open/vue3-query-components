# NPM 包发布指南

本指南将帮助你将 `vue3-query-components` 发布到 NPM。

## 📋 发布前检查清单

### 1. 环境准备
- [ ] 已安装 Node.js (>=16.0.0)
- [ ] 已安装 npm
- [ ] 已注册 NPM 账号
- [ ] 已登录 NPM: `npm login`

### 2. 代码检查
- [ ] 代码已提交到 Git 仓库
- [ ] 所有测试通过: `npm test`
- [ ] 代码格式化完成: `npm run format`
- [ ] 无 ESLint 错误: `npm run lint`

### 3. 版本管理
- [ ] 更新 `package.json` 中的版本号
- [ ] 更新 `CHANGELOG.md` 记录变更
- [ ] 确保版本号遵循语义化版本规范

## 🚀 发布步骤

### 1. 构建项目
```bash
cd common
npm run build:full
```

### 2. 验证构建产物
```bash
# 查看将要发布的内容
npm run release:dry

# 测试本地包
npm pack
npm install ./vue3-common-components-1.0.0.tgz
```

### 3. 发布到 NPM
```bash
# 方法一：使用发布脚本（推荐）
npm run release

# 方法二：手动发布
npm publish
```

### 4. 验证发布
```bash
# 查看已发布的包
npm view vue3-common-components

# 在新项目中测试安装
npm install vue3-common-components
```

## 📝 版本管理规范

### 语义化版本号
- **主版本号 (MAJOR)**: 不兼容的 API 修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

### 版本号示例
- `1.0.0` - 初始版本
- `1.1.0` - 新增功能
- `1.1.1` - 修复 bug
- `2.0.0` - 破坏性更新

### 更新版本号命令
```bash
# 更新补丁版本
npm version patch

# 更新次版本
npm version minor

# 更新主版本
npm version major
```

## 🔧 配置说明

### package.json 关键配置
```json
{
  "name": "vue3-query-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "peerDependencies": {
    "vue": "^3.5.0",
    "element-plus": "^2.11.5"
  }
}
```

### .npmignore 配置
确保以下文件/目录被忽略：
- `node_modules/`
- `src/` (源码)
- `scripts/`
- 测试文件
- 配置文件

## 🐛 常见问题

### 1. 发布失败：包名已存在
- 选择唯一的包名
- 使用 scoped 包: `@username/package-name`

### 2. 发布失败：权限不足
- 确保已登录 NPM
- 如果发布 scoped 包，确保有权限

### 3. 构建失败
- 检查 TypeScript 错误: `npm run type-check`
- 检查依赖是否正确安装

### 4. TypeScript 类型定义问题
- 确保 `dist/index.d.ts` 存在
- 检查 `tsconfig.json` 的 `declaration` 配置

## 📚 相关链接

- [NPM 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/)
- [package.json 文档](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
- [TypeScript 声明文件](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

## 🎉 发布后

1. 更新 GitHub/Gitee 仓库的 Release
2. 通知使用者更新版本
3. 监控问题反馈和 Bug 报告
4. 准备下一个版本的迭代计划