/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
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
  Heart,
  Share2,
  Edit,
  Trash2,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Zap,
  Target,
  Award,
  Tag,
  Download,
  Upload,
  RefreshCw,
  Bell,
} from "lucide-react";

import { Post } from "@/types/post";

// Extended Post interface for admin features
interface AdminPost extends Post {
  id: any;
  title: string;
  category: any;
  createdAt: string | number | Date;
  author: any;
  views?: number;
  comments?: number;
  likes?: number;
  status: "published" | "draft" | "pending";
  priority?: "high" | "medium" | "low";
}

// Stats interface
interface AdminStats {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  trend: "up" | "down" | "neutral";
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        // Transform posts to AdminPost format
        const adminPosts: AdminPost[] = data.map((post: Post) => ({
          ...post,
          views: Math.floor(Math.random() * 5000) + 500,
          comments: Math.floor(Math.random() * 100) + 5,
          likes: Math.floor(Math.random() * 200) + 10,
          status:
            Math.random() > 0.8
              ? "draft"
              : ("published" as "published" | "draft"),
          priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as
            | "high"
            | "medium"
            | "low",
        }));
        setPosts(adminPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate admin stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const draftPosts = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalComments = posts.reduce(
    (sum, post) => sum + (post.comments || 0),
    0
  );
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const totalAuthors = new Set(posts.map((post) => post.author.name)).size;

  const adminStats: AdminStats[] = [
    {
      title: "Tổng bài viết",
      value: totalPosts.toString(),
      change: "+12.5%",
      icon: FileText,
      color: "text-blue-600",
      bgColor:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
      trend: "up",
    },
    {
      title: "Lượt xem",
      value: `${(totalViews / 1000).toFixed(1)}K`,
      change: "+24.7%",
      icon: Eye,
      color: "text-emerald-600",
      bgColor:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20",
      trend: "up",
    },
    {
      title: "Tác giả",
      value: totalAuthors.toString(),
      change: "+8.2%",
      icon: Users,
      color: "text-purple-600",
      bgColor:
        "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20",
      trend: "up",
    },
    {
      title: "Tương tác",
      value: `${((totalLikes + totalComments) / 1000).toFixed(1)}K`,
      change: "+18.9%",
      icon: Heart,
      color: "text-rose-600",
      bgColor:
        "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/20 dark:to-rose-900/20",
      trend: "up",
    },
  ];

  // Get categories distribution
  const allCategories = posts.reduce((acc, post) => {
    if (post.category) {
      acc[post.category] = (acc[post.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(allCategories).map(
    ([name, value], index) => ({
      name,
      value,
      color: [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4",
        "#84cc16",
        "#f97316",
      ][index % 8],
    })
  );

  // Monthly data (mock based on posts)
  const monthlyData = [
    {
      month: "T1",
      posts: Math.floor(totalPosts * 0.12),
      views: Math.floor(totalViews * 0.15),
      comments: Math.floor(totalComments * 0.1),
      engagement: 4.2,
    },
    {
      month: "T2",
      posts: Math.floor(totalPosts * 0.14),
      views: Math.floor(totalViews * 0.18),
      comments: Math.floor(totalComments * 0.12),
      engagement: 4.8,
    },
    {
      month: "T3",
      posts: Math.floor(totalPosts * 0.16),
      views: Math.floor(totalViews * 0.2),
      comments: Math.floor(totalComments * 0.15),
      engagement: 5.1,
    },
    {
      month: "T4",
      posts: Math.floor(totalPosts * 0.18),
      views: Math.floor(totalViews * 0.17),
      comments: Math.floor(totalComments * 0.18),
      engagement: 5.4,
    },
    {
      month: "T5",
      posts: Math.floor(totalPosts * 0.2),
      views: Math.floor(totalViews * 0.15),
      comments: Math.floor(totalComments * 0.22),
      engagement: 6.2,
    },
    {
      month: "T6",
      posts: Math.floor(totalPosts * 0.2),
      views: Math.floor(totalViews * 0.15),
      comments: Math.floor(totalComments * 0.23),
      engagement: 6.8,
    },
  ];

  // Filter posts based on search
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get top authors
  const authorStats = posts.reduce((acc, post) => {
    const authorName = post.author.name;
    if (!acc[authorName]) {
      acc[authorName] = {
        name: authorName,
        avatar: post.author.avatar,
        posts: 0,
        totalViews: 0,
        totalLikes: 0,
        categories: new Set(),
      };
    }
    acc[authorName].posts += 1;
    acc[authorName].totalViews += post.views || 0;
    acc[authorName].totalLikes += post.likes || 0;
    if (post.category) {
      acc[authorName].categories.add(post.category);
    }
    return acc;
  }, {} as Record<string, { name: string; avatar: string; posts: number; totalViews: number; totalLikes: number; categories: Set<string> }>);

  const topAuthors = Object.values(authorStats)
    .map((author) => ({
      ...author,
      categories: author.categories.size,
      avgViews: Math.floor(author.totalViews / author.posts),
    }))
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 8);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/*Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Dashboard Quản trị
                </h1>
                <p className="text-muted-foreground text-lg">
                  Chào mừng {session?.user?.name}, quản lý toàn bộ hệ thống blog
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" className="shadow-sm" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Trang chủ
              </Link>
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
              <PlusCircle className="h-4 w-4 mr-2" />
              Tạo bài viết
            </Button>
            <Button variant="outline" className="shadow-sm">
              <Users className="h-4 w-4 mr-2" />
              Người dùng
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="shadow-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Hành động nhanh</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Thông báo
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Xuất báo cáo
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/*Admin Info Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-blue-950/50 dark:via-slate-900 dark:to-purple-950/50">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-blue-500/20 ring-offset-4 ring-offset-background shadow-2xl">
                  <AvatarImage
                    src={session?.user?.image || "/ava1.png"}
                    alt="Admin avatar"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 p-2 bg-green-500 rounded-full border-4 border-background">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-2xl font-bold">{session?.user?.name}</h3>
                  <p className="text-muted-foreground text-lg">
                    {session?.user?.email}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1">
                    <Shield className="h-4 w-4 mr-2" />
                    Quản trị viên cấp cao
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Tham gia: Jan 2024
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <Award className="h-4 w-4 mr-2" />
                    Premium
                  </Badge>
                </div>
              </div>
              <div className="hidden lg:flex items-center space-x-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {totalPosts}
                  </div>
                  <div className="text-sm text-muted-foreground">Bài viết</div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <div className="text-2xl font-bold text-emerald-600">
                    {totalAuthors}
                  </div>
                  <div className="text-sm text-muted-foreground">Tác giả</div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor(totalViews / 1000)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Lượt xem</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/*Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <CardContent className="p-0">
                  <div
                    className={`p-6 ${stat.bgColor} relative overflow-hidden`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <div className="flex items-center space-x-1">
                          <TrendingUp
                            className={`h-4 w-4 ${
                              stat.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              stat.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {stat.change}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            vs tháng trước
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-2xl ${stat.color
                          .replace("text-", "bg-")
                          .replace(
                            "-600",
                            "-100"
                          )} dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <Icon className="w-full h-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <Card className="xl:col-span-2 border-0 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                    Biểu đồ hoạt động
                  </CardTitle>
                  <CardDescription>
                    Thống kê chi tiết theo tháng
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient
                        id="colorViews"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorPosts"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="opacity-30"
                    />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorViews)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="posts"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorPosts)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Target className="h-6 w-6 mr-3 text-purple-600" />
                Phân bố chủ đề
              </CardTitle>
              <CardDescription>Tỷ lệ các danh mục bài viết</CardDescription>
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
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.value} bài
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/*Tabs Section */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-grid lg:grid-flow-col">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Bài viết</span>
            </TabsTrigger>
            <TabsTrigger
              value="authors"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Tác giả</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Phân tích</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Cài đặt</span>
            </TabsTrigger>
          </TabsList>

          {/* Posts Management Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle className="text-xl">Quản lý bài viết</CardTitle>
                    <CardDescription>
                      Tổng cộng {totalPosts} bài viết • {publishedPosts} đã xuất
                      bản • {draftPosts} bản nháp
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm bài viết..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Lọc
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bài viết</TableHead>
                        <TableHead>Tác giả</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Số liệu</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead className="w-24">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.slice(0, 20).map((post) => (
                        <TableRow key={post.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="space-y-2">
                              <div className="font-medium line-clamp-2 max-w-md">
                                {post.title}
                              </div>
                              <div className="flex items-center space-x-2">
                                {post.category && (
                                  <Badge variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {post.category}
                                  </Badge>
                                )}
                                <Badge
                                  variant={
                                    post.priority === "high"
                                      ? "destructive"
                                      : post.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {post.priority}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback className="text-xs">
                                  {post.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">
                                  {post.author.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {post.author.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : post.status === "draft"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="capitalize"
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  post.status === "published"
                                    ? "bg-green-500"
                                    : post.status === "draft"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                                }`}
                              ></div>
                              {post.status === "published"
                                ? "Đã xuất bản"
                                : "Bản nháp"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3 text-blue-500" />
                                  <span>{post.views?.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3 text-red-500" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageSquare className="h-3 w-3 text-green-500" />
                                  <span>{post.comments}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                {new Date(post.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(post.createdAt).toLocaleTimeString(
                                  "vi-VN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Xem
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Chia sẻ
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authors Tab */}
          <TabsContent value="authors" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Thống kê tác giả</CardTitle>
                <CardDescription>
                  Top tác giả có hiệu suất cao nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topAuthors.map((author, index) => (
                    <Card
                      key={author.name}
                      className="border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={author.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {index < 3 && (
                              <div className="absolute -top-2 -right-2 p-1 bg-yellow-500 rounded-full">
                                <Star className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{author.name}</h4>
                              <Badge variant="outline">#{index + 1}</Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="font-medium text-blue-600">
                                  {author.posts}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Bài viết
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-emerald-600">
                                  {(author.totalViews / 1000).toFixed(1)}K
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Lượt xem
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-purple-600">
                                  {author.categories}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Chủ đề
                                </div>
                              </div>
                            </div>
                            <Progress
                              value={
                                (author.totalViews /
                                  Math.max(
                                    ...topAuthors.map((a) => a.totalViews)
                                  )) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Activity className="h-6 w-6 mr-3 text-green-600" />
                    Tỷ lệ tương tác
                  </CardTitle>
                  <CardDescription>
                    Mức độ tương tác theo thời gian
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="opacity-30"
                        />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="engagement"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                          activeDot={{
                            r: 8,
                            stroke: "#10b981",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
                    Xu hướng bình luận
                  </CardTitle>
                  <CardDescription>
                    Số lượng bình luận theo tháng
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="opacity-30"
                        />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar
                          dataKey="comments"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Stats */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Zap className="h-6 w-6 mr-3 text-yellow-600" />
                  Thống kê theo thời gian thực
                </CardTitle>
                <CardDescription>Dữ liệu cập nhật liên tục</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">
                      {totalPosts}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tổng bài viết
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.floor(totalViews / 1000)}K
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tổng lượt xem
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">
                      {totalComments}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tổng bình luận
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/20 dark:to-rose-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-rose-600">
                      {totalLikes}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tổng lượt thích
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Settings className="h-6 w-6 mr-3 text-gray-600" />
                    Cài đặt hệ thống
                  </CardTitle>
                  <CardDescription>Quản lý cấu hình tổng thể</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-publish">Tự động xuất bản</Label>
                        <p className="text-sm text-muted-foreground">
                          Tự động xuất bản bài viết sau khi được duyệt
                        </p>
                      </div>
                      <Switch id="auto-publish" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">
                          Thông báo email
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Nhận thông báo qua email khi có bài viết mới
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="comment-moderation">
                          Kiểm duyệt bình luận
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Yêu cầu phê duyệt trước khi hiển thị bình luận
                        </p>
                      </div>
                      <Switch id="comment-moderation" defaultChecked />
                    </div>
                  </div>

                  <Button className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Cập nhật cài đặt
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Shield className="h-6 w-6 mr-3 text-red-600" />
                    Bảo mật & Quyền hạn
                  </CardTitle>
                  <CardDescription>
                    Quản lý quyền truy cập và bảo mật
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="backup-frequency">Tần suất sao lưu</Label>
                      <select className="w-full mt-2 p-2 border rounded-md">
                        <option>Hàng ngày</option>
                        <option>Hàng tuần</option>
                        <option>Hàng tháng</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="session-timeout">
                        Thời gian hết phiên (phút)
                      </Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue="30"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Sao lưu dữ liệu
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Khôi phục dữ liệu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Zap className="h-6 w-6 mr-3 text-yellow-600" />
              Hành động nhanh
            </CardTitle>
            <CardDescription>
              Các tác vụ thường dùng cho quản trị viên
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <PlusCircle className="h-6 w-6" />
                <span>Tạo bài viết</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Users className="h-6 w-6" />
                <span>Quản lý user</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <BarChart3 className="h-6 w-6" />
                <span>Xem báo cáo</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Settings className="h-6 w-6" />
                <span>Cài đặt</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
