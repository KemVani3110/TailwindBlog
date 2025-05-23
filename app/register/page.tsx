/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  FileText,
  Sparkles,
  UserPlus,
  CheckCircle,
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Vui lòng nhập tên của bạn");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Vui lòng nhập email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call since we're not using a real database
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would send this data to your API
      console.log("Registration data:", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError("Đã xảy ra lỗi, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 md:gap-3 text-primary hover:opacity-80 transition-all duration-300 hover:scale-105 group"
        >
          <div className="relative">
            <FileText className="h-5 w-5 md:h-8 md:w-8 text-primary group-hover:text-primary/80 transition-colors" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-2 w-2 md:h-3 md:w-3 text-accent animate-pulse" />
            </div>
          </div>
          <span className="text-base md:text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            Next Blog
          </span>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-20 md:pt-4">
        <div className="w-full max-w-lg">
          {/* Main Title */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Tạo tài khoản mới
            </h1>
            <p className="mt-2 md:mt-3 text-sm md:text-lg text-muted-foreground">
              Đăng ký để bắt đầu hành trình của bạn
            </p>
          </div>

          {/* Form đăng ký */}
          <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-muted/30 rounded-2xl"></div>
            <div className="relative z-10">
              <CardHeader className="space-y-2 pb-4 md:pb-6 text-center px-4 md:px-8">
                <CardTitle className="text-2xl md:text-3xl font-bold text-card-foreground">
                  Đăng ký
                </CardTitle>
                <CardDescription className="text-sm md:text-base text-muted-foreground">
                  Nhập thông tin để tạo tài khoản mới
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 md:px-8 pb-6 md:pb-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="space-y-2 md:space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Tên đầy đủ
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 md:h-14 pl-10 md:pl-12 pr-4 text-sm md:text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-input"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Địa chỉ Email
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 md:h-14 pl-10 md:pl-12 pr-4 text-sm md:text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-input"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Mật khẩu
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-12 md:h-14 pl-10 md:pl-12 pr-12 md:pr-14 text-sm md:text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-input"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 md:h-8 md:w-8 hover:bg-muted rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Xác nhận mật khẩu
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 md:h-5 md:w-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="h-12 md:h-14 pl-10 md:pl-12 pr-12 md:pr-14 text-sm md:text-base border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-input"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 md:h-8 md:w-8 hover:bg-muted rounded-lg"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert
                      variant="destructive"
                      className="animate-in slide-in-from-top-2 duration-300 border-destructive/20 bg-destructive/5 rounded-xl"
                    >
                      <AlertDescription className="text-destructive font-medium text-sm">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="animate-in slide-in-from-top-2 duration-300 border-green-200/50 bg-green-50/50 rounded-xl">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 font-medium text-sm">
                        {success}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 md:h-14 text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                        Đang tạo tài khoản...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5" />
                        Tạo tài khoản
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col space-y-3 md:space-y-4 px-4 md:px-8 pb-6 md:pb-8">
                <Separator className="bg-border" />
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Đã có tài khoản?{" "}
                  </span>
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
                  >
                    Đăng nhập ngay
                  </Link>
                </div>
                {/* Back to home */}
                <div className="text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 font-medium"
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
