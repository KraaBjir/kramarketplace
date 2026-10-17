// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'KraaDev - Free Minecraft Add-On Marketplace',
      meta: [
        { name: 'description', content: 'Download addon minecraft gratis dengan kualitas terbaik di KraaDev' }
      ]
    }
  }
})