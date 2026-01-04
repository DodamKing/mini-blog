import fs from 'fs'
import path from 'path'

export default defineSitemapEventHandler(() => {
  const postsDir = path.resolve('content/posts')
  
  try {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
    
    return files.map(file => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8')
      
      const slugMatch = content.match(/^slug:\s*["'](.+)["']/m)
      const dateMatch = content.match(/^publishedAt:\s*["'](.+)["']/m)
      
      return {
        loc: `/p/${slugMatch ? slugMatch[1] : file.replace('.md', '')}`,
        lastmod: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
      }
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return []
  }
})