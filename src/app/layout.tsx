import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import { Providers } from "@/lib/providers";
import Footer from "@/components/layout/footer";
import InterFont from "@/components/general/InterFont";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1641143754058043"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${InterFont.className} bg-gray text-gray-600 antialiased scroll-smooth`}
      >
        <Providers>
          <Header />
          <main className="flex min-h-screen w-full flex-col">
            {/* Nội dung quảng cáo Google AdSense */}
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-1641143754058043"
              data-ad-slot="6923084344"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({});
                `,
              }}
            />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId={"G-9D7D9TJ5FM"} />
    </html>
  );
}
