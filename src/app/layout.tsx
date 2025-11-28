import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Hoặc font khác tùy bạn
// @ts-ignore - allow importing global CSS without type declarations
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniLMS",
  description: "Hệ thống quản lý học tập",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
