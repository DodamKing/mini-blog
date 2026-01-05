import fs from 'fs'
import path from 'path'

export default defineEventHandler(() => {
  const postsDir = path.resolve('content/posts')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  
  const postUrls = files.map(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/m)
    const dateMatch = content.match(/publishedAt:\s*["']?([^"'\n]+)["']?/m)
    
    return `
  <url>
    <loc>https://blog.dimad.kr/p/${slugMatch?.[1]}</loc>
    <lastmod>${dateMatch?.[1]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  }).join('')
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blog.dimad.kr/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${postUrls}
</urlset>`
  
  return sitemap
})