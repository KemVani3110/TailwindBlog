/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  FileText,
  Sparkles,
  Shield,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    setMounted(true);
    // Kiểm tra xem user đã đăng nhập chưa
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push(callbackUrl);
      }
    };
    checkSession();
  }, [callbackUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email hoặc mật khẩu không chính xác");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      setError("Đã xảy ra lỗi, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-4 border-primary opacity-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 sm:gap-3 text-primary hover:opacity-80 transition-all duration-300 hover:scale-105 group"
        >
          <div className="relative">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary group-hover:text-primary/80 transition-colors" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-accent animate-pulse" />
            </div>
          </div>
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            Next Blog
          </span>
        </Link>
      </div>

      {/* Demo Accounts Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 px-3 sm:h-10 sm:px-4 bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl hover:bg-card transition-all duration-200 rounded-xl text-sm"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
        >
          <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Demo</span>
          {showDemoAccounts ? (
            <ChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </Button>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-20 sm:pt-4">
        <div className="w-full max-w-lg">
          {/* Demo accounts dropdown */}
          {showDemoAccounts && (
            <div className="absolute top-16 right-0 sm:top-20 sm:right-2 z-20 w-full max-w-80 sm:w-80 animate-in slide-in-from-top-3 duration-300">
              <Card className="border shadow-xl bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/30 rounded-2xl"></div>
                <div className="relative z-10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Users className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-card-foreground">
                          Demo Accounts
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Click để tự động điền
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 px-6 pb-6">
                    <div
                      className="p-3 bg-gradient-to-r from-chart-5/10 to-accent/10 rounded-xl border border-chart-5/20 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
                      onClick={() => {
                        fillDemoAccount("admin@nextblog.com", "admin123");
                        setShowDemoAccounts(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge
                            variant="secondary"
                            className="mb-1 bg-chart-5/20 text-chart-5 hover:bg-chart-5/30 text-xs"
                          >
                            Admin
                          </Badge>
                          <p className="text-sm text-card-foreground font-medium">
                            admin@nextblog.com
                          </p>
                          <p className="text-xs text-muted-foreground">
                            admin123
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-6 h-6 bg-chart-5/20 rounded-full flex items-center justify-center">
                            <span className="text-chart-5 text-xs">→</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-3 bg-gradient-to-r from-chart-1/10 to-primary/10 rounded-xl border border-primary/20 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
                      onClick={() => {
                        fillDemoAccount("user@nextblog.com", "user123");
                        setShowDemoAccounts(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge
                            variant="secondary"
                            className="mb-1 bg-primary/20 text-primary hover:bg-primary/30 text-xs"
                          >
                            User
                          </Badge>
                          <p className="text-sm text-card-foreground font-medium">
                            user@nextblog.com
                          </p>
                          <p className="text-xs text-muted-foreground">
                            user123
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary text-xs">→</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-3 bg-gradient-to-r from-chart-3/10 to-chart-2/10 rounded-xl border border-chart-3/20 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
                      onClick={() => {
                        fillDemoAccount("chuminhkhoi3110@gmail.com", "khoi123");
                        setShowDemoAccounts(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge
                            variant="secondary"
                            className="mb-1 bg-chart-3/20 text-chart-3 hover:bg-chart-3/30 text-xs"
                          >
                            Minh Khôi
                          </Badge>
                          <p className="text-sm text-card-foreground font-medium">
                            chuminhkhoi3110@gmail.com
                          </p>
                          <p className="text-xs text-muted-foreground">
                            khoi123
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-6 h-6 bg-chart-3/20 rounded-full flex items-center justify-center">
                            <span className="text-chart-3 text-xs">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {/* Main Title - Responsive */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Chào mừng trở lại
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground">
              Đăng nhập để tiếp tục hành trình của bạn
            </p>
          </div>

          {/* Form đăng nhập */}
          <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-muted/30 rounded-2xl"></div>
            <div className="relative z-10">
              <CardHeader className="space-y-2 pb-6 text-center">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-card-foreground">
                  Đăng nhập
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground">
                  Nhập thông tin để truy cập vào tài khoản
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Địa chỉ Email
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 sm:h-14 pl-12 pr-4 text-sm sm:text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-input"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Mật khẩu
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu của bạn"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 sm:h-14 pl-12 pr-14 text-sm sm:text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-input"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-muted rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert
                      variant="destructive"
                      className="animate-in slide-in-from-top-2 duration-300 border-destructive/20 bg-destructive/5 rounded-xl"
                    >
                      <AlertDescription className="text-destructive font-medium">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Đang đăng nhập...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-3 h-5 w-5" />
                        Đăng nhập
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 px-6 sm:px-8 pb-6 sm:pb-8">
                <Separator className="bg-border" />
                <div className="text-center">
                  <span className="text-muted-foreground text-sm sm:text-base">
                    Chưa có tài khoản?{" "}
                  </span>
                  <Link
                    href="/register"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline text-sm sm:text-base"
                  >
                    Đăng ký ngay
                  </Link>
                </div>
                {/* Back to home */}
                <div className="mt-1 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 font-medium text-sm sm:text-base"
                  >
                    <span>←</span>
                    Quay lại trang chủ
                  </Link>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
