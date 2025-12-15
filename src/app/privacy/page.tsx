"use client"

import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-teal-700 mb-2 font-arabic">حریم خصوصی</h1>
                    <p className="text-gray-600 font-arabic">سیاست حریم خصوصی کلینیک روزنه</p>
                </div>

                {/* Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 font-arabic text-right space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۱. جمع‌آوری اطلاعات</h2>
                        <p className="text-gray-700 leading-relaxed">
                            ما اطلاعات شخصی شما را تنها برای اهداف ارائه خدمات مشاوره و درمانی جمع‌آوری می‌کنیم.
                            این اطلاعات شامل نام، ایمیل، شماره تلفن و سابقه پزشکی (در صورت لزوم) است.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۲. استفاده از اطلاعات</h2>
                        <p className="text-gray-700 leading-relaxed">
                            اطلاعات شما تنها برای اهداف زیر استفاده می‌شود:
                            <br />
                            • ارائه خدمات مشاوره و درمانی
                            <br />
                            • پشتیبانی مشتری
                            <br />
                            • بهبود خدمات پلتفرم
                            <br />
                            • ارسال اطلاعات مهم در مورد حسابتان
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۳. حفاظت اطلاعات</h2>
                        <p className="text-gray-700 leading-relaxed">
                            ما از تکنولوژی رمزگذاری و دیگر تدابیر امنیتی استفاده می‌کنیم
                            تا اطلاعات شخصی شما را در برابر دسترسی غیرمجاز محافظت کنیم.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۴. به‌اشتراک‌گذاری اطلاعات</h2>
                        <p className="text-gray-700 leading-relaxed">
                            ما اطلاعات شخصی شما را با اشخاص ثالث به‌اشتراک نمی‌گذاریم
                            مگر اینکه قانونی ما را مجاب کند یا برای ارائه خدمات لازم باشد.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۵. حق دسترسی و حذف</h2>
                        <p className="text-gray-700 leading-relaxed">
                            شما حق دارید:
                            <br />
                            • به اطلاعات شخصی‌تان دسترسی پیدا کنید
                            <br />
                            • اطلاعات نادرست را تصحیح کنید
                            <br />
                            • درخواست حذف حسابتان را کنید
                            <br />
                            برای انجام این کارها، لطفاً با ما تماس بگیرید.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۶. کوکی‌ها</h2>
                        <p className="text-gray-700 leading-relaxed">
                            پلتفرم ما از کوکی‌ها استفاده می‌کند تا تجربه کاربر را بهتر کند.
                            شما می‌توانید تنظیمات مرورگر خود را برای رد کوکی‌ها تغییر دهید.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۷. تغییرات سیاست</h2>
                        <p className="text-gray-700 leading-relaxed">
                            ما ممکن است این سیاست را هر زمان تغییر دهیم.
                            تغییرات از طریق وبسایت اطلاع داده خواهد شد.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-teal-700 mb-4">۸. تماس</h2>
                        <p className="text-gray-700 leading-relaxed">
                            اگر سؤالات یا نگرانی‌های شما درباره حریم خصوصی وجود دارد،
                            لطفاً از طریق ایمیل یا فرم تماس با ما در ارتباط باشید.
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
