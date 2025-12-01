"use client"

import { useState } from "react"
import { Phone, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function ChatSupportPage() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Validate phone number
        if (!phoneNumber || phoneNumber.length < 10) {
            setError("لطفاً یک شماره تلفن معتبر وارد کنید")
            setLoading(false)
            return
        }

        try {
            // Send phone number to admin dashboard (mock API call)
            const response = await fetch("/api/quick-consultation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber }),
            })

            if (response.ok) {
                setSubmitted(true)
                setPhoneNumber("")
            } else {
                setError("خطایی رخ داد. لطفاً دوباره تلاش کنید")
            }
        } catch (err) {
            setError("خطایی رخ داد. لطفاً دوباره تلاش کنید")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <Navbar textColor="gray" />

            <div className="container mx-auto px-4 py-16 max-w-2xl">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-arabic"
                >
                    <ArrowLeft className="w-5 h-5" />
                    بازگشت به صفحه اصلی
                </Link>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
                    {!submitted ? (
                        <>
                            {/* Header */}
                            <div dir="rtl" className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <Phone className="w-16 h-16 text-teal-600" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-arabic">
                                    مشاوره فوری
                                </h1>
                                <p className="text-gray-600 font-arabic text-lg">
                                    شماره تلفن خود را وارد کنید و ما در اسرع وقت با شما تماس خواهیم گرفت
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">
                                        شماره تلفن همراه
                                    </label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="مثال: 09123456789"
                                        className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 font-arabic"
                                    />
                                    <p className="text-gray-500 text-sm mt-2 font-arabic">
                                        شماره تلفن خود را با کد کشور ایران وارد کنید
                                    </p>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 font-arabic text-sm">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 font-arabic text-lg"
                                >
                                    {loading ? "در حال ارسال..." : "درخواست مشاوره فوری"}
                                </button>

                                <p className="text-center text-gray-600 text-sm font-arabic">
                                    اطلاعات شما محفوظ و امن است
                                </p>
                            </form>
                        </>
                    ) : (
                        <>
                            {/* Success Message */}
                            <div dir="rtl" className="text-center py-12">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-green-100 rounded-full p-4">
                                        <CheckCircle className="w-16 h-16 text-green-600" />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">
                                    درخواست شما ثبت شد
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 font-arabic">
                                    بزودی یکی از مشاورین ما با شما تماس خواهند گرفت
                                </p>
                                <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 mb-8">
                                    <p className="text-gray-700 font-arabic mb-2">
                                        شماره تلفنی که ثبت کردید:
                                    </p>
                                    <p className="text-2xl font-bold text-teal-600 font-arabic">
                                        {phoneNumber}
                                    </p>
                                </div>
                                <Link
                                    href="/"
                                    className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-arabic font-semibold"
                                >
                                    بازگشت به صفحه اصلی
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Info Section */}
                {!submitted && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 text-center">
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="font-semibold text-gray-900 mb-2 font-arabic">
                                پاسخ سریع
                            </h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                در کمتر از ۲۴ ساعت
                            </p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 text-center">
                            <div className="text-4xl mb-3">🔒</div>
                            <h3 className="font-semibold text-gray-900 mb-2 font-arabic">
                                محرمانگی
                            </h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                اطلاعات شما کاملاً محفوظ
                            </p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 text-center">
                            <div className="text-4xl mb-3">👥</div>
                            <h3 className="font-semibold text-gray-900 mb-2 font-arabic">
                                متخصصین
                            </h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                مشاوران باتجربه
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
