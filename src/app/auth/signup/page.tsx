"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, User, Phone } from "lucide-react"

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "PATIENT" as "PATIENT" | "THERAPIST"
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        if (formData.password !== formData.confirmPassword) {
            setError("رمز عبور و تکرار آن یکسان نیستند")
            setIsLoading(false)
            return
        }

        if (formData.password.length < 8) {
            setError("رمز عبور باید حداقل 8 کاراکتر باشد")
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    role: formData.role,
                }),
            })

            if (response.ok) {
                router.push("/auth/signin?message=ثبت نام با موفقیت انجام شد")
            } else {
                const data = await response.json()
                setError(data.message || "خطا در ثبت نام")
            }
        } catch (error) {
            setError("خطا در ثبت نام. لطفا دوباره تلاش کنید")
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 font-arabic">
                        ایجاد حساب کاربری جدید
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 font-arabic">
                        یا{" "}
                        <Link
                            href="/auth/signin"
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

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 font-arabic">
                                نوع حساب کاربری
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 font-arabic"
                            >
                                <option value="PATIENT">بیمار</option>
                                <option value="THERAPIST">مشاور/درمانگر</option>
                            </select>
                        </div>

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
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    placeholder="example@email.com"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    placeholder="09123456789"
                                />
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    placeholder="حداقل 8 کاراکتر"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 font-arabic">
                                تکرار رمز عبور
                            </label>
                            <div className="mt-1 relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    placeholder="رمز عبور را دوباره وارد کنید"
                                />
                                <button
                                    type="button"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

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
                                {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}