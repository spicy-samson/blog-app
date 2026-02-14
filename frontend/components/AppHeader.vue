<template>
  <nav class="sticky top-0 z-50 w-full bg-white/95 dark:bg-black backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
      <div class="flex justify-between items-center h-24">
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
          <span class="font-serif font-semibold text-2xl tracking-tight text-black dark:text-white">Ink &amp; Thought</span>
        </div>
        <div class="hidden md:flex items-center space-x-12">
          <NuxtLink class="text-sm font-medium tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity" to="/">Home</NuxtLink>
          <NuxtLink class="text-sm font-medium tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity" to="/post">Blog</NuxtLink>
          <NuxtLink class="text-sm font-medium tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity" to="/faq">FAQ</NuxtLink>
          <NuxtLink class="text-sm font-medium tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity" to="/contact">Contact</NuxtLink>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <button
            class="flex items-center gap-2 text-sm font-medium text-black dark:text-white hover:opacity-80 transition-opacity"
            type="button"
            @click="toggleTheme"
          >
            <span class="material-icons text-base">
              {{ isDark ? 'light_mode' : 'dark_mode' }}
            </span>
            <span>{{ isDark ? 'Light' : 'Dark' }} mode</span>
          </button>
        </div>
        <div class="md:hidden flex items-center">
          <button class="text-black dark:text-white focus:outline-none" aria-label="Menu">
            <span class="material-icons font-light">menu</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'
import { computed } from 'vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>