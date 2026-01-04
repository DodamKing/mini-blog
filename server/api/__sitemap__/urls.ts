export default defineSitemapEventHandler(async () => {
  const posts = await $fetch<Array<{ slug: string; publishedAt: string }>>('/api/_content/query', {
    params: {
      _path: '/posts',
      _partial: true,
    }
  })

  return posts.map(p => ({
    loc: `/p/${p.slug}`,
    lastmod: p.publishedAt,
  }))
})