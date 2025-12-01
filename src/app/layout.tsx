import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "روزنه - بهترین پلتفرم مشاوره آنلاین ایران",
  description: "کلینیک روزنه - ارائه خدمات مشاوره و روانشناسی آنلاین با بهترین متخصصان ایران",
  keywords: "مشاوره آنلاین، روانشناس، درمانگر، سلامت روان، کلینیک روزنه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSansArabic.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
