import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { RenewalHeader } from "@/components/RenewalHeader";
import { RenewalFooter } from "@/components/RenewalFooter";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import { BackToTop } from "@/components/BackToTop";

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
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="overflow-x-clip">
      <body className={`${inter.variable} ${notoJp.variable} ${notoSerifJp.variable} antialiased min-h-screen flex flex-col overflow-x-clip w-full relative`}>
        <div className="fixed top-0 z-[10000] w-full flex flex-col">
          <EmergencyAlert />
          <RenewalHeader />
        </div>
        <main className="relative flex-grow">
          {children}
        </main>
        <BackToTop />
        <RenewalFooter />
      </body>
    </html>
  );
}
