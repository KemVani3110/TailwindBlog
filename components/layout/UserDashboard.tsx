/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Home,
  PlusCircle,
  BarChart3,
  Activity,
  Clock,
  Heart,
  Share2,
  Edit,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  BookOpen,
  Users,
  Trophy,
  Target,
  Zap,
  Bookmark,
} from "lucide-react";

// Enhanced Types
interface Author {
  name: string;
  avatar: string;
  bio: string;
  articles: number;
  id: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  date: string;
  readTime: string;
  author: Author;
  category: string;
  tags: string[];
}

interface UserAnalytics {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  totalLikes: number;
  averageReadTime: string;
  topCategory: string;
  engagementRate: number;
  weeklyGrowth: number;
}

// Enhanced User Dashboard Component
export default function ImprovedUserDashboard() {
  const { data: session } = useSession();

  // State management
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        setAllPosts(data);

        // Filter posts by current user
        const userFilteredPosts = data.filter(
          (post: Post) => post.author.name === session?.user?.name
        );
        setUserPosts(userFilteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch posts"
        );
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.name) {
      fetchPosts();
    }
  }, [session]);

  // Enhanced analytics calculation
  const userAnalytics: UserAnalytics = useMemo(() => {
    const totalPosts = userPosts.length;
    const baseViews = 850;

    // Calculate metrics based on posts
    const totalViews = userPosts.reduce((acc, post) => {
      // More views for newer posts and certain categories
      const categoryMultiplier =
        {
          "Web Development": 1.3,
          React: 1.2,
          Performance: 1.4,
          SEO: 1.1,
          CSS: 1.0,
          Backend: 1.2,
          Deployment: 0.9,
          Analytics: 0.8,
          Advanced: 1.5,
          "UX/UI": 1.1,
          "State Management": 1.3,
          Config: 0.7,
          UI: 0.9,
        }[post.category] || 1.0;

      return (
        acc +
        Math.floor(baseViews * categoryMultiplier * (0.8 + Math.random() * 0.4))
      );
    }, 0);

    const totalComments = Math.floor(totalViews * 0.02 + Math.random() * 5);
    const totalLikes = Math.floor(totalViews * 0.05 + Math.random() * 10);

    // Calculate average read time
    const avgReadTime =
      userPosts.length > 0
        ? Math.round(
            userPosts.reduce((acc, post) => acc + parseInt(post.readTime), 0) /
              userPosts.length
          )
        : 0;

    // Find top category
    const categoryCount = userPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategory =
      Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "N/A";

    // Calculate engagement rate (comments + likes / views)
    const engagementRate =
      totalViews > 0
        ? Number((((totalComments + totalLikes) / totalViews) * 100).toFixed(1))
        : 0;

    // Mock weekly growth
    const weeklyGrowth = Number((Math.random() * 20 - 5).toFixed(1));

    return {
      totalPosts,
      totalViews,
      totalComments,
      totalLikes,
      averageReadTime: `${avgReadTime} phút`,
      topCategory,
      engagementRate,
      weeklyGrowth,
    };
  }, [userPosts]);

  // Enhanced stats with more metrics
  const enhancedStats = [
    {
      title: "Bài viết của tôi",
      value: userAnalytics.totalPosts.toString(),
      change: `+${Math.max(0, Math.floor(userAnalytics.totalPosts * 0.1))}`,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      description: "Tổng số bài viết đã xuất bản",
    },
    {
      title: "Lượt xem",
      value:
        userAnalytics.totalViews > 1000
          ? `${(userAnalytics.totalViews / 1000).toFixed(1)}K`
          : userAnalytics.totalViews.toString(),
      change: `+${userAnalytics.weeklyGrowth}%`,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      description: "Tổng lượt xem tất cả bài viết",
    },
    {
      title: "Tương tác",
      value: (
        userAnalytics.totalComments + userAnalytics.totalLikes
      ).toString(),
      change: `+${Math.floor(userAnalytics.engagementRate)}%`,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      description: "Bình luận + lượt thích",
    },
    {
      title: "Tỷ lệ tương tác",
      value: `${userAnalytics.engagementRate}%`,
      change: userAnalytics.engagementRate > 3 ? "+Tốt" : "Cần cải thiện",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      description: "Tỷ lệ người đọc tương tác",
    },
  ];

  // Get unique categories for filter
  const categories = Array.from(
    new Set(userPosts.map((post) => post.category))
  );

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = userPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        categoryFilter === "all" || post.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    switch (sortBy) {
      case "date-desc":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "date-asc":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return filtered;
  }, [userPosts, searchTerm, categoryFilter, sortBy]);

  // Category distribution data for charts
  const categoryData = useMemo(() => {
    const categoryCount = userPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#ec4899",
      "#6366f1",
    ];

    return Object.entries(categoryCount).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [userPosts]);

  // Mock trend data for line chart
  const trendData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][i],
      views: Math.floor(Math.random() * 200) + 50,
      engagement: Math.floor(Math.random() * 20) + 5,
    }));
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const handleDeletePost = (postId: string) => {
    // Implementation for deleting post
    console.log("Delete post:", postId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-primary/20 mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Đang tải Dashboard</h3>
            <p className="text-muted-foreground">
              Vui lòng chờ trong giây lát...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/*  Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Chào mừng, {session?.user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Quản lý {userAnalytics.totalPosts} bài viết và theo dõi{" "}
            {userAnalytics.totalViews.toLocaleString()} lượt xem
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Trang chủ
            </Link>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Viết bài mới
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-red-50 hover:border-red-200"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Đăng xuất</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Đăng xuất
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Enhanced User Info Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
              <AvatarImage
                src={session?.user?.image || "/ava1.png"}
                alt="User avatar"
              />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session?.user?.name}
              </h3>
              <p className="text-muted-foreground text-lg">
                {session?.user?.email}
              </p>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <Badge variant="default" className="bg-blue-600">
                  <Trophy className="h-3 w-3 mr-1" />
                  Tác giả
                </Badge>
                <Badge variant="secondary">
                  <Calendar className="h-3 w-3 mr-1" />
                  Tham gia: Jan 2024
                </Badge>
                <Badge variant="outline">
                  <Target className="h-3 w-3 mr-1" />
                  Chuyên mục chính: {userAnalytics.topCategory}
                </Badge>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-center text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                {userAnalytics.totalPosts}
              </div>
              <div className="text-sm text-muted-foreground">Bài viết</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {enhancedStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive =
            stat.change.startsWith("+") || stat.change === "Tốt";
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-orange-500 mr-1 rotate-180" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        {categoryData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Phân bố chủ đề bài viết
              </CardTitle>
              <CardDescription>
                Các chủ đề bạn đã viết ({userPosts.length} bài)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} bài viết`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Xu hướng 7 ngày qua
            </CardTitle>
            <CardDescription>Lượt xem và tương tác hàng ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Lượt xem"
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Tương tác"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Management Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Quản lý bài viết ({filteredAndSortedPosts.length})
              </CardTitle>
              <CardDescription>
                Tìm kiếm, lọc và quản lý tất cả bài viết của bạn
              </CardDescription>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết, thẻ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chủ đề</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Mới nhất</SelectItem>
                <SelectItem value="date-asc">Cũ nhất</SelectItem>
                <SelectItem value="title-asc">Tên A-Z</SelectItem>
                <SelectItem value="title-desc">Tên Z-A</SelectItem>
                <SelectItem value="category">Theo chủ đề</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredAndSortedPosts.length === 0 ? (
              <div className="text-center py-12">
                {userPosts.length === 0 ? (
                  <>
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      Chưa có bài viết nào
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Bắt đầu chia sẻ kiến thức của bạn bằng cách viết bài đầu
                      tiên ngay bây giờ!
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Viết bài đầu tiên
                    </Button>
                  </>
                ) : (
                  <>
                    <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      Không tìm thấy bài viết
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter("all");
                      }}
                    >
                      Xóa bộ lọc
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredAndSortedPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="hover:shadow-md transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="font-semibold text-lg hover:text-primary cursor-pointer line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h4>
                            <Badge variant="outline" className="shrink-0">
                              {post.category}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {post.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {Math.floor(Math.random() * 1000 + 100)} lượt xem
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs hover:bg-blue-100 cursor-pointer transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} thẻ khác
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-50"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-green-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-orange-50"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Xóa bài viết
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bạn có chắc chắn muốn xóa bài viết "
                                  {post.title}"? Hành động này không thể hoàn
                                  tác.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePost(post.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Xóa bài viết
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Hoạt động gần đây
          </CardTitle>
          <CardDescription>
            Theo dõi các hoạt động và thành tích của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recent Activity Items */}
            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Bài viết mới được xuất bản</p>
                <p className="text-sm text-muted-foreground">
                  "Advanced React Patterns" đã được xuất bản và nhận được 42
                  lượt xem
                </p>
              </div>
              <div className="text-sm text-muted-foreground">2 giờ trước</div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Bình luận mới</p>
                <p className="text-sm text-muted-foreground">
                  Nhận được 3 bình luận mới trên bài "React State Management"
                </p>
              </div>
              <div className="text-sm text-muted-foreground">1 ngày trước</div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Thành tích mới</p>
                <p className="text-sm text-muted-foreground">
                  Chúc mừng! Bạn đã đạt được 1000 lượt xem trong tháng này
                </p>
              </div>
              <div className="text-sm text-muted-foreground">3 ngày trước</div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Tăng trưởng ấn tượng</p>
                <p className="text-sm text-muted-foreground">
                  Tỷ lệ tương tác tăng 15% so với tuần trước
                </p>
              </div>
              <div className="text-sm text-muted-foreground">1 tuần trước</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Hành động nhanh
          </CardTitle>
          <CardDescription>
            Các công cụ hữu ích để quản lý blog của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-200 group"
            >
              <PlusCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Viết bài mới</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-200 group"
            >
              <BarChart3 className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Xem thống kê</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-200 group"
            >
              <Settings className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Cài đặt</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-200 group"
            >
              <Bookmark className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Bài viết nháp</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Goals and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Mục tiêu tháng này
            </CardTitle>
            <CardDescription>
              Theo dõi tiến độ đạt được mục tiêu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Viết 5 bài viết mới</span>
                <span className="text-muted-foreground">3/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Đạt 2000 lượt xem</span>
                <span className="text-muted-foreground">
                  {userAnalytics.totalViews}/2000
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (userAnalytics.totalViews / 2000) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tăng tỷ lệ tương tác lên 5%</span>
                <span className="text-muted-foreground">
                  {userAnalytics.engagementRate}%/5%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (userAnalytics.engagementRate / 5) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Thành tích
            </CardTitle>
            <CardDescription>Những cột mốc bạn đã đạt được</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Tác giả xuất sắc</p>
                  <p className="text-sm text-muted-foreground">
                    Đã xuất bản {userAnalytics.totalPosts} bài viết
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Người được yêu thích</p>
                  <p className="text-sm text-muted-foreground">
                    Đạt {userAnalytics.totalViews.toLocaleString()} lượt xem
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">
                    Chuyên gia {userAnalytics.topCategory}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chủ đề được viết nhiều nhất
                  </p>
                </div>
              </div>

              {userAnalytics.engagementRate > 3 && (
                <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Người truyền cảm hứng</p>
                    <p className="text-sm text-muted-foreground">
                      Tỷ lệ tương tác cao ({userAnalytics.engagementRate}%)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
