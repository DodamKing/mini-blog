<template>
  <nuxt-link 
    :to="`/p/${post.slug}`"
    class="post-card group block bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- 썸네일 -->
    <div class="aspect-[4/3] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden relative">
      <img 
        v-if="post.heroImage && post.heroImage !== 'null'"
        :src="post.heroImage" 
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <!-- 이미지 없을 때 귀여운 패턴 -->
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <div class="text-6xl opacity-30">✨</div>
      </div>
      
      <!-- 상단 장식 -->
      <div class="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        <svg class="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      </div>
    </div>
    
    <!-- 콘텐츠 -->
    <div class="p-5 md:p-6">
      <!-- 제목 -->
      <h3 class="text-lg md:text-xl font-bold line-clamp-2 mb-3 leading-snug text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
        {{ post.title }}
      </h3>
      
      <!-- 설명 -->
      <p class="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed mb-4">
        {{ post.description }}
      </p>

      <!-- 하단 장식 -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
        </div>
        
        <div class="text-xs text-gray-400 group-hover:text-pink-400 transition-colors flex items-center gap-1">
          <span>읽어보기</span>
          <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.post-card {
  border: 2px solid transparent;
  background-clip: padding-box;
}

.post-card:hover {
  border-color: #FDE2E4;
}

/* 부드러운 그림자 */
.post-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.post-card:hover {
  box-shadow: 0 20px 25px -5px rgba(236, 72, 153, 0.1), 
              0 10px 10px -5px rgba(196, 165, 255, 0.05);
}
</style>