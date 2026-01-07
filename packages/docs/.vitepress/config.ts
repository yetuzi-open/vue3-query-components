import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'
import path from 'path'
import { version } from '@yetuzi/vue3-query-components'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Vue3 Query Components',
  description: '一个专注于企业级查询页面的 Vue3 组件库',
  lang: 'zh-CN',
  base: '/',
  srcDir: 'pages', // 指定页面文件的根目录
  head: [
    ['meta', { name: 'keywords', content: 'vue3,query,components,table,form,element-plus' }],
    ['meta', { name: 'author', content: 'vue3-query-components' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    outline: {
      level: [2,3],
      label: '目录'
    },  
    siteTitle: 'Vue3 Query Components',
    logo: '/logo.svg',
    // 搜索配置
    search: {
      provider: 'local',
      defaultLang: 'zh-CN',
      options: {
        locales: {
          'zh-CN': {
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
        }
      }
    },

    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/common-query-table' },
      {
        text: 'NPM',
        link: 'https://www.npmjs.com/package/@yetuzi/vue3-query-components'
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/yetuzi/vue3-common',
      },
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

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
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
                { text: 'CommonTable 表格', link: '/components/common-table' }
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

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024 vue3-query-components'
    },

    editLink: {
      pattern: 'https://github.com/vue3-query-components/vue3-query-components/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
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
      port: 5173
    },
    resolve: {
      alias: {
        // 本地路径别名
        '@': resolve(__dirname, '../'),
        '@examples': resolve(__dirname, '../examples'),
        '@pages': resolve(__dirname, '../pages'),
        '@public': resolve(__dirname, '../public'),
        // 组件库源码别名（开发时使用）
        '@components-src': resolve(__dirname, '../../components/src'),
        // 组件库根目录（用于引用 CHANGELOG.md 等）
        '@components-root': resolve(__dirname, '../../components')
      }
    },
    optimizeDeps: {
      include: [
        'element-plus',
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
