import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/api/*", cors());

app.get("/", (c) => c.text("Hello World"));

// Keep this implementation (Updated to use .all() for SELECT)
app.get("/api/posts/:slug/comments", async (c) => {
  const { slug } = c.req.param();
  // Note: Use .all() for SELECT queries, not .run()
  const { results } = await c.env.DB.prepare(
    `select * from comments where post_slug = ?`
  )
    .bind(slug)
    .all(); // <--- Change .run() to .all() to get data back
  return c.json(results);
});

// Keep this implementation
app.post("/api/posts/:slug/comments", async (c) => {
  const { slug } = c.req.param();
  const { author, body } = await c.req.json();

  if (!author) return c.text("Missing author value for new comment");
  if (!body) return c.text("Missing body value for new comment");

  const { success } = await c.env.DB.prepare(
    `insert into comments (author, body, post_slug) values (?, ?, ?)`
  )
    .bind(author, body, slug)
    .run(); // .run() is correct for INSERT

  if (success) {
    c.status(201);
    return c.text("Created");
  } else {
    c.status(500);
    return c.text("Something went wrong");
  }
});

export default app;