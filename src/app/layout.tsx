import type { Metadata } from "next";
import { Poppins, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rozanehclinic.com'),
  title: {
    default: "کلینیک روانشناسی روزنه - مشاوره آنلاین با بهترین متخصصان ایران",
    template: "%s | کلینیک روزنه"
  },
  description: "کلینیک روزنه بهترین مرکز مشاوره آنلاین ایران. خدمات روانشناسی، مشاوره خانوادگی، زوج درمانی، و تست‌های روانشناختی رایگان با متخصصان مجرب. رزرو نوبت آنلاین ۲۴ ساعته.",
  keywords: [
    "مشاوره آنلاین",
    "روانشناس",
    "کلینیک روانشناسی",
    "مشاوره خانوادگی",
    "زوج درمانی",
    "درمانگر",
    "سلامت روان",
    "مشاوره پیش از ازدواج",
    "تست روانشناختی",
    "مشاوره فوری",
    "روزنه",
    "تهران",
    "ایران"
  ],
  authors: [{ name: "کلینیک روزنه" }],
  creator: "کلینیک روزنه",
  publisher: "کلینیک روزنه",
  category: "Healthcare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://rozanehclinic.com',
    title: 'کلینیک روانشناسی روزنه - مشاوره آنلاین با بهترین متخصصان',
    description: 'بهترین مرکز مشاوره آنلاین ایران. خدمات روانشناسی، مشاوره خانوادگی، زوج درمانی با متخصصان مجرب',
    siteName: 'کلینیک روزنه',
    images: [
      {
        url: '/rozaneh pics/1.webp',
        width: 1200,
        height: 630,
        alt: 'کلینیک روانشناسی روزنه'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'کلینیک روانشناسی روزنه',
    description: 'بهترین مرکز مشاوره آنلاین ایران',
    images: ['/rozaneh pics/1.webp']
  },
  verification: {
    google: 'your-google-verification-code'
  },
  alternates: {
    canonical: 'https://rozanehclinic.com',
    languages: {
      'fa-IR': 'https://rozanehclinic.com'
    }
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico?v=1' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }
    ]
  },
  manifest: '/manifest.json',
  other: {
    'google-site-verification': 'your-google-verification-code'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${poppins.variable}`}>
      <head>
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=1" sizes="any" />
        <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png?v=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#14b8a6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="کلینیک روزنه" />
        <meta name="application-name" content="کلینیک روزنه" />
        <meta name="msapplication-TileColor" content="#14b8a6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "کلینیک روانشناسی روزنه",
              "alternateName": "Rozaneh Psychology Clinic",
              "url": "https://rozanehclinic.com",
              "logo": "https://rozanehclinic.com/logo.svg",
              "image": "https://rozanehclinic.com/rozaneh pics/1.webp",
              "description": "کلینیک روزنه بهترین مرکز مشاوره آنلاین ایران با خدمات روانشناسی تخصصی",
              "medicalSpecialty": [
                "Psychology",
                "Marriage Counseling",
                "Family Therapy",
                "Mental Health"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "شریعتی، بین سرافراز و یخچال، رو به روی متروی قلهک، جنب صرافی اردوخانی، پلاک ۱۵۱۱، طبقه سوم",
                "addressLocality": "تهران",
                "addressCountry": "IR"
              },
              "telephone": "+98-21-22616408",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+98-21-22616408",
                "contactType": "customer service",
                "availableLanguage": "Persian"
              },
              "sameAs": [
                "https://instagram.com/Rozaneh.family",
                "https://t.me/Rozaneh_family"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
