<template>
  <a 
    :href="url"
    class="link-card"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img 
      v-if="image" 
      :src="image" 
      :alt="title"
      class="card-image"
    />
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div v-if="description" class="card-description">{{ description }}</div>
      <div class="card-url">{{ domain }}</div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

const domain = computed(() => {
  try {
    return new URL(props.url).hostname.replace('www.', '')
  } catch {
    return props.url
  }
})
</script>

<style scoped>
.link-card {
  display: block;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  margin: 24px 0;
  text-decoration: none !important;  /* !important 추가 */
  color: inherit;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.link-card:hover {
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15);
  transform: translateY(-2px);
  border-color: #EC4899;
  text-decoration: none !important;  /* !important 추가 */
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: linear-gradient(135deg, #FFB5D8, #C4A5FF);
}

.card-content {
  padding: 16px;
}

.card-title {
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
  font-size: 1rem;
  line-height: 1.4;
  word-break: keep-all;
}

.card-description {
  color: #6B7280;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-url {
  color: #9CA3AF;
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none !important;  /* 추가! */
}

/* 모든 자식 요소 밑줄 제거 */
.link-card * {
  text-decoration: none !important;
}

/* 모바일 최적화 */
@media (max-width: 640px) {
  .card-image {
    height: 160px;
  }
  
  .card-content {
    padding: 14px;
  }
  
  .card-title {
    font-size: 0.95rem;
  }
  
  .card-description {
    font-size: 0.8rem;
  }
}
</style>