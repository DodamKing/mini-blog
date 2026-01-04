<template>
  <div class="min-h-screen">
    <!-- 히어로 섹션 - 귀엽게 -->
    <header class="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div class="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-24 text-center relative z-10">
        <!-- 장식 요소 -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-bounce"
          style="animation-delay: 0s;"></div>
        <div class="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"
          style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-10 left-1/4 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-bounce"
          style="animation-delay: 1s;"></div>

        <!-- 타이틀 -->
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
          라온로그
        </h1>

        <p class="text-base md:text-lg text-gray-600 mb-2">
          건강하고 스마트한 선택을 위한 공간
        </p>

        <p class="text-sm text-gray-500">
          단백질, 운동, 그리고 일상의 작은 팁들 🌟
        </p>
      </div>

      <!-- 물결 -->
      <div class="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-12 md:h-16">
          <path d="M0,64 C360,20 720,20 1080,64 C1440,108 1440,108 1440,108 L1440,120 L0,120 Z" fill="#F9FAFB" />
        </svg>
      </div>
    </header>

    <!-- 메인 컨텐츠 -->
    <main class="bg-bg-base">
      <div class="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <!-- 섹션 타이틀 -->
        <div class="mb-8 md:mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span class="inline-block w-2 h-8 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full"></span>
            최신 글
          </h2>
          <p class="text-sm md:text-base text-gray-500 ml-5">
            새롭게 올라온 이야기들을 만나보세요
          </p>
        </div>

        <!-- 로딩 -->
        <div v-if="!posts" class="text-center py-20">
          <div class="inline-flex flex-col items-center gap-4">
            <div class="relative">
              <div class="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-75 animate-pulse">
              </div>
              <div
                class="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-50 animate-ping">
              </div>
            </div>
            <p class="text-sm text-gray-500">로딩 중...</p>
          </div>
        </div>

        <!-- 글 없음 -->
        <div v-else-if="posts.length === 0" class="text-center py-20">
          <div class="inline-flex flex-col items-center gap-4">
            <div class="text-6xl">📝</div>
            <div>
              <p class="text-lg font-medium text-gray-900 mb-2">아직 작성된 글이 없습니다</p>
              <p class="text-sm text-gray-500">곧 유익한 콘텐츠로 찾아뵙겠습니다 ✨</p>
            </div>
          </div>
        </div>

        <!-- 글 카드 그리드 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <PostCard v-for="post in posts" :key="post.id" :post="transformPost(post)" />
        </div>

        <!-- 더보기 버튼 - 항상 보이게 -->
        <div class="text-center mt-12 md:mt-16">
          <nuxt-link to="/posts"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
            <span>전체 글 보기</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </nuxt-link>
        </div>
      </div>
    </main>

    <!-- 푸터 -->
    <footer class="bg-white border-t border-gray-100">
      <div class="max-w-4xl mx-auto px-5 md:px-8 py-8 text-center">
        <p class="text-sm text-gray-500">
          © 2026 라온로그. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('posts')
    .order('publishedAt', 'DESC')
    .limit(6)
    .all()
)

// PostCard에 맞게 데이터 변환
const transformPost = (post) => {
  return {
    slug: post.slug,  // frontmatter의 slug 사용
    title: post.title,
    description: post.description,
    tags: post.tags || [],
    heroImage: post.heroImage
  }
}

useHead({
  title: '라온로그 - 건강하고 스마트한 선택',
  meta: [
    { name: 'description', content: '단백질, 운동, 그리고 일상의 작은 팁들을 공유하는 공간' },
    { property: 'og:title', content: '라온로그 - 건강하고 스마트한 선택' },
    { property: 'og:description', content: '단백질, 운동, 그리고 일상의 작은 팁들을 공유하는 공간' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://blog.dimad.kr' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>

<style scoped>
/* 그라데이션 애니메이션 */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* 흔들림 애니메이션 */
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-3deg);
  }

  50% {
    transform: rotate(3deg);
  }
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}
</style>