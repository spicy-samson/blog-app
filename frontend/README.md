# Comments Frontend

A simple Nuxt 3 frontend for the D1 Comments API.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set the API URL (optional, defaults to `http://localhost:8787`):
```bash
export API_URL=http://localhost:8787
```

Or create a `.env` file:
```
API_URL=http://localhost:8787
```

For production, use your deployed API URL:
```
API_URL=https://your-app.workers.dev
```

## Development

Run the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Build

Build for production:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

## Usage

1. Enter a post slug (e.g., "my-first-post")
2. Click "Load Comments" to view existing comments
3. Fill in your name and comment
4. Click "Submit Comment" to add a new comment
