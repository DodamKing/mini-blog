<template>
  <div class="min-h-screen bg-bg-base">
    <!-- 헤더 -->
    <header class="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <nuxt-link 
          to="/"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors mb-6"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          홈으로
        </nuxt-link>

        <h1 class="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          전체 글
        </h1>
        <p class="text-sm md:text-base text-gray-600">
          총 {{ allPosts?.length || 0 }}개의 글이 있습니다
        </p>
      </div>
    </header>

    <!-- 글 목록 -->
    <main class="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">
      <!-- 로딩 -->
      <div v-if="pending" class="text-center py-20">
        <div class="inline-flex flex-col items-center gap-4">
          <div class="relative">
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-75 animate-pulse"></div>
            <div class="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-50 animate-ping"></div>
          </div>
          <p class="text-sm text-gray-500">로딩 중...</p>
        </div>
      </div>

      <!-- 글 없음 -->
      <div v-else-if="!displayedPosts || displayedPosts.length === 0" class="text-center py-20">
        <div class="inline-flex flex-col items-center gap-4">
          <div class="text-6xl">📝</div>
          <div>
            <p class="text-lg font-medium text-gray-900 mb-2">아직 작성된 글이 없습니다</p>
            <p class="text-sm text-gray-500">곧 유익한 콘텐츠로 찾아뵙겠습니다 ✨</p>
          </div>
        </div>
      </div>

      <!-- 글 그리드 -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <PostCard 
            v-for="post in displayedPosts" 
            :key="post.id"
            :post="transformPost(post)"
          />
        </div>

        <!-- 더보기 버튼 (12개씩 로딩) -->
        <div v-if="hasMore" class="text-center mt-12">
          <button
            @click="loadMore"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-pink-200 text-gray-700 rounded-full font-medium hover:bg-pink-50 hover:border-pink-300 active:scale-95 transition-all"
          >
            <span>더 보기</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const POSTS_PER_PAGE = 12

const { data: allPosts, pending } = await useAsyncData('all-posts', () => 
  queryCollection('posts')
    .order('publishedAt', 'DESC')
    .all()
)

const displayCount = ref(POSTS_PER_PAGE)

const displayedPosts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  if (!allPosts.value) return false
  return displayCount.value < allPosts.value.length
})

const loadMore = () => {
  displayCount.value += POSTS_PER_PAGE
}

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
  title: '전체 글 - 라온로그',
  meta: [
    { name: 'description', content: '라온로그의 모든 글을 만나보세요' }
  ]
})
</script>