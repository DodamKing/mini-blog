<template>
  <div class="min-h-screen bg-bg-base">
    <article class="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12">
      <!-- 로딩 -->
      <div v-if="pending" class="text-center py-20">
        <div class="inline-block animate-pulse">
          <div class="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-75"></div>
        </div>
      </div>

      <!-- 글 내용 -->
      <div v-else-if="data">
        <!-- 상단 네비게이션 -->
        <nav class="mb-6 md:mb-8">
          <nuxt-link 
            to="/"
            class="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-purple-600 transition-colors active:text-purple-700"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            홈으로
          </nuxt-link>
        </nav>

        <!-- 글 헤더 -->
        <header class="mb-8 md:mb-12">
          <!-- 제목 -->
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight break-keep text-gray-900">
            {{ data.title }}
          </h1>
          
          <!-- 설명 -->
          <p class="text-base md:text-lg text-gray-600 mb-5 md:mb-6 leading-relaxed break-keep">
            {{ data.description }}
          </p>
          
          <!-- 날짜 -->
          <time class="text-xs md:text-sm text-gray-500 flex items-center gap-1.5 mb-6 md:mb-8">
            <svg class="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ formatDate(data.publishedAt) }}
          </time>

          <!-- Hero 이미지 -->
          <div v-if="data.heroImage && data.heroImage !== 'null'" class="aspect-[16/9] rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-lg">
            <img 
              :src="data.heroImage" 
              :alt="data.title"
              class="w-full h-full object-cover"
            />
          </div>
        </header>

        <!-- 📌 상단 광고 -->
        <AdSense class="mb-8" />

        <!-- 본문 -->
        <div class="article-content">
          <ContentRenderer :value="data" />
        </div>

        <!-- 📌 하단 광고 -->
        <AdSense class="mt-8 mb-8" />

        <!-- 하단 네비게이션 -->
        <footer class="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-gray-200">
          <nuxt-link 
            to="/"
            class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium hover:shadow-lg active:scale-95 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            목록으로 돌아가기
          </nuxt-link>
        </footer>
      </div>

      <!-- 404 -->
      <div v-else class="text-center py-20">
        <div class="mb-6">
          <div class="inline-block w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">글을 찾을 수 없습니다</h2>
        <p class="text-sm md:text-base text-gray-600 mb-6 md:mb-8 px-4">요청하신 페이지가 존재하지 않습니다.</p>
        <nuxt-link 
          to="/"
          class="inline-block px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium hover:shadow-lg active:scale-95 transition-all"
        >
          홈으로 돌아가기
        </nuxt-link>
      </div>
    </article>
  </div>
</template>

<script setup>
const route = useRoute()

const { data, pending } = await useAsyncData(`post-${route.params.slug}`, async () => {
  const allPosts = await queryCollection('posts').all()
  
  // frontmatter의 slug로 찾기
  return allPosts.find(p => p.slug === route.params.slug) || null
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// 동적 SEO - 각 글의 내용으로 검색되게!
useHead({
  // 제목 = 검색 결과 제목
  title: () => data.value?.title || '글',
  
  meta: [
    // description = 검색 결과 미리보기 (제일 중요!)
    { 
      name: 'description', 
      content: () => data.value?.description || '' 
    },
    
    // keywords = 이 글의 핵심 키워드들 (검색 노출용)
    { 
      name: 'keywords', 
      content: () => data.value?.tags?.join(', ') || '' 
    },
    
    // 작성일 (최신성 SEO)
    { 
      name: 'article:published_time', 
      content: () => data.value?.publishedAt || '' 
    },
  ],
  
  // 중복 방지
  link: [
    { 
      rel: 'canonical', 
      href: () => `https://blog.dimad.kr/p/${route.params.slug}` 
    }
  ]
})
</script>

<style scoped>
/* 본문 스타일 - 가독성 개선 */
.article-content {
  font-size: 17px;
  line-height: 1.8;
  color: #374151;
  word-break: keep-all;
  overflow-wrap: break-word;
}

@media (min-width: 768px) {
  .article-content {
    font-size: 18px;
    line-height: 1.85;
  }
}

@media (min-width: 1024px) {
  .article-content {
    font-size: 19px;
    line-height: 1.9;
  }
}

/* H2 - 큰 제목 */
.article-content :deep(h2) {
  font-size: 1.625rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  color: #111827;
  line-height: 1.3;
  word-break: keep-all;
  padding-top: 0.5rem;
}

@media (min-width: 768px) {
  .article-content :deep(h2) {
    font-size: 2rem;
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .article-content :deep(h2) {
    font-size: 2.25rem;
  }
}

/* H3 - 중간 제목 */
.article-content :deep(h3) {
  font-size: 1.375rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #1F2937;
  line-height: 1.4;
  word-break: keep-all;
}

@media (min-width: 768px) {
  .article-content :deep(h3) {
    font-size: 1.5rem;
    margin-top: 2.75rem;
    margin-bottom: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .article-content :deep(h3) {
    font-size: 1.625rem;
  }
}

/* 문단 - 가독성 개선 */
.article-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  word-break: keep-all;
}

@media (min-width: 768px) {
  .article-content :deep(p) {
    margin-bottom: 1.75rem;
    line-height: 1.85;
  }
}

@media (min-width: 1024px) {
  .article-content :deep(p) {
    margin-bottom: 2rem;
    line-height: 1.9;
  }
}

/* 리스트 */
.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.75rem;
}

@media (min-width: 768px) {
  .article-content :deep(ul),
  .article-content :deep(ol) {
    margin-bottom: 1.75rem;
    padding-left: 2rem;
  }
}

.article-content :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.8;
  word-break: keep-all;
}

@media (min-width: 768px) {
  .article-content :deep(li) {
    margin-bottom: 0.875rem;
  }
}

/* 리스트 마커 색상 */
.article-content :deep(ul li)::marker {
  color: #EC4899;
}

.article-content :deep(ol li)::marker {
  color: #EC4899;
  font-weight: 600;
}

/* 강조 */
.article-content :deep(strong) {
  font-weight: 700;
  color: #111827;
}

/* 링크 */
.article-content :deep(a) {
  color: #EC4899;
  text-decoration: none;
  text-underline-offset: 4px;
  text-decoration-thickness: 1.5px;
  word-break: break-all;
  transition: color 0.2s;
}

.article-content :deep(a:hover) {
  color: #C4A5FF;
}

/* 테이블 개선 */
.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-size: 0.9em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  overflow: hidden;
}

.article-content :deep(th) {
  background: linear-gradient(to right, #FFB5D8, #C4A5FF);
  color: white;
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.95em;
}

.article-content :deep(td) {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #E5E7EB;
  background: white;
}

.article-content :deep(tr:last-child td) {
  border-bottom: none;
}

.article-content :deep(tr:hover td) {
  background: #FDF2F8;
}

/* 인라인 코드 */
.article-content :deep(code) {
  background: #FDF2F8;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
  color: #DB2777;
  font-family: 'Consolas', 'Monaco', monospace;
  word-break: break-all;
}

/* 코드 블록 */
.article-content :deep(pre) {
  background: #1F2937;
  color: #F9FAFB;
  padding: 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 2rem 0;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .article-content :deep(pre) {
    padding: 1.5rem;
    border-radius: 1rem;
    margin: 2.5rem 0;
    font-size: 0.95rem;
  }
}

.article-content :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  font-size: inherit;
}

/* 인용구 */
.article-content :deep(blockquote) {
  border-left: 4px solid #EC4899;
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: #6B7280;
  font-style: italic;
  background: #FDF2F8;
  padding: 1.25rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

@media (min-width: 768px) {
  .article-content :deep(blockquote) {
    padding: 1.5rem 2rem;
    margin: 2.5rem 0;
  }
}

/* 이미지 */
.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .article-content :deep(img) {
    border-radius: 1rem;
    margin: 2.5rem 0;
  }
}

/* 구분선 */
.article-content :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #E5E7EB, transparent);
  margin: 3rem 0;
}

/* 제목 안의 앵커 링크는 일반 텍스트처럼 */
.article-content :deep(h2 a),
.article-content :deep(h3 a),
.article-content :deep(h4 a) {
  color: inherit;
  text-decoration: none;
  cursor: default;
  pointer-events: none;
}

/* 실제 외부 링크만 스타일 적용 */
.article-content :deep(a[target="_blank"]) {
  cursor: pointer;
  pointer-events: auto;
}
</style>