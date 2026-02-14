<template>
  <div class="container">
    <h1>Comments</h1>

    <div class="post-selector">
      <label for="post-slug">Post Slug:</label>
      <input
        id="post-slug"
        v-model="postSlug"
        type="text"
        placeholder="e.g., digital-minimalism"
        @keyup.enter="loadComments"
      />
      <button @click="loadComments">Load Comments</button>
    </div>

    <div v-if="postSlug" class="comments-section">
      <h2>Comments for: {{ postSlug }}</h2>

      <div class="comment-form">
        <h3>Add a Comment</h3>
        <input
          v-model="newComment.author"
          type="text"
          placeholder="Your name"
          class="input"
        />
        <textarea
          v-model="newComment.body"
          placeholder="Your comment"
          class="textarea"
          rows="4"
        />
        <button @click="submitComment" :disabled="submitting">
          {{ submitting ? 'Submitting...' : 'Submit Comment' }}
        </button>
      </div>

      <div v-if="loading" class="loading">Loading comments...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="comments.length === 0" class="no-comments">
        No comments yet. Be the first to comment!
      </div>
      <div v-else class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="comment-author">{{ comment.author_name }}</div>
          <div class="comment-body">{{ comment.body }}</div>
          <div class="comment-date">{{ formatDate(comment.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '../types/comment'
import { useState } from 'nuxt/app'
import { useRpc } from '../composables/useRpc'

const rpc = useRpc()

const postSlug = useState('comments-post-slug', () => 'digital-minimalism')
const comments = useState<Comment[]>('comments-list', () => [])
const loading = useState('comments-loading', () => false)
const error = useState<string | null>('comments-error', () => null)
const submitting = useState('comments-submitting', () => false)

const newComment = useState('comments-new', () => ({
  author: '',
  body: '',
}))

const loadComments = async () => {
  if (!postSlug.value) return

  loading.value = true
  error.value = null

  try {
    const result = await rpc.posts.getWithComments(postSlug.value)
    comments.value = result.comments || []
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error('Failed to load comments')
    error.value = err.message
    comments.value = []
  } finally {
    loading.value = false
  }
}

const submitComment = async () => {
  if (!newComment.value.author?.trim() || !newComment.value.body?.trim()) {
    alert('Please fill in both name and comment')
    return
  }

  submitting.value = true

  try {
    await rpc.comments.create(
      postSlug.value,
      newComment.value.author.trim(),
      newComment.value.body.trim(),
    )
    newComment.value = { author: '', body: '' }
    await loadComments()
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error('Failed to submit comment')
    alert('Error: ' + err.message)
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  if (postSlug.value) loadComments()
})
</script>

<style scoped>
.container {
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--tw-prose-headings);
}

.post-selector {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.post-selector label {
  font-weight: 500;
  color: inherit;
}

.post-selector input {
  flex: 1;
  min-width: 12rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.25rem;
  background: white;
  color: #171717;
}

.dark .post-selector input {
  border-color: #404040;
  background: #262626;
  color: #fafafa;
}

.post-selector button,
.comment-form button {
  padding: 0.5rem 1rem;
  font-weight: 500;
  background: #135bec;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.post-selector button:hover:not(:disabled),
.comment-form button:hover:not(:disabled) {
  background: #2563eb;
}

.comment-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.comments-section {
  margin-top: 2rem;
}

.comments-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.comment-form {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  background: #fafafa;
}

.dark .comment-form {
  border-color: #404040;
  background: #18181b;
}

.comment-form h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.input,
.textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.25rem;
  background: white;
  color: #171717;
}

.dark .input,
.dark .textarea {
  border-color: #404040;
  background: #262626;
  color: #fafafa;
}

.textarea {
  resize: vertical;
  min-height: 5rem;
}

.loading,
.error,
.no-comments {
  padding: 1rem;
  border-radius: 0.25rem;
}

.error {
  background: #fef2f2;
  color: #b91c1c;
}

.dark .error {
  background: #450a0a;
  color: #fca5a5;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  background: white;
}

.dark .comment {
  border-color: #404040;
  background: #262626;
}

.comment-author {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.comment-body {
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

.comment-date {
  font-size: 0.875rem;
  color: #737373;
}

.dark .comment-date {
  color: #a3a3a3;
}
</style>
