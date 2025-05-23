/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  FileText,
  Info,
  Mail,
  Menu,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  Bookmark,
  Heart,
  TrendingUp,
  Hash,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Mount effect
  useEffect(() => {
    setIsMounted(true);

    // Use system preference as default if no theme is saved
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = localStorage.getItem("theme");
    const initialTheme =
      storedTheme === "dark"
        ? "dark"
        : storedTheme === "light"
        ? "light"
        : prefersDark
        ? "dark"
        : "light";

    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Check if sidebar state is saved
    const storedSidebarState = localStorage.getItem("sidebarExpanded");
    if (storedSidebarState !== null) {
      setSidebarExpanded(storedSidebarState === "true");
    }

    // Handle window resize for responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      }
    };

    // Handle scroll for navbar appearance
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Handle key press for search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  // Apply theme function
  const applyTheme = (mode: "light" | "dark") => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.body.setAttribute("data-theme", mode);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Toggle sidebar expanded state
  const toggleSidebar = () => {
    const newState = !sidebarExpanded;
    setSidebarExpanded(newState);
    localStorage.setItem("sidebarExpanded", String(newState));
  };

  // Check if route is active
  const isActive = (path: string): boolean => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  // Navigation items - conditional based on auth status
  const getNavItems = () => {
    const baseItems = [
      { path: "/", label: "Trang chủ", icon: Home },
      { path: "/blogs", label: "Bài viết", icon: FileText },
      { path: "/about", label: "Giới thiệu", icon: Info },
      { path: "/contact", label: "Liên hệ", icon: Mail },
    ];

    if (session) {
      baseItems.push({
        path: "/dashboard",
        label: "Bảng điều khiển",
        icon: LayoutDashboard,
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  // Trending items for header
  const trendingItems = [
    {
      title: "Cách tối ưu React App",
      tags: ["React", "Performance"],
      views: 1204,
    },
    {
      title: "Next.js 14 & Server Components",
      tags: ["Next.js", "React"],
      views: 843,
    },
    {
      title: "Tailwind CSS best practices",
      tags: ["CSS", "Tailwind"],
      views: 765,
    },
  ];

  // User Menu Component
  const UserMenu = () => {
    if (status === "loading") {
      return (
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
      );
    }

    if (!session) {
      return (
        <Button asChild>
          <Link href="/login">Đăng nhập</Link>
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 overflow-hidden"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user?.image || "/ava1.png"}
                alt="User"
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {session.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{session.user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {session.user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Hồ sơ</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Bài viết của tôi</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Đã lưu</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Cài đặt</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
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
                <AlertDialogAction onClick={handleSignOut}>
                  Đăng xuất
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  // Sidebar User Section
  const SidebarUserSection = () => {
    return (
      <div className="border-t border-border p-2">
        {/* Theme Toggle - Always visible */}
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className={`w-full hover:bg-muted cursor-pointer ${
                  sidebarExpanded ? "justify-start" : "justify-center"
                }`}
              >
                {theme === "light" ? (
                  <Moon
                    className={`h-5 w-5 ${sidebarExpanded ? "mr-3" : ""}`}
                  />
                ) : (
                  <Sun className={`h-5 w-5 ${sidebarExpanded ? "mr-3" : ""}`} />
                )}
                {sidebarExpanded && (
                  <span>
                    {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            {!sidebarExpanded && (
              <TooltipContent side="right">
                {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {/* Login Button or User Menu - Only when expanded */}
        {sidebarExpanded && (
          <div className="mt-2">
            {!session ? (
              <Button asChild className="w-full">
                <Link href="/login">Đăng nhập</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={session.user?.image || "/ava1.png"}
                          alt="User"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {session.user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">
                        {session.user?.name}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{session.user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {session.user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Hồ sơ</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Bài viết của tôi</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Đã lưu</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                      </DropdownMenuItem>
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
                        <AlertDialogAction onClick={handleSignOut}>
                          Đăng xuất
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-border bg-card transition-all duration-300 md:flex ${
          sidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {sidebarExpanded && (
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-card-foreground"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-primary">Next Blog</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <TooltipProvider key={item.path} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.path}
                      className={`flex h-10 items-center rounded-md px-3 transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActive(item.path)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground"
                      } ${
                        sidebarExpanded ? "justify-start" : "justify-center"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${sidebarExpanded ? "mr-3" : ""} ${
                          isActive(item.path) ? "text-primary" : ""
                        }`}
                      />
                      {sidebarExpanded && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!sidebarExpanded && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}

            {sidebarExpanded && (
              <>
                <Separator className="my-2" />
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  Chủ đề phổ biến
                </p>
                {[
                  "JavaScript",
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "TypeScript",
                ].map((tag, i) => (
                  <Link
                    key={i}
                    href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex h-8 items-center rounded-md px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Hash className="mr-2 h-4 w-4" />
                    <span>{tag}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </ScrollArea>

        <SidebarUserSection />
      </aside>

      {/* Desktop Header */}
      <header
        className={`fixed top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur transition-all duration-200 md:left-16 ${
          sidebarExpanded ? "md:left-64" : ""
        } ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Desktop Header - Left Section with Search */}
          <div className="hidden md:flex items-center relative w-64">
            <div className="relative w-full">
              <Button
                variant="outline"
                className="w-full justify-between border border-input bg-background px-3 text-sm"
                onClick={() => setIsSearchOpen(true)}
              >
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tìm kiếm...</span>
                </div>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </div>

          {/* Mobile Brand */}
          <div className="flex items-center gap-3 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-16 items-center border-b border-border px-6">
                  <Link href="/" className="flex items-center gap-2 font-bold">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-primary">Next Blog</span>
                  </Link>
                </div>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex h-10 items-center rounded-md px-3 transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 ${
                            isActive(item.path) ? "text-primary" : ""
                          }`}
                        />
                        <span>{item.label}</span>
                      </Link>
                    ))}

                    <Separator className="my-2" />
                    <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
                      Chủ đề phổ biến
                    </p>
                    {[
                      "JavaScript",
                      "React",
                      "Next.js",
                      "Tailwind CSS",
                      "TypeScript",
                    ].map((tag, i) => (
                      <Link
                        key={i}
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex h-8 items-center rounded-md px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Hash className="mr-2 h-4 w-4" />
                        <span>{tag}</span>
                      </Link>
                    ))}

                    {/* Theme Toggle in Mobile */}
                    <div className="mt-4">
                      <Button
                        variant="ghost"
                        onClick={toggleTheme}
                        className="w-full justify-start"
                      >
                        {theme === "light" ? (
                          <Moon className="h-5 w-5 mr-3" />
                        ) : (
                          <Sun className="h-5 w-5 mr-3" />
                        )}
                        <span>
                          {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
                        </span>
                      </Button>
                    </div>
                  </nav>
                </ScrollArea>

                <div className="border-t border-border p-4">
                  {session ? (
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user?.image || "/ava1.png"}
                          alt="User"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {session.user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/login">Đăng nhập</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-bold">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-primary">Next Blog</span>
            </Link>
          </div>

          {/* Desktop Header - Center Section with Content Tabs */}
          <div className="hidden lg:block mx-8 flex-1">
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Xu hướng
                </TabsTrigger>
                <TabsTrigger value="latest">
                  <FileText className="h-4 w-4 mr-2" />
                  Mới nhất
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="h-4 w-4 mr-2" />
                  Yêu thích
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Desktop Header - Right Section with Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notification Bell - Only for logged in users */}
            {session && (
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                    3
                  </Badge>
                </Button>
              </div>
            )}

            {/* Dashboard Button - Desktop Only, Auth Required */}
            {session && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:flex"
                      asChild
                    >
                      <Link href="/dashboard">
                        <LayoutDashboard className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Dashboard</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Theme Toggle - Mobile Only */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* User Menu - Desktop and Mobile */}
            <UserMenu />
          </div>
        </div>
      </header>
    </>
  );
}
