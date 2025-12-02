import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کلینیک روانشناسی روزنه - مشاوره آنلاین با بهترین متخصصان ایران",
  description: "کلینیک روزنه بهترین مرکز مشاوره آنلاین ایران. رزرو نوبت آنلاین، مشاوره فوری، تست‌های روانشناختی رایگان و خدمات تخصصی با روانشناسان مجرب",
  keywords: [
    "مشاوره آنلاین",
    "کلینیک روانشناسی",
    "روانشناس تهران",
    "مشاوره فوری",
    "رزرو نوبت آنلاین",
    "تست روانشناختی رایگان",
    "مشاوره خانوادگی",
    "زوج درمانی",
    "درمان افسردگی",
    "مشاوره پیش از ازدواج"
  ],
  openGraph: {
    title: "کلینیک روانشناسی روزنه - بهترین مرکز مشاوره آنلاین ایران",
    description: "رزرو نوبت آنلاین، مشاوره فوری و خدمات روانشناختی تخصصی با بهترین متخصصان",
    url: "https://rozaneh.com",
    images: [
      {
        url: "/rozaneh pics/1.webp",
        width: 1200,
        height: 630,
        alt: "کلینیک روانشناسی روزنه"
      }
    ]
  },
  alternates: {
    canonical: "https://rozanehclinic.com"
  }
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <style>{`
        .hero-first-section {
          background-image: url(/bg%201-01.svg);
          background-size: 120%;
          background-position: center 70%;
          background-repeat: no-repeat;
        }
        @media (max-width: 767px) {
          .hero-first-section {
            background-size: 250%;
            background-position: left 30% top 95%;
          }
        }
        .hero-second-section {
          background-image: none;
        }
        @media (min-width: 1024px) {
          .hero-second-section {
            background-image: url(/bg%202-01.svg);
          }
        }
        @media (max-width: 767px) {
          .hero-second-section {
            background-image: none;
            padding-bottom: 400px;
            margin-bottom: 30px;
          }
        }
        .hero-third-section {
          background-image: url(/bg%203-01.svg);
          background-size: contain;
          background-position: bottom center;
          background-repeat: no-repeat;
        }
        @media (max-width: 767px) {
          .hero-third-section {
            background-position: bottom center 50px;
          }
        }
        .sitting-conversation-img {
          max-height: 70vh;
        }
        @media (max-width: 767px) {
          .sitting-conversation-img {
            max-height: 25vh !important;
            transform: translateY(60px);
          }
        }
        @media (min-width: 1024px) {
          .sitting-conversation-img {
            max-height: 80vh;
          }
        }
      `}</style>
      {/* First Page */}
      <div
        className="hero-first-section font-sans w-full h-screen bg-cover bg-top bg-left relative overflow-hidden"
      >
        {/* Logo */}
        <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
          <img
            src="/logo.svg"
            alt="Rozaneh Logo"
            className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain mx-auto"
          />
          <h1 className="font-bold text-teal-700 mt-1 font-arabic text-base md:text-xl">
            کلینیک روزنه
          </h1>
        </div>

        {/* Navigation Menu */}
        {/* Navigation */}
        <nav className="absolute top-25 md:top-16 right-2 md:right-12 lg:right-20 3xl:right-56 z-10 max-w-[calc(100vw-1rem)]">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-1.5 md:px-6 py-2 md:py-3 shadow-sm overflow-x-auto">
            <ul dir="rtl" className="flex space-x-reverse space-x-2 md:space-x-5 lg:space-x-6 3xl:space-x-9 font-arabic whitespace-nowrap">
              <li>
                <a href="#home" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  خانه
                </a>
              </li>
              <li>
                <Link href="/login" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  ورود
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  تماس
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  درباره
                </Link>
              </li>
              <li>
                <a href="/services" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  خدمات
                </a>
              </li>
              <li>
                <Link href="/assessments" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  تست‌ها
                </Link>
              </li>
              <li>
                <Link href="/therapists" className="text-gray-700 hover:text-teal-600 font-regular transition-all duration-300 px-2 py-1 md:px-3 md:py-2 3xl:px-8 3xl:py-4 rounded-md text-sm md:text-base 4xl:text-xl inline-block transform hover:scale-110">
                  مشاوران
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div dir="rtl" className="absolute top-3/8 md:top-120 right-4 md:right-12 lg:right-20 3xl:right-56 transform -translate-y-1/2 text-right max-w-[calc(100vw-2rem)] md:max-w-lg 2xl:max-w-4xl 3xl:max-w-7xl font-arabic px-2">
          <h1 className="font-bold text-teal-700 mb-3 md:mb-4 3xl:mb-12 leading-tight text-2xl md:text-4xl 4xl:text-6xl text-right">
            سفر شما به سوی سلامت روان
            <br />
            از امروز شروع می‌شود.
          </h1>
          <p className="text-gray-600 mb-4 md:mb-6 3xl:mb-12 leading-relaxed font-regular text-sm md:text-base 4xl:text-2xl text-right">
            در محیطی امن و حرفه‌ای همراه شما هستیم.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 3xl:gap-8">
            <Link href="/book-appointment" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 md:px-6 md:py-3 3xl:px-12 3xl:py-6 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm md:text-base 4xl:text-2xl text-center inline-block">
              رزرو نوبت
            </Link>
            <Link href="/chat-support" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 md:px-6 md:py-3 3xl:px-12 3xl:py-6 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm md:text-base 4xl:text-2xl text-center inline-block">
              مشاوره فوری
            </Link>
          </div>
        </div>

      </div>

      {/* Second Page */}
      <div
        className="hero-second-section font-sans w-full h-[vh] md:h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      >
        {/* Heading */}
        <h3 dir="rtl" className="absolute top-16 md:top-32 right-4 md:right-12 lg:right-20 3xl:right-56 text-right font-bold text-teal-700 text-base md:text-2xl lg:text-3xl font-arabic max-w-[calc(100vw-2rem)] px-2">
          تیمی از روانشناسان و مشاوران متخصص و با تجربه
        </h3>

        {/* Button */}
        <Link href="/therapists" className="absolute top-28 md:top-52 right-4 md:right-12 lg:right-70 3xl:right-56 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm md:text-base font-arabic inline-block">
          مشاهده مشاوران
        </Link>

        {/* Centered Image */}
        <div className="absolute top-1/2 left-1/2 md:mt-30 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[70vw] lg:w-[60vw] md:top-1/2">
          <Image
            src="/sitting conversation-01.svg"
            alt="Sitting Conversation"
            width={900}
            height={900}
            className="sitting-conversation-img object-contain w-full h-auto md:max-h-[70vh] lg:max-h-[80vh]"
          />
        </div>
      </div>

      {/* Third Page */}
      <div
        className="hero-third-section font-sans w-full h-[40vh] md:h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      >
        {/* Free Online Tests Heading */}
        <h1 dir="rtl" className="absolute top-0 md:top-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-90 md:translate-y-12 text-center font-bold text-teal-700 text-base md:text-2xl lg:text-4xl font-arabic px-4 max-w-[90vw] z-10">
          تست های رایگان آنلاین
        </h1>
        <p dir="rtl" className="absolute top-8 md:top-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-75 md:translate-y-24 text-center text-gray-700 leading-relaxed font-regular text-xs md:text-base 4xl:text-2xl font-arabic max-w-xs md:max-w-md px-4 z-10">
          به‌روزترین و معتبرترین تست‌های روانشناسی به صورت کاملاً رایگان.
        </p>

        {/* Button */}
        <Link href="/assessments" className="absolute top-20 md:top-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-110 md:translate-y-40 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm md:text-base font-arabic inline-block z-10">
          مشاهده تست‌ها
        </Link>
      </div>

      {/* Modern Photo Album Section */}
      <section className="w-full py-8 md:py-16 flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-bold text-teal-700 mb-4 md:mb-8 font-arabic text-center mt-4 md:mt-8 px-4"> تصاویر کلینیک روزنه</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-6 max-w-6xl w-full px-2 md:px-4 mb-4 md:mb-8">
          {(() => {
            const pics = Array.from({ length: 12 }, (_, i) => `${i + 1}.webp`);
            // Swap 3rd (index 2) and 12th (index 11) images
            [pics[2], pics[11]] = [pics[11], pics[2]];
            return pics.map((img, i) => (
              <div key={img} className="overflow-hidden rounded-xl shadow-lg group relative aspect-[4/3] bg-white">
                <Image
                  src={`/rozaneh pics/${img}`}
                  alt={`گالری روزنه ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  priority={i < 4}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ));
          })()}
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="w-full py-4 md:py-6 px-2 md:px-4 mt-8 md:mt-12 flex justify-center">
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm max-w-6xl w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/logo.svg" alt="Rozaneh Logo" className="w-10 h-10 md:w-14 md:h-14 mb-1 md:mb-2" />
            <span className="font-arabic text-base md:text-lg font-bold text-gray-800">کلینیک روانشناسی روزنه</span>
            <span className="text-xs md:text-sm text-teal-700 font-arabic">بهترین پلتفرم مشاوره آنلاین ایران</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <nav className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base font-arabic">
              <a href="#home" className="hover:text-teal-600 text-gray-700 transition px-2 py-1">خانه</a>
              <Link href="/therapists" className="hover:text-teal-600 text-gray-700 transition px-2 py-1">مشاوران</Link>
              <Link href="/assessments" className="hover:text-teal-600 text-gray-700 transition px-2 py-1">تست‌ها</Link>
              <a href="/services" className="hover:text-teal-600 text-gray-700 transition px-2 py-1">خدمات</a>
              <a href="/about" className="hover:text-teal-600 text-gray-700 transition px-2 py-1">درباره</a>
              <a href="/contact-us" className="hover:text-teal-600 text-gray-700 transition px-2 py-1">تماس</a>
            </nav>
            <div className="flex gap-3 md:gap-4 mt-2 md:mt-4">
              <a href="https://instagram.com/Rozaneh.family" target="_blank" rel="noopener" aria-label="اینستاگرام" className="hover:text-pink-400 text-gray-700 transition">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5.5a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
              </a>
              <a href="https://t.me/Rozaneh_family" target="_blank" rel="noopener" aria-label="تلگرام" className="hover:text-blue-400 text-gray-700 transition">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21.426 3.594a1.5 1.5 0 00-1.64-.217L3.5 11.09a1.5 1.5 0 00.13 2.77l3.97 1.37 1.47 4.38a1.5 1.5 0 002.7.22l2.02-3.18 3.97 3.13a1.5 1.5 0 002.41-1.01l1.5-13a1.5 1.5 0 00-.74-1.39zM8.1 13.34l7.13-6.36-5.7 7.13-.2 2.7-1.23-3.47zm2.7 5.13l-1.13-3.37 1.13 3.37zm7.13-1.13l-3.97-3.13 3.97 3.13z" /></svg>
              </a>
            </div>
            <span className="text-xs text-teal-700 mt-4 font-arabic">© 2019 Rozaneh Clinic. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
