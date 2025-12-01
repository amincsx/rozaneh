import Link from "next/link";

export default async function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const assessmentId = id;

    // Sample questions for different tests
    const testQuestions: Record<string, Array<{ question: string; options: string[] }>> = {
        "0": [
            { question: "سؤال ۱: کدام شکل بعدی در الگو است؟", options: ["الف", "ب", "ج", "د"] },
            { question: "سؤال ۲: مجموع این اعداد چقدر است؟", options: ["۱۰", "۱۵", "۲۰", "۲۵"] },
            { question: "سؤال ۳: این کلمه چه معنایی دارد؟", options: ["معنی ۱", "معنی ۲", "معنی ۳", "معنی ۴"] }
        ],
        "2": [
            { question: "آیا شما انجام‌دهنده یا تفکیرکننده هستید؟", options: ["انجام‌دهنده", "تفکیرکننده"] },
            { question: "آیا شما درون‌گرا یا برون‌گرا هستید؟", options: ["درون‌گرا", "برون‌گرا"] },
            { question: "آیا شما به جزئیات یا کلیات توجه می‌کنید؟", options: ["جزئیات", "کلیات"] }
        ]
    };

    const questions = testQuestions[assessmentId] || [];

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

                {/* Main Content */}
                <div className="w-full max-w-4xl mx-auto px-6 py-12">
                    {/* Instructions */}
                    <section dir="rtl" className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 mb-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">شروع آزمون</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            لطفاً به هر سؤال با دقت پاسخ دهید. این آزمون برای ارزیابی شخصیتی شما طراحی شده است.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            زمان: بدون محدودیت | تعداد سؤالات: {questions.length}
                        </p>
                    </section>

                    {/* Questions */}
                    <section dir="rtl" className="space-y-6">
                        {questions.map((q, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-teal-700 mb-4">{q.question}</h3>
                                <div className="space-y-3">
                                    {q.options.map((option: string, optIndex: number) => (
                                        <label key={optIndex} className="flex items-center p-3 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-all">
                                            <input type="radio" name={`q${index}`} value={option} className="ml-3" />
                                            <span className="text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Actions */}
                    <section dir="rtl" className="mt-8 flex flex-col gap-3">
                        <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm">
                            ارسال آزمون
                        </button>
                        <p className="text-center text-gray-600 text-sm">
                            برای شرکت در آزمون، لطفاً <Link href="/login" className="text-teal-600 font-medium hover:underline">وارد شوید</Link>
                        </p>
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
