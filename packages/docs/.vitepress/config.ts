import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import path from 'path'
import { readFileSync } from 'fs'

const componentsPackageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../../components/package.json'), 'utf8'),
)
const siteTitle = 'Vue3 Query Components'
const siteDescription = '一个专注于企业级查询页面的 Vue3 组件库'
const siteUrl = 'https://yetuzi-open.github.io'
const siteBase = '/vue3-query-components/'
const siteOgImage = `${siteUrl}${siteBase}logo.svg`
const version = componentsPackageJson.version
const isDev = process.argv.includes('dev')
const currentYear = new Date().getFullYear()
const giteeSocialIcon = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>Gitee</title>
  <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" />
  <path
    fill="#fff"
    d="M9 7.5A2.5 2.5 0 0 0 6.5 10v4A2.5 2.5 0 0 0 9 16.5h5.25A2.25 2.25 0 0 0 16.5 14.25V11.5H12v2h2.5v.75a.25.25 0 0 1-.25.25H9a.5.5 0 0 1-.5-.5v-4c0-.28.22-.5.5-.5h8v-2H9Z"
  />
</svg>`
const gitCodeSocialIcon = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <title>GitCode</title>
  <rect x="2" y="2" width="20" height="20" rx="4.5" fill="currentColor" />
  <path
    fill="#fff"
    d="m10.6 8.1-3.9 3.9 3.9 3.9 1.4-1.4-2.5-2.5 2.5-2.5-1.4-1.4Zm2.8 0L12 9.5l2.5 2.5-2.5 2.5 1.4 1.4 3.9-3.9-3.9-3.9Z"
  />
</svg>`

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: 'zh-CN',
  title: siteTitle,
  description: siteDescription,
  lastUpdated: true,

  base: siteBase,
  srcDir: 'pages', // 指定页面文件的根目录
  head: [
    ['meta', { name: 'keywords', content: 'vue3,query,components,table,form,element-plus' }],
    ['meta', { name: 'author', content: 'vue3-query-components' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: siteTitle }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:url', content: `${siteUrl}${siteBase}` }],
    ['meta', { property: 'og:image', content: siteOgImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: siteTitle }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['meta', { name: 'twitter:image', content: siteOgImage }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.svg' }]
  ],

  themeConfig: {
    siteTitle,
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/common-query-table' },
      {
        text: `v${version}`,
        items: [
          {
            text: '更新日志',
            link: '/changelog/'
          },
        ]
      },
    ],
    socialLinks: [
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@yetuzi/vue3-query-components',
        ariaLabel: 'NPM'
      },
      {
        icon: 'github',
        link: 'https://github.com/yetuzi-open/vue3-query-components',
        ariaLabel: 'GitHub'
      },
      {
        icon: { svg: giteeSocialIcon },
        link: 'https://gitee.com/yetuzi-open/vue3-query-components',
        ariaLabel: 'Gitee'
      },
      {
        icon: { svg: gitCodeSocialIcon },
        link: 'https://gitcode.com/yetuzi/vue3-query-components',
        ariaLabel: 'GitCode'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '常见问题', link: '/guide/faq' },
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            {
              text: '配置组件',
              items: [
                { text: 'CommonConfigProvider 全局配置', link: '/components/common-config-provider' }
              ]
            },
            {
              text: '核心组件',
              items: [
                { text: 'CommonQueryTable 查询表格', link: '/components/common-query-table' },
                { text: 'CommonForm 表单', link: '/components/common-form' },
                { text: 'CommonTable 表格', link: '/components/common-table' },
                { text: 'CommonPagination 分页', link: '/components/common-pagination' },
                { text: 'CommonDialog 对话框', link: '/components/common-dialog' },
              ]
            },
            {
              text: '基础组件',
              items: [
                { text: '基础组件概览', link: '/components/basic-components' }
              ]
            },
          ]
        }
      ],
      '/advanced/': [
        {
          text: '进阶',
          items: [
            { text: '自定义主题', link: '/advanced/theme' },
            { text: '最佳实践', link: '/advanced/best-practices' }
          ]
        }
      ],
      '/changelog/': [
        {
          text: '其他',
          items: [
            { text: '更新日志', link: '/changelog/' }
          ]
        }
      ],
    },
    editLink: {
      pattern: 'https://github.com/yetuzi-open/vue3-query-components/edit/main/packages/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '最近更新'
    },
    outline: {
      level: [2, 3],
      label: '目录'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },
    footer: {
      message: 'MIT Licensed',
      copyright: `Copyright © ${currentYear} vue3-query-components`
    },
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, '../examples/'),
      })
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: false,
  },

  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
    define: {
      __VUE_OPTIONS_API__: true
    },
    server: {
      port: 5173,
      fs: {
        allow: [resolve(__dirname, '../../components')]
      }
    },
    resolve: {
      alias: {
        // 本地路径别名
        '@': resolve(__dirname, '../'),
        '@examples': resolve(__dirname, '../examples'),
        '@pages': resolve(__dirname, '../pages'),
        '@public': resolve(__dirname, '../public'),
        '@yetuzi/vue3-query-components': isDev
          ? resolve(__dirname, '../../components/src/index.ts')
          : resolve(__dirname, '../../components'),
        // 组件库源码别名（开发时使用）
        '@components-src': resolve(__dirname, '../../components/src'),
        // 组件库根目录（用于引用 CHANGELOG.md 等）
        '@components-root': resolve(__dirname, '../../components')
      }
    },
    optimizeDeps: {
      include: [
        'element-plus'
      ],
      exclude: [
        '@yetuzi/vue3-query-components'
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    ssr: {
      noExternal: []
    }
  }
})
