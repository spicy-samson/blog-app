# Troubleshooting Guide

## Common Issues and Fixes

### 1. Database Not Initialized

If you're getting database errors, make sure your D1 database is set up:

```bash
# Create the database (if not already created)
npx wrangler d1 create d1-example

# Run migrations
npx wrangler d1 execute d1-example --remote --file=./schemas/schema.sql

# For local development
npx wrangler d1 execute d1-example --local --file=./schemas/schema.sql
```

### 2. Worker Not Deployed

Make sure your worker is deployed:

```bash
cd d1-example
npm run deploy
# or
npx wrangler deploy
```

### 3. Database Binding Issues

Check your `wrangler.jsonc` - make sure:
- `database_id` matches your actual D1 database ID
- `database_name` matches your database name
- `binding` is set to `"DB"` (matches the code)

### 4. CORS Issues

The worker now has CORS configured. If you still have issues:
- Check that the `origin` in CORS config matches your Pages domain
- Verify the request is coming from the correct domain

### 5. Testing the API

Test your worker directly:

```bash
# Test GET endpoint
curl https://d1-example.samsonpaulinoedsel.workers.dev/api/posts/my-first-post/comments

# Test POST endpoint
curl -X POST https://d1-example.samsonpaulinoedsel.workers.dev/api/posts/my-first-post/comments \
  -H "Content-Type: application/json" \
  -d '{"author":"Test User","body":"Test comment"}'
```

### 6. Check Worker Logs

View your worker logs in Cloudflare Dashboard:
1. Go to Workers & Pages → Your Worker
2. Click on "Logs" tab
3. Check for any errors

### 7. Verify Database Schema

Make sure your database has the `created_at` column:

```bash
npx wrangler d1 execute d1-example --remote --command="PRAGMA table_info(comments);"
```

If `created_at` is missing, run the updated schema migration.
