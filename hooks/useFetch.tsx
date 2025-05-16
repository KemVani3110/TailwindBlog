"use client";

import { useState, useEffect } from "react";
import { useLoading } from "@/app/context/LoadingContext";

interface UseFetchOptions {
  url: string;
  loadingMessage?: string;
  initialData?: unknown;
  autoFetch?: boolean;
  mockDelay?: number;
}

export const useFetch = <T,>({
  url,
  loadingMessage = "Đang tải dữ liệu...",
  initialData = null,
  autoFetch = true,
  mockDelay = 0,
}: UseFetchOptions) => {
  const [data, setData] = useState<T | null>(initialData as T);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const fetchData = async () => {
    setIsLoading(true);
    showLoading(loadingMessage);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Thêm delay giả nếu cần thiết
      if (mockDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, mockDelay));
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error, isLoading, refetch: fetchData };
};

export default useFetch;
