"use client";

import Link from "next/link";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="relative">
        {/* SVG - Hidden on mobile, shown on desktop positioned left */}
        <div className="hidden lg:flex items-start justify-center pt-8 px-4 absolute left-10 top-48 h-screen w-1/3">
          <img
            src="/contact us.svg"
            alt="Contact Us"
            className="w-full max-w-sm object-contain scale-75"
          />
        </div>

        {/* Content - Full page */}
        <div className="w-full">
          {/* Header with Logo and Back Button */}
          <div className="w-full pt-8 px-6">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <Link href="/" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm">
                بازگشت به صفحه اصلی
              </Link>

              {/* Logo */}
              <div className="text-center">
                <img src="/logo.svg" alt="Rozaneh Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain mx-auto" />
                <h1 className="font-bold text-teal-700 mt-1 text-sm md:text-base">کلینیک روزنه</h1>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section dir="rtl" className="pt-8 pb-8 px-6">
            <div className="text-right">
              <h1 className="font-bold text-teal-700 mb-3 leading-tight text-2xl md:text-3xl">
                تماس با ما
              </h1>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                برای دریافت اطلاعات بیشتر و رزرو نوبت با ما در ارتباط باشید
              </p>
            </div>
          </section>

          {/* Spacer only for desktop */}
          <section className="hidden lg:block py-12"></section>

          {/* Contact Information */}
          <section dir="rtl" className="px-6 pb-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Address */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm lg:w-1/2">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-teal-700 mb-2">آدرس کلینیک</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-3">
                      تهران، شریعتی، بین سرافراز و یخچال، رو به روی متروی قلهک، جنب صرافی اردوخانی، پلاک ۱۵۱۱، طبقه سوم
                    </p>
                    <a
                      href="https://maps.google.com/maps?q=35.772261,51.438633&ll=35.772261,51.438633&z=16"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-sm"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      مشاهده در نقشه
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm lg:w-1/2">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-teal-700 mb-2">شماره تماس</h3>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-base font-medium">شماره ثابت:</span>
                        <p className="text-gray-600 text-lg font-medium" dir="ltr">021 2261 6408</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-base font-medium">شماره همراه:</span>
                        <p className="text-gray-600 text-lg font-medium" dir="ltr">0938 850 5574</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm lg:w-1/2">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-700 mb-2">ایمیل</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      در حال به‌روزرسانی
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-bold text-teal-700 mb-4 text-center">شبکه‌های اجتماعی</h3>
                <div className="flex items-center justify-center gap-6">
                  {/* Telegram */}
                  <a
                    href="https://t.me/Rozaneh_family"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-sm font-medium">تلگرام</p>
                      <p className="text-blue-600 text-xs">@Rozaneh_family</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/Rozaneh.family"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-sm font-medium">اینستاگرام</p>
                      <p className="text-pink-600 text-xs">Rozaneh.family</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location Map */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-bold text-teal-700 mb-4 text-center">موقعیت مکانی</h3>
                <div className="space-y-4">
                  {/* Embedded Map */}
                  <div className="rounded-lg overflow-hidden border border-white/30 h-64 md:h-80">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.108567819065!2d51.43658!3d35.772261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8db6e8a1a1a1a1%3A0x0!2sRozaneh%20Clinic!5e0!3m2!1sen!2sir!4v1701432000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  {/* Map Button */}
                  <div className="flex items-center justify-center">
                    <a
                      href="https://maps.google.com/maps?q=35.772261,51.438633&ll=35.772261,51.438633&z=16"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors text-base group"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      مشاهده در نقشه گوگل
                    </a>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      برای مسیریابی دقیق و مشاهده موقعیت کلینیک روی نقشه بالا مراجعه کنید یا دکمه بالا را کلیک کنید
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section dir="rtl" className="py-8 px-6">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 text-center shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-teal-700 mb-3">آماده مشاوره هستید؟</h2>
              <p className="text-gray-600 mb-6 text-sm">
                برای رزرو نوبت یا دریافت مشاوره فوری با ما تماس بگیرید.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/book-appointment"
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm text-sm"
                >
                  رزرو نوبت
                </Link>
                <Link
                  href="/chat-support"
                  className="bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-white/40 transition-colors text-sm"
                >
                  مشاوره فوری
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full py-4 px-6 mt-4 pb-20">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm flex flex-col items-center gap-3 px-4 py-4">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="Rozaneh Logo" className="w-8 h-8" />
                <span className="text-sm font-bold text-gray-800">کلینیک روانشناسی روزنه</span>
              </div>
              <nav className="flex flex-wrap justify-center gap-3 text-xs">
                <Link href="/" className="hover:text-teal-600 text-gray-700 transition">خانه</Link>
                <Link href="/therapists" className="hover:text-teal-600 text-gray-700 transition">مشاوران</Link>
                <Link href="/services" className="hover:text-teal-600 text-gray-700 transition">خدمات</Link>
                <Link href="/assessments" className="hover:text-teal-600 text-gray-700 transition">تست‌ها</Link>
                <Link href="/about" className="hover:text-teal-600 text-gray-700 transition">درباره</Link>
              </nav>
              <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
