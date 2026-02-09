import { defineNuxtConfig } from 'nuxt/config'

const env = (globalThis as any).process?.env ?? {}


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
       apiUrl: env.NUXT_PUBLIC_API_URL,
    }
  }
})
