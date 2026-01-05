import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    // 使用 libInjectCss 插件来处理 CSS 导入
    // 这个插件会自动将 CSS 导入从 JS 中移除并合并到 CSS 文件中
    libInjectCss(),
    // 生成类型声明文件
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],

  // CSS 配置
  css: {
    // 启用 CSS 模块
    modules: false,
    // PostCSS 配置
    postcss: {},
    // CSS 预处理器配置
    preprocessorOptions: {},
    // 确保所有 CSS 被处理
    devSourcemap: false,
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3QueryComponents',
      formats: ['es'],
      fileName: 'index',
    },

    rollupOptions: {
      // 外部化依赖 - 不打包进库，CSS样式由 unplugin-element-plus 自动处理
      external: (id) => {
        // 外部化主要的JS依赖
        if (id === 'vue' || id === 'element-plus') {
          return true
        }
        // 其他所有element-plus子模块都外部化
        if (id.startsWith('element-plus/')) {
          return true
        }
        // 外部化 CSS 导入，避免它们被打包到 JS 中
        if (id.includes('element-plus') && id.includes('style')) {
          return false
        }
        return false
      },
      output: {
        entryFileNames: 'index.js',
        exports: 'named',
        preserveModules: false,
        // 优化输出
        compact: true,

        // 确保 CSS 文件名一致
        assetFileNames: (assetInfo) => {
          // 根据 Rollup 文档，使用 names 数组替代已弃用的 name 属性
          // assetInfo.names 是一个字符串数组，包含资产的原始文件名
          if (assetInfo.names?.some(name => name.includes('style'))) {
            return 'index.css'
          }
          // 对于其他资源，返回第一个名称或默认模式
          return assetInfo.names?.[0] || 'assets/[name].[ext]'
        },
        // 手动处理 CSS
        manualChunks: undefined,
      },
    },

    // 目标环境
    target: ['es2015', 'chrome58', 'firefox57', 'safari11'],

    // 优化配置 - 使用 esbuild 压缩器，更快更高效
    minify: 'esbuild',

    // 源码映射 - 开发调试用
    sourcemap: true,

    // 清空输出目录
    emptyOutDir: true,

    // 构建报告
    reportCompressedSize: true,

    // 构建限制
    chunkSizeWarningLimit: 1000,
  },

  // 环境变量定义
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
})
