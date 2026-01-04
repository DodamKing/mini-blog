// scripts/delete-post.mjs
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const input = process.argv.slice(2).join(" ").trim();
if (!input) {
  console.error('❌ Usage: npm run delete:post -- <ID 또는 slug>');
  console.error('\n예시:');
  console.error('  npm run delete:post -- 1');
  console.error('  npm run delete:post -- protein-top5');
  process.exit(1);
}

const postsDir = path.resolve("content/posts");
const imagesDir = path.resolve("public/images/posts");

// ID 또는 slug로 찾기
let targetFile = null;
let targetId = null;
let targetSlug = null;

// 숫자면 ID로 간주
if (/^\d+$/.test(input)) {
  const id = input;
  const mdPath = path.join(postsDir, `${id}.md`);
  
  if (fs.existsSync(mdPath)) {
    targetFile = mdPath;
    targetId = id;
    
    // frontmatter에서 slug 읽기
    try {
      const content = fs.readFileSync(mdPath, 'utf8');
      const match = content.match(/^slug:\s*["'](.+)["']/m);
      if (match) targetSlug = match[1];
    } catch {}
  }
} 
// 아니면 slug로 간주
else {
  const slug = input;
  
  // 모든 .md 파일 검색
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const slugMatch = content.match(/^slug:\s*["'](.+)["']/m);
      const idMatch = content.match(/^id:\s*(\d+)/m);
      
      if (slugMatch && slugMatch[1] === slug) {
        targetFile = path.join(postsDir, file);
        targetSlug = slug;
        if (idMatch) targetId = idMatch[1];
        break;
      }
    } catch {}
  }
}

if (!targetFile) {
  console.error("❌ 삭제할 글을 찾을 수 없습니다.");
  console.error("입력값:", input);
  console.error("\n사용 가능한 글 목록:");
  
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  files.forEach(f => {
    try {
      const content = fs.readFileSync(path.join(postsDir, f), 'utf8');
      const idMatch = content.match(/^id:\s*(\d+)/m);
      const slugMatch = content.match(/^slug:\s*["'](.+)["']/m);
      const titleMatch = content.match(/^title:\s*["'](.+)["']/m);
      
      console.log(`  ID: ${idMatch?.[1] || '?'} | Slug: ${slugMatch?.[1] || '?'} | ${titleMatch?.[1] || f}`);
    } catch {}
  });
  
  process.exit(1);
}

// 삭제 대상 수집
const targets = [];
if (fs.existsSync(targetFile)) targets.push(targetFile);

if (targetId) {
  const imgDir = path.join(imagesDir, targetId);
  if (fs.existsSync(imgDir)) targets.push(imgDir);
}

console.log("\n⚠️  삭제할 항목:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━");
if (targetId) console.log("🆔 ID:", targetId);
if (targetSlug) console.log("🔗 Slug:", targetSlug);
console.log("\n📂 삭제될 파일/폴더:");
for (const t of targets) console.log("  -", t);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━");

// 확인
const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout 
});

rl.question('\n정말 삭제할까요? (y/N): ', (answer) => {
  rl.close();
  
  if (answer.toLowerCase() !== 'y') {
    console.log("✅ 취소되었습니다.");
    process.exit(0);
  }

  // 삭제 실행
  let deletedCount = 0;
  
  for (const target of targets) {
    try {
      if (fs.statSync(target).isDirectory()) {
        fs.rmSync(target, { recursive: true, force: true });
      } else {
        fs.unlinkSync(target);
      }
      console.log("🗑️  삭제:", target);
      deletedCount++;
    } catch (err) {
      console.error("❌ 삭제 실패:", target, err.message);
    }
  }

  console.log("\n✅ 삭제 완료!");
  console.log(`   총 ${deletedCount}개 항목 삭제됨`);
});