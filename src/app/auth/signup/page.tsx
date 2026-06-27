"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Phone } from "lucide-react"
import { isPhoneOnlyEmail } from "@/lib/user-display"

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    })
    const [otp, setOtp] = useState("")
    const [step, setStep] = useState<"form" | "otp">("form")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const validateForm = (): string | false => {
        if (!formData.name.trim()) {
            setError("نام و نام خانوادگی الزامی است")
            return false
        }

        const cleanedPhone = formData.phone.replace(/\D/g, "")
        if (!cleanedPhone) {
            setError("شماره تلفن الزامی است")
            return false
        }

        const normalizedPhone = cleanedPhone.startsWith("98")
            ? `0${cleanedPhone.slice(2)}`
            : cleanedPhone.startsWith("0")
                ? cleanedPhone
                : `0${cleanedPhone}`

        if (!/^0\d{10}$/.test(normalizedPhone)) {
            setError("شماره تلفن باید 11 رقمی با 0 شروع شود")
            return false
        }

        setFormData((prev) => ({ ...prev, phone: normalizedPhone }))
        setError("")
        return normalizedPhone
    }

    const requestOtp = async () => {
        const normalizedPhone = validateForm()
        if (!normalizedPhone) {
            return false
        }

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: normalizedPhone }),
            })

            const data = await response.json()
            if (!response.ok || !data.success) {
                setError(data.message || "خطا در ارسال کد تایید")
                return false
            }

            setStep("otp")
            setOtp("")
            return true
        } catch (error) {
            console.error("[Signup] OTP request error:", error)
            setError("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (step === "form") {
            const ok = await requestOtp()
            if (ok) {
                setError("")
            }
            return
        }

        const normalizedPhone = formData.phone.replace(/\D/g, "").startsWith("0")
            ? formData.phone.replace(/\D/g, "").slice(0, 11)
            : `0${formData.phone.replace(/\D/g, "").slice(-10)}`

        if (!otp.trim() || !/^\d{4,6}$/.test(otp)) {
            setError("کد تایید باید 4 تا 6 رقم باشد")
            return
        }

        setIsLoading(true)

        try {
            const verifyResponse = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: normalizedPhone,
                    otp,
                    mode: "signup",
                }),
            })

            const verifyData = await verifyResponse.json()
            if (!verifyResponse.ok || !verifyData.success) {
                setError(verifyData.message || "کد تایید اشتباه است")
                return
            }

            const response = await fetch("/api/auth/register-universal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: normalizedPhone,
                    userType: 'user',
                }),
            })

            const data = await response.json()
            if (response.ok && data.success && data.user) {
                localStorage.setItem('user_id', data.user.user_id)
                localStorage.setItem('name', data.user.name || '')
                localStorage.setItem('phone', data.user.phone || normalizedPhone)
                if (data.user?.email && !isPhoneOnlyEmail(data.user.email)) {
                    localStorage.setItem('email', data.user.email);
                } else {
                    localStorage.removeItem('email');
                }
                localStorage.setItem('userType', data.user.userType || 'user')

                if (data.user.userType === 'therapist') {
                    router.push("/therapist-dashboard")
                } else if (data.user.userType === 'employee') {
                    router.push("/employee-dashboard")
                } else {
                    router.push("/dashboard")
                }
            } else {
                setError(data.message || "خطا در ثبت نام")
            }
        } catch (error) {
            console.error('[Signup] Error:', error)
            setError("خطا در ثبت نام. لطفا دوباره تلاش کنید")
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Back Button */}
                <div className="flex justify-start mb-4">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-arabic text-sm transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        بازگشت
                    </button>
                </div>

                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 font-arabic">
                        ایجاد حساب کاربری جدید
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 font-arabic">
                        یا{" "}
                        <Link
                            href="/login"
                            className="font-medium text-teal-600 hover:text-teal-500"
                        >
                            وارد حساب موجود شوید
                        </Link>
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded font-arabic">
                                {error}
                            </div>
                        )}

                        {step === "form" ? (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-arabic">
                                        نام و نام خانوادگی
                                    </label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            placeholder="نام کامل خود را وارد کنید"
                                        />
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 font-arabic">
                                        شماره تلفن
                                    </label>
                                    <div className="mt-1 relative">
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            placeholder="09123456789"
                                        />
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 font-arabic">
                                    کد تایید ارسال شده به شماره {formData.phone}
                                </label>
                                <div className="mt-1">
                                    <Input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        inputMode="numeric"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        className="text-center tracking-widest"
                                        placeholder="123456"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep("form")}
                                    className="mt-2 text-sm text-teal-600 hover:text-teal-700"
                                >
                                    تغییر شماره
                                </button>
                            </div>
                        )}

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="mr-2 block text-sm text-gray-900 font-arabic">
                                با{" "}
                                <Link href="/terms" className="text-teal-600 hover:text-teal-500">
                                    شرایط و قوانین
                                </Link>{" "}
                                و{" "}
                                <Link href="/privacy" className="text-teal-600 hover:text-teal-500">
                                    حریم خصوصی
                                </Link>{" "}
                                موافقم
                            </label>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full font-arabic"
                                disabled={isLoading}
                            >
                                {isLoading ? "در حال پردازش..." : step === "form" ? "ارسال کد تایید" : "تایید و ثبت نام"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}