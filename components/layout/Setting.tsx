"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  FileText,
  Bookmark,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SettingsProps {
  sidebarExpanded?: boolean;
}

export default function Setting({ sidebarExpanded = true }: SettingsProps) {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

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

  return (
    <div className="border-t border-border p-2">
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
                <Moon className={`h-5 w-5 ${sidebarExpanded ? "mr-3" : ""}`} />
              ) : (
                <Sun className={`h-5 w-5 ${sidebarExpanded ? "mr-3" : ""}`} />
              )}
              {sidebarExpanded && (
                <span>{theme === "light" ? "Chế độ tối" : "Chế độ sáng"}</span>
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

      {sidebarExpanded && (
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      MK
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium truncate">
                    Minh Khôi
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">Minh Khôi</span>
                  <span className="text-xs text-muted-foreground">
                    chuminhkhoi3110@gmail.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
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
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
