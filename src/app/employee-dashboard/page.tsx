"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

export default function EmployeeDashboard() {
    const [user, setUser] = useState<{ name: string | null; email: string | null; user_id: string | null } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userType = localStorage.getItem('userType');
        if (userType !== 'employee') {
            window.location.href = '/login';
            return;
        }

        setUser({
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            user_id: localStorage.getItem('user_id'),
        });
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">درحال بارگذاری...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <div className="relative">
                {/* Header */}
                <div className="w-full pt-8 px-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm">
                            بازگشت به صفحه اصلی
                        </Link>

                        <div className="text-center">
                            <img src="/logo.svg" alt="Rozaneh Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain mx-auto" />
                            <h1 className="font-bold text-teal-700 mt-1 text-sm md:text-base">کلینیک روزنه</h1>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                            }}
                            className="bg-red-500/80 backdrop-blur-sm border border-red-300/30 text-white font-light px-4 py-2 rounded-lg transition-all duration-300 hover:bg-red-600/90 hover:scale-105 shadow-sm text-sm"
                        >
                            خروج
                        </button>
                    </div>
                </div>

                {/* Hero Section */}
                <section dir="rtl" className="pt-8 pb-8 px-6">
                    <div className="text-right">
                        <h1 className="font-bold text-teal-700 mb-3 leading-tight text-2xl md:text-3xl">
                            پنل کارمند
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            خوش آمدید {user?.name || 'کارمند'} - مدیریت کارها، گزارشات و اطلاعات شخصی
                        </p>
                    </div>
                </section>

                <div className="px-6">
                    {/* Stats Cards */}
                    <section dir="rtl" className="mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">0</div>
                                <div className="text-gray-600 text-sm">کارهای امروز</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">0</div>
                                <div className="text-gray-600 text-sm">پیام‌های جدید</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">0</div>
                                <div className="text-gray-600 text-sm">درخواست‌های جدید</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">-</div>
                                <div className="text-gray-600 text-sm">عملکرد ماه</div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section dir="rtl" className="mb-8">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-teal-700 mb-6">عملیات سریع</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <Link href="/employee/tasks" className="bg-teal-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center text-sm shadow-sm">
                                    مدیریت کارها
                                </Link>
                                <Link href="/employee/messages" className="bg-blue-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm shadow-sm">
                                    پیام‌ها
                                </Link>
                                <Link href="/employee/reports" className="bg-green-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center text-sm shadow-sm">
                                    گزارشات
                                </Link>
                                <Link href="/employee/schedule" className="bg-purple-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center text-sm shadow-sm">
                                    برنامه کاری
                                </Link>
                                <Link href="/employee/profile" className="bg-orange-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center text-sm shadow-sm">
                                    پروفایل شخصی
                                </Link>
                                <Link href="/employee/help" className="bg-indigo-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center text-sm shadow-sm">
                                    راهنما
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Today's Tasks */}
                    <section dir="rtl" className="mb-8">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-teal-700 mb-6">کارهای امروز</h2>
                            <p className="text-gray-600 text-center py-8">هیچ کاری برای امروز تعریف نشده است</p>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="w-full py-4 px-6 mt-4 pb-20">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm flex flex-col items-center gap-3 px-4 py-4">
                            <div className="flex items-center gap-2">
                                <img src="/logo.svg" alt="Rozaneh Logo" className="w-8 h-8" />
                                <span className="text-sm font-bold text-gray-800">کلینیک روانشناسی روزنه</span>
                            </div>
                            <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}