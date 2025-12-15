import Link from "next/link";

export default async function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const assessmentId = id;

    const assessments = [
        { title: "آزمون وکسلر هوش کودکان (WISC-V)" },
        { title: "آزمون میلون (MCMI-IV)" },
        { title: "آزمون MBTI" },
        { title: "آزمون رورشاخ (Rorschach)" },
        { title: "آزمون MMPI-2" },
        { title: "آزمون TAT" },
        { title: "آزمون NEO-PI-R" },
        { title: "آزمون SCL-90-R" },
        { title: "آزمون بک (BDI-II / BAI)" }
    ];

    const currentAssessment = assessments[parseInt(assessmentId)] || assessments[0];

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <div className="relative">
                {/* Header */}
                <div className="w-full pt-8 px-6">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        {/* Back Button */}
                        <Link href="/assessments" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm">
                            بازگشت
                        </Link>

                        {/* Logo */}
                        <div className="text-center">
                            <img src="/logo.svg" alt="Rozaneh Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain mx-auto" />
                            <h1 className="font-bold text-teal-700 mt-1 text-sm md:text-base">کلینیک روزنه</h1>
                        </div>
                    </div>
                </div>

                {/* Main Content - Coming Soon */}
                <div className="w-full max-w-4xl mx-auto px-6 py-16 flex items-center justify-center min-h-[70vh]">
                    <section dir="rtl" className="text-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-12 shadow-sm max-w-md">
                        <div className="mb-8">
                            <svg className="w-24 h-24 mx-auto text-teal-600 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">به زودی در دسترس</h2>
                        <h3 className="text-lg font-semibold text-teal-600 mb-6">{currentAssessment.title}</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            این آزمون در حال تدارک است. لطفا برای آزمون‌های فعال بخش آزمون‌های روانشناختی را ملاحظه کنید یا با مشاوران ما تماس بگیرید.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/book-appointment"
                                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
                            >
                                رزرو نوبت ارزیابی
                            </Link>
                            <Link
                                href="/assessments"
                                className="bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-white/40 transition-colors"
                            >
                                بازگشت به لیست آزمون‌ها
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className="w-full py-4 px-6 mt-8">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm max-w-4xl mx-auto flex flex-col items-center gap-3 px-4 py-4">
                        <div className="flex items-center gap-2">
                            <img src="/logo.svg" alt="Rozaneh Logo" className="w-8 h-8" />
                            <span className="text-sm font-bold text-gray-800">کلینیک روانشناسی روزنه</span>
                        </div>
                        <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
