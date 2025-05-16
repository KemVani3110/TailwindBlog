"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Mail,
  Heart,
  Github,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground transition-all duration-300 ease-in-out">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-12 after:h-0.5 after:bg-primary">
              Next Blog
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Chia sẻ kiến thức, kinh nghiệm về công nghệ, lập trình và thiết kế
              web. Cùng nhau học hỏi và phát triển.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 ease-in-out hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 ease-in-out hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 ease-in-out hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 ease-in-out hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 ease-in-out hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={16} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-12 after:h-0.5 after:bg-primary">
              Links Nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Bài viết
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-12 after:h-0.5 after:bg-primary">
              Chủ Đề
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/web-development"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Phát triển Web
                </Link>
              </li>
              <li>
                <Link
                  href="/category/frontend"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Frontend
                </Link>
              </li>
              <li>
                <Link
                  href="/category/backend"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  Backend
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ux-ui"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link
                  href="/category/seo"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1 inline-flex"
                >
                  SEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-12 after:h-0.5 after:bg-primary">
              Liên Hệ
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground group transition-all duration-300 ease-in-out">
                <MapPin
                  size={16}
                  className="text-primary transition-all duration-300 ease-in-out group-hover:scale-110 mt-0.5"
                />
                <span className="line-height-relaxed">
                  123 Đường ABC, Quận 5, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground group transition-all duration-300 ease-in-out">
                <Phone
                  size={16}
                  className="text-primary transition-all duration-300 ease-in-out group-hover:scale-110"
                />
                <span className="line-height-relaxed">+84 (0) 123 456 789</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground group transition-all duration-300 ease-in-out">
                <Mail
                  size={16}
                  className="text-primary transition-all duration-300 ease-in-out group-hover:scale-110"
                />
                <span className="line-height-relaxed">
                  contact@nextblog.com
                </span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground group transition-all duration-300 ease-in-out">
                <FileText
                  size={16}
                  className="text-primary transition-all duration-300 ease-in-out group-hover:scale-110"
                />
                <Link
                  href="/terms-of-service"
                  className="hover:text-primary transition-all duration-300 ease-in-out transform hover:translate-x-1"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 bg-border transition-all duration-300 ease-in-out" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Next Blog. Tất cả các quyền được bảo lưu.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Thiết kế và phát triển bởi{" "}
            <Heart size={14} className="mx-1 text-red-500 animate-pulse" />
            <Link
              href="#"
              className="ml-1 text-primary hover:underline transition-all duration-300 ease-in-out"
            >
              Đội ngũ Next Blog
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
