"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isSidebar?: boolean;
  isExpanded?: boolean;
}

export default function ThemeToggle({ isSidebar = false, isExpanded = true }: ThemeToggleProps) {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Use system preference as default if no theme is saved
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
  }, []);

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

  if (!isMounted) return null;

  if (isSidebar) {
    return (
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={`w-full hover:bg-muted cursor-pointer ${
          isExpanded ? "justify-start" : "justify-center"
        }`}
      >
        {theme === "light" ? (
          <Moon className={`h-5 w-5 ${isExpanded ? "mr-3" : ""}`} />
        ) : (
          <Sun className={`h-5 w-5 ${isExpanded ? "mr-3" : ""}`} />
        )}
        {isExpanded && (
          <span>
            {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
          </span>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}