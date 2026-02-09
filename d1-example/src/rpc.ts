// RPC procedures definition for type-safe API
import type { Context } from 'hono';

type Env = {
  DB: D1Database;
};

// RPC procedures
export const rpc = {
  'comments.get': async (c: Context<{ Bindings: Env }>, input: { slug: string }) => {
    try {
      if (!c.env.DB) {
        throw new Error('Database not available');
      }

      if (!input.slug) {
        throw new Error('Slug is required');
      }

      const { results } = await c.env.DB.prepare(
        `SELECT id, author, body, post_slug, created_at FROM comments WHERE post_slug = ? ORDER BY id DESC`
      )
        .bind(input.slug)
        .all();

      return { data: results || [] };
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error(`Failed to fetch comments: ${error}`);
    }
  },

  'comments.create': async (c: Context<{ Bindings: Env }>, input: { slug: string; author: string; body: string }) => {
    try {
      if (!c.env.DB) {
        throw new Error('Database not available');
      }

      if (!input.slug) {
        throw new Error('Slug is required');
      }
      if (!input.author) {
        throw new Error('Missing author value for new comment');
      }
      if (!input.body) {
        throw new Error('Missing body value for new comment');
      }

      const { success, meta } = await c.env.DB.prepare(
        `INSERT INTO comments (author, body, post_slug, created_at) VALUES (?, ?, ?, datetime('now'))`
      )
        .bind(input.author, input.body, input.slug)
        .run();

      if (success) {
        return { success: true, id: meta.last_row_id };
      } else {
        throw new Error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },
};
