"use client"

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
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
        const newErrors: any = {};

        if (!formData.email.trim()) {
            newErrors.email = 'ایمیل اجباری است';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'فرمت ایمیل صحیح نیست';
        }
        if (!formData.password) {
            newErrors.password = 'رمز عبور اجباری است';
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
            // Here you would typically make an API call to authenticate the user
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

            // Redirect to dashboard after successful login
            window.location.href = '/dashboard';
        } catch (error) {
            alert('ایمیل یا رمز عبور اشتباه است');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Rozaneh Logo" className="w-16 h-16 object-contain mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-teal-700">کلینیک روزنه</h1>
                    <p className="text-gray-600 mt-2">ورود کاربر</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-sm mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label className="block text-right text-gray-700 font-medium mb-2">رمز عبور</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${errors.password ? 'border-red-500' : 'border-white/30'
                                    }`}
                                placeholder="رمز عبور خود را وارد کنید"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex justify-between items-center">
                            <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                                رمز عبور را فراموش کرده‌اید؟
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'در حال ورود...' : 'ورود'}
                        </button>
                    </form>
                </div>

                {/* Links */}
                <div className="text-center space-y-3">
                    <p className="text-gray-700">
                        حساب کاربری ندارید؟{" "}
                        <Link href="/register" className="text-teal-600 font-medium hover:underline">
                            ثبت نام
                        </Link>
                    </p>
                    <p className="text-gray-700">
                        مشاور هستید؟{" "}
                        <Link href="/therapist-login" className="text-teal-600 font-medium hover:underline">
                            ورود مشاور
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
