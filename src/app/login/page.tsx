"use client"

import Link from "next/link";
import { useState } from "react";
import { isPhoneOnlyEmail } from "@/lib/user-display";

export default function LoginPage() {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    // Validate phone number
    const validatePhoneNumber = () => {
        const newErrors: Record<string, string> = {};
        const cleanedPhone = phoneNumber.replace(/\D/g, '');

        if (!cleanedPhone) {
            newErrors.phone = 'شماره تلفن اجباری است';
        } else if (!/^(?:0\d{10}|9\d{9})$/.test(cleanedPhone)) {
            newErrors.phone = 'شماره تلفن باید 11 رقمی با 0 شروع شود یا 10 رقمی با 9 شروع شود';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate OTP
    const validateOtp = () => {
        const newErrors: Record<string, string> = {};

        if (!otp.trim()) {
            newErrors.otp = 'کد تایید اجباری است';
        } else if (!/^\d{4,6}$/.test(otp)) {
            newErrors.otp = 'کد تایید باید 4 تا 6 رقم باشد';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const normalizePhoneInput = (phone: string) => {
        const digits = phone.replace(/\D/g, '')
        if (digits.startsWith('98')) return `0${digits.slice(2)}`
        if (digits.startsWith('0')) return digits.slice(0, 11)
        return `0${digits.slice(-10)}`
    }

    // Handle sending OTP
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePhoneNumber()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const normalizedPhone = normalizePhoneInput(phoneNumber)

            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: normalizedPhone })
            });

            if (response.ok) {
                setPhoneNumber(normalizedPhone)
                setStep('otp');
                setOtpSent(true);
                setResendTimer(60);
                setErrors({});

                // Countdown timer
                const interval = setInterval(() => {
                    setResendTimer(prev => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                const data = await response.json();
                setErrors({ phone: data.message || 'خطا در ارسال کد' });
            }
        } catch (error: unknown) {
            console.error(error);
            setErrors({ phone: 'خطا در ارسال کد. دوباره تلاش کنید' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateOtp()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, otp, mode: 'login' })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.user?.user_id) {
                    localStorage.setItem('user_id', data.user.user_id);
                    localStorage.setItem('name', data.user.name || '');
                    localStorage.setItem('phone', data.user.phone || phoneNumber);
                    if (data.user?.email && !isPhoneOnlyEmail(data.user.email)) {
                        localStorage.setItem('email', data.user.email);
                    } else {
                        localStorage.removeItem('email');
                    }
                    localStorage.setItem('userType', data.user.userType || 'user');
                }

                const userType = data.user?.userType || 'user';
                if (userType === 'therapist') {
                    window.location.href = '/therapist-dashboard';
                } else if (userType === 'employee') {
                    window.location.href = '/employee-dashboard';
                } else {
                    window.location.href = '/dashboard';
                }
            } else {
                const data = await response.json();
                setErrors({ otp: data.message || 'کد تایید اشتباه است' });
            }
        } catch (error: unknown) {
            console.error(error);
            setErrors({ otp: 'خطا در تایید کد. دوباره تلاش کنید' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber })
            });

            if (response.ok) {
                setResendTimer(60);
                setErrors({});

                const interval = setInterval(() => {
                    setResendTimer(prev => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        } catch (error: unknown) {
            console.error(error);
            setErrors({ otp: 'خطا در ارسال کد مجدد' });
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
                    <p className="text-gray-600 mt-2">
                        {step === 'phone' ? 'ورود با شماره تلفن' : 'تایید کد'}
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-sm mb-6">
                    {step === 'phone' ? (
                        // Phone Number Step
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="block text-right text-gray-700 font-medium mb-2">
                                    شماره تلفن خود را وارد کنید
                                </label>
                                <div className="relative">

                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        dir="ltr"
                                        style={{ direction: 'ltr', textAlign: 'left' }}
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            // Remove leading 98 if present and keep only the last 10 digits
                                            const cleaned = value.replace(/^98/, '').slice(-11);
                                            setPhoneNumber(cleaned);
                                            if (errors.phone) {
                                                setErrors(prev => ({ ...prev, phone: '' }));
                                            }
                                        }}
                                        className={`w-full px-4 py-3 pr-16 border rounded-lg bg-white/50 text-left text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition text-lg ${errors.phone ? 'border-red-500' : 'border-white/30'
                                            }`}
                                        placeholder="09123456789"
                                        maxLength={12}

                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'درحال ارسال...' : 'ارسال کد تایید'}
                            </button>
                        </form>
                    ) : (
                        // OTP Step
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="text-center mb-6">
                                <p className="text-gray-700 text-sm">
                                    کد تایید برای <span className="font-medium">+98{phoneNumber}</span> ارسال شد
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep('phone');
                                        setOtp('');
                                        setErrors({});
                                    }}
                                    className="text-teal-600 text-sm hover:underline mt-2"
                                >
                                    تغییر شماره تلفن
                                </button>
                            </div>

                            <div>
                                <label className="block text-right text-gray-700 font-medium mb-2">
                                    کد تایید را وارد کنید
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setOtp(value.slice(0, 6));
                                        if (errors.otp) {
                                            setErrors(prev => ({ ...prev, otp: '' }));
                                        }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition text-2xl text-center tracking-widest font-mono ${errors.otp ? 'border-red-500' : 'border-white/30'
                                        }`}
                                    placeholder="------"
                                    maxLength={6}
                                    dir="ltr"
                                />
                                {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'درحال تایید...' : 'تایید کد'}
                            </button>

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0 || isSubmitting}
                                className="w-full text-teal-600 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {resendTimer > 0 ? `ارسال مجدد در ${resendTimer} ثانیه` : 'ارسال مجدد کد'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Links */}
                <div className="text-center space-y-3">
                    <p className="text-gray-700">
                        حساب کاربری ندارید؟{" "}
                        <Link href="/auth/signup" className="text-teal-600 font-medium hover:underline">
                            ثبت نام با شماره تلفن
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
