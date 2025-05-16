"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the loading spinner component separately from the context
export const LoadingSpinner = ({ text = "Đang tải..." }: { text?: string }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card shadow-lg">
        <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
        <p className="text-foreground font-medium">{text}</p>
      </div>
    </div>
  );
};

// Content loader for skeleton states
export const ContentLoader = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero section skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-12 py-16">
        <div className="flex-1 space-y-6 w-full">
          <div className="h-12 bg-accent rounded-lg w-3/4"></div>
          <div className="h-6 bg-accent rounded-lg w-2/3"></div>
          <div className="h-10 bg-accent rounded-lg w-1/3"></div>
        </div>
        <div className="flex-1 h-80 w-full bg-accent rounded-2xl"></div>
      </div>

      {/* Featured posts skeleton */}
      <div className="py-8">
        <div className="h-10 bg-accent rounded-lg w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 h-96 bg-accent rounded-xl"></div>
            <div className="h-80 bg-accent rounded-xl"></div>
            <div className="h-80 bg-accent rounded-xl"></div>
          </div>
          <div className="space-y-8">
            <div className="h-40 bg-accent rounded-xl"></div>
            <div className="h-60 bg-accent rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  loadingText: "Đang tải...",
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang tải...");

  const showLoading = (text?: string) => {
    if (text) setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingText,
        showLoading,
        hideLoading,
      }}
    >
      {children}
      {isLoading && <LoadingSpinner text={loadingText} />}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
