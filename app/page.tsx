/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Check,
  Loader2,
  Mail,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import PostCard from "@//components/layout/PostCard";
import BackToTop from "@//components/layout/BackToTop";
import { Post } from "@/types/post";
// import { useLoading } from "./context/LoadingContext";
// import { ContentLoader } from "./loading";

export default function Home() {
  // Sử dụng loading context thay vì state local
  // const { showLoading, hideLoading } = useLoading();
  const [posts, setPosts] = useState<Post[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  // Data for statistics chart
  const statsData = [
    { name: "Bài viết", value: posts.length, color: "#0ea5e9" },
    { name: "Lượt xem", value: 10500, color: "#8b5cf6" },
    { name: "Bình luận", value: 230, color: "#f43f5e" },
  ];

  // Data for popular topics
  const topicsData = [
    { name: "Next.js", count: 12, color: "#000000" },
    { name: "React", count: 10, color: "#61dafb" },
    { name: "JS", count: 8, color: "#f7df1e" },
    { name: "TS", count: 6, color: "#3178c6" },
    { name: "CSS", count: 5, color: "#264de4" },
    { name: "Web Dev", count: 4, color: "#4caf50" },
    { name: "Performance", count: 3, color: "#ff9800" },
    { name: "Design", count: 2, color: "#e91e63" },
  ];

  const [activePieIndex, setActivePieIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => {
    setActivePieIndex(index);
  };

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // Thêm animation scroll reveal
    const handleScrollAnimation = () => {
      const animElements = document.querySelectorAll(".scroll-reveal");

      animElements.forEach((elem) => {
        const elementTop = elem.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          elem.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    // Trigger once on load
    setTimeout(handleScrollAnimation, 300);

    return () => window.removeEventListener("scroll", handleScrollAnimation);
  }, []);

  // Fetch posts và sử dụng loading context
  useEffect(() => {
    const fetchPostsData = async () => {
      // showLoading("Đang tải dữ liệu bài viết...");

      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setTimeout(() => {
          // hideLoading();
        }, 1500);
      }
    };

    fetchPostsData();
  }, []); //[showLoading, hideLoading]

  const featuredPosts = posts.slice(0, 3);
  const regularPosts = posts.slice(3);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Newsletter state
  interface SubscriptionMessage {
    type: "success" | "error" | null;
    text: string;
  }

  // State initialization with proper types
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [subscriptionMessage, setSubscriptionMessage] =
    useState<SubscriptionMessage>({
      type: null,
      text: "",
    });
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle newsletter subscription with proper event type
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset message
    setSubscriptionMessage({ type: null, text: "" });

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionMessage({
        type: "error",
        text: "Vui lòng nhập email hợp lệ",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Successful subscription
      setSubscriptionMessage({
        type: "success",
        text: "Đăng ký thành công! Cảm ơn bạn đã đăng ký.",
      });
      setEmail("");
    } catch (error) {
      setSubscriptionMessage({
        type: "error",
        text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubscriptionMessage({ type: null, text: "" });
      }, 5000);
    }
  };

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  // Related posts
  const relatedPosts = featuredPosts.slice(1, 3);

  // Navigation functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToLatestPosts();
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToLatestPosts();
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToLatestPosts();
  };

  const scrollToLatestPosts = () => {
    if (window.innerWidth < 768) {
      document
        .getElementById("latest-posts")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted || loadingPage) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
            Đang tải trang...
          </p>
        </div>
      </div>
    );
  }

  // Sử dụng ContentLoader thay vì isLoading state
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* <ContentLoader /> */}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Heading Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 py-16 md:py-24 min-h-[500px] fade-in">
        <div className="flex-1 flex flex-col gap-6 animate__fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl p-1.5 font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent slide-in stagger-1">
            Chào mừng tới Next Blog!
          </h1>
          <p className="text-xl text-foreground md:max-w-lg p-1.5 slide-in stagger-2">
            Nơi chia sẻ kiến thức và mọi thứ hay ho từ cuộc sống.
          </p>
          <div className="flex flex-wrap gap-4 mt-1 slide-in stagger-3">
            <Button
              asChild
              size="lg"
              className="shadow-lg hover:translate-y-[-2px] transition-all duration-300 btn-hover-effect"
            >
              <Link href="/about">Tìm hiểu thêm</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:translate-y-[-2px] transition-all duration-300 btn-hover-effect"
            >
              <Link href="/blogs">Xem tất cả bài viết</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center flex-1 slide-in stagger-2 w-full">
          <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 dark:shadow-black/40 float">
            <Image
              src="/nextjs.png"
              alt="Blog hero"
              fill
              className="object-contain md:object-cover object-center transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}

      <section className="py-16 scroll-reveal">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-12 after:h-1 after:bg-primary hover:after:w-24 after:transition-all after:duration-300 text-vn-heading">
            Bài viết nổi bật
          </h2>
          <Link
            href="/blogs"
            className="text-primary font-medium hover:underline transition-colors px-2 py-1 rounded hover:bg-primary/10 pulse-gentle group flex items-center"
          >
            Xem tất cả{" "}
            <ChevronRight className="inline h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Posts Filter */}
        <div className="mb-6 pb-2 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 text-sm font-medium shadow-sm transition-all whitespace-nowrap"
            >
              Tất cả
            </Button>
            {["Next.js", "React", "JavaScript", "TypeScript", "CSS"].map(
              (category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4 text-sm font-medium border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap"
                >
                  {category}
                </Button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`${
                  index === 0 ? "md:col-span-2 relative" : ""
                } transition-transform duration-300 hover:translate-y-[-5px] scale-in ${
                  index === 0
                    ? "stagger-1"
                    : index === 1
                    ? "stagger-2"
                    : "stagger-3"
                }`}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8">
            {/* Statistics Chart Card */}
            <Card className="border-border shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 scale-in stagger-2">
              <CardHeader>
                <CardTitle className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-10 after:h-1 after:bg-primary">
                  Thống kê blog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statsData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                      <Tooltip
                        formatter={(
                          value: string | number | (string | number)[]
                        ) => {
                          const formatNumber = (val: string | number) => {
                            const num =
                              typeof val === "number" ? val : Number(val);
                            return isNaN(num)
                              ? val
                              : new Intl.NumberFormat("vi-VN").format(num);
                          };

                          if (Array.isArray(value)) {
                            return value.map(formatNumber).join(" - ");
                          }

                          return formatNumber(value);
                        }}
                        labelFormatter={(value) => `${value}`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />

                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {statsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/30">
                  {statsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full`}
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          {item.name}
                        </span>
                        <span className="font-bold text-sm">
                          {item.name === "Bài viết"
                            ? item.value
                            : new Intl.NumberFormat("vi-VN").format(
                                item.value
                              ) + "+"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics Card with Pie Chart */}
            <Card className="border-border shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 scale-in stagger-3">
              <CardHeader>
                <CardTitle className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-10 after:h-1 after:bg-primary">
                  Chủ đề phổ biến
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topicsData.slice(0, 5)}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        activeIndex={activePieIndex}
                        onMouseEnter={onPieEnter}
                        paddingAngle={2}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {topicsData.slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `${value} bài viết`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {topicsData.map((tag, idx) => (
                    <Badge
                      key={tag.name}
                      variant="secondary"
                      className={`bg-primary/10 hover:bg-primary text-primary transition-colors duration-200 hover:translate-y-[-2px] scale-in stagger-${
                        (idx % 5) + 1
                      }`}
                      asChild
                    >
                      <Link
                        href={`/tag/${tag.name
                          .toLowerCase()
                          .replace(/\./g, "")}`}
                      >
                        {tag.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Author Card with Chart */}
            <Card className="border-border shadow-md hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 scale-in stagger-4 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-10 after:h-1 after:bg-primary">
                  Tác giả nổi bật
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4 slide-in">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary float ring-4 ring-primary/10">
                    <Image
                      src="/ava1.png"
                      alt="Author avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Minh Khôi</h4>
                    <p className="text-sm text-muted-foreground">
                      Web Developer & Technical Writer
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-sm text-foreground">
                  Chuyên gia lỏd về Next.js và React với đang đi thực tập và
                  chưa ra trường.
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-border/20">
                  <div className="flex space-x-3">
                    <span className="text-xs text-muted-foreground">
                      12 bài viết
                    </span>
                    <span className="text-xs text-muted-foreground">
                      5.2k lượt xem
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/10 p-0 h-auto"
                  >
                    <Link
                      href="/authors/minh-khoi"
                      className="flex items-center"
                    >
                      Xem hồ sơ <ChevronRight size={14} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section id="latest-posts" className="py-16 scroll-mt-20 scroll-reveal">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-12 after:h-1 after:bg-primary hover:after:w-24 after:transition-all after:duration-300 text-vn-heading slide-in">
            Bài viết mới nhất
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <div
              key={post.id}
              className={`transition-transform duration-300 hover:translate-y-[-5px] scale-in stagger-${
                (index % 5) + 1
              }`}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {regularPosts.length > postsPerPage && (
          <div className="mt-4 flex justify-center fade-in">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={currentPage === 1 ? undefined : goToPreviousPage}
                    aria-disabled={currentPage === 1}
                    className={`hover:bg-accent cursor-pointer transition-colors ${
                      currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                  />
                </PaginationItem>

                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => goToPage(1)}
                      className="hover:bg-accent cursor-pointer transition-colors w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis className="text-muted-foreground" />
                  </PaginationItem>
                )}

                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => goToPage(currentPage - 1)}
                      className="hover:bg-accent cursor-pointer transition-colors w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink
                    isActive
                    className="bg-primary text-primary-foreground cursor-pointer w-10 h-10 rounded-full flex items-center justify-center pulse-gentle"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => goToPage(currentPage + 1)}
                      className="hover:bg-accent cursor-pointer transition-colors w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis className="text-muted-foreground hover:bg-accent " />
                  </PaginationItem>
                )}

                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => goToPage(totalPages)}
                      className="hover:bg-accent cursor-pointer transition-colors w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={
                      currentPage === totalPages ? undefined : goToNextPage
                    }
                    aria-disabled={currentPage === totalPages}
                    className={`hover:bg-accent cursor-pointer transition-colors ${
                      currentPage === totalPages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>

      {/* Related Posts Section */}
      <section className="py-16 scroll-reveal">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:w-12 after:h-1 after:bg-primary hover:after:w-24 after:transition-all after:duration-300 text-vn-heading slide-in">
            Có thể bạn quan tâm
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.map((post, index) => (
            <div
              key={post.id}
              className={`transition-transform duration-300 hover:translate-y-[-5px] scale-in stagger-${
                index + 1
              }`}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}

      {/* Newsletter Section - Completely Redesigned */}
      <section className="py-16 px-8 bg-gradient-to-br from-primary/5 via-accent to-secondary/5 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative scroll-reveal">
        <div className="mx-auto max-w-xl text-center relative z-10">
          <div className="mb-6 flex justify-center slide-in">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary ring-4 ring-primary/10 shadow-lg">
              <Mail size={32} strokeWidth={1.5} className="animate-pulse" />
            </span>
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-accent-foreground slide-in stagger-1">
            Đăng ký nhận bài viết mới
          </h2>
          <p className="mb-8 text-accent-foreground/80 max-w-md mx-auto slide-in stagger-2">
            Nhận thông báo khi có bài viết mới và nội dung độc quyền. Chúng tôi
            không bao giờ gửi spam!
          </p>

          <div className="slide-in stagger-3">
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Email của bạn"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-primary/20 bg-background py-6 px-4 pl-12 rounded-full text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm hover:shadow-md"
                    disabled={isSubmitting}
                  />
                  <Mail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60"
                    size={18}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 px-8 font-medium shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Đang xử lý...
                    </span>
                  ) : (
                    "Đăng ký ngay"
                  )}
                </Button>
              </div>
            </form>

            {/* Fixed height message container */}
            <div className="h-16 flex items-center justify-center mt-4">
              {subscriptionMessage.type === "success" && (
                <div className="flex items-center gap-2 py-2 px-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full animate-fade-in w-full justify-center">
                  <Check size={16} className="shrink-0" />
                  <span className="text-sm font-medium">
                    {subscriptionMessage.text}
                  </span>
                </div>
              )}

              {subscriptionMessage.type === "error" && (
                <div className="flex items-center gap-2 py-2 px-4 bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-full animate-fade-in w-full justify-center">
                  <span className="text-sm font-medium">
                    {subscriptionMessage.text}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground slide-in stagger-4">
            <div className="flex -space-x-2">
              {["/ava1.png", "/nextjs.png", "/ava1.png"].map((src, i) => (
                <div
                  key={i}
                  className="relative h-6 w-6 rounded-full border-2 border-background overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Subscriber ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span>Cùng +1.2k người đã đăng ký</span>
          </div>
        </div>
      </section>

      {/* About Us Section */}

      <section className="py-16 scroll-reveal">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-accent/5 to-background border border-accent/10 p-8 md:p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-primary text-primary hover:bg-primary/5 mb-4">
                <span className="bg-primary rounded-full w-1.5 h-1.5 mr-1.5"></span>
                Về chúng tôi
              </div>

              <h2 className="text-3xl p-1.5 md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
                Khám phá Next Blog
              </h2>

              <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl mx-auto">
                Next Blog là nơi chia sẻ kiến thức chuyên sâu về lập trình web,
                các công nghệ mới nhất và những kinh nghiệm thực tế trong ngành
                công nghệ thông tin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-xl bg-gradient-to-br from-background to-accent/10 border border-accent/10 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] slide-in stagger-1">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                  <Calendar
                    size={24}
                    strokeWidth={1.5}
                    className="pulse-gentle"
                  />
                </div>
                <div>
                  <span className="block text-xl font-bold text-primary">
                    2023
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Năm thành lập blog của chúng tôi
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-background to-accent/10 border border-accent/10 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] slide-in stagger-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                  <Users size={24} strokeWidth={1.5} className="pulse-gentle" />
                </div>
                <div>
                  <span className="block text-xl font-bold text-primary">
                    5+
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Thành viên với nhiều kỹ năng đa dạng
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-background to-accent/10 border border-accent/10 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] slide-in stagger-3">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                  <Newspaper
                    size={24}
                    strokeWidth={1.5}
                    className="pulse-gentle"
                  />
                </div>
                <div>
                  <span className="block text-xl font-bold text-primary">
                    {posts.length}+
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Bài viết chất lượng đã được chia sẻ
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-in stagger-4">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 px-8 shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/about">Tìm hiểu thêm</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary rounded-full py-6 px-8 transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/contact">Liên hệ ngay</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <BackToTop threshold={300} />
    </div>
  );
}
