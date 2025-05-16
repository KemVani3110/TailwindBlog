"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Bookmark,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import PostCard from "@/components/layout/PostCard";
import { Post } from "@/types/post";

interface PostDetailProps {
  post: Post;
  relatedPosts: Post[];
}

const PostDetail = ({ post, relatedPosts }: PostDetailProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 50) + 5
  );
  const [isLiked, setIsLiked] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Format date to Vietnamese format
  const formatDate = (dateString: string) => {
    if (dateString.includes("tháng")) return dateString;

    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Parse and render markdown content
  const renderContent = () => {
    return (
      <div
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
      />
    );
  };

  // Simple markdown to HTML converter
  const markdownToHtml = (markdown: string) => {
    if (!markdown) return "";

    // Convert headings
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>'
      );

    // Convert paragraphs
    html = html.replace(/^\s*(\n)?(.+)/gm, function (m) {
      return /^<(\/)?(h|ul|ol|li|blockquote|pre|img)/.test(m)
        ? m
        : '<p class="my-4">' + m + "</p>";
    });

    // Convert blockquotes
    html = html.replace(
      /^\> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary pl-4 italic my-6">$1</blockquote>'
    );

    // Convert code blocks
    html = html.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-secondary p-4 rounded-md my-6 overflow-x-auto"><code>$1</code></pre>'
    );

    return html;
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const getEstimatedReadTime = (content: string) => {
    if (!content) return "Không xác định";
    const words = content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(words / 200); // Assuming 200 words per minute
    return `${readingTimeMinutes} phút đọc`;
  };

  return (
    <>
      {/* Reading progress bar */}
      <Progress
        value={scrollProgress}
        className="fixed top-0 left-0 right-0 z-50 h-1 rounded-none bg-muted"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {post.category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/category/${post.category.toLowerCase()}`}
                  >
                    {post.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back button */}
        <Button
          variant="outline"
          size="sm"
          className="mb-8"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} className="mr-2" />
          Quay lại
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* Post header */}
            <div className="space-y-6 mb-8">
              {post.category && (
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {post.category}
                </Badge>
              )}

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>
                    {post.readTime || getEstimatedReadTime(post.content)}
                  </span>
                </div>
              </div>

              {/* Author info with hover card */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={post.author.avatar}
                        alt={post.author.name}
                      />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">Tác giả</p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {post.author.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {post.author.bio || "Tác giả tại blog của chúng tôi"}
                      </p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          {post.author.articles ||
                            Math.floor(Math.random() * 20) + 1}{" "}
                          bài viết đã xuất bản
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Featured image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8">
              <Image
                src={post.featuredImage || "/images/placeholder.jpg"}
                alt={post.title}
                width={1200}
                height={675}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Social sharing and actions */}
            <Card className="mb-8">
              <CardContent className="flex justify-between items-center py-4">
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleLikeClick}
                          className={isLiked ? "text-red-500" : ""}
                        >
                          <Heart
                            size={20}
                            className={isLiked ? "fill-red-500" : ""}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isLiked ? "Bỏ thích" : "Thích"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <span className="text-muted-foreground self-center">
                    {likeCount}
                  </span>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MessageSquare size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bình luận</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Share2 size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chia sẻ</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleBookmarkClick}
                          className={isBookmarked ? "text-primary" : ""}
                        >
                          <Bookmark
                            size={20}
                            className={isBookmarked ? "fill-primary" : ""}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isBookmarked ? "Đã lưu" : "Lưu bài viết"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {/* Post content */}
            <article className="mx-auto">{renderContent()}</article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                <Tag size={16} className="text-muted-foreground mt-1" />
                {post.tags.map((tag) => (
                  <Link href={`/tags/${tag}`} key={tag}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            {/* Author card */}
            <Card className="mt-12">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{post.author.name}</h3>
                    <p className="text-sm text-muted-foreground">Tác giả</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {post.author.bio ||
                    "Tác giả tại blog của chúng tôi với nhiều năm kinh nghiệm trong lĩnh vực này. Luôn mong muốn mang đến những nội dung chất lượng và hữu ích cho độc giả."}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href={`/author/${post.author.id || "about"}`}>
                    Xem tất cả bài viết
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Card className="mb-6">
                <CardHeader>
                  <h3 className="text-lg font-bold">Mục lục</h3>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {post.content &&
                    generateTableOfContents(post.content).map((item, index) => (
                      <Link
                        key={index}
                        href={`#${item.id}`}
                        className={`text-sm hover:text-primary transition-colors 
                        ${item.level === 2 ? "ml-0 font-medium" : "ml-4"}`}
                      >
                        {item.text}
                      </Link>
                    ))}
                </CardContent>
              </Card>

              {/* Newsletter signup */}
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <CardHeader>
                  <h3 className="text-lg font-bold">
                    Đăng ký nhận bài viết mới
                  </h3>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <input
                      type="email"
                      placeholder="Email của bạn"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                    <Button>Đăng ký</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Popular tags */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Tags phổ biến</h3>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {generatePopularTags().map((tag, index) => (
                    <Link href={`/tags/${tag.toLowerCase()}`} key={index}>
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16">
            <Separator className="my-8" />
            <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Helper functions
function generateTableOfContents(content: string) {
  if (!content) return [];

  // Extract headings from content
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, "-");

    toc.push({ level, text, id });
  }

  return toc;
}

function generatePopularTags() {
  // Sample tags
  return [
    "React",
    "JavaScript",
    "Web Development",
    "Frontend",
    "Design",
    "UI/UX",
    "Tutorial",
  ];
}

export default PostDetail;
