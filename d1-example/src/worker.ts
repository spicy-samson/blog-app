import { Hono } from "hono";
import { cors } from "hono/cors";
import { rpc } from "./rpc";

type Env = {
  DB: D1Database;
};

export type AppType = typeof app;

const app = new Hono<{ Bindings: Env }>();

// Configure CORS to allow requests from your Pages domain
app.use("/*", cors({
  origin: "*", // In production, you might want to restrict this to your Pages domain
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

app.get("/", (c) => c.text("Hello World"));

// ORPC endpoint - handles all RPC calls
app.post("/rpc", async (c) => {
  try {
    const body = await c.req.json();
    const { method, params } = body;

    if (!method || typeof method !== 'string') {
      return c.json({ error: "Invalid RPC request: method is required" }, 400);
    }

    // Route to the appropriate RPC procedure
    if (method === 'comments.get') {
      if (!params || !params.slug) {
        return c.json({ error: "Invalid params: slug is required" }, 400);
      }
      const result = await rpc['comments.get'](c, params);
      return c.json({ result });
    }

    if (method === 'comments.create') {
      if (!params || !params.slug || !params.author || !params.body) {
        return c.json({ error: "Invalid params: slug, author, and body are required" }, 400);
      }
      const result = await rpc['comments.create'](c, params);
      return c.json({ result });
    }

    return c.json({ error: `Unknown method: ${method}` }, 404);
  } catch (error) {
    console.error("RPC error:", error);
    return c.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, 500);
  }
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error", details: String(err) }, 500);
});

export default app;