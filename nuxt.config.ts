// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-04',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    // '@nuxtjs/sitemap',
  ],

  css: ['~/assets/css/main.css'],

  // site: {
  //   url: 'https://blog.dimad.kr',
  // },

  // sitemap: {
  //   sources: [
  //     '/api/__sitemap__/urls.ts'
  //   ]
  // },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'google-site-verification', content: 'PlYdRNSi1zGbnQC-1UtvTw81FjJ-zoEHv4n_V4dW360' },
        { name: 'naver-site-verification', content: '756c70300fa67ac7c867f426e913b68c0db21e64' }
      ],
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7892198097991803',
          async: true,
          crossorigin: 'anonymous'
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-ZZ4KPRB1WV',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZZ4KPRB1WV');
          `
        }
      ],
    }
  },

  // SSG 모드 명시
  ssr: true,
  
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml'],
      failOnError: false
    }
  },

  // generate 제거하고 이것만!
  experimental: {
    payloadExtraction: false
  }
})