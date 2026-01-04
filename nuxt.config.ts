// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-04',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://blog.dimad.kr',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'google-site-verification', content: 'PlYdRNSi1zGbnQC-1UtvTw81FjJ-zoEHv4n_V4dW360' }
      ],
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7892198097991803',
          async: true,
          crossorigin: 'anonymous'
        }
      ],
    }
  },

  // SSG 모드 명시
  ssr: false,
  
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false
    }
  },

  // generate 제거하고 이것만!
  experimental: {
    payloadExtraction: false
  }
})