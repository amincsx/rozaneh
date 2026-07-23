"use client";

import Link from "next/link";
import { Metadata } from "next";

// Note: Since this is a client component, metadata should be moved to layout.tsx or a server component wrapper

export default function ServicesPage() {
    const services = [
        {
            title: "مشاوره فردی",
            description: "مشاوره روان‌شناختی برای رفع مشکلات شخصی، افسردگی، اضطراب و غیره",
            category: "مشاوره",
            image: "/services svg/مشاوره فردی.svg"
        },
        {
            title: "مشاوره خانوادگی",
            description: "حل تعارضات خانوادگی و بهبود روابط بین اعضای خانواده",
            category: "خانواده",
            image: "/services svg/مشاوره خانوادگی.svg"
        },
        {
            title: "مشاوره پیش از ازدواج",
            description: "آمادگی برای زندگی مشترک و حل مسائل پیش از ازدواج",
            category: "ازدواج",
            image: "/services svg/مشاوره پیش از ازدواج.svg"
        },
        {
            title: "زوج درمانی",
            description: "بهبود روابط زناشویی و حل تعارضات میان زوجین",
            category: "زندگی مشترک",
            image: "/services svg/زوج درمانی.svg"
        },
        {
            title: "مشاوره شغلی",
            description: "راهنمایی برای انتخاب شغل مناسب و توسعه شغلی",
            category: "شغل",
            image: "/services svg/مشاوره شغلی.svg",
            href: "/services/job-counseling"
        },
        {
            title: "مشاوره تحصیلی",
            description: "کمک به دانش‌آموزان برای بهبود عملکرد تحصیلی و انتخاب رشته",
            category: "تحصیل",
            image: "/services svg/مشاوره تحصیلی.svg"
        },
        {
            title: "درمان رفتاری شناختی",
            description: "درمان اختلالات روانی با استفاده از روش‌های شناختی رفتاری",
            category: "درمان",
            image: "/services svg/درمان رفتاری شناختی.svg"
        },
        {
            title: "مشاوره نوجوانان",
            description: "حل مشکلات دوران نوجوانی و بهبود تطابق اجتماعی",
            category: "نوجوان",
            image: "/services svg/مشاوره نوجوانان.svg"
        },
        {
            title: "مشاوره کودکان",
            description: "درمان مشکلات رفتاری و عاطفی کودکان",
            category: "کودک",
            image: "/services svg/مشاوره کودکان.svg"
        }
    ];

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <div className="relative">
                {/* SVG - Absolute positioned on left */}
                <div className="hidden lg:flex items-start justify-center pt-8 px-4 absolute left-0 -top-35 h-screen w-1/2">
                    <img
                        src="/services 1.svg"
                        alt="Services"
                        className="w-full h-150 max-w-sm object-contain scale-70"
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
                    <section dir="rtl" className="pt-4 pb-4 px-6">
                        <div className="text-right">
                            <h1 className="font-bold text-teal-700 mb-3 leading-tight text-2xl md:text-3xl">
                                خدمات روانشناسی و مشاوره
                            </h1>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                مجموعه جامع خدمات روانشناختی و مشاوره‌ای برای تمام سنین و نیازهای زندگی شما
                            </p>
                        </div>
                    </section>

                    {/* Spacer reduced for mobile, larger for desktop */}
                    <section className="py-8 lg:py-24"></section>

                    {/* Services Grid - Section 1 */}
                    <section dir="rtl" className="px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {services.slice(0, 2).map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                >
                                    {service.image && (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-80 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform"
                                        />
                                    )}
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-teal-700 flex-1">
                                            {service.title}
                                        </h3>
                                        <span className="text-xs text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full ml-3 whitespace-nowrap">
                                            {service.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Services Grid - Section 2 */}
                    <section dir="rtl" className="py-4 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {services.slice(2, 4).map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                >
                                    {service.image && (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-80 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform"
                                        />
                                    )}
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-2xl font-bold text-teal-700 flex-1">
                                            {service.title}
                                        </h3>
                                        <span className="text-xs text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                                            {service.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-xl leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Services Grid - Section 3 */}
                    <section dir="rtl" className="py-4 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.slice(4).map((service, index) => {
                                const card = (
                                    <div
                                        className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                    >
                                        {service.image && (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-80 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform"
                                            />
                                        )}
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="text-2xl font-bold text-teal-700 flex-1">
                                                {service.title}
                                            </h3>
                                            <span className="text-xs text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                                                {service.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-xl leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                )

                                return service.href ? (
                                    <Link key={index} href={service.href} className="block">
                                        {card}
                                    </Link>
                                ) : (
                                    <div key={index}>{card}</div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section dir="rtl" className="py-8 px-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-teal-700 text-center mb-8">چرا ما را انتخاب کنید؟</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: "🎓", title: "متخصصین مجرب", desc: "روانشناسان و مشاوران با تجربه بسیار" },
                                    { icon: "🔒", title: "محرمانگی", desc: "محفوظیت کامل اطلاعات شما" },
                                    { icon: "⏰", title: "انعطاف پذیری", desc: "زمان‌های مناسب برای شما" },
                                    { icon: "💚", title: "پشتیبانی کامل", desc: "حمایت در تمام مراحل درمان" }
                                ].map((item, index) => (
                                    <div key={index} className="text-center p-3">
                                        <div className="text-3xl mx-auto mb-2">{item.icon}</div>
                                        <h3 className="text-sm font-bold text-teal-700 mb-1">{item.title}</h3>
                                        <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section dir="rtl" className="py-8 px-6">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 text-center shadow-sm">
                            <h2 className="text-lg md:text-xl font-bold text-teal-700 mb-3">آماده شروع مشاوره هستید؟</h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                درخواست کنید و در اسرع وقت یکی از متخصصین ما با شما تماس خواهد گرفت.
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
                                <Link href="/assessments" className="hover:text-teal-600 text-gray-700 transition">تست‌ها</Link>
                                <Link href="/about" className="hover:text-teal-600 text-gray-700 transition">درباره</Link>
                                <Link href="/contact-us" className="hover:text-teal-600 text-gray-700 transition">تماس</Link>
                            </nav>
                            <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
