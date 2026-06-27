"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import EditProfileModal from "@/components/EditProfileModal";
import PersianCalendar from "@/components/PersianCalendar";
import { getDisplayEmail, isPhoneOnlyEmail } from "@/lib/user-display";

interface User {
    user_id: string;
    name: string;
    email?: string | null;
    phone?: string;
    city?: string;
    address?: string;
    date_of_birth?: string;
    gender?: string;
    bio?: string;
    profile_picture?: string;
    registration_date?: string;
    profile_complete?: boolean;
    missing_fields?: string[];
    [key: string]: string | boolean | string[] | undefined | null;
}

interface Appointment {
    id: string;
    therapist: string;
    date: string;
    time: string;
    status: string;
    type: string;
}

interface Test {
    id: string;
    name: string;
    date: string;
    result: string;
    status: string;
}

export default function UserDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get user_id or email from localStorage (set during login)
                const user_id = localStorage.getItem('user_id');
                const phone = localStorage.getItem('phone');
                const storedEmail = localStorage.getItem('email');
                const email = storedEmail && !isPhoneOnlyEmail(storedEmail) ? storedEmail : null;

                if (storedEmail && isPhoneOnlyEmail(storedEmail)) {
                    localStorage.removeItem('email');
                }

                if (!user_id && !phone && !email) {
                    setError('لطفا ابتدا وارد حساب کاربری شوید');
                    window.location.href = '/login';
                    return;
                }

                console.log('[Dashboard] Fetching user data:', { user_id, email });

                // Fetch user profile
                const profileUrl = new URL('/api/auth/user-profile', window.location.origin);
                if (user_id) profileUrl.searchParams.append('user_id', user_id);
                if (phone) profileUrl.searchParams.append('phone', phone);
                if (email) profileUrl.searchParams.append('email', email);

                const profileResponse = await fetch(profileUrl.toString());
                if (!profileResponse.ok) {
                    throw new Error('خطا در بارگذاری اطلاعات کاربر');
                }

                const profileData = await profileResponse.json();
                if (!profileData.success || !profileData.user) {
                    throw new Error('اطلاعات کاربر یافت نشد');
                }

                console.log('[Dashboard] User data loaded:', profileData.user);
                setUser(profileData.user);

                if (!profileData.user.email) {
                    localStorage.removeItem('email');
                }

                // TODO: Fetch appointments from database when appointments API is ready
                // For now, show empty array
                setAppointments([]);

                // TODO: Fetch test results from database when assessments API is ready
                // For now, show empty array
                setTests([]);
            } catch (err) {
                console.error('[Dashboard] Error:', err);
                setError(err instanceof Error ? err.message : 'خطای نامشخص');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const displayField = (value?: string | null) => {
        if (!value || !value.trim()) return '';
        return value;
    };

    const getGenderLabel = (gender?: string) => {
        switch (gender) {
            case 'male': return 'مرد';
            case 'female': return 'زن';
            case 'other': return 'سایر';
            default: return '';
        }
    };

    const missingFieldLabels: Record<string, string> = {
        email: 'ایمیل',
        city: 'شهر',
        address: 'آدرس',
        date_of_birth: 'تاریخ تولد',
        gender: 'جنسیت',
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed': return 'تایید شده';
            case 'completed': return 'انجام شده';
            case 'cancelled': return 'لغو شده';
            default: return 'نامشخص';
        }
    };

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

    if (error) {
        return (
            <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Link href="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        بازگشت به صفحه ورود
                    </Link>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">اطلاعات کاربر بارگذاری نشد</p>
                    <Link href="/login" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                        بازگشت به صفحه ورود
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <div className="relative">
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

                        {/* Logout Button */}
                        <button
                            onClick={() => {
                                localStorage.removeItem('user_id');
                                localStorage.removeItem('email');
                                localStorage.removeItem('phone');
                                localStorage.removeItem('name');
                                localStorage.removeItem('userType');
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
                            داشبورد کاربری
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            خوش آمدید {user?.name || 'کاربر'} - مدیریت نوبت‌ها، آزمون‌ها و پروفایل شخصی
                        </p>
                    </div>
                </section>

                <div className="px-6">
                    {/* Stats Cards */}
                    <section dir="rtl" className="mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">{appointments.length}</div>
                                <div className="text-gray-600 text-sm">نوبت‌های رزرو شده</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">{tests.length}</div>
                                <div className="text-gray-600 text-sm">آزمون‌های انجام شده</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">0</div>
                                <div className="text-gray-600 text-sm">نوبت آینده</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-teal-700 mb-2">-</div>
                                <div className="text-gray-600 text-sm">رضایت کلی</div>
                            </div>
                        </div>
                    </section>

                    {/* Profile completion prompt */}
                    {!user.profile_complete && (user.missing_fields?.length ?? 0) > 0 && (
                        <section dir="rtl" className="mb-6">
                            <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-amber-800 mb-1">پروفایل شما ناقص است</h3>
                                    <p className="text-sm text-amber-700">
                                        می‌توانید اطلاعات زیر را بعدا تکمیل کنید:{' '}
                                        {(user.missing_fields || [])
                                            .map((field) => missingFieldLabels[field] || field)
                                            .join('، ')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="shrink-0 bg-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm"
                                >
                                    تکمیل اطلاعات
                                </button>
                            </div>
                        </section>
                    )}

                    {/* Profile and Quick Actions */}
                    <section dir="rtl" className="mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Profile Section */}
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-teal-700 mb-6">اطلاعات پروفایل</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">نام:</span>
                                        <span className="font-medium text-gray-700 text-left">{displayField(user.name)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">شماره موبایل:</span>
                                        <span className="font-medium text-gray-700" dir="ltr">{displayField(user.phone)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">ایمیل:</span>
                                        <span className="font-medium text-gray-700 text-left" dir="ltr">{displayField(getDisplayEmail(user.email) ?? undefined)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">شهر:</span>
                                        <span className="font-medium text-gray-700 text-left">{displayField(user.city)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">آدرس:</span>
                                        <span className="font-medium text-gray-700 text-left">{displayField(user.address)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">جنسیت:</span>
                                        <span className="font-medium text-gray-700">{getGenderLabel(user.gender)}</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">تاریخ تولد:</span>
                                        <span className="font-medium text-gray-700">
                                            {user.date_of_birth
                                                ? new Date(user.date_of_birth).toLocaleDateString('fa-IR')
                                                : ''
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-500 shrink-0">تاریخ عضویت:</span>
                                        <span className="font-medium text-gray-700">
                                            {user.registration_date
                                                ? new Date(user.registration_date).toLocaleDateString('fa-IR')
                                                : ''
                                            }
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="w-full mt-6 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm"
                                >
                                    {user.profile_complete ? 'ویرایش پروفایل' : 'تکمیل / ویرایش اطلاعات'}
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-teal-700 mb-6">عملیات سریع</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/book-appointment" className="bg-teal-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center text-sm shadow-sm">
                                        رزرو نوبت جدید
                                    </Link>
                                    <Link href="/assessments" className="bg-blue-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm shadow-sm">
                                        انجام آزمون
                                    </Link>
                                    <Link href="/chat-support" className="bg-green-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center text-sm shadow-sm">
                                        مشاوره فوری
                                    </Link>
                                    <Link href="/therapists" className="bg-purple-600/80 backdrop-blur-sm text-white p-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center text-sm shadow-sm">
                                        مشاهده مشاوران
                                    </Link>
                                </div>
                            </div>

                            {/* Persian Calendar */}
                            <div className="mt-4 lg:mt-0">
                                <PersianCalendar />
                            </div>
                        </div>
                    </section>

                    {/* Appointments */}
                    <section dir="rtl" className="mb-8">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-teal-700 mb-6">نوبت‌های شما</h2>
                            {appointments.length === 0 ? (
                                <p className="text-gray-600 text-center py-8">هنوز نوبتی رزرو نشده است</p>
                            ) : (
                                <div className="space-y-4">
                                    {appointments.map((appointment) => (
                                        <div key={appointment.id} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg p-4 shadow-sm">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800">{appointment.therapist}</h3>
                                                    <p className="text-gray-600 text-sm">{appointment.type}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-600">تاریخ</div>
                                                        <div className="font-medium">{appointment.date}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-600">ساعت</div>
                                                        <div className="font-medium">{appointment.time}</div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                                        {getStatusText(appointment.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Test Results */}
                    <section dir="rtl" className="mb-8">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-teal-700 mb-6">نتایج آزمون‌ها</h2>
                            {tests.length === 0 ? (
                                <p className="text-gray-600 text-center py-8">هنوز آزمونی انجام نشده است</p>
                            ) : (
                                <div className="space-y-4">
                                    {tests.map((test) => (
                                        <div key={test.id} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg p-4 shadow-sm">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800">{test.name}</h3>
                                                    <p className="text-gray-600 text-sm">تاریخ انجام: {test.date}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <div className="text-sm text-gray-600">نتیجه</div>
                                                        <div className="font-medium">{test.result}</div>
                                                    </div>
                                                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-sm shadow-sm">
                                                        مشاهده جزئیات
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                <Link href="/contact-us" className="hover:text-teal-600 text-gray-700 transition">تماس</Link>
                            </nav>
                            <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                user={user}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={(updatedUser) => setUser(updatedUser)}
            />
        </div>
    );
}