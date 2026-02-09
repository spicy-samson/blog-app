# Deployment Guide

## Fixing the API URL Issue

Your frontend is trying to hit the API but getting 404s. Here are two solutions:

### Solution 1: Set Environment Variable in Cloudflare Pages (Recommended)

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Variable name**: `NUXT_PUBLIC_API_URL`
   - **Value**: `https://d1-example.samsonpaulinoedsel.workers.dev`
   - Make sure it's set for **Production** environment
4. Redeploy your Pages site

### Solution 2: Use Pages Functions Proxy (Alternative)

If you prefer to use relative URLs (`/api/*`), you can use the Pages Function I've created:

1. Update `frontend/functions/api/[[path]].ts` with your actual Worker URL
2. Set `NUXT_PUBLIC_API_URL` to empty string (`""`) or `"/"` in Cloudflare Pages environment variables
3. Redeploy

The Pages Function will automatically proxy all `/api/*` requests to your Worker.

## Current Setup

- **Worker URL**: `https://d1-example.samsonpaulinoedsel.workers.dev`
- **Frontend URL**: `https://26544fb1.blog-app-51a.pages.dev`

## Testing

After deploying, test the API endpoint:
```bash
curl https://d1-example.samsonpaulinoedsel.workers.dev/api/posts/my-first-post/comments
```

Then test from your frontend - it should work!
