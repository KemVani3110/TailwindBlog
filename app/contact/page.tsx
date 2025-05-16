/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Loader2,
  MessageSquare,
  Info,
  AlertTriangle,
  MapIcon,
  BookMarked,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  // Form setup with react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      department: "",
      message: "",
    },
  });

  useEffect(() => {
    setMounted(true);

    // Simulate page loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      // Apply animation classes after loading is complete
      setTimeout(() => {
        setPageLoaded(true);
      }, 100);
    }, 800);

    return () => clearTimeout(loadingTimer);
  }, []);

  const onSubmit = (data: any) => {
    setSubmitting(true);

    // Form submission real-life simulation
    setTimeout(() => {
      setSubmitting(false);
      setFormStatus({
        message:
          "Cảm ơn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
        type: "success",
      });

      // Reset form after submission
      form.reset();

      // Clear message after 8 seconds
      setTimeout(() => {
        setFormStatus({
          message: "",
          type: null,
        });
      }, 8000);
    }, 1500);
  };

  // FAQ items
  const faqItems = [
    {
      question: "Làm thế nào để đăng ký nhận bản tin từ Next Blog?",
      answer:
        "Bạn có thể đăng ký nhận bản tin bằng cách điền email của bạn vào form đăng ký ở cuối trang chủ hoặc liên hệ trực tiếp với chúng tôi qua form liên hệ ở trên.",
    },
    {
      question: "Tôi có thể đóng góp bài viết cho Next Blog không?",
      answer:
        "Chúng tôi luôn chào đón những cộng tác viên mới. Hãy gửi email cho chúng tôi theo địa chỉ contribute@nextblog.com để biết thêm chi tiết.",
    },
    {
      question: "Next Blog có cung cấp dịch vụ tư vấn không?",
      answer:
        "Có, chúng tôi cung cấp dịch vụ tư vấn về phát triển web, thiết kế UX/UI và chiến lược nội dung. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết.",
    },
    {
      question: "Làm thế nào để báo cáo một bài viết vi phạm?",
      answer:
        "Bạn có thể báo cáo bài viết vi phạm bằng cách sử dụng nút 'Báo cáo' ở cuối mỗi bài viết hoặc gửi email đến report@nextblog.com với chi tiết về bài viết đó.",
    },
    {
      question: "Hiện tại Blog có hỗ trợ ngôn ngữ nào?",
      answer:
        " Hiện tại, Next Blog chỉ hỗ trợ tiếng Việt. Chúng tôi đang làm việc để mở rộng hỗ trợ cho nhiều ngôn ngữ hơn.",
    },
  ];

  // Offices data
  const offices = [
    {
      name: "Văn phòng chính",
      address: "123 Đường ABC, Quận 5, TP. Hồ Chí Minh",
      phone: "+84 (0) 123 456 789",
      email: "contact@nextblog.com",
      isMain: true,
    },
    {
      name: "Chi nhánh Hà Nội",
      address: "45 Đường XYZ, Quận Hai Bà Trưng, Hà Nội",
      phone: "+84 (0) 987 654 321",
      email: "hanoi@nextblog.com",
      isMain: false,
    },
    {
      name: "Chi nhánh Đà Nẵng",
      address: "67 Đường MNO, Quận Hải Châu, Đà Nẵng",
      phone: "+84 (0) 555 123 456",
      email: "danang@nextblog.com",
      isMain: false,
    },
  ];

  // Fake map component
  const FakeMap = () => {
    return (
      <div className="w-full h-full relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {/* Fake map grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200/30 dark:border-gray-700/30"
            ></div>
          ))}
        </div>

        {/* Main roads */}
        <div className="absolute inset-0">
          <div className="h-4 w-full absolute top-1/3 left-0 bg-amber-400/20 dark:bg-amber-500/10"></div>
          <div className="h-full w-4 absolute top-0 left-1/4 bg-amber-400/20 dark:bg-amber-500/10"></div>
          <div className="h-full w-4 absolute top-0 right-1/3 bg-amber-400/20 dark:bg-amber-500/10"></div>
          <div className="h-4 w-full absolute bottom-1/4 left-0 bg-amber-400/20 dark:bg-amber-500/10"></div>
        </div>

        {/* Water feature */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/4 bg-blue-300/30 dark:bg-blue-500/20 rounded-tl-full"></div>

        {/* Green areas */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-green-300/30 dark:bg-green-500/20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-green-300/30 dark:bg-green-500/20 rounded-full"></div>

        {/* Location markers */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-primary rounded-full animate-pulse flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
            Next Blog HQ
          </div>
        </div>

        <div className="absolute top-1/4 right-20">
          <div className="w-4 h-4 bg-accent rounded-full"></div>
        </div>

        <div className="absolute bottom-1/4 left-1/4">
          <div className="w-4 h-4 bg-accent rounded-full"></div>
        </div>

        {/* Scale and controls */}
        <div className="absolute bottom-3 left-3 bg-white/70 dark:bg-black/70 px-2 py-1 rounded text-xs font-mono">
          500m
        </div>
        <div className="absolute bottom-3 right-3 bg-white/70 dark:bg-black/70 p-1 rounded-full">
          <MapIcon size={16} />
        </div>

        {/* Compass */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 dark:bg-black/70 flex items-center justify-center">
          <div className="w-6 h-6 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-1/2 w-1 bg-red-500"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1/2 w-1 bg-gray-400"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 h-1 w-1/2 bg-gray-400"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 h-1 w-1/2 bg-gray-400"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs font-bold text-red-500">
              N
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="relative flex h-16 w-16 mx-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-16 w-16 bg-primary/10 items-center justify-center">
              <BookMarked className="h-8 w-8 text-primary animate-pulse" />
            </span>
          </div>
          <p className="text-lg text-vn font-medium text-muted-foreground">
            Đang tải trang...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`w-full min-h-[calc(100vh-10rem)] py-8 transition-all duration-500 ease-out
      ${pageLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <section
          className={`relative overflow-hidden bg-secondary/30 dark:bg-muted/10 text-center 
          rounded-xl p-10 mb-12 shadow-md transform transition-all duration-500
          ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Decorative top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60"></div>

          {/* Decorative pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none 
            bg-[radial-gradient(circle_at_100%_100%,var(--primary)_10px,transparent_10px),
            radial-gradient(circle_at_0%_0%,var(--accent)_10px,transparent_10px)]
            bg-[length:100px_100px]"
          ></div>

          <h1
            className="text-4xl md:text-5xl p-4 font-bold text-vn-heading mb-4 relative
            bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-vn text-secondary-foreground max-w-xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn
          </p>

          {/* Quick contact badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge
              variant="outline"
              className="bg-background/50 backdrop-blur-sm px-3 py-1.5 text-sm flex items-center gap-1.5"
            >
              <Phone size={14} />
              +84 (0) 123 456 789
            </Badge>
            <Badge
              variant="outline"
              className="bg-background/50 backdrop-blur-sm px-3 py-1.5 text-sm flex items-center gap-1.5"
            >
              <Mail size={14} />
              contact@nextblog.com
            </Badge>
            <Badge
              variant="outline"
              className="bg-background/50 backdrop-blur-sm px-3 py-1.5 text-sm flex items-center gap-1.5"
            >
              <MapPin size={14} />
              TP. Hồ Chí Minh, Việt Nam
            </Badge>
          </div>
        </section>

        {/* Contact Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Info Tabs */}
          <div
            className={`transform transition-all duration-500 ease-out delay-100
            ${
              pageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Info size={16} />
                  <span className="hidden sm:inline">Thông tin</span>
                </TabsTrigger>
                <TabsTrigger
                  value="offices"
                  className="flex items-center gap-2"
                >
                  <MapPin size={16} />
                  <span className="hidden sm:inline">Văn phòng</span>
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="flex items-center gap-2"
                >
                  <Clock size={16} />
                  <span className="hidden sm:inline">Lịch làm việc</span>
                </TabsTrigger>
              </TabsList>

              {/* Info Tab Content */}
              <TabsContent value="info">
                <Card className="border border-border shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 h-full">
                  <CardHeader>
                    <CardTitle
                      className="text-2xl text-primary relative pb-3 after:content-[''] 
                      after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
                      after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full"
                    >
                      Thông tin liên hệ
                    </CardTitle>
                    <CardDescription>
                      Liên hệ với chúng tôi qua các kênh sau
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full 
                        bg-primary text-primary-foreground flex-shrink-0 
                        transition-all duration-300 hover:scale-110 hover:bg-accent"
                      >
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">
                          Địa chỉ
                        </h3>
                        <p className="text-vn text-foreground/80">
                          123 Đường ABC, Quận 5, TP. Hồ Chí Minh
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full 
                        bg-primary text-primary-foreground flex-shrink-0 
                        transition-all duration-300 hover:scale-110 hover:bg-accent"
                      >
                        <Phone size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">
                          Điện thoại
                        </h3>
                        <p className="text-vn text-foreground/80">
                          +84 (0) 123 456 789
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full 
                        bg-primary text-primary-foreground flex-shrink-0 
                        transition-all duration-300 hover:scale-110 hover:bg-accent"
                      >
                        <Mail size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">
                          Email
                        </h3>
                        <p className="text-vn text-foreground/80">
                          contact@nextblog.com
                        </p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full 
                        bg-primary text-primary-foreground flex-shrink-0 
                        transition-all duration-300 hover:scale-110 hover:bg-accent"
                      >
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">
                          Giờ làm việc
                        </h3>
                        <p className="text-vn text-foreground/80">
                          Thứ Hai - Thứ Sáu: 9:00 - 17:00
                        </p>
                        <p className="text-vn text-foreground/80">
                          Thứ Bảy: 9:00 - 12:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start">
                    <h3 className="font-semibold text-lg text-primary mb-3">
                      Kết nối với chúng tôi
                    </h3>
                    <div className="flex space-x-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href="https://facebook.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-full 
                              bg-primary text-primary-foreground transition-all duration-300 
                              hover:scale-110 hover:bg-accent pulse-gentle"
                            >
                              <Facebook size={18} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Facebook</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-full 
                              bg-primary text-primary-foreground transition-all duration-300 
                              hover:scale-110 hover:bg-accent pulse-gentle"
                            >
                              <Twitter size={18} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Twitter</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href="https://linkedin.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-full 
                              bg-primary text-primary-foreground transition-all duration-300 
                              hover:scale-110 hover:bg-accent pulse-gentle"
                            >
                              <Linkedin size={18} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>LinkedIn</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href="https://instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center rounded-full 
                              bg-primary text-primary-foreground transition-all duration-300 
                              hover:scale-110 hover:bg-accent pulse-gentle"
                            >
                              <Instagram size={18} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Instagram</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Offices Tab Content */}
              <TabsContent value="offices">
                <Card className="border border-border shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle
                      className="text-2xl text-primary relative pb-3 after:content-[''] 
                      after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
                      after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full"
                    >
                      Văn phòng của chúng tôi
                    </CardTitle>
                    <CardDescription>
                      Các văn phòng của Next Blog trên toàn quốc
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {offices.map((office, index) => (
                      <div key={index} className="relative">
                        {office.isMain && (
                          <Badge className="absolute -top-2 -right-2 bg-primary">
                            Chính
                          </Badge>
                        )}
                        <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-out">
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg font-medium text-primary">
                              {office.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin
                                size={14}
                                className="text-muted-foreground"
                              />
                              <span>{office.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone
                                size={14}
                                className="text-muted-foreground"
                              />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail
                                size={14}
                                className="text-muted-foreground"
                              />
                              <span>{office.email}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab Content */}
              <TabsContent value="schedule">
                <Card className="border border-border shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle
                      className="text-2xl text-primary relative pb-3 after:content-[''] 
                      after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
                      after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full"
                    >
                      Lịch làm việc
                    </CardTitle>
                    <CardDescription>
                      Thời gian làm việc của chúng tôi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/30 dark:bg-muted/30 p-4 rounded-lg">
                          <p className="text-primary font-medium mb-2">
                            Ngày thường
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Thứ Hai</span>
                              <span>9:00 - 17:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thứ Ba</span>
                              <span>9:00 - 17:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thứ Tư</span>
                              <span>9:00 - 17:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thứ Năm</span>
                              <span>9:00 - 17:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thứ Sáu</span>
                              <span>9:00 - 17:00</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary/30 dark:bg-muted/30 p-4 rounded-lg">
                          <p className="text-primary font-medium mb-2">
                            Cuối tuần
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Thứ Bảy</span>
                              <span>9:00 - 12:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Chủ Nhật</span>
                              <span className="text-muted-foreground">
                                Đóng cửa
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Lưu ý</AlertTitle>
                        <AlertDescription>
                          Chúng tôi đóng cửa vào các ngày lễ. Vui lòng liên hệ
                          trước nếu bạn cần hỗ trợ trong những ngày này.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Form Card */}
          <Card
            className={`border border-border shadow-md hover:shadow-lg transform transition-all duration-500 ease-out delay-200
            ${
              pageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <CardHeader>
              <CardTitle
                className="text-2xl text-primary relative pb-3 after:content-[''] 
                after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 
                after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full"
              >
                Gửi tin nhắn cho chúng tôi
              </CardTitle>
              <CardDescription>
                Điền thông tin bên dưới và chúng tôi sẽ phản hồi ngay khi có thể
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus.message && (
                <Alert
                  className={`mb-6 ${
                    formStatus.type === "success"
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:border-green-900/50 dark:text-green-400"
                      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400"
                  } fade-in`}
                >
                  <AlertTitle>
                    {formStatus.type === "success" ? "Thành công!" : "Lỗi!"}
                  </AlertTitle>
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Vui lòng nhập họ tên" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vn">
                          Họ tên <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập họ tên của bạn"
                            className="transition-all focus:translate-y-[-2px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-vn-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Vui lòng nhập email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email không hợp lệ",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vn">
                          Email <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập địa chỉ email của bạn"
                            className="transition-all focus:translate-y-[-2px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-vn-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vn">Tiêu đề</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập tiêu đề tin nhắn"
                            className="transition-all focus:translate-y-[-2px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vn">Phòng ban</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phòng ban liên hệ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">
                              Thông tin chung
                            </SelectItem>
                            <SelectItem value="support">
                              Hỗ trợ kỹ thuật
                            </SelectItem>
                            <SelectItem value="sales">Kinh doanh</SelectItem>
                            <SelectItem value="partnership">Hợp tác</SelectItem>
                            <SelectItem value="hr">Nhân sự</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    rules={{ required: "Vui lòng nhập nội dung tin nhắn" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-vn">
                          Nội dung <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập nội dung tin nhắn của bạn"
                            className="min-h-32 transition-all focus:translate-y-[-2px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-vn-error" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full md:w-auto flex items-center btn-hover-effect relative overflow-hidden gap-2 group"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Send
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                        <span>Gửi tin nhắn</span>
                      </>
                    )}
                    <span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                      -translate-x-full group-hover:animate-[shimmer_1s_forwards]"
                    ></span>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <section
          className={`mb-16 transform transition-all duration-500 ease-out delay-300
          ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2
            className="text-2xl text-primary font-bold text-center mb-6 relative 
            text-vn-heading after:content-[''] after:absolute after:bottom-[-10px] 
            after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-1 
            after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full"
          >
            Bản đồ
          </h2>
          <div
            className="h-96 rounded-lg overflow-hidden shadow-md hover:shadow-lg 
            transition-all duration-500 hover:-translate-y-1 border border-border"
          >
            {/* Map Component */}
            <div className="h-full w-full">
              <FakeMap />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className={`mb-16 transform transition-all duration-500 ease-out delay-500
          ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2
            className="text-2xl text-primary font-bold text-center mb-10 relative 
            text-vn-heading after:content-[''] after:absolute after:bottom-[-10px] 
            after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-1 
            after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full"
          >
            Câu hỏi thường gặp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-background/20 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Về Next Blog</CardTitle>
                <CardDescription>
                  Thông tin chung về dịch vụ của chúng tôi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <MessageSquare
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Next Blog cung cấp các bài viết về công nghệ, thiết kế và
                    phát triển web
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MessageSquare
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi có đội ngũ biên tập viên và cộng tác viên với
                    nhiều kinh nghiệm
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MessageSquare
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Next Blog được thành lập từ năm 2023 với sứ mệnh chia sẻ
                    kiến thức chất lượng
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/20 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Hỗ trợ khách hàng</CardTitle>
                <CardDescription>
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Phản hồi trong vòng 24 giờ làm việc
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Hỗ trợ trực tuyến qua chat từ 9:00 - 17:00 các ngày làm việc
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tổng đài hỗ trợ: +84 (0) 123 456 789
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`border border-border rounded-lg overflow-hidden bg-card
                hover:shadow-md transition-all data-[state=open]:bg-primary/5 dark:data-[state=open]:bg-primary/15`}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-left">
                  <h3 className="font-medium text-lg text-vn">
                    {item.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-foreground/80 text-vn leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA Section */}
        <section
          className={`mb-16 transform transition-all duration-500 ease-out delay-700
          ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-primary/10 dark:bg-primary/5 rounded-xl p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/10 rounded-full"></div>
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-accent/10 rounded-full"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Hãy bắt đầu trò chuyện với chúng tôi ngay hôm nay
              </h2>
              <p className="text-foreground/80 mb-6">
                Chúng tôi luôn sẵn sàng lắng nghe ý kiến, đề xuất hoặc giải đáp
                bất kỳ thắc mắc nào của bạn. Đừng ngần ngại liên hệ với chúng
                tôi!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90 group">
                  <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  Gửi email
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 group"
                >
                  <Phone className="mr-2 h-4 w-4 transition-all duration-300 group-hover:animate-pulse" />
                  Gọi ngay
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
