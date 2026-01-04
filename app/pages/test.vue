<template>
  <div class="p-8">
    <h1>Content Test</h1>
    <div v-if="posts">
      <p>총 {{ posts.length }}개 글</p>
      <pre>{{ JSON.stringify(posts, null, 2) }}</pre>
    </div>
    <div v-else>
      <p>posts: {{ posts }}</p>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('test-posts', () => 
  queryCollection('posts').all()
)

console.log('Posts data:', posts.value)
</script>