export interface Author {
  id: number
  name: string
  avatarUrl: string
  bio: string
}

export interface Post {
  id: number
  slug: string
  title: string
  excerpt: string
  body: string
  coverImage: string
  category: string
  tags: string[]
  authorId: number
  publishedAt: string
  readTimeMinutes: number
}

