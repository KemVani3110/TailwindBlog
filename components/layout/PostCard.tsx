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
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  view = "grid",
  className,
}) => {
  const [liked, setLiked] = useState(false);

  // Format date to a more user-friendly format
  const formatDate = (dateString: string) => {
    // If already formatted, return as is
    if (dateString.includes("tháng")) return dateString;

    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border bg-card transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-card/95 dark:backdrop-blur-sm",
        view === "list" ? "md:flex" : "",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          view === "grid"
            ? "aspect-video w-full rounded-t-xl"
            : "md:w-2/5 md:rounded-l-xl md:rounded-tr-none"
        )}
      >
        <Link href={`/blogs/${post.slug}`} className="block h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
          <Image
            src={post.featuredImage || "/images/placeholder.jpg"}
            alt={post.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.category && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="absolute top-4 left-4 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm text-white">
                    {post.category}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Mục: {post.category}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="backdrop-blur-md bg-background/70"
            >
              Xem ngay
            </Button>
          </div>
        </Link>
      </div>

      <div className={cn("flex flex-col", view === "list" ? "md:w-3/5" : "")}>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Calendar size={14} />
            <span>{formatDate(post.date)}</span>
            <Separator orientation="vertical" className="h-3" />
            <Clock size={14} />
            <span>{post.readTime} đọc</span>
          </div>

          <Link href={`/blogs/${post.slug}`} className="group/title">
            <h2 className="text-xl font-bold leading-tight group-hover/title:text-primary transition-colors">
              {post.title}
            </h2>
          </Link>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-1">
          <p
            className={cn(
              "text-muted-foreground mb-4",
              view === "grid" ? "line-clamp-2" : "line-clamp-3"
            )}
          >
            {post.excerpt}
          </p>

          <div className="mt-auto">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Avatar className="h-8 w-8 border ring-2 ring-background">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    Viết bởi:{" "}
                    <span className="font-medium text-foreground hover:text-primary transition-colors">
                      {post.author.name}
                    </span>
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex justify-between space-x-4">
                  <Avatar className="h-12 w-12">
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
                      {post.author.bio || "Tác giả của bài viết"}
                    </p>
                    <div className="flex items-center pt-1">
                      <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {post.author.articles || 5} bài viết
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2 flex justify-between items-center border-t">
          <Button
            variant="link"
            className="p-0 h-auto text-primary hover:text-primary/90 hover:no-underline"
            asChild
          >
            <Link href={`/blogs/${post.slug}`}>
              Đọc thêm{" "}
              <ArrowRight
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                size={16}
                className={cn(
                  "transition-colors",
                  liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
              />
              <span className="sr-only">Like</span>
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 size={16} className="text-muted-foreground" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;

// ViewToggle component for switching between grid and list views
export const ViewToggle: React.FC<{
  currentView: "grid" | "list";
  onChangeView: (view: "grid" | "list") => void;
}> = ({ currentView, onChangeView }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === "grid" ? "default" : "outline"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => onChangeView("grid")}
              aria-label="Grid view"
            >
              <Grid size={18} />
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
              variant={currentView === "list" ? "default" : "outline"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => onChangeView("list")}
              aria-label="List view"
            >
              <List size={18} />
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
