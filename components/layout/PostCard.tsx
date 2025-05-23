import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";
import {
  ArrowRight,
  Grid,
  List,
  Clock,
  Calendar,
  BookOpen,
  Heart,
  Share2,
  Eye,
  Bookmark,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

interface PostCardProps {
  post: Post;
  view?: "grid" | "list";
  className?: string;
  priority?: boolean;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  view = "grid",
  className,
  priority = false,
  featured = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Format date to a more user-friendly format
  const formatDate = (dateString: string) => {
    if (dateString.includes("tháng")) return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} tuần trước`;
    return formatDate(dateString);
  };

  const cardVariants = {
    grid: featured
      ? "group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
      : "group relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20",
    list: "group relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20 md:flex",
  };

  return (
    <Card className={cn(cardVariants[view], className)}>
      {/* Priority/Featured indicator */}
      {(priority || featured) && (
        <div className="absolute top-0 right-0 z-20">
          <div className="bg-gradient-to-l from-primary via-primary to-transparent px-4 py-1 text-xs font-medium text-primary-foreground rounded-bl-lg">
            {featured ? "NỔI BẬT" : "ƯU TIÊN"}
          </div>
        </div>
      )}

      {/* Image Section */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted",
          view === "grid"
            ? featured
              ? "aspect-[16/10] w-full"
              : "aspect-video w-full"
            : "md:w-2/5"
        )}
      >
        <Link
          href={`/blogs/${post.slug}`}
          className="block h-full w-full group/image"
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/image:opacity-80 transition-opacity duration-500 z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover/image:opacity-30 transition-opacity duration-500 z-10" />

          <Image
            src={post.featuredImage || "/images/placeholder.jpg"}
            alt={post.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:brightness-110"
            priority={priority}
          />

          {/* Category Badge */}
          {post.category && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="absolute top-4 left-4 bg-background/90 backdrop-blur-md text-foreground border border-border/50 shadow-lg hover:bg-background transition-all duration-300 z-20">
                    {post.category}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Danh mục: {post.category}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Read time badge */}
          <div className="absolute top-4 right-4 z-20">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-md text-xs border border-border/50"
            >
              <Clock size={12} className="mr-1" />
              {post.readTime}
            </Badge>
          </div>

          {/* Hover action button */}
          <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/image:translate-y-0">
            <Button
              size="sm"
              className="backdrop-blur-md bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg border border-primary/20"
            >
              <Eye size={14} className="mr-2" />
              Đọc ngay
            </Button>
          </div>

          {/* Views/engagement indicator */}
          <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover/image:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-2 text-white/90 text-xs">
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                <span>
                  {post.views || Math.floor(Math.random() * 1000) + 100}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className={cn("flex flex-col", view === "list" ? "md:w-3/5" : "")}>
        <CardHeader className={cn("p-6", view === "list" ? "pb-4" : "pb-3")}>
          {/* Meta information */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{getRelativeTime(post.date)}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readTime} đọc</span>
            </div>
            {post.trending && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp size={14} />
                  <span className="text-xs font-medium">Hot</span>
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <Link href={`/blogs/${post.slug}`} className="group/title">
            <h2
              className={cn(
                "font-bold leading-tight group-hover/title:text-primary transition-colors duration-300 mb-2",
                featured ? "text-2xl md:text-3xl" : "text-xl",
                view === "list" ? "text-lg" : ""
              )}
            >
              {post.title}
            </h2>
          </Link>
        </CardHeader>

        <CardContent
          className={cn(
            "px-6",
            view === "list" ? "pt-0 pb-4" : "pt-0 pb-2",
            "flex-1"
          )}
        >
          {/* Excerpt */}
          <p
            className={cn(
              "text-muted-foreground leading-relaxed mb-4",
              view === "grid" ? "line-clamp-3" : "line-clamp-4",
              featured ? "text-base" : "text-sm"
            )}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs bg-muted/50">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Author Card */}
          <div className="mt-auto">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group/author p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-10 w-10 border-2 ring-2 ring-background shadow-sm">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-medium">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover/author:text-primary transition-colors">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {post.author.role || "Tác giả"}
                    </p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" side="top">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16 border-2">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-lg font-semibold">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {post.author.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {post.author.role || "Tác giả"}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {post.author.bio ||
                        "Một tác giả tài năng với nhiều bài viết chất lượng."}
                    </p>
                    <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen size={12} />
                        <span>{post.author.articles || 12} bài viết</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} />
                        <span>{post.author.followers || 234} theo dõi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-6 py-4 flex justify-between items-center border-t border-border/50 bg-muted/20">
          <Button
            variant="link"
            className="p-0 h-auto text-primary hover:text-primary/80 hover:no-underline font-medium group/read-more"
            asChild
          >
            <Link href={`/blogs/${post.slug}`}>
              Đọc thêm
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover/read-more:translate-x-1"
              />
            </Link>
          </Button>

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-red-50 hover:text-red-500 transition-colors"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      size={16}
                      className={cn(
                        "transition-all duration-300",
                        liked
                          ? "fill-red-500 text-red-500 scale-110"
                          : "text-muted-foreground hover:text-red-500"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{liked ? "Bỏ thích" : "Yêu thích"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    <Bookmark
                      size={16}
                      className={cn(
                        "transition-all duration-300",
                        bookmarked
                          ? "fill-blue-500 text-blue-500 scale-110"
                          : "text-muted-foreground hover:text-blue-500"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{bookmarked ? "Bỏ lưu" : "Lưu bài viết"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-green-50 hover:text-green-500 transition-colors"
                  >
                    <Share2
                      size={16}
                      className="text-muted-foreground hover:text-green-500 transition-colors"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chia sẻ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;

// Enhanced ViewToggle component
export const ViewToggle: React.FC<{
  currentView: "grid" | "list";
  onChangeView: (view: "grid" | "list") => void;
  className?: string;
}> = ({ currentView, onChangeView, className }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-muted/50 p-1 rounded-lg",
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === "grid" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-9 w-9 p-0 transition-all duration-200",
                currentView === "grid"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
              onClick={() => onChangeView("grid")}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xem dạng lưới</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === "list" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-9 w-9 p-0 transition-all duration-200",
                currentView === "list"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
              onClick={() => onChangeView("list")}
              aria-label="List view"
            >
              <List size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xem dạng danh sách</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
