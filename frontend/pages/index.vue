<template>
  <div class="container">
    <h1>Comments</h1>
    
    <div class="post-selector">
      <label for="post-slug">Post Slug:</label>
      <input
        id="post-slug"
        v-model="postSlug"
        type="text"
        placeholder="e.g., my-first-post"
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
        ></textarea>
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
          <div class="comment-author">{{ comment.author }}</div>
          <div class="comment-body">{{ comment.body }}</div>
          <div class="comment-date">{{ formatDate(comment.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '~/types/comment'

const rpc = useRpc()
const postSlug = ref('my-first-post')
const comments = ref<Comment[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const submitting = ref(false)

const newComment = ref({
  author: '',
  body: ''
})

const loadComments = async () => {
  if (!postSlug.value) return
  
  loading.value = true
  error.value = null
  
  try {
    const result = await rpc.comments.get(postSlug.value)
    comments.value = result || []
  } catch (e: any) {
    error.value = e.message || 'Failed to load comments'
    comments.value = []
  } finally {
    loading.value = false
  }
}

const submitComment = async () => {
  if (!newComment.value.author || !newComment.value.body) {
    alert('Please fill in both name and comment')
    return
  }
  
  submitting.value = true
  
  try {
    await rpc.comments.create(
      postSlug.value,
      newComment.value.author,
      newComment.value.body
    )
    
    // Clear form and reload comments
    newComment.value = { author: '', body: '' }
    await loadComments()
  } catch (e: any) {
    alert('Error: ' + (e.message || 'Failed to submit comment'))
  } finally {
    submitting.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString()
}

// Load comments on mount if postSlug is set
onMounted(() => {
  if (postSlug.value) {
    loadComments()
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #34495e;
}

h3 {
  margin-bottom: 1rem;
  color: #555;
}

.post-selector {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.post-selector label {
  font-weight: 600;
}

.post-selector input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.post-selector button {
  padding: 0.5rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.post-selector button:hover {
  background: #2980b9;
}

.comments-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.comment-form {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #eee;
}

.input,
.textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.textarea {
  resize: vertical;
}

.comment-form button {
  padding: 0.75rem 2rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.comment-form button:hover:not(:disabled) {
  background: #229954;
}

.comment-form button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.loading,
.error,
.no-comments {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

.error {
  color: #e74c3c;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.comment-author {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.comment-body {
  color: #555;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

.comment-date {
  font-size: 0.875rem;
  color: #95a5a6;
}
</style>
