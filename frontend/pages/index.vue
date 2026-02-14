<template>
  <div class="font-sans min-h-screen bg-background-light text-neutral-800 antialiased dark:bg-background-dark dark:text-text-main">
    <!-- Shared header component -->
    <AppHeader />

    <main class="bg-white dark:bg-background-dark">
      <!-- Hero / featured story -->
      <section class="pt-24 pb-32 md:pt-32 md:pb-40">
        <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div class="lg:col-span-5 flex flex-col items-start space-y-8">
              <span class="text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase">Featured Story</span>
              <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-black dark:text-white font-normal">
                The Evolution of Design Systems
              </h1>
              <p class="text-lg text-neutral-500 dark:text-text-muted font-light leading-relaxed max-w-md">
                Exploring how atomic design principles are reshaping scalable interfaces. A deep dive into tokens, components, and workflows.
              </p>
              <div class="pt-4 flex items-center gap-4">
                <NuxtLink
                  class="inline-flex items-center text-black dark:text-white border-b border-black dark:border-white pb-1 text-sm font-medium hover:opacity-60 transition-opacity group"
                  to="/post"
                >
                  Read Story
                  <span class="material-icons ml-2 text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </NuxtLink>
              </div>
            </div>
            <div class="lg:col-span-7 relative">
              <div class="relative overflow-hidden aspect-[16/10] bg-neutral-50 dark:bg-surface-dark">
                <img
                  alt="Modern minimalist office workspace"
                  class="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsuluTC4HLWoh1qVMfXPYtlc7zCqBRS1QIYEXpRDwSNjCcW7nLTi3aAXDAzX9kl2OqdACkjOGhSRsSwJ5tG2L-5BcAgpICV6aFM6EDDwASeIYBMJ6ojGcH93FMCPxKyPDEY6lRS7CWRbQ6x3wCqB9hUvgRknPJa_WamPZP8GMhIJhJh0my7RdlNWoeWGWci_lx5sSvEUL0e3rdWmwS68BX0_g6EpBd3g-L5ap5QFiHfb6W1sm8bwyJXAZ9isiICSTAquj770OWgPA"
                />
              </div>
              <div class="flex items-center gap-4 pt-6 justify-end">
                <div class="text-right">
                  <p class="font-serif text-lg text-black dark:text-white">Sarah Jenkins</p>
                  <p class="text-sm text-neutral-400 dark:text-text-muted font-light">Oct 24, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Category filters -->
      <section class="border-t border-neutral-100 bg-white dark:bg-background-dark dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-10">
          <div class="flex flex-wrap items-center gap-8 justify-center md:justify-start">
            <button class="text-sm font-medium text-black dark:text-white border-b border-black dark:border-white pb-0.5">All Posts</button>
            <button class="text-sm font-medium text-neutral-400 hover:text-black dark:text-text-muted dark:hover:text-white transition-colors">Technology</button>
            <button class="text-sm font-medium text-neutral-400 hover:text-black dark:text-text-muted dark:hover:text-white transition-colors">Lifestyle</button>
            <button class="text-sm font-medium text-neutral-400 hover:text-black dark:text-text-muted dark:hover:text-white transition-colors">Design</button>
            <button class="text-sm font-medium text-neutral-400 hover:text-black dark:text-text-muted dark:hover:text-white transition-colors">Productivity</button>
          </div>
        </div>
      </section>

      <!-- Recent writings -->
      <section class="py-32 bg-neutral-50/50 dark:bg-background-dark">
        <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div class="flex justify-between items-baseline mb-20 border-b border-neutral-200 dark:border-gray-800 pb-6">
            <h2 class="font-serif text-3xl text-black dark:text-white">Recent Writings</h2>
            <a class="hidden md:inline-flex items-center text-sm font-medium text-neutral-400 dark:text-text-muted hover:text-black dark:hover:text-white transition-colors" href="#">
              View Archive
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            <article
              v-for="post in posts"
              :key="post.slug"
              class="flex flex-col group cursor-pointer"
            >
              <div class="relative overflow-hidden aspect-[4/3] mb-8 bg-white dark:bg-surface-dark">
                <img
                  :alt="post.title"
                  :src="post.coverImage"
                  class="object-cover w-full h-full transform transition duration-700 group-hover:scale-105"
                />
              </div>
              <div class="flex-1 flex flex-col">
                <div class="flex items-center text-xs tracking-widest text-neutral-400 dark:text-text-muted mb-4 uppercase">
                  <span>{{ post.category }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ formattedDate(post.publishedAt) }}</span>
                </div>
                <NuxtLink
                  :to="'/post'"
                  class="font-serif text-2xl text-black dark:text-white mb-3 leading-snug group-hover:underline decoration-1 underline-offset-4 decoration-neutral-300 transition-all"
                >
                  {{ post.title }}
                </NuxtLink>
                <p class="text-neutral-500 dark:text-text-muted font-light text-sm leading-relaxed mb-6 line-clamp-3">
                  {{ post.excerpt }}
                </p>
              </div>
            </article>
          </div>

          <div class="mt-24 flex justify-center">
            <button class="px-8 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-32 bg-white dark:bg-background-dark border-t border-neutral-100 dark:border-gray-800">
        <div class="max-w-2xl mx-auto px-6 text-center">
          <h2 class="font-serif text-3xl md:text-4xl text-black dark:text-white mb-6">Stay Inspired</h2>
          <p class="text-neutral-500 dark:text-text-muted font-light mb-12 leading-relaxed">
            Get the latest posts delivered right to your inbox. No spam, just high-quality content for writers and creators.
          </p>
          <form class="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border-b border-black dark:border-white">
            <input
              class="flex-1 bg-transparent text-black dark:text-white px-0 py-3 focus:ring-0 border-none placeholder-neutral-400 outline-none"
              placeholder="Enter your email"
              type="email"
            />
            <button
              class="text-black dark:text-white font-medium py-3 px-4 text-sm tracking-wide uppercase hover:opacity-60 transition-opacity"
              type="button"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>

    <!-- Simple footer -->
    <footer class="bg-white dark:bg-background-dark pt-20 pb-12 border-t border-neutral-100 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div class="md:col-span-1">
            <div class="mb-6">
              <span class="font-serif font-bold text-xl text-black dark:text-white">Ink &amp; Thought</span>
            </div>
            <p class="text-sm text-neutral-400 dark:text-text-muted font-light leading-relaxed">
              A modern publishing platform for writers who value clarity, typography, and clean design.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-xs uppercase tracking-widest text-black dark:text-white mb-6">Explore</h4>
            <ul class="space-y-4 text-sm text-neutral-500 dark:text-text-muted font-light">
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Technology</a></li>
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Design</a></li>
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Culture</a></li>
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Business</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-xs uppercase tracking-widest text-black dark:text-white mb-6">Company</h4>
            <ul class="space-y-4 text-sm text-neutral-500 dark:text-text-muted font-light">
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">About</a></li>
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Careers</a></li>
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Support</a></li>
              <li><a class="hover:text-black dark:hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-xs uppercase tracking-widest text-black dark:text-white mb-6">Connect</h4>
            <div class="flex space-x-6">
              <a class="text-neutral-400 dark:text-text-muted hover:text-black dark:hover:text-white transition-colors" href="#">
                <span class="sr-only">Twitter</span>
              </a>
              <a class="text-neutral-400 dark:text-text-muted hover:text-black dark:hover:text-white transition-colors" href="#">
                <span class="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-neutral-100 dark:border-gray-800">
          <p class="text-xs text-neutral-400 dark:text-text-muted font-light">© 2024 Ink &amp; Thought.</p>
          <div class="flex gap-8 text-xs text-neutral-400 dark:text-text-muted font-light">
            <a class="hover:text-black dark:hover:text-white transition-colors" href="#">Terms</a>
            <a class="hover:text-black dark:hover:text-white transition-colors" href="#">Privacy</a>
            <a class="hover:text-black dark:hover:text-white transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { usePosts } from '../composables/usePosts'

const { posts } = usePosts()

const formattedDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
</script>

