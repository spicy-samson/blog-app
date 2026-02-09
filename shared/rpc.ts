// Shared RPC types and procedures
import { hc } from 'hono/client';
import type { AppType } from '../d1-example/src/worker';

// This will be used on the frontend to get type-safe client
export type AppClient = ReturnType<typeof hc<AppType>>;
