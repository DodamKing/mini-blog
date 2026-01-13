export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'posts')
    .order('publishedAt', 'DESC')
    .all()
  
  // body와 불필요한 필드 제거
  return posts.map((post: any) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags || [],
    heroImage: post.heroImage,
    publishedAt: post.publishedAt
  }))
})