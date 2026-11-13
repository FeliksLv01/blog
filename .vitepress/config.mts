import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FeliksLv 的博客',
  lang: 'zh-CN',
  base: '/Blog/',
  srcExclude: ['README.md', 'public/**'],
  appearance: false,
  head: [['link', { rel: 'icon', href: '/Blog/favicon.png' }]],
  markdown: {
    theme: 'dark-plus',
    math: true,
    codeCopyButtonTitle: '复制代码',
    lineNumbers: true,
    image: { lazyLoading: true }
  },
  vite: {
    publicDir: fileURLToPath(new URL('./public', import.meta.url))
  }
})
