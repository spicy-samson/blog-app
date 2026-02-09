export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Comments App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:8787'
    }
  }
})
