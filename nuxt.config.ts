// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-04',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  // SSG 모드 명시
  ssr: true,
  
  // 정적 생성
  nitro: {
    preset: 'netlify',  // Netlify 프리셋!
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})