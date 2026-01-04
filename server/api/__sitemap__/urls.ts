export default defineSitemapEventHandler(async (e) => {
  const posts = await queryCollection(e, 'posts').all()
  
  return posts.map((post: any) => ({
    loc: `/p/${post.slug}`,
    lastmod: post.publishedAt,
    changefreq: 'weekly' as const,
    priority: 0.9
  }))
})