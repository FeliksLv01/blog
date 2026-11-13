import { createContentLoader } from 'vitepress'

export default createContentLoader('blogs/**/*.md', {
  transform(pages) {
    return pages
      .filter(({ frontmatter }) => frontmatter.publish !== false)
      .map(({ url, frontmatter }) => ({
        url,
        title: String(frontmatter.title),
        date: new Date(frontmatter.date).toISOString().slice(0, 10),
        categories: (frontmatter.categories ?? []) as string[],
        tags: (frontmatter.tags ?? []) as string[]
      }))
      .sort((a, b) => b.date.localeCompare(a.date) || a.url.localeCompare(b.url))
  }
})
