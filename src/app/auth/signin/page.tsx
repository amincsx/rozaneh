"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail } from "lucide-react"

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // Use the universal login endpoint
            const response = await fetch("/api/auth/login-universal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                if (data.success && data.user) {
                    // Store user info in localStorage for dashboard
                    localStorage.setItem('user_id', data.user.user_id)
                    localStorage.setItem('email', data.user.email)
                    localStorage.setItem('name', data.user.name)
                    localStorage.setItem('userType', data.user.userType)

                    console.log('[Login] Login successful, stored user data:', data.user)

                    // Redirect based on user type
                    if (data.user.userType === 'therapist') {
                        router.push("/therapist-dashboard")
                    } else if (data.user.userType === 'employee') {
                        router.push("/employee-dashboard")
                    } else {
                        router.push("/dashboard")
                    }
                } else {
                    setError(data.message || "خطا در ورود")
                }
            } else {
                const data = await response.json()
                setError(data.message || "ایمیل یا رمز عبور اشتباه است")
            }
        } catch (error) {
            console.error('[Login] Error:', error)
            setError("خطا در ورود. لطفا دوباره تلاش کنید")
        } finally {
            setIsLoading(false)
        }
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
                        ورود به حساب کاربری
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 font-arabic">
                        یا{" "}
                        <Link
                            href="/auth/signup"
                            className="font-medium text-teal-600 hover:text-teal-500"
                        >
                            حساب جدید بسازید
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

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-arabic">
                                ایمیل
                            </label>
                            <div className="mt-1 relative">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    placeholder="example@email.com"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-arabic">
                                رمز عبور
                            </label>
                            <div className="mt-1 relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                    placeholder="رمز عبور خود را وارد کنید"
                                />
                                <button
                                    type="button"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900 font-arabic">
                                    مرا به خاطر بسپار
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    href="/auth/forgot-password"
                                    className="font-medium text-teal-600 hover:text-teal-500 font-arabic"
                                >
                                    فراموشی رمز عبور؟
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full font-arabic"
                                disabled={isLoading}
                            >
                                {isLoading ? "در حال ورود..." : "ورود"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}