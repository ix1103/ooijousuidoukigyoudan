import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import { BackToTop } from "@/components/BackToTop";
import { FloatingContact } from "@/components/FloatingContact";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: "--font-noto-jp"
});
const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: "--font-noto-serif-jp"
});

export const metadata: Metadata = {
  title: {
    default: "大井上水道企業団 | 安心・安全な水を未来へ",
    template: "%s | 大井上水道企業団"
  },
  description: "大井上水道企業団の公式ウェブサイトです。水道料金、各種手続き、緊急時の対応、水質情報などをお知らせします。",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${notoJp.variable} ${notoSerifJp.variable} antialiased min-h-screen flex flex-col`}>
        <div className="fixed top-0 z-50 w-full flex flex-col">
          <EmergencyAlert />
          <Header />
        </div>
        <main className="flex-grow">
          {children}
        </main>
        <BackToTop />
        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}
