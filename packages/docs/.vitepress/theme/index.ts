// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { watch } from 'vue'
import { useData } from 'vitepress'
import './style.css'
import 'virtual:group-icons.css'

// 导入组件库样式（已包含 Element Plus 组件样式）
import '@yetuzi/vue3-query-components/dist/style.css'

// 导入 Element Plus 暗色主题变量（组件库 CSS 不包含暗色主题）
import 'element-plus/theme-chalk/dark/css-vars.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 在这里可以进行应用级别的增强
    // 例如：注册全局组件、添加指令等
  },
  setup() {
    const { isDark } = useData()

    // 监听 VitePress 主题变化，自动切换 Element Plus 暗色主题
    watch(isDark, (newValue) => {
      const html = document.documentElement

      // Element Plus 通过 html.dark 类名自动切换暗色主题
      if (newValue) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }, { immediate: true })
  }
}

export default theme
