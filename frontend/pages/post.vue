<template>
  <div class="bg-background-light text-gray-900 font-display antialiased min-h-screen flex flex-col dark:bg-background-dark dark:text-text-main">
    <AppHeader />

    <main class="pt-32 pb-24 px-6 max-w-3xl mx-auto flex-1">
      <header class="mb-16 text-center" v-if="post">
        <div class="flex items-center justify-center space-x-3 text-primary text-xs font-medium mb-6 uppercase tracking-widest">
          <span>{{ post.category }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/20" />
          <span>{{ formattedDate(post.publishedAt) }}</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4 tracking-tight">
          {{ post.title }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-text-muted">
          <span v-if="author">{{ author.name }}</span>
          <span v-if="author"> • </span>
          <span>{{ post.readTimeMinutes }} min read</span>
        </p>
      </header>

      <section v-if="post" class="prose max-w-none dark:prose-invert prose-p:text-gray-600 dark:prose-p:text-text-muted">
        <p class="mb-8 leading-loose">
          {{ post.body }}
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Post, Author } from '../types/post'
import { usePosts } from '../composables/usePosts'

const { posts, getPostBySlug, getAuthorById } = usePosts()

// For now, use a fixed slug that matches our fake data and seeded DB
const slug = 'digital-minimalism'

const post = (getPostBySlug(slug) ?? posts[0]) as Post | undefined
const author = (post ? getAuthorById(post.authorId) : undefined) as Author | undefined

const formattedDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
</script>

