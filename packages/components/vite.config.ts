import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import ElementPlus from "unplugin-element-plus/vite";

export default defineConfig({
  plugins: [
    vue(),
    // 自动导入 Element Plus 组件样式
    ElementPlus({
      useSource: false, // 使用编译后的样式
    }),
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
      entry: resolve(__dirname, "src/index.ts"),
      name: "Vue3QueryComponents",
      formats: ["es"],
      fileName: "index",
    },

    rollupOptions: {
      // 外部化依赖 - 只外部化 JS 模块，样式模块会被打包进组件库 CSS
      external: (id) => {
        // 外部化主要的 JS 依赖
        if (id === "vue" || id === "element-plus") {
          return true;
        }
        // 外部化 Element Plus 的 JS 模块（es/components）
        if (
          id.startsWith("element-plus/es/components/") &&
          !id.includes("/style")
        ) {
          return true;
        }
        // 外部化 Element Plus 的 JS 模块（lib）
        if (id.startsWith("element-plus/lib/") && !id.includes("/style")) {
          return true;
        }
        // 不外部化样式模块 - 让它们被打包到组件库 CSS 中
        if (id.includes("style") || id.includes("css")) {
          return false;
        }
        return false;
      },
      output: {
        entryFileNames: "index.js",
        exports: "named",
        preserveModules: false,
        // 优化输出
        compact: true,

        // 确保 CSS 文件名一致
        assetFileNames: (assetInfo) => {
          // 根据 Rollup 文档，使用 names 数组替代已弃用的 name 属性
          // assetInfo.names 是一个字符串数组，包含资产的原始文件名
          if (assetInfo.names?.some((name) => name.includes("style"))) {
            return "index.css";
          }
          // 对于其他资源，返回第一个名称或默认模式
          return assetInfo.names?.[0] || "assets/[name].[ext]";
        },
        // 手动处理 CSS
        manualChunks: undefined,
      },
    },

    // 目标环境 - 提升到 ES2020 以获得更好性能
    target: ["es2020"],

    // 优化配置 - 使用 esbuild 压缩器，更快更高效
    minify: "esbuild",

    // 源码映射 - 生产环境关闭以减小体积
    sourcemap: false,

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
});
