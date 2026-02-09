import { Hono } from "hono";
import { cors } from "hono/cors";

type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// Configure CORS to allow requests from your Pages domain
app.use("/api/*", cors({
  origin: "*", // In production, you might want to restrict this to your Pages domain
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

app.get("/", (c) => c.text("Hello World"));

// Get comments for a post
app.get("/api/posts/:slug/comments", async (c) => {
  try {
    const { slug } = c.req.param();
    
    if (!c.env.DB) {
      return c.json({ error: "Database not available" }, 500);
    }

    const { results } = await c.env.DB.prepare(
      `SELECT id, author, body, post_slug, created_at FROM comments WHERE post_slug = ? ORDER BY id DESC`
    )
      .bind(slug)
      .all();

    return c.json(results || []);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return c.json({ error: "Failed to fetch comments", details: String(error) }, 500);
  }
});

// Create a new comment
app.post("/api/posts/:slug/comments", async (c) => {
  try {
    const { slug } = c.req.param();
    const body = await c.req.json();
    const { author, body: commentBody } = body;

    if (!c.env.DB) {
      return c.json({ error: "Database not available" }, 500);
    }

    if (!author) {
      return c.json({ error: "Missing author value for new comment" }, 400);
    }
    if (!commentBody) {
      return c.json({ error: "Missing body value for new comment" }, 400);
    }

    const { success, meta } = await c.env.DB.prepare(
      `INSERT INTO comments (author, body, post_slug, created_at) VALUES (?, ?, ?, datetime('now'))`
    )
      .bind(author, commentBody, slug)
      .run();

    if (success) {
      return c.json({ success: true, id: meta.last_row_id }, 201);
    } else {
      return c.json({ error: "Failed to create comment" }, 500);
    }
  } catch (error) {
    console.error("Error creating comment:", error);
    return c.json({ error: "Failed to create comment", details: String(error) }, 500);
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