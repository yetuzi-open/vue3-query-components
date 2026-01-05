import { postcssIsolateStyles } from 'vitepress'

export default {
  plugins: [
    postcssIsolateStyles({
      // 默认包含 [/vp-doc\.css/, /base\.css/]
      // 可以根据需要自定义包含的文件
      includeFiles: [/vp-doc\.css/, /base\.css/]
    })
  ]
}