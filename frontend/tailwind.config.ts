import type { Config } from 'tailwindcss'

export default {
  content: [], // Nuxt handles this automatically
  darkMode: 'class',
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
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px"
      }
    }
  },
  plugins: [],
} satisfies Config