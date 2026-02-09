# ORPC Setup Documentation

This project uses a custom ORPC (Object RPC) implementation for type-safe communication between the frontend and backend.

## Architecture

### Backend (`d1-example/src/`)

- **`rpc.ts`**: Defines all RPC procedures with their implementations
- **`worker.ts`**: Hono app that exposes the `/rpc` endpoint

### Frontend (`frontend/`)

- **`composables/useRpc.ts`**: Composable that provides type-safe RPC client methods
- **`pages/index.vue`**: Uses the RPC client instead of direct fetch calls

## How It Works

### Backend RPC Procedures

RPC procedures are defined in `d1-example/src/rpc.ts`:

```typescript
export const rpc = {
  'comments.get': async (c, input: { slug: string }) => {
    // Implementation
    return { data: [...] };
  },
  'comments.create': async (c, input: { slug: string; author: string; body: string }) => {
    // Implementation
    return { success: true, id: 123 };
  },
};
```

### Frontend RPC Client

The frontend uses the `useRpc()` composable:

```typescript
const rpc = useRpc();

// Get comments
const comments = await rpc.comments.get('my-first-post');

// Create comment
const result = await rpc.comments.create('my-first-post', 'Author', 'Body');
```

## API Endpoint

All RPC calls go through a single endpoint:

- **URL**: `/rpc`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "method": "comments.get",
    "params": { "slug": "my-first-post" }
  }
  ```

## Adding New RPC Methods

1. **Add procedure to backend** (`d1-example/src/rpc.ts`):
   ```typescript
   export const rpc = {
     // ... existing procedures
     'newMethod': async (c, input: { param: string }) => {
       // Implementation
       return { result: 'data' };
     },
   };
   ```

2. **Add route handler** (`d1-example/src/worker.ts`):
   ```typescript
   if (method === 'newMethod') {
     const result = await rpc['newMethod'](c, params);
     return c.json({ result });
   }
   ```

3. **Add client method** (`frontend/composables/useRpc.ts`):
   ```typescript
   return {
     // ... existing methods
     newMethod: (param: string) => call<ReturnType>('newMethod', { param }),
   };
   ```

## Benefits

1. **Type Safety**: TypeScript types ensure correct usage
2. **Single Endpoint**: All API calls go through `/rpc`
3. **Consistent Error Handling**: Standardized error responses
4. **Easy to Extend**: Add new methods by following the pattern

## Migration from REST

The old REST endpoints (`/api/posts/:slug/comments`) have been replaced with:
- `comments.get` RPC method (replaces GET)
- `comments.create` RPC method (replaces POST)
