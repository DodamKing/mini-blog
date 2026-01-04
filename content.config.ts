import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        publishedAt: z.string(),
        heroImage: z.string().nullable(),
      })
    })
  },
  markdown: {
    anchorLinks: false,  // 이게 핵심!
    mdc: true
  },
  experimental: {
    components: true
  }
})