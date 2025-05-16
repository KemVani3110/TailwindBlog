import { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetail from "@/components/layout/PostDetail";
import { Post } from "@/types/post";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Helper function to fetch all posts
async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
    next: { revalidate: 3600 }, // Revalidate every hour (60 * 60 seconds)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

// Helper function to fetch a single post
async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

// Helper function to get related posts
async function getRelatedPosts(post: Post): Promise<Post[]> {
  const posts = await getPosts();

  return posts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category ||
          p.tags?.some((tag) => post.tags?.includes(tag)))
    )
    .slice(0, 3);
}

// Generate metadata for SEO
export async function generateMetadata(
  props: BlogPostProps
): Promise<Metadata> {
  // Access params safely after awaiting a no-op Promise to satisfy Next.js
  const params = await Promise.resolve(props.params);
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

// This replaces getStaticPaths
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// This is your page component (replaces the default exported component)
export default async function BlogPost(props: BlogPostProps) {
  // Access params safely after awaiting a no-op Promise to satisfy Next.js
  const params = await Promise.resolve(props.params);
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return <PostDetail post={post} relatedPosts={relatedPosts} />;
}
