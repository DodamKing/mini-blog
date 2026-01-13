<template>
  <div class="min-h-screen">
    <!-- 히어로 섹션 (메인과 통일) -->
    <header class="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div class="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16 text-center relative z-10">
        <!-- 장식 요소 -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-bounce"
          style="animation-delay: 0s;"></div>
        <div class="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"
          style="animation-delay: 0.5s;"></div>

        <!-- 404 -->
        <div class="error-code-container mb-4">
          <h1 class="text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            404
          </h1>
        </div>

        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          페이지를 찾을 수 없어요
        </h2>

        <p class="text-base text-gray-600 mb-8">
          찾으시는 페이지가 삭제되었거나 주소가 변경되었을 수 있어요
        </p>

        <!-- 홈 버튼 -->
        <NuxtLink to="/"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>홈으로 가기</span>
        </NuxtLink>
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
        <!-- 테스트 섹션 -->
        <div class="mb-12">
          <div class="mb-6">
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <span class="inline-block w-2 h-8 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full"></span>
              💕 잠깐! 심심하시다면?
            </h3>
            <p class="text-sm md:text-base text-gray-500 ml-5">
              요즘 핫한 성격 테스트 해보세요
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <a href="https://ssumtype.dimad.kr/" class="test-card group" target="_blank"
              @click="trackClick('ssumtype')">
              <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 group-hover:border-pink-200">
                <div class="text-5xl md:text-6xl mb-4">💘</div>
                <h4 class="text-lg md:text-xl font-bold text-gray-900 mb-2">썸타입 테스트</h4>
                <p class="text-sm md:text-base text-gray-600 mb-4">나의 연애 성향은?</p>
                <div
                  class="inline-flex items-center text-sm font-medium text-pink-500 group-hover:gap-2 transition-all">
                  <span>테스트 하러 가기</span>
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            <a href="https://youngforti.dimad.kr/" class="test-card group" target="_blank"
              @click="trackClick('youngforti')">
              <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all border border-gray-100 group-hover:border-purple-200">
                <div class="text-5xl md:text-6xl mb-4">✨</div>
                <h4 class="text-lg md:text-xl font-bold text-gray-900 mb-2">영포티 테스트</h4>
                <p class="text-sm md:text-base text-gray-600 mb-4">나의 젊음 지수는?</p>
                <div
                  class="inline-flex items-center text-sm font-medium text-purple-500 group-hover:gap-2 transition-all">
                  <span>테스트 하러 가기</span>
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- 인기 콘텐츠 -->
        <div>
          <div class="mb-6">
            <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <span class="inline-block w-2 h-8 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full"></span>
              💪 라온로그 인기글
            </h3>
            <p class="text-sm md:text-base text-gray-500 ml-5">
              많은 분들이 찾아주신 콘텐츠
            </p>
          </div>

          <NuxtLink to="/p/protein-comparison-bpi-optimum-syntha6"
            class="block bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-pink-200 group">
            <div class="flex items-center gap-4">
              <div class="text-4xl md:text-5xl flex-shrink-0">🏆</div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base md:text-lg font-bold text-gray-900 mb-1 truncate">
                  BPI vs 옵티멈 vs 신타6 단백질 비교
                </h4>
                <p class="text-sm md:text-base text-gray-600">가성비 최고 단백질은?</p>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-pink-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'

const props = defineProps({
  error: Object
})

// SEO 설정
useHead({
  title: '404 - 페이지를 찾을 수 없습니다 | 라온로그',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// 클릭 추적
const trackClick = (testName: string) => {
  if (process.client) {
    console.log(`404 -> ${testName} 클릭`)
  }
}

// 404 에러 로깅
onMounted(() => {
  if (process.client && props.error) {
    console.log('404 Error:', {
      path: window.location.pathname,
      message: props.error.message
    })
  }
})
</script>

<style scoped>
/* 그라데이션 애니메이션 (메인과 동일) */
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
</style>