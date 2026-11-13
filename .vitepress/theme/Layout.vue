<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const { page, frontmatter, site } = useData()
const route = useRoute()
const nav = [
  { label: '首页', path: '/' },
  { label: '分类', path: '/categories/' },
  { label: '标签', path: '/tag/' },
  { label: '关于', path: '/others/about.html' }
]
const date = computed(() => frontmatter.value.date
  ? new Date(frontmatter.value.date).toISOString().slice(0, 10)
  : '')
const isIndex = computed(() => frontmatter.value.layout === 'blog-index')
</script>

<template>
  <a class="skip-link" href="#main-content">跳到正文</a>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="site-name" :href="withBase('/')">FeliksLv<span aria-hidden="true">.</span></a>
      <nav aria-label="主导航">
        <a v-for="item in nav" :key="item.path" :href="withBase(item.path)"
          :aria-current="route.path === withBase(item.path) ? 'page' : undefined">{{ item.label }}</a>
      </nav>
    </div>
  </header>

  <main id="main-content" class="site-main">
    <section v-if="page.isNotFound" class="intro">
      <h1>页面未找到</h1>
      <p><a :href="withBase('/')">返回首页</a></p>
    </section>
    <Content v-else-if="isIndex" />
    <article v-else class="article">
      <header class="article-header">
        <a v-if="page.relativePath.startsWith('blogs/')" :href="withBase('/')">← 全部文章</a>
        <h1>{{ page.title }}</h1>
        <div v-if="date || frontmatter.categories?.length || frontmatter.tags?.length" class="article-meta">
          <time v-if="date" :datetime="date">{{ date }}</time>
          <span v-for="category in frontmatter.categories" :key="category">{{ category }}</span>
          <span v-for="tag in frontmatter.tags" :key="tag">#{{ tag }}</span>
        </div>
      </header>
      <div class="article-body">
        <Content />
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <span>{{ site.title }}</span>
    <a href="https://github.com/FeliksLv01">GitHub <span aria-hidden="true">↗</span></a>
  </footer>
</template>
