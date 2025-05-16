/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { Post } from "@/types/post";
import PostCard from "@/components/layout/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Filter, ArrowUpDown, Tag, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BlogsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New state for featured posts
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
        setFilteredPosts(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((post: Post) => post.category)),
        ] as string[];
        setCategories(uniqueCategories);

        // Extract unique tags
        const allTags = data.flatMap((post: Post) => post.tags || []);
        const uniqueTags = [...new Set(allTags)] as string[];
        setTags(uniqueTags);

        // Set featured posts (assuming first 3 are featured)
        setFeaturedPosts(data.slice(0, 3));

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on category, tag and search query
    let result = [...posts];

    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort posts
    result = result.sort((a, b) => {
      const dateA = new Date(
        a.date.includes("tháng")
          ? a.date.replace(/(\d+) tháng (\d+), (\d+)/, "$2-$1-$3")
          : a.date
      );
      const dateB = new Date(
        b.date.includes("tháng")
          ? b.date.replace(/(\d+) tháng (\d+), (\d+)/, "$2-$1-$3")
          : b.date
      );

      return sortOrder === "newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    setFilteredPosts(result);
  }, [posts, selectedCategory, selectedTag, searchQuery, sortOrder]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (order: "newest" | "oldest" | "popular") => {
    setSortOrder(order);
  };

  const handleViewChange = (viewType: "grid" | "list") => {
    setView(viewType);
  };

  const refreshPosts = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setSelectedCategory("");
      setSelectedTag("");
      setSearchQuery("");
      setIsRefreshing(false);
    }, 800);
  };

  const SkeletonCard = () => (
    <Card className="overflow-hidden">
      <div className="bg-muted h-48 animate-pulse"></div>
      <CardContent className="p-4 space-y-4">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-pulse"></div>
          <div className="h-3 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );

  const ActiveFilters = () => {
    const hasFilters = selectedCategory || selectedTag || searchQuery;

    if (!hasFilters) return null;

    return (
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">
          Bộ lọc đang áp dụng:
        </span>
        {selectedCategory && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Danh mục: {selectedCategory}</span>
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setSelectedCategory("")}
            >
              ×
            </button>
          </Badge>
        )}
        {selectedTag && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Tag: {selectedTag}</span>
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setSelectedTag("")}
            >
              ×
            </button>
          </Badge>
        )}
        {searchQuery && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Tìm kiếm: &quot;{searchQuery}&quot;</span>
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={refreshPosts}
        >
          Xóa tất cả
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl">
      {/* Title and description - improved mobile layout */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Khám phá kiến thức, chia sẻ và cập nhật thông tin mới nhất
          </p>
        </div>

        {/* View controls - stacked on mobile, side-by-side on tablets and up */}
        <div className="flex flex-col xs:flex-row gap-3">
          <Select
            value={view}
            onValueChange={(value) =>
              handleViewChange(value as "grid" | "list")
            }
          >
            <SelectTrigger className="w-full xs:w-32">
              <SelectValue placeholder="Kiểu hiển thị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Lưới</SelectItem>
              <SelectItem value="list">Danh sách</SelectItem>
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={refreshPosts}
                  disabled={isRefreshing}
                  className="w-full xs:w-auto flex justify-center"
                >
                  <RefreshCw
                    size={16}
                    className={cn(
                      "transition-all",
                      isRefreshing && "animate-spin"
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Làm mới</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Navigation Tabs - horizontally scrollable on mobile */}
      <Tabs defaultValue="all" className="mb-6 md:mb-8">
        <div className="border-b overflow-x-auto pb-1">
          <TabsList className="bg-transparent h-10 md:h-12 w-max min-w-full">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full"
            >
              Tất cả
            </TabsTrigger>
            {categories.slice(0, 4).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
            {categories.length > 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    Xem thêm
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.slice(4).map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </TabsList>
        </div>
      </Tabs>

      {/* Filter and Search - stacked on mobile */}
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* Filter buttons - scrollable on small devices */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter size={16} className="mr-2" />
                <span className="hidden xs:inline">
                  {selectedCategory || "Danh mục"}
                </span>
                <span className="xs:hidden">Danh mục</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Danh mục</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedCategory("")}
                className={
                  !selectedCategory ? "bg-accent text-accent-foreground" : ""
                }
              >
                Tất cả danh mục
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={
                    selectedCategory === category
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <Tag size={16} className="mr-2" />
                <span className="hidden xs:inline">
                  {selectedTag || "Tags"}
                </span>
                <span className="xs:hidden">Tags</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-56 overflow-y-auto p-2">
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer m-1"
                      onClick={() => handleTagChange(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <ArrowUpDown size={16} className="mr-2" />
                <span className="hidden xs:inline">
                  {sortOrder === "newest"
                    ? "Mới nhất"
                    : sortOrder === "oldest"
                    ? "Cũ nhất"
                    : "Phổ biến nhất"}
                </span>
                <span className="xs:hidden">Sắp xếp</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleSortChange("newest")}
                className={
                  sortOrder === "newest"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }
              >
                Mới nhất
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("oldest")}
                className={
                  sortOrder === "oldest"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }
              >
                Cũ nhất
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("popular")}
                className={
                  sortOrder === "popular"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }
              >
                Phổ biến nhất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active filters - improved wrapping */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {/* Active filters component remains the same */}
      </div>

      {/* Post List - improved grid responsiveness */}
      {loading ? (
        <div
          className={cn(
            "grid gap-4 sm:gap-6",
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Hiển thị {filteredPosts.length} bài viết
          </div>

          <div
            className={cn(
              "grid gap-4 sm:gap-6",
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} view={view} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 md:py-16">
          <Alert>
            <div className="flex flex-col items-center p-4">
              <h3 className="text-lg md:text-xl font-medium mb-2">
                Không tìm thấy bài viết nào
              </h3>
              <AlertDescription className="text-center mb-4">
                Thử tìm kiếm với từ khóa khác hoặc xem tất cả bài viết
              </AlertDescription>
              <Button className="mt-2" onClick={refreshPosts}>
                Xem tất cả bài viết
              </Button>
            </div>
          </Alert>
        </div>
      )}

      {/* Load more button */}
      {filteredPosts.length > 9 && (
        <div className="text-center mt-6 md:mt-10">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Xem thêm bài viết
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
