import Link from "next/link";

export default function TherapistDashboardPage() {
    // Sample user comments/feedback
    const userComments = [
        {
            id: 1,
            userName: "علی احمدی",
            testName: "آزمون MBTI",
            comment: "نتایج آزمون را می‌خواهم بفهمم",
            status: "منتظر پاسخ",
            date: "۱۴۰۲/۱۰/۱۵"
        },
        {
            id: 2,
            userName: "فاطمه محمدی",
            testName: "آزمون وکسلر",
            comment: "فرزندم نتوانست تمام سؤالات را انجام دهد",
            status: "پاسخ داده شده",
            date: "۱۴۰۲/۱۰/۱۴"
        },
        {
            id: 3,
            userName: "محمد حسنی",
            testName: "آزمون MMPI-2",
            comment: "زمان شرکت در آزمون را می‌خواهم تغییر دهم",
            status: "منتظر پاسخ",
            date: "۱۴۰۲/۱۰/۱۳"
        }
    ];

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            {/* Header */}
            <div className="bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-teal-700">پنل مشاور</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">دکتر احمدی</span>
                        <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-4 py-2 rounded-lg hover:bg-white/30 transition">
                            خروج
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/30">
                    <button className="px-6 py-3 font-medium text-teal-700 border-b-2 border-teal-700">نظرات و درخواست‌ها</button>
                    <button className="px-6 py-3 font-medium text-gray-600 hover:text-teal-700">نتایج آزمون‌ها</button>
                    <button className="px-6 py-3 font-medium text-gray-600 hover:text-teal-700">تنظیمات</button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 text-center shadow-sm">
                        <div className="text-3xl font-bold text-teal-700">۲۳</div>
                        <div className="text-gray-600 mt-2">کاربران فعال</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 text-center shadow-sm">
                        <div className="text-3xl font-bold text-teal-700">۱۵۰</div>
                        <div className="text-gray-600 mt-2">آزمون‌های انجام شده</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 text-center shadow-sm">
                        <div className="text-3xl font-bold text-orange-600">۳</div>
                        <div className="text-gray-600 mt-2">درخواست منتظر</div>
                    </div>
                </div>

                {/* Comments Section */}
                <div dir="rtl">
                    <h2 className="text-2xl font-bold text-teal-700 mb-6">نظرات و درخواست‌های کاربران</h2>
                    <div className="space-y-4">
                        {userComments.map((comment) => (
                            <div key={comment.id} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm hover:bg-white/30 transition">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{comment.userName}</h3>
                                        <p className="text-sm text-gray-600">{comment.testName}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${comment.status === "منتظر پاسخ" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                                        {comment.status}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4">{comment.comment}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{comment.date}</span>
                                    {comment.status === "منتظر پاسخ" && (
                                        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition">
                                            پاسخ دادن
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8">
                    <Link href="/" className="text-teal-600 font-medium hover:underline">
                        ← بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    );
}
