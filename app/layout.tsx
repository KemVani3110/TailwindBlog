import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingProvider from "@/app/context/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Blog - Trang chủ",
  description:
    "Blog đơn giản xây dựng bằng Next.js, TypeScript và Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pt-16 md:pl-16 transition-all duration-300">
                {children}
              </main>
              <Footer />
            </div>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
