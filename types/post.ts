/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Author {
  followers?: number;
  role: string;
  bio: string;
  articles: number;
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  views?: number;
  trending?: any;
  image: string;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  date: string;
  readTime: string;
  author: Author;
  category?: string;
  tags: string[];
}