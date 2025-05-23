"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  BookOpen,
  Pencil,
  Users,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  Facebook,
  Github,
  PanelRight,
  BookMarked,
  CheckCircle,
  Coffee,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!mounted) {
    return null;
  }

  const foundingDate = "2023";
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - parseInt(foundingDate);

  const teamMembers = [
    {
      name: "Huỳnh Chu Minh Khôi",
      role: "Founder & CEO",
      avatar: "/ava1.png",
      bio: "Người sáng lập với hơn 10 năm kinh nghiệm trong lĩnh vực phát triển web và thiết kế UX/UI.",
      skills: ["Next.js", "React", "UX/UI Design"],
      social: {
        facebook: "https://facebook.com",
        github: "https://github.com",
      },
    },
    {
      name: "Nguyễn Văn An",
      role: "Lead Developer",
      avatar: "/ava1.png",
      bio: "Chuyên gia về Next.js và React với kinh nghiệm phát triển nhiều ứng dụng web quy mô lớn.",
      skills: ["Next.js", "TypeScript", "Node.js"],
      social: {
        facebook: "https://facebook.com",
        github: "https://github.com",
      },
    },
    {
      name: "Lê Thị Minh",
      role: "Content Editor",
      avatar: "/ava1.png",
      bio: "Biên tập viên với hơn 5 năm kinh nghiệm trong lĩnh vực nội dung số và SEO.",
      skills: ["Content Strategy", "SEO", "Copywriting"],
      social: {
        facebook: "https://facebook.com",
        github: "https://github.com",
      },
    },
    {
      name: "Trần Hoàng Long",
      role: "UX/UI Designer",
      avatar: "/ava1.png",
      bio: "Nhà thiết kế với tư duy sáng tạo và đam mê tạo ra trải nghiệm người dùng tuyệt vời.",
      skills: ["Figma", "UI Design", "User Research"],
      social: {
        facebook: "https://facebook.com",
        github: "https://github.com",
      },
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Web Developer",
      content:
        "Next Blog là nguồn tài nguyên tuyệt vời cho tôi trong hành trình học Next.js. Những bài viết sâu sắc và thiết thực đã giúp tôi nâng cao kỹ năng rất nhiều.",
      avatar: "/ava1.png",
    },
    {
      name: "Trần Thị B",
      role: "UX Designer",
      content:
        "Tôi đặc biệt ấn tượng với cách Next Blog kết hợp giữa thiết kế và phát triển. Đây là một trong những blog công nghệ tốt nhất mà tôi từng theo dõi.",
      avatar: "/ava1.png",
    },
    {
      name: "Lê Văn C",
      role: "Student",
      content:
        "Là một sinh viên IT, Next Blog đã giúp tôi hiểu rõ hơn về các công nghệ web hiện đại. Cách trình bày dễ hiểu và có ví dụ thực tế rất phù hợp với người mới học.",
      avatar: "/ava1.png",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Thành lập Next Blog",
      description: "Khởi đầu hành trình chia sẻ kiến thức với cộng đồng.",
    },
    {
      year: "2023",
      title: "Đạt 1,000 độc giả đầu tiên",
      description:
        "Cột mốc quan trọng khẳng định giá trị nội dung của chúng tôi.",
    },
    {
      year: "2024",
      title: "Mở rộng đội ngũ lên 10 thành viên",
      description:
        "Tăng cường năng lực để mang đến nội dung chất lượng cao hơn.",
    },
    {
      year: "2024",
      title: "Ra mắt phiên bản mới",
      description:
        "Cải tiến giao diện và bổ sung nhiều tính năng mới phục vụ độc giả tốt hơn.",
    },
    {
      year: "2025",
      title: "Đạt 10,000+ độc giả thường xuyên",
      description:
        "Trở thành một trong những blog công nghệ hàng đầu Việt Nam.",
    },
  ];

  // Show loading component while data is loading
  if (loading) {
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
    <>
      <Head>
        <title>Giới thiệu - Next Blog</title>
        <meta
          name="description"
          content="Thông tin về Next Blog và đội ngũ phát triển của chúng tôi"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-[calc(100vh-theme(height.header)-theme(height.footer))] py-8 bg-background text-foreground">
        <div className="container mx-auto px-4">
          {/* Hero Heading Section */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/10 shadow-lg">
              {/* Background gradients */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

              <div className="relative z-10 px-6 py-16 md:py-24 lg:px-12 text-center space-y-8">
                <div className="inline-block animate-bounce-slow">
                  <span className="inline-flex items-center justify-center p-2 rounded-full bg-primary/20 text-primary">
                    <BookOpen size={28} />
                  </span>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto">
                  <h1 className="text-4xl md:text-5xl pb-4 lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                    Về Next Blog
                  </h1>

                  <p className="text-xl text-primary/80 max-w-2xl mx-auto">
                    Nơi chia sẻ kiến thức, đam mê và kết nối cộng đồng phát
                    triển web
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8">
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer">
                          <span className="block text-4xl font-bold text-primary">
                            150+
                          </span>
                          <span className="text-muted-foreground">
                            Bài viết
                          </span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            Nội dung đa dạng
                          </h4>
                          <p className="text-sm">
                            Hơn 150 bài viết chất lượng về Next.js, React, UX/UI
                            và nhiều chủ đề công nghệ khác.
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">Tutorial</Badge>
                            <Badge variant="outline">Case Study</Badge>
                            <Badge variant="outline">Best Practice</Badge>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "400ms" }}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer">
                          <span className="block text-4xl font-bold text-primary">
                            10k+
                          </span>
                          <span className="text-muted-foreground">Độc giả</span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            Cộng đồng ngày càng phát triển
                          </h4>
                          <p className="text-sm">
                            Hơn 10.000 độc giả thường xuyên từ khắp Việt Nam và
                            quốc tế, cùng chia sẻ niềm đam mê công nghệ.
                          </p>
                          <div className="w-full bg-muted h-2 rounded-full mt-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Tăng trưởng 75% so với năm trước
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>

                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "600ms" }}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="cursor-pointer">
                          <span className="block text-4xl font-bold text-primary">
                            {yearsActive}
                          </span>
                          <span className="text-muted-foreground">
                            Năm hoạt động
                          </span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            Hành trình phát triển
                          </h4>
                          <p className="text-sm">
                            {yearsActive} năm không ngừng nỗ lực để mang đến
                            những nội dung chất lượng và giá trị cho cộng đồng.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Thành lập năm 2023
                            </span>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Content Section with Tabs */}
          <section className="mb-16">
            <Tabs defaultValue="story" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="story" className="text-sm md:text-base">
                    Câu chuyện
                  </TabsTrigger>
                  <TabsTrigger value="mission" className="text-sm md:text-base">
                    Sứ mệnh
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className="text-sm md:text-base"
                  >
                    Lịch sử
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="story" className="mt-4">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src="/nextjs.png"
                          alt="Đội ngũ Next Blog"
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 space-y-6">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-2 border-primary/30 text-primary"
                      >
                        Câu chuyện của chúng tôi
                      </Badge>
                      <h2 className="text-3xl font-bold mb-4 text-primary">
                        Từ ý tưởng đến hiện thực
                      </h2>
                    </div>

                    <p className="text-lg text-foreground/90">
                      Next Blog được thành lập vào năm 2023 với khát vọng xây
                      dựng một không gian chia sẻ kiến thức, kinh nghiệm và đam
                      mê về công nghệ web hiện đại, đặc biệt là Next.js và React
                      ecosystem.
                    </p>

                    <p className="text-lg text-foreground/90">
                      Xuất phát từ niềm tin rằng việc chia sẻ kiến thức là cách
                      tốt nhất để phát triển cộng đồng, chúng tôi đã tập hợp
                      những chuyên gia đầu ngành, những người đam mê công nghệ
                      để cùng xây dựng một nguồn tài nguyên quý giá cho cộng
                      đồng phát triển web Việt Nam.
                    </p>

                    <p className="text-lg text-foreground/90">
                      Sau {yearsActive} năm hoạt động, Next Blog đã trở thành
                      điểm đến tin cậy của hơn 10,000+ độc giả, với hơn 150+ bài
                      viết chất lượng về các chủ đề từ cơ bản đến nâng cao trong
                      lĩnh vực phát triển web.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {[
                        "Next.js",
                        "React",
                        "TypeScript",
                        "UX/UI",
                        "Web Development",
                        "Performance",
                      ].map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mission" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-primary/10 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Sứ mệnh
                      </CardTitle>
                      <CardDescription>
                        Những giá trị cốt lõi định hướng hoạt động của chúng tôi
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Chúng tôi tin rằng công nghệ có khả năng thay đổi thế
                        giới theo hướng tích cực. Sứ mệnh của Next Blog là trao
                        quyền cho các nhà phát triển web thông qua kiến thức và
                        cộng đồng, giúp họ xây dựng những sản phẩm số tốt hơn.
                      </p>
                      <p>
                        Với tinh thần chia sẻ và học hỏi không ngừng, chúng tôi
                        cam kết:
                      </p>
                      <ul className="space-y-2 pl-5 list-disc marker:text-primary">
                        <li>
                          Cung cấp nội dung chất lượng, cập nhật và thực tiễn
                        </li>
                        <li>Xây dựng cộng đồng hỗ trợ và trao đổi kiến thức</li>
                        <li>
                          Đồng hành cùng các nhà phát triển trong hành trình
                          phát triển nghề nghiệp
                        </li>
                        <li>
                          Thúc đẩy các giải pháp công nghệ bền vững và tiên tiến
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/10 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PanelRight className="h-5 w-5 text-primary" />
                        Tầm nhìn
                      </CardTitle>
                      <CardDescription>
                        Hướng phát triển trong tương lai
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Next Blog hướng tới việc trở thành nền tảng học tập và
                        chia sẻ kiến thức hàng đầu về phát triển web tại Việt
                        Nam. Chúng tôi mong muốn:
                      </p>
                      <div className="space-y-4 mt-4">
                        <div className="flex gap-3">
                          <div className="mt-1 bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                            <span className="text-primary font-medium">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Mở rộng cộng đồng</h4>
                            <p className="text-muted-foreground">
                              Xây dựng mạng lưới kết nối hàng trăm nghìn người
                              đam mê công nghệ web
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="mt-1 bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                            <span className="text-primary font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Đa dạng hóa nội dung
                            </h4>
                            <p className="text-muted-foreground">
                              Phát triển các format mới như video tutorial,
                              podcast và khóa học trực tuyến
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="mt-1 bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                            <span className="text-primary font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Tạo ra tác động</h4>
                            <p className="text-muted-foreground">
                              Góp phần nâng cao chất lượng ngành công nghiệp
                              phát triển web Việt Nam
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-semibold mb-8 text-center text-primary">
                    Hành trình phát triển
                  </h3>

                  <div className="relative border-l-2 border-primary/30 pl-8 ml-4 space-y-12 py-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[42px] p-1 bg-background">
                          <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-primary border-primary/30"
                              >
                                {milestone.year}
                              </Badge>
                              <h4 className="text-lg font-medium">
                                {milestone.title}
                              </h4>
                            </div>

                            <span className="text-sm text-muted-foreground">
                              {milestone.year === foundingDate
                                ? "Khởi đầu"
                                : `Năm thứ ${
                                    parseInt(milestone.year) -
                                    parseInt(foundingDate) +
                                    1
                                  }`}
                            </span>
                          </div>

                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Team Values Section */}
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge
                variant="outline"
                className="mb-2 border-primary/30 text-primary"
              >
                Những giá trị cốt lõi
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Điều làm nên Next Blog
              </h2>
              <p className="text-lg text-muted-foreground">
                Những nguyên tắc và giá trị định hướng mọi hoạt động của chúng
                tôi
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent">
                    <BookOpen size={28} />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    Học hỏi
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p>
                    Chúng tôi tin rằng việc học tập là hành trình không bao giờ
                    kết thúc. Chúng tôi luôn khiêm tốn và sẵn sàng tiếp thu kiến
                    thức mới mỗi ngày.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent">
                    <Pencil size={28} />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    Chất lượng
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p>
                    Mỗi bài viết đều được nghiên cứu kỹ lưỡng và biên tập cẩn
                    thận. Chúng tôi đặt chất lượng lên hàng đầu trong mọi nội
                    dung chúng tôi tạo ra.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent">
                    <Users size={28} />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    Cộng đồng
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p>
                    Chúng tôi xây dựng một cộng đồng mạnh mẽ và hỗ trợ lẫn nhau.
                    Mọi thành viên đều được tôn trọng và có tiếng nói trong hành
                    trình chung.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent">
                    <BookOpen size={28} />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    Giáo dục
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p>
                    Chúng tôi tin tưởng vào sức mạnh của việc học tập suốt đời.
                    Mỗi thành viên được khuyến khích chia sẻ kiến thức và phát
                    triển kỹ năng mới trong môi trường hợp tác.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Section with Carousel */}
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge
                variant="outline"
                className="mb-2 border-primary/30 text-primary"
              >
                Đội ngũ
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Những người tạo nên Next Blog
              </h2>
              <p className="text-lg text-muted-foreground">
                Gặp gỡ đội ngũ tài năng và đam mê đứng sau những nội dung chất
                lượng
              </p>
            </div>

            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {teamMembers.map((member, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/2"
                  >
                    <div className="p-2">
                      <Card className="border-primary/10 overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex flex-col items-center">
                            <Avatar className="w-32 h-32 border-4 border-background shadow-xl mb-4">
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-xl text-center text-primary">
                              {member.name}
                            </CardTitle>
                            <CardDescription className="text-center font-medium">
                              {member.role}
                            </CardDescription>
                          </div>
                          <div className="flex justify-center gap-3 mt-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary w-9 h-9 p-0"
                              asChild
                            >
                              <Link href={member.social.facebook}>
                                <Facebook size={16} />
                                <span className="sr-only">Facebook</span>
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary w-9 h-9 p-0"
                              asChild
                            >
                              <Link href={member.social.github}>
                                <Github size={16} />
                                <span className="sr-only">GitHub</span>
                              </Link>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-center text-muted-foreground mb-3">
                            {member.bio}
                          </p>
                          <div className="flex flex-wrap justify-center gap-2 mt-3">
                            {member.skills.map((skill, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="font-normal"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="relative " />
                <CarouselNext className="relative " />
              </div>
            </Carousel>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge
                variant="outline"
                className="mb-2 border-primary/30 text-primary"
              >
                Đánh giá từ cộng đồng
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Độc giả nói gì về chúng tôi
              </h2>
              <p className="text-lg text-muted-foreground">
                Những phản hồi từ cộng đồng là nguồn động lực lớn nhất cho chúng
                tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-card border-primary/10 shadow-md"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute -top-6 -left-2 text-4xl text-primary/20">
                        &quot;
                      </div>
                      <p className="relative z-10 italic text-muted-foreground">
                        {testimonial.content}
                      </p>
                      <div className="absolute -bottom-8 -right-2 text-4xl text-primary/20">
                        &quot;
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="my-16">
            <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-lg">
              {/* Background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-6 text-center md:text-left max-w-xl">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                      <Coffee className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-primary">
                        Hãy kết nối với chúng tôi
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Bạn muốn đóng góp bài viết, tham gia đội ngũ hoặc hợp
                        tác? Chúng tôi luôn chào đón những cơ hội mới.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-2 justify-center md:justify-start">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>contact@nextblog.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>+84 123 456 789</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <Button
                      className="group relative w-full md:w-auto text-base font-medium h-12 px-8"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      asChild
                    >
                      <Link href="/contact" className="flex items-center gap-2">
                        Liên hệ ngay
                        <ArrowRight
                          className={`h-4 w-4 transition-transform duration-300 ${
                            hovered ? "translate-x-1" : ""
                          }`}
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
