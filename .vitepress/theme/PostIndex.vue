<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from './posts.data'

const props = withDefaults(defineProps<{ mode?: 'home' | 'categories' | 'tags' }>(), {
  mode: 'home'
})
const avatar = ref<HTMLImageElement>()
const avatarUrl = ref('https://avatars.githubusercontent.com/u/49094905?v=4&s=144')
const localAvatarUrl = withBase('/avatar.png')

function useLocalAvatar() {
  avatarUrl.value = localAvatarUrl
}

onMounted(() => {
  if (avatar.value?.complete && avatar.value.naturalWidth === 0) {
    useLocalAvatar()
  }
})

const selected = ref('')
const field = computed(() => props.mode === 'tags' ? 'tags' : 'categories')
const facets = computed(() => [...new Set(posts.flatMap(post => post[field.value]))].sort())
const visible = computed(() => selected.value
  ? posts.filter(post => post[field.value].includes(selected.value))
  : posts)
const groups = computed(() => {
  const years = new Map<string, typeof posts>()
  for (const post of visible.value) {
    const year = post.date.slice(0, 4)
    const entries = years.get(year) ?? []
    entries.push(post)
    years.set(year, entries)
  }
  return years
})
</script>

<template>
  <section v-if="mode === 'home'" class="intro">
    <img ref="avatar" :src="avatarUrl" alt="" width="72" height="72" referrerpolicy="no-referrer" @error="useLocalAvatar">
    <h1>FeliksLv 的博客</h1>
  </section>

  <section class="post-index">
    <h2 v-if="mode === 'home'">全部文章</h2>
    <h1 v-else>{{ mode === 'categories' ? '分类' : '标签' }}</h1>

    <div v-if="mode === 'categories' || mode === 'tags'" class="filters" :aria-label="mode === 'tags' ? '按标签筛选' : '按分类筛选'">
      <button :aria-pressed="selected === ''" @click="selected = ''">全部</button>
      <button v-for="facet in facets" :key="facet" :aria-pressed="selected === facet" @click="selected = facet">
        {{ facet }}
      </button>
    </div>

    <div v-for="[year, entries] in groups" :key="year" class="year-group">
      <h2 v-if="mode !== 'home'">{{ year }}</h2>
      <ul>
        <li v-for="post in entries" :key="post.url">
          <a :href="withBase(post.url)">
            <span class="post-title">{{ post.title }}</span>
            <time :datetime="post.date">{{ mode === 'home' ? post.date : post.date.slice(5) }}</time>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
