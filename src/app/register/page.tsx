"use client"

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'نام اجباری است';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'نام خانوادگی اجباری است';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'ایمیل اجباری است';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'فرمت ایمیل صحیح نیست';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'شماره موبایل اجباری است';
        } else if (!/^09\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد';
        }
        if (!formData.password) {
            newErrors.password = 'رمز عبور اجباری است';
        } else if (formData.password.length < 8) {
            newErrors.password = 'رمز عبور باید حداقل 8 کاراکتر باشد';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'تکرار رمز عبور مطابقت ندارد';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Here you would typically make an API call to register the user
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

            // Redirect to dashboard after successful registration
            window.location.href = '/dashboard';
        } catch (error: unknown) {
            console.error(error);
            alert('خطا در ثبت نام. لطفا دوباره تلاش کنید');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Rozaneh Logo" className="w-16 h-16 object-contain mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-teal-700">کلینیک روزنه</h1>
                    <p className="text-gray-600 mt-2">ثبت نام کاربر جدید</p>
                </div>

                {/* Register Form */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-sm mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-right text-gray-700 font-medium mb-2">نام</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.firstName ? 'border-red-500' : 'border-white/30'
                                        }`}
                                    placeholder="نام"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-right text-gray-700 font-medium mb-2">نام خانوادگی</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.lastName ? 'border-red-500' : 'border-white/30'
                                        }`}
                                    placeholder="نام خانوادگی"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">ایمیل</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.email ? 'border-red-500' : 'border-white/30'
                                    }`}
                                placeholder="ایمیل خود را وارد کنید"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">شماره موبایل</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.phone ? 'border-red-500' : 'border-white/30'
                                    }`}
                                placeholder="09123456789"
                                dir="ltr"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">رمز عبور</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.password ? 'border-red-500' : 'border-white/30'
                                    }`}
                                placeholder="حداقل 8 کاراکتر"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">تکرار رمز عبور</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.confirmPassword ? 'border-red-500' : 'border-white/30'
                                    }`}
                                placeholder="رمز عبور را دوباره وارد کنید"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'در حال ثبت نام...' : 'ثبت نام'}
                        </button>
                    </form>
                </div>

                {/* Links */}
                <div className="text-center space-y-3">
                    <p className="text-gray-700">
                        قبلا ثبت نام کرده‌اید؟{" "}
                        <Link href="/login" className="text-teal-600 font-medium hover:underline">
                            ورود
                        </Link>
                    </p>
                    <Link href="/" className="block text-teal-600 font-medium hover:underline">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    );
}