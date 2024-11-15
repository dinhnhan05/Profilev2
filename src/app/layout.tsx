import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import { Providers } from "@/lib/providers";
import Footer from "@/components/layout/footer";
import InterFont from "@/components/general/InterFont";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics

const title = "Profile - Đình Nhân";
const description = "Trang thông tin cá nhân của tôi";
const url = "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    "web developer",
    "portfolio",
    "profile",
    "thông tin cá nhân Nguyễn Đình Nhân",
    "Nhân",
  ],
  creator: "Nguyễn Đình Nhân",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${InterFont.className} bg-gray text-gray-600 antialiased scroll-smooth`}
      >
        <Providers>
          <Header />
          <main className="flex min-h-screen w-full flex-col">
            {children}
          </main>
          <Footer />
          <Analytics /> {/* Thêm Vercel Analytics ở đây */}
        </Providers>
      </body>
      <GoogleAnalytics gaId={"G-9D7D9TJ5FM"} />
    </html>
  );
}
