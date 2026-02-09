// Shared types for ORPC between backend and frontend

export interface Comment {
  id: number;
  author: string;
  body: string;
  post_slug: string;
  created_at: string;
}

export interface CreateCommentInput {
  author: string;
  body: string;
}

export interface CreateCommentOutput {
  success: boolean;
  id: number;
}

export interface GetCommentsInput {
  slug: string;
}

export type GetCommentsOutput = Comment[];
