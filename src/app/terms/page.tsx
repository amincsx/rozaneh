"use client"

import Link from "next/link"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-teal-700 mb-2 font-arabic">شرایط و قوانین</h1>
                    <p className="text-gray-600 font-arabic">شرایط استفاده از پلتفرم کلینیک روزنه</p>
                </div>

                {/* Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 font-arabic text-right space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۱. تعاریف</h2>
                        <p className="text-gray-700 leading-relaxed">
                            "پلتفرم" به معنی وبسایت و برنامه کلینیک روزنه است که خدمات مشاوره و درمانی را ارائه می‌دهد.
                            "کاربر" هر فردی است که از خدمات پلتفرم استفاده می‌کند.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۲. شرایط استفاده</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>کاربران باید حداقل ۱۸ سال سن داشته باشند</li>
                            <li>اطلاعات درج شده باید صحیح و دقیق باشد</li>
                            <li>استفاده از پلتفرم برای اهداف نامشروع ممنوع است</li>
                            <li>کاربران مسئول حفاظت از رمز عبور خود هستند</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۳. خدمات</h2>
                        <p className="text-gray-700 leading-relaxed">
                            پلتفرم کلینیک روزنه خدمات مشاوره و درمانی را از طریق متخصصین مجاز ارائه می‌دهد.
                            خدمات به صورت آنلاین و بر اساس زمان‌بندی قبل‌تر انجام می‌شود.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۴. مسئولیت</h2>
                        <p className="text-gray-700 leading-relaxed">
                            کلینیک روزنه مسئول نیست برای:
                            <br />
                            • هرگونه خسارت ناشی از استفاده غیرمتوقع از پلتفرم
                            <br />
                            • نتایج یا نظرات ارائه شده توسط متخصصین
                            <br />
                            • اطلاعات شخصی کاربران که خارج از کنترل ما باشد
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۵. تغییرات</h2>
                        <p className="text-gray-700 leading-relaxed">
                            ما حق داریم این شرایط را هر زمان بدون اطلاع قبلی تغییر دهیم.
                            ادامه استفاده از پلتفرم به معنی پذیرش شرایط جدید است.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۶. تماس</h2>
                        <p className="text-gray-700 leading-relaxed">
                            برای هرگونه سؤال در مورد این شرایط، لطفاً از طریق صفحه تماس با ما در ارتباط باشید.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-200">
                        <p className="text-gray-600 text-sm">
                            آخرین به‌روزرسانی: دسامبر ۱۴۰۴
                        </p>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-8">
                    <Link
                        href="/auth/signup"
                        className="inline-block text-teal-600 hover:text-teal-700 font-medium font-arabic"
                    >
                        ← بازگشت
                    </Link>
                </div>
            </div>
        </div>
    )
}
