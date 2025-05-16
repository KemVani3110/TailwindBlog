"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, RefreshCw, CircleDashed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Types definition
interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "skeleton";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

interface LazyLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Loading Component - Provides various loading indicators
 */
export const Loading = ({
  variant = "spinner",
  size = "md",
  text,
  className,
}: LoadingProps) => {
  // Size mappings
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Render different loading variants
  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <Loader2
            className={cn("animate-spin text-primary", sizeClasses[size])}
          />
        );
      case "dots":
        return (
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className={cn(
                  "rounded-full bg-primary",
                  size === "sm" ? "h-1.5 w-1.5" : "",
                  size === "md" ? "h-2.5 w-2.5" : "",
                  size === "lg" ? "h-3.5 w-3.5" : ""
                )}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <CircleDashed
            className={cn(
              "animate-pulse text-primary pulse-gentle",
              sizeClasses[size]
            )}
          />
        );
      case "skeleton":
        return (
          <div className="flex flex-col space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        );
      default:
        return (
          <RefreshCw
            className={cn("animate-spin text-primary", sizeClasses[size])}
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      {renderLoader()}
      {text && (
        <p
          className={cn(
            "text-vn text-foreground font-medium animate-pulse",
            textSizeClasses[size]
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};

/**
 * LazyLoading Component - Conditionally renders content with a loading delay
 */
export const LazyLoading = ({
  children,
  fallback = <Loading variant="spinner" text="Đang tải..." />,
  delay = 500,
  className,
}: LazyLoadingProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={cn("min-h-[100px]", className)}>
      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {fallback}
        </div>
      )}
    </div>
  );
};

/**
 * LoadingScreen - Full page loading component
 */
export const LoadingScreen = ({
  text = "Vui lòng đợi...",
}: {
  text?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass rounded-lg p-8 shadow-lg max-w-md text-center fade-in">
        <Loading variant="spinner" size="lg" />
        <p className="text-vn text-foreground mt-4 font-medium">{text}</p>
      </div>
    </div>
  );
};

/**
 * ContentLoader - Skeleton loading for content sections
 */
export const ContentLoader = () => {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="h-8 w-3/4 bg-accent/20" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-accent/10" />
        <Skeleton className="h-4 w-5/6 bg-accent/10" />
        <Skeleton className="h-4 w-4/6 bg-accent/10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <Skeleton className="h-24 rounded-md bg-accent/20" />
        <Skeleton className="h-24 rounded-md bg-accent/20" />
      </div>
    </div>
  );
};

/**
 * ButtonLoader - Loading indicator for buttons
 */
export const ButtonLoader = ({ className }: { className?: string }) => {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />;
};

// Hàm tiện ích để sử dụng loading ở mức component nếu không muốn dùng context
export const useComponentLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    LoadingComponent: <Loading />,
  };
};

export default Loading;
