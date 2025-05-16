"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertOctagon,
  ArrowLeft,
  Undo2,
  Home,
  Search,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function GlobalNotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isHovering, setIsHovering] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [progressValue, setProgressValue] = useState(100);
  // Store mounted state to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to avoid hydration issues
    setIsMounted(true);

    // Simple countdown timer without complex animation
    let countdownTimer: NodeJS.Timeout | null = null;

    // Only run countdown when not hovering and countdown > 0
    if (!isHovering && countdown > 0) {
      countdownTimer = setTimeout(() => {
        // Reduce countdown
        const newCountdown = countdown - 1;
        setCountdown(newCountdown);

        // Update progress value directly (simple approach)
        setProgressValue(newCountdown * 20);

        // Redirect when countdown reaches 0
        if (newCountdown === 0) {
          router.push("/");
        }
      }, 1000);
    }

    // Random glitch effect - only run client-side
    let glitchInterval: NodeJS.Timeout | null = null;
    if (isMounted) {
      glitchInterval = setInterval(() => {
        setShowGlitch(true);
        setTimeout(() => setShowGlitch(false), 200);
      }, 3000);
    }

    // Cleanup timers
    return () => {
      if (countdownTimer) clearTimeout(countdownTimer);
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, [router, countdown, isHovering, isMounted]);

  // Pause countdown on hover
  const handleHover = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  // Reset countdown
  const resetCountdown = () => {
    setCountdown(5);
    setProgressValue(100);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden p-6">
      {/* Dynamic background effect - only render client-side */}
      {isMounted && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-0">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => {
              // Use deterministic values based on index instead of Math.random()
              const size = 5 + (i % 10);
              const top = (i * 5) % 100;
              const left = (i * 7) % 100;
              const animDuration = 10 + (i % 10);
              const animDelay = i % 5;

              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-primary/30"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    animation: `float ${animDuration}s infinite linear`,
                    animationDelay: `${animDelay}s`,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      <Card
        className="w-full max-w-md z-10 backdrop-blur-sm border-border shadow-lg transition-all duration-300 hover:shadow-xl"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Status Badge */}
            <Badge variant="outline" className="mb-6">
              {isHovering ? "Tạm dừng" : "Đang chuyển hướng..."}
            </Badge>

            {/* Enhanced notification icon */}
            <div className="mb-6 relative">
              <div
                className={`w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300 ${
                  showGlitch ? "translate-x-1" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75 ${
                    isHovering ? "animation-delay-100" : ""
                  }`}
                ></div>
                <AlertOctagon
                  className={`w-12 h-12 text-primary ${
                    showGlitch ? "opacity-50" : "opacity-100"
                  }`}
                />
              </div>
            </div>

            {/* 404 title with effect */}
            <div
              className={`relative mb-2 ${
                showGlitch ? "translate-x-1 text-red-500" : ""
              }`}
            >
              <h1 className="text-7xl font-bold text-primary relative">
                404
                {showGlitch && (
                  <span className="absolute inset-0 text-cyan-500 opacity-70 -translate-x-1">
                    404
                  </span>
                )}
              </h1>
              {/* Underline below title */}
              <div className="h-1 w-16 bg-primary/50 mx-auto mt-2 rounded-full"></div>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-4">
              Trang không tìm thấy
            </h2>

            {/* Error alert */}
            <Alert
              variant="destructive"
              className="bg-destructive/5 border-destructive/20 mb-6"
            >
              <AlertOctagon className="h-4 w-4" />
              <AlertTitle>Lỗi 404</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
                chuyển.
              </AlertDescription>
            </Alert>

            {/* Simplified progress bar without animation */}
            <div className="w-full mb-2">
              <Progress
                value={progressValue}
                className={`h-2 ${isHovering ? "opacity-50" : "opacity-100"}`}
              />
            </div>

            <div className="flex items-center justify-between w-full mb-8">
              <p className="text-sm text-muted-foreground">
                {isHovering ? (
                  <span className="flex items-center">
                    <span className="text-primary font-medium mr-1">
                      Tạm dừng
                    </span>{" "}
                    đếm ngược
                  </span>
                ) : (
                  <span>
                    Tự động chuyển hướng sau{" "}
                    <span className="font-medium text-primary">
                      {countdown}
                    </span>{" "}
                    giây
                  </span>
                )}
              </p>

              {/* Reset countdown button with Tooltip */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={resetCountdown}
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Đặt lại bộ đếm thời gian</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                className="w-full sm:w-1/2 transition-all duration-300 hover:bg-muted/80 group"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:animate-bounce-left" />
                Quay lại
              </Button>
              <Button
                className="w-full sm:w-1/2 transition-all duration-300 hover:bg-primary/90 group"
                asChild
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Về trang chủ
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-4 flex justify-between items-center">
          {/* Additional links */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tìm kiếm</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <p className="text-xs text-muted-foreground">
            Cần hỗ trợ?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Liên hệ với chúng tôi
            </Link>
          </p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/help">
                    <HelpCircle className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trợ giúp</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  );
}
