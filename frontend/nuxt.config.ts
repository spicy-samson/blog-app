import { defineNuxtConfig } from 'nuxt/config'

const env = (globalThis as any).process?.env ?? {}


export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-02-14',
  modules: ['@nuxtjs/color-mode', "@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: 'Blog App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ],
      script: [
        {
          src: 'https://cdn.tailwindcss.com?plugins=forms,container-queries',
          defer: false
        },
        {
          children: `
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    primary: "#135bec",
                    "primary-hover": "#2563eb",
                    "background-light": "#ffffff",
                    "background-dark": "#0f1115",
                    "surface-dark": "#181a1f",
                    "surface-light": "#ffffff",
                    "neutral-100": "#f5f5f5",
                    "neutral-800": "#262626",
                    "neutral-500": "#737373",
                    "text-main": "#e2e8f0",
                    "text-muted": "#94a3b8",
                    "text-secondary": "#666666"
                  },
                  fontFamily: {
                    sans: ["Inter", "sans-serif"],
                    serif: ["Playfair Display", "serif"],
                    display: ["Inter", "sans-serif"]
                  },
                  borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", full: "9999px" }
                }
              }
            };
          `,
          type: 'text/javascript'
        }
      ],
      style: [
        {
          children: `
            html { scroll-behavior: smooth; }
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #ffffff; }
            ::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: #d4d4d4; }
          `,
          type: 'text/css'
        }
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  runtimeConfig: {
    public: {
       apiUrl: env.NUXT_PUBLIC_API_URL,
    }
  }
})