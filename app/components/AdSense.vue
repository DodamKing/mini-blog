<template>
  <div class="adsense-container">
    <ins 
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-7892198097991803"
      data-ad-slot="4105774619"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
onMounted(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.error('AdSense error:', e)
  }
})
</script>

<style scoped>
.adsense-container {
  margin: 2rem 0;
  min-height: 100px;
}
</style>