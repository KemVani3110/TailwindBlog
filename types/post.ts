export interface Author {
  bio: string;
  articles: number;
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  date: string;
  readTime: string; // Changed from number to string to match your PostCard usage
  author: Author;
  category?: string;  // Made optional since it's not in your data
  tags: string[];
}