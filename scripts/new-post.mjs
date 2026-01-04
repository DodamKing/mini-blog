// scripts/new-post.mjs
import fs from "node:fs";
import path from "node:path";

// slugify 함수
let slugify;
try {
  const m = await import("@sindresorhus/slugify");
  slugify = m.default;
} catch {
  slugify = (s) =>
    s
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/(^-|-$)/g, "")
      .replace(/-+/g, "-");
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ Usage:');
  console.error('  npm run new:post -- "제목" [커스텀-slug]');
  console.error('\n예시:');
  console.error('  npm run new:post -- "단백질 TOP5"');
  console.error('  npm run new:post -- "단백질 TOP5" protein-top5');
  process.exit(1);
}

const title = args[0].trim();
const customSlug = args[1]?.trim();

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const publishedAt = `${yyyy}-${mm}-${dd}`;

const postsDir = path.resolve("content/posts");
fs.mkdirSync(postsDir, { recursive: true });

// ===== ID 자동 생성 (숫자) =====
const existingFiles = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => parseInt(f.replace('.md', '')))
  .filter(n => !isNaN(n));

const nextId = existingFiles.length > 0 ? Math.max(...existingFiles) + 1 : 1;

// ===== Slug 생성 =====
const baseSlug = customSlug || slugify(title) || `post-${nextId}`;
let slug = baseSlug;

// Slug 중복 체크 (기존 파일들의 frontmatter 확인)
const existingSlugs = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => {
    try {
      const content = fs.readFileSync(path.join(postsDir, f), 'utf8');
      const match = content.match(/^slug:\s*["'](.+)["']/m);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  })
  .filter(Boolean);

let n = 2;
while (existingSlugs.includes(slug)) {
  slug = `${baseSlug}-${n++}`;
}

// ===== 파일 생성 =====
const filename = `${nextId}.md`;
const postPath = path.join(postsDir, filename);
const postImageDir = path.join("public/images/posts", String(nextId));
fs.mkdirSync(postImageDir, { recursive: true });

const template = `---
id: ${nextId}
slug: "${slug}"
title: "${title.replace(/"/g, '\\"')}"
description: "한 줄 요약 (SEO 중요!)"
tags: []
publishedAt: "${publishedAt}"
heroImage: "/images/posts/${nextId}/hero.webp"
---

글 시작...

## 소제목

내용...

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://link.coupang.com/a/YOUR_LINK" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #FFB5D8, #C4A5FF); color: white; text-decoration: none; border-radius: 25px; font-weight: 600; box-shadow: 0 4px 6px rgba(236, 72, 153, 0.2);">
    🛒 최저가 확인하기
  </a>
</div>
<p style="text-align: center; font-size: 0.75rem; color: #9CA3AF; margin-top: 0.5rem;">
  이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
</p>
`;

fs.writeFileSync(postPath, template, "utf8");

console.log("\n✅ 새 글 생성 완료!");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("📝 파일명:", filename);
console.log("🆔 ID:", nextId);
console.log("🔗 Slug:", slug);
console.log("🌐 URL: /p/" + slug);
console.log("🖼️  이미지 폴더:", postImageDir);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("\n💡 팁:");
console.log("  • 제목/내용 수정해도 URL은 그대로!");
console.log("  • Slug 수정하려면 frontmatter에서 직접 변경");
console.log("  • 파일명(ID)은 절대 변경하지 마세요");
console.log("  • heroImage: null → 이미지 추가 후 경로 수정");