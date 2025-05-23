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
import { Card } from "@/components/ui/card";
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
      <section className="py-20 scroll-reveal">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent mb-2">
              Bài viết nổi bật
            </h2>
            <p className="text-muted-foreground text-lg">
              Những nội dung được yêu thích nhất tuần này
            </p>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 border border-primary/20 hover:border-primary/30"
          >
            <span className="font-medium text-primary">Xem tất cả</span>
            <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Category Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-6 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Lọc theo:
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Tất cả</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-0 hover:opacity-100 transition-opacity"></div>
              </Button>

              {[
                "Next.js",
                "React",
                "JavaScript",
                "TypeScript",
                "Web Design",
              ].map((category, idx) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className={`relative overflow-hidden rounded-full px-6 py-2 text-sm font-medium border-2 border-primary/20 text-foreground hover:text-white hover:border-primary transition-all duration-300 hover:scale-105 whitespace-nowrap hover:shadow-lg
              ${
                idx === 1
                  ? "hover:bg-blue-500"
                  : idx === 2
                  ? "hover:bg-yellow-500"
                  : idx === 3
                  ? "hover:bg-blue-600"
                  : "hover:bg-primary"
              }`}
                >
                  <span className="relative z-10">{category}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Featured Posts Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
          {/* Hero Featured Post */}
          <div className="xl:col-span-8">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 p-1 hover:scale-[1.02] transition-all duration-500">
              <div className="relative overflow-hidden rounded-3xl bg-background border border-primary/10 shadow-2xl">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredPosts[0]?.image || "/nextjs.png"}
                    alt={featuredPosts[0]?.title || "Featured post"}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-black/20">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-black text-sm font-medium">
                        Trending
                      </span>
                    </div>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-white text-xs">5 phút đọc</span>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-2xl">
                      {/* Category Tag */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                          Next.js
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 line-clamp-2 group-hover:text-primary/90 transition-colors">
                        {featuredPosts[0]?.title ||
                          "Hướng dẫn chi tiết về Next.js 14 và App Router"}
                      </h3>

                      <p className="text-white/90 text-lg mb-6 line-clamp-2">
                        {featuredPosts[0]?.excerpt ||
                          "Khám phá những tính năng mới nhất của Next.js 14 và cách sử dụng App Router một cách hiệu quả trong dự án thực tế."}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
                              <Image
                                src={
                                  featuredPosts[0]?.author?.avatar ||
                                  "/ava1.png"
                                }
                                alt="Author"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>

                          <div>
                            <p className="text-white font-semibold">
                              {featuredPosts[0]?.author?.name || "Minh Khôi"}
                            </p>
                            <p className="text-white/70 text-sm">
                              {featuredPosts[0]?.date || "2 ngày trước"} • 10.5K
                              lượt xem
                            </p>
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 rounded-full px-6 hover:scale-105 transition-all duration-300"
                        >
                          Đọc ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Featured Posts */}
          <div className="xl:col-span-4 space-y-6">
            {featuredPosts.slice(1, 4).map((post, index) => (
              <div
                key={post.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl scale-in stagger-${
                  index + 2
                }`}
              >
                <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-background to-accent/5 ">
                  <div className="flex gap-4 p-6">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image || "/nextjs.png"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs">
                          React
                        </Badge>
                      </div>

                      <h4 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {post.title || `Bài viết số ${index + 2}`}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full overflow-hidden">
                            <Image
                              src={post.author?.avatar || "/ava1.png"}
                              alt="Author"
                              width={20}
                              height={20}
                              className="object-cover"
                            />
                          </div>
                          <span>Minh Khôi</span>
                        </div>
                        <span>•</span>
                        <span>{post.date || "1 tuần trước"}</span>
                        <span>•</span>
                        <span>3 phút đọc</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
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
