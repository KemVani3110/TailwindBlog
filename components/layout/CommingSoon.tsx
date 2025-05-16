/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Clock,
  ChevronRight,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Sparkles,
  Calendar,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(68);
  const [activeTab, setActiveTab] = useState("updates");
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 14,
    minutes: 45,
    seconds: 0,
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fromPath = searchParams.get("from") || pathname;
  const progressBarRef = useRef(null);

  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);

  // Feature list animation states
  const [visibleFeatures, setVisibleFeatures] = useState(0);

  // Features that will be implemented
  const plannedFeatures = [
    { name: "Thiết kế đáp ứng", complete: true },
    { name: "Trang tin tức", complete: false },
    { name: "Hệ thống đăng nhập", complete: false },
    { name: "Tích hợp CMS", complete: false },
    { name: "Thanh toán trực tuyến", complete: false },
    { name: "Ứng dụng di động", complete: false },
  ];

  const updates = [
    {
      date: "12/05/2025",
      title: "Hoàn thành thiết kế UI/UX",
      description: "Đã hoàn thành các mẫu thiết kế chính",
    },
    {
      date: "08/05/2025",
      title: "Bắt đầu phát triển backend",
      description: "Đã thiết lập API và cơ sở dữ liệu",
    },
    {
      date: "01/05/2025",
      title: "Lên kế hoạch dự án",
      description: "Đã xác định phạm vi và lộ trình dự án",
    },
  ];

  useEffect(() => {
    // Set loaded state after component mounts for animations
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);

    // Animate the progress bar on load
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 68) {
          return prev + 1;
        }
        clearInterval(progressInterval);
        return prev;
      });
    }, 30);

    // Animate features appearing one by one
    const featureTimer = setInterval(() => {
      setVisibleFeatures((prev) => {
        if (prev < plannedFeatures.length) {
          return prev + 1;
        }
        clearInterval(featureTimer);
        return prev;
      });
    }, 400);

    // Simulate countdown for demo purposes
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(countdownTimer);
      clearInterval(progressInterval);
      clearInterval(featureTimer);
    };
  }, []);

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    setIsValidEmail(valid);

    if (valid) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setEmail("");
    setIsSubmitted(false);
  };

  // Counter animations
  const CounterBox = ({ value, label }: { value: number; label: string }) => (
    <div className="w-16 md:w-20 flex flex-col items-center">
      <div className="bg-card border rounded-lg px-2 py-3 shadow-lg w-full text-center mb-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 rounded-lg"></div>
        <span className="text-xl md:text-3xl font-bold relative z-10">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="text-xs md:text-sm text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-tr-full -z-10" />

      {/* Floating blurred circles for modern look */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/5 w-40 h-40 rounded-full bg-secondary/10 blur-3xl -z-10" />

      <Badge
        variant="outline"
        className={`absolute top-6 left-6 px-3 py-1.5 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0 -translate-y-4"
        }`}
      >
        <Clock className="w-3 h-3 mr-1 inline" /> Beta
      </Badge>

      <div
        className={`max-w-2xl w-full mx-auto transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-8">
          <div
            className={`inline-block mb-4 p-3 rounded-full bg-primary/10 text-primary transition-all duration-700 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100" : "opacity-0 -translate-y-4"
            }`}
          >
            Sắp ra mắt
          </h1>
          <p
            className={`text-lg text-muted-foreground max-w-md mx-auto transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            Trang <span className="text-primary font-medium">{fromPath}</span>{" "}
            đang được xây dựng và sẽ sớm ra mắt.
          </p>
        </div>

        <Card
          className={`border shadow-md mb-8 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thời gian ra mắt dự kiến
            </CardTitle>
            <CardDescription>
              Đếm ngược đến khi website chính thức hoạt động
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center space-x-2 md:space-x-4 mb-8 py-4">
              <CounterBox value={countdown.days} label="Ngày" />
              <CounterBox value={countdown.hours} label="Giờ" />
              <CounterBox value={countdown.minutes} label="Phút" />
              <CounterBox value={countdown.seconds} label="Giây" />
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Tiến độ phát triển</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="secondary" className="text-xs">
                        {progress}%
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Đã hoàn thành {progress}% tiến độ</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Progress value={progress} className="h-2" ref={progressBarRef} />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">Bắt đầu</span>
                <span className="text-xs text-muted-foreground">
                  Hoàn thành
                </span>
              </div>
            </div>

            <Tabs
              defaultValue="updates"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="updates">Cập nhật</TabsTrigger>
                <TabsTrigger value="features">Tính năng</TabsTrigger>
              </TabsList>
              <TabsContent value="updates" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {updates.map((update, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start border-l-2 border-primary/30 pl-4 py-1"
                    >
                      <div className="w-20 text-xs text-muted-foreground">
                        {update.date}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{update.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <div className="space-y-2">
                  {plannedFeatures
                    .slice(0, visibleFeatures)
                    .map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                          feature.complete ? "bg-primary/5" : "bg-card"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {feature.complete ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span
                            className={`text-sm ${
                              feature.complete ? "font-medium" : ""
                            }`}
                          >
                            {feature.name}
                          </span>
                        </div>
                        <Badge
                          variant={feature.complete ? "success" : "outline"}
                          className={
                            feature.complete
                              ? "bg-primary/20 text-primary border-primary/30"
                              : ""
                          }
                        >
                          {feature.complete ? "Hoàn thành" : "Đang phát triển"}
                        </Badge>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <Separator className="my-1" />

          <CardFooter className="pt-4 pb-6">
            {!isSubmitted ? (
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Bell className="h-4 w-4 text-primary" />
                    Nhận thông báo khi trang này ra mắt
                  </label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={
                          !isValidEmail
                            ? "border-destructive focus:ring-destructive/30"
                            : ""
                        }
                      />
                      {!isValidEmail && (
                        <p className="text-destructive mt-1 flex items-center gap-1 text-xs">
                          <AlertCircle className="w-3 h-3" /> Vui lòng nhập
                          email hợp lệ
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleSubmit}
                      className="transition-all hover:shadow-md"
                    >
                      Đăng ký <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 text-sm">
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-medium text-base">
                      Đăng ký thành công!
                    </h4>
                  </div>
                  <p className="text-muted-foreground ml-7">
                    Cảm ơn bạn đã đăng ký. Chúng tôi sẽ thông báo cho bạn khi
                    trang này ra mắt.
                  </p>
                  <div className="mt-2 ml-7">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={resetForm}
                      className="h-8 px-0 text-primary hover:text-primary/80 font-normal"
                    >
                      Đăng ký email khác
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>

        <div
          className={`text-center transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="outline"
            className="shadow-sm transition-all hover:shadow-md"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Trở về trang chủ
            </Link>
          </Button>
        </div>

        <div
          className={`text-center text-sm text-muted-foreground mt-8 transition-all duration-700 delay-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>© 2025 Next Blog. Tất cả các quyền được bảo lưu.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
