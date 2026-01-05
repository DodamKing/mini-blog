import fs from 'fs'
import path from 'path'

export default defineEventHandler(() => {
  const postsDir = path.resolve('content/posts')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8')
    
    const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/m)
    const dateMatch = content.match(/publishedAt:\s*["']?([^"'\n]+)["']?/m)
    
    return {
      loc: `/p/${slugMatch?.[1]}`,
      lastmod: dateMatch?.[1],
      changefreq: 'monthly',
      priority: 0.8
    }
  })
})