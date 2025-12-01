"use client"

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('ایمیل اجباری است');
            return;
        }

        if (!validateEmail(email)) {
            setError('فرمت ایمیل صحیح نیست');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            // Here you would typically make an API call to send reset email
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            setIsSubmitted(true);
        } catch (error) {
            setError('خطا در ارسال ایمیل. لطفا دوباره تلاش کنید');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <img src="/logo.svg" alt="Rozaneh Logo" className="w-16 h-16 object-contain mx-auto mb-2" />
                        <h1 className="text-3xl font-bold text-teal-700">کلینیک روزنه</h1>
                    </div>

                    {/* Success Message */}
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-sm mb-6 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-3">ایمیل ارسال شد</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            لینک بازیابی رمز عبور به ایمیل {email} ارسال شد. لطفا صندوق ورودی خود را بررسی کنید.
                        </p>
                        <p className="text-sm text-gray-500">
                            ایمیل را دریافت نکردید؟ پوشه اسپم خود را نیز بررسی کنید.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="text-center space-y-3">
                        <Link href="/login" className="block text-teal-600 font-medium hover:underline">
                            بازگشت به صفحه ورود
                        </Link>
                        <Link href="/" className="block text-teal-600 font-medium hover:underline">
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Rozaneh Logo" className="w-16 h-16 object-contain mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-teal-700">کلینیک روزنه</h1>
                    <p className="text-gray-600 mt-2">بازیابی رمز عبور</p>
                </div>

                {/* Reset Form */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-sm mb-6">
                    <p className="text-gray-700 mb-6 text-center leading-relaxed">
                        ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">ایمیل</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition ${error ? 'border-red-500' : 'border-white/30'
                                    }`}
                                placeholder="ایمیل خود را وارد کنید"
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
                        </button>
                    </form>
                </div>

                {/* Links */}
                <div className="text-center space-y-3">
                    <Link href="/login" className="block text-teal-600 font-medium hover:underline">
                        بازگشت به صفحه ورود
                    </Link>
                    <Link href="/" className="block text-teal-600 font-medium hover:underline">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    );
}