import Link from "next/link";

export default function AssessmentsPage() {
    const assessments = [
        {
            title: "آزمون وکسلر هوش کودکان (WISC-V)",
            description: "سنجش هوش کلی (IQ) در کودکان ۶ تا ۱۶ سال با دقت بالا",
            category: "هوش و استعداد",
            image: "/testes svg/wisc-v.svg"
        },
        {
            title: "آزمون میلون (MCMI-IV)",
            description: "ارزیابی اختلالات شخصیت و سندرم‌های بالینی",
            category: "شخصیت",
            image: "/testes svg/mcmi-iv.svg"
        },
        {
            title: "آزمون MBTI",
            description: "ارزیابی ۱۶ تیپ شخصیتی و راهنمای مشاوره شغلی",
            category: "شخصیت",
            image: "/testes svg/mbti.svg"
        },
        {
            title: "آزمون رورشاخ (Rorschach)",
            description: "کاوش ناخودآگاه و شناسایی الگوهای فکری پنهان",
            category: "فرافکنی",
            image: "/testes svg/rorschach.svg"
        },
        {
            title: "آزمون MMPI-2",
            description: "جامع‌ترین پرسشنامه شخصیت‌شناسی بالینی جهان",
            category: "بالینی",
            image: "/testes svg/mmpi-2.svg"
        },
        {
            title: "آزمون TAT",
            description: "شناسایی نیازها، انگیزه‌ها و تعارضات درونی",
            category: "فرافکنی",
            image: "/testes svg/TAT.svg"
        },
        {
            title: "آزمون NEO-PI-R",
            description: "ارزیابی پنج بعد اصلی شخصیت (Big Five)",
            category: "شخصیت",
            image: "/testes svg/NEO-Pi-R.svg"
        },
        {
            title: "آزمون SCL-90-R",
            description: "غربالگر ۹۰ علامتی برای سنجش علائم روانشناختی",
            category: "غربالگری",
            image: "/testes svg/Scl-90-r.svg"
        },
        {
            title: "آزمون بک (BDI-II / BAI)",
            description: "سنجش دقیق شدت افسردگی و اضطراب",
            category: "بالینی",
            image: "/testes svg/BDI-II BAI.svg"
        }
    ];

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <div className="relative">
                {/* SVG - Absolute positioned on left */}
                <div className="hidden lg:flex items-start justify-center pt-8 px-4 absolute left-0 top-0 h-screen w-1/2">
                    <img
                        src="/assesment.svg"
                        alt="Assessment"
                        className="w-full max-w-sm object-contain scale-100"
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
                                آزمون‌های روانشناختی تخصصی
                            </h1>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                معتبرترین و دقیق‌ترین آزمون‌های روانشناختی روز دنیا برای تشخیص دقیق، استعدادیابی و برنامه‌ریزی درمانی مؤثر.
                            </p>
                        </div>
                    </section>

                    {/* Spacer reduced for mobile, larger for desktop */}
                    <section className="py-8 lg:py-32"></section>

                    {/* Assessments Grid - Section 1 */}
                    <section dir="rtl" className="px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {assessments.slice(0, 2).map((assessment, index) => (
                                <Link
                                    key={index}
                                    href={`/assessments/${index}`}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full mb-3 w-fit">
                                            {assessment.category}
                                        </span>
                                        <div className="flex items-start gap-4 flex-row-reverse">
                                            {assessment.image && (
                                                <img
                                                    src={assessment.image}
                                                    alt={assessment.title}
                                                    className="w-24 h-24 object-contain rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-teal-700 mb-2">
                                                    {assessment.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {assessment.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Assessments Grid - Section 2 */}
                    <section dir="rtl" className="py-6 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {assessments.slice(2, 4).map((assessment, index) => (
                                <Link
                                    key={index}
                                    href={`/assessments/${index + 2}`}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full mb-3 w-fit">
                                            {assessment.category}
                                        </span>
                                        <div className="flex items-start gap-4 flex-row-reverse">
                                            {assessment.image && (
                                                <img
                                                    src={assessment.image}
                                                    alt={assessment.title}
                                                    className="w-24 h-24 object-contain rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-teal-700 mb-2">
                                                    {assessment.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {assessment.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Assessments Grid - Section 3 */}
                    <section dir="rtl" className="py-6 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {assessments.slice(4, 6).map((assessment, index) => (
                                <Link
                                    key={index}
                                    href={`/assessments/${index + 4}`}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full mb-3 w-fit">
                                            {assessment.category}
                                        </span>
                                        <div className="flex items-start gap-4 flex-row-reverse">
                                            {assessment.image && (
                                                <img
                                                    src={assessment.image}
                                                    alt={assessment.title}
                                                    className="w-24 h-24 object-contain rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-teal-700 mb-2">
                                                    {assessment.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {assessment.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Assessments Grid - Section 4 */}
                    <section dir="rtl" className="py-6 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {assessments.slice(6).map((assessment, index) => (
                                <Link
                                    key={index}
                                    href={`/assessments/${index + 6}`}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm hover:bg-white/30 hover:scale-[1.01] transition-all duration-300 cursor-pointer block group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm text-teal-600 font-medium bg-teal-50/50 px-2 py-1 rounded-full mb-3 w-fit">
                                            {assessment.category}
                                        </span>
                                        <div className="flex items-start gap-4 flex-row-reverse">
                                            {assessment.image && (
                                                <img
                                                    src={assessment.image}
                                                    alt={assessment.title}
                                                    className="w-24 h-24 object-contain rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-teal-700 mb-2">
                                                    {assessment.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {assessment.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* How it Works Section */}
                    <section dir="rtl" className="py-8 px-6">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-teal-700 text-center mb-8">مراحل انجام آزمون</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { step: "۱", title: "انتخاب آزمون", desc: "با مشاوره متخصص، آزمون مناسب انتخاب می‌شود" },
                                    { step: "۲", title: "رزرو نوبت", desc: "زمان مناسب برای انجام آزمون تعیین می‌شود" },
                                    { step: "۳", title: "اجرای آزمون", desc: "آزمون توسط روانشناس مجرب اجرا می‌شود" },
                                    { step: "۴", title: "تفسیر نتایج", desc: "گزارش کامل همراه با توضیحات ارائه می‌شود" }
                                ].map((item, index) => (
                                    <div key={index} className="text-center p-3">
                                        <div className="w-10 h-10 bg-white/30 backdrop-blur-sm border border-white/40 text-teal-700 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2 shadow-sm">
                                            {item.step}
                                        </div>
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
                            <h2 className="text-lg md:text-xl font-bold text-teal-700 mb-3">نیاز به مشاوره برای انتخاب آزمون دارید؟</h2>
                            <p className="text-gray-600 mb-6 text-sm">
                                متخصصین ما به شما کمک می‌کنند آزمون مناسب با نیازهایتان را انتخاب کنید.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/book-appointment"
                                    className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm text-sm"
                                >
                                    رزرو نوبت ارزیابی
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-white/40 transition-colors text-sm"
                                >
                                    مشاوره رایگان
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
