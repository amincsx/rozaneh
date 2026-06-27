"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Phone, User } from "lucide-react"
import { toGregorian, toJalaali } from "jalaali-js"
import {
    WORK_TIME_SLOTS,
    getTehranParts,
    isCallNowAvailable,
    isFriday,
} from "@/lib/working-hours"

type ConsultationRequestFormProps = {
    source?: "quick" | "booking"
    title?: string
    subtitle?: string
}

const JALAALI_MONTHS = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
]

function gregorianDateString(year: number, month: number, day: number) {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function isPastGregorianDate(dateStr: string) {
    const today = getTehranParts()
    const todayStr = gregorianDateString(today.year, today.month, today.day)
    return dateStr < todayStr
}

export default function ConsultationRequestForm({
    source = "quick",
    title = "مشاوره فوری",
    subtitle = "اطلاعات خود را وارد کنید تا در زمان مناسب با شما تماس بگیریم",
}: ConsultationRequestFormProps) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [callNowAvailable, setCallNowAvailable] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        phone: "",
        problem: "",
        callType: "" as "" | "now" | "scheduled",
        scheduledDate: "",
        scheduledTime: "",
    })

    const [pickerYear, setPickerYear] = useState(() => getTehranParts().year)
    const [pickerMonth, setPickerMonth] = useState(() => {
        const { jy, jm } = toJalaali(getTehranParts().year, getTehranParts().month, getTehranParts().day)
        return jm
    })
    const [pickerDay, setPickerDay] = useState<number | null>(null)

    useEffect(() => {
        const refreshAvailability = () => setCallNowAvailable(isCallNowAvailable())
        refreshAvailability()
        const interval = setInterval(refreshAvailability, 60_000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const name = localStorage.getItem("name")
        const phone = localStorage.getItem("phone")
        setFormData((prev) => ({
            ...prev,
            name: prev.name || name || "",
            phone: prev.phone || phone || "",
        }))
    }, [])

    const selectedJalaaliLabel = useMemo(() => {
        if (!formData.scheduledDate) return ""
        const [y, m, d] = formData.scheduledDate.split("-").map(Number)
        const { jy, jm, jd } = toJalaali(y, m, d)
        return `${jd} ${JALAALI_MONTHS[jm - 1]} ${jy}`
    }, [formData.scheduledDate])

    const calendarCells = useMemo(() => {
        const { gy, gm, gd } = toGregorian(pickerYear, pickerMonth, 1)
        const firstDay = new Date(gy, gm - 1, gd).getDay()
        const daysInMonth = pickerMonth < 7 ? 31 : pickerMonth < 12 ? 30 : 29
        const cells: Array<number | null> = []

        for (let i = 0; i < firstDay; i++) cells.push(null)
        for (let day = 1; day <= daysInMonth; day++) cells.push(day)
        while (cells.length % 7 !== 0) cells.push(null)

        return cells
    }, [pickerYear, pickerMonth])

    const handleSelectDate = (day: number) => {
        const { gy, gm, gd } = toGregorian(pickerYear, pickerMonth, day)
        const dateStr = gregorianDateString(gy, gm, gd)
        const candidate = new Date(`${dateStr}T12:00:00+03:30`)

        if (isFriday(candidate) || isPastGregorianDate(dateStr)) return

        setPickerDay(day)
        setFormData((prev) => ({ ...prev, scheduledDate: dateStr }))
    }

    const validateStep1 = () => {
        if (!formData.name.trim()) {
            setError("نام و نام خانوادگی الزامی است")
            return false
        }
        const age = Number(formData.age)
        if (!age || age < 1 || age > 120) {
            setError("سن معتبر وارد کنید")
            return false
        }
        const phoneDigits = formData.phone.replace(/\D/g, "")
        if (!/^0\d{10}$/.test(phoneDigits.startsWith("0") ? phoneDigits : `0${phoneDigits.slice(-10)}`)) {
            setError("شماره تلفن معتبر وارد کنید")
            return false
        }
        return true
    }

    const validateStep2 = () => {
        if (formData.problem.trim().length < 10) {
            setError("لطفا مشکل خود را با جزئیات بیشتر توضیح دهید")
            return false
        }
        return true
    }

    const validateStep3 = () => {
        if (!formData.callType) {
            setError("زمان تماس را انتخاب کنید")
            return false
        }
        if (formData.callType === "now" && !callNowAvailable) {
            setError("تماس فوری فقط در ساعات ۹ تا ۱۷ (غیر از جمعه) امکان‌پذیر است")
            return false
        }
        if (formData.callType === "scheduled") {
            if (!formData.scheduledDate || !formData.scheduledTime) {
                setError("تاریخ و ساعت تماس را انتخاب کنید")
                return false
            }
        }
        return true
    }

    const goNext = () => {
        setError("")
        if (step === 1 && !validateStep1()) return
        if (step === 2 && !validateStep2()) return
        setStep((prev) => Math.min(prev + 1, 3))
    }

    const goBack = () => {
        setError("")
        setStep((prev) => Math.max(prev - 1, 1))
    }

    const handleSubmit = async () => {
        setError("")
        if (!validateStep3()) return

        setLoading(true)
        try {
            const phoneDigits = formData.phone.replace(/\D/g, "")
            const normalizedPhone = phoneDigits.startsWith("0")
                ? phoneDigits.slice(0, 11)
                : `0${phoneDigits.slice(-10)}`

            const response = await fetch("/api/quick-consultation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    age: Number(formData.age),
                    phone: normalizedPhone,
                    problem: formData.problem.trim(),
                    callType: formData.callType,
                    scheduledDate: formData.scheduledDate,
                    scheduledTime: formData.scheduledTime,
                    source,
                }),
            })

            const data = await response.json()
            if (!response.ok || !data.success) {
                setError(data.message || "خطا در ثبت درخواست")
                return
            }

            setSubmitted(true)
        } catch {
            setError("خطا در ثبت درخواست. لطفا دوباره تلاش کنید")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div dir="rtl" className="text-center py-10">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-arabic">درخواست شما ثبت شد</h2>
                <p className="text-gray-600 text-lg mb-8 font-arabic">
                    در زمان انتخاب‌شده با شماره {formData.phone} تماس می‌گیریم
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-arabic font-semibold"
                >
                    بازگشت به صفحه اصلی
                </Link>
            </div>
        )
    }

    return (
        <div dir="rtl">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-arabic">{title}</h1>
                <p className="text-gray-600 font-arabic text-lg">{subtitle}</p>
            </div>

            <div className="flex items-center justify-center mb-8 gap-3">
                {[1, 2, 3].map((n) => (
                    <div key={n} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= n ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                        {n}
                    </div>
                ))}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-arabic text-sm">
                    {error}
                </div>
            )}

            {step === 1 && (
                <div className="space-y-5">
                    <h2 className="text-xl font-bold text-teal-700 font-arabic flex items-center gap-2">
                        <User className="w-5 h-5" /> اطلاعات تماس
                    </h2>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 font-arabic">نام و نام خانوادگی</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                            placeholder="نام کامل"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 font-arabic">سن</label>
                        <input
                            type="number"
                            min={1}
                            max={120}
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                            placeholder="مثال: 28"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 font-arabic">شماره موبایل</label>
                        <input
                            type="tel"
                            dir="ltr"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 11) })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 text-left"
                            placeholder="09123456789"
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-5">
                    <h2 className="text-xl font-bold text-teal-700 font-arabic">شرح مشکل</h2>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 font-arabic">
                            مشکل یا موضوع مشاوره خود را بنویسید
                        </label>
                        <textarea
                            rows={6}
                            value={formData.problem}
                            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                            placeholder="هرچه دقیق‌تر بنویسید، مشاور بهتر آماده تماس خواهد بود..."
                        />
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-teal-700 font-arabic flex items-center gap-2">
                        <Clock className="w-5 h-5" /> بهترین زمان تماس
                    </h2>
                    <p className="text-sm text-gray-600 font-arabic">ساعات کاری: ۹ صبح تا ۵ عصر — جمعه‌ها تعطیل</p>

                    <div className="space-y-3">
                        <button
                            type="button"
                            disabled={!callNowAvailable}
                            onClick={() => setFormData({ ...formData, callType: "now" })}
                            className={`w-full p-4 rounded-xl border-2 text-right transition ${
                                formData.callType === "now"
                                    ? "border-teal-600 bg-teal-50"
                                    : "border-gray-200 hover:border-teal-300"
                            } ${!callNowAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className="font-bold text-gray-900 font-arabic">همین الان</div>
                            <div className="text-sm text-gray-600 font-arabic mt-1">
                                {callNowAvailable
                                    ? "درخواست تماس فوری در ساعات کاری"
                                    : "فقط در ساعات ۹ تا ۱۷ (غیر از جمعه) فعال است"}
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, callType: "scheduled" })}
                            className={`w-full p-4 rounded-xl border-2 text-right transition ${
                                formData.callType === "scheduled"
                                    ? "border-teal-600 bg-teal-50"
                                    : "border-gray-200 hover:border-teal-300"
                            }`}
                        >
                            <div className="font-bold text-gray-900 font-arabic">زمان دیگر</div>
                            <div className="text-sm text-gray-600 font-arabic mt-1">انتخاب تاریخ و ساعت از تقویم</div>
                        </button>
                    </div>

                    {formData.callType === "scheduled" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <button type="button" onClick={() => {
                                        if (pickerMonth === 1) { setPickerMonth(12); setPickerYear(pickerYear - 1) }
                                        else setPickerMonth(pickerMonth - 1)
                                    }} className="px-2 py-1 hover:bg-gray-100 rounded">›</button>
                                    <span className="font-bold font-arabic">{JALAALI_MONTHS[pickerMonth - 1]} {pickerYear}</span>
                                    <button type="button" onClick={() => {
                                        if (pickerMonth === 12) { setPickerMonth(1); setPickerYear(pickerYear + 1) }
                                        else setPickerMonth(pickerMonth + 1)
                                    }} className="px-2 py-1 hover:bg-gray-100 rounded">‹</button>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                    {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((d) => (
                                        <div key={d} className="font-bold text-gray-500 py-1">{d}</div>
                                    ))}
                                    {calendarCells.map((day, idx) => {
                                        if (!day) return <div key={`e-${idx}`} />
                                        const { gy, gm, gd } = toGregorian(pickerYear, pickerMonth, day)
                                        const dateStr = gregorianDateString(gy, gm, gd)
                                        const candidate = new Date(`${dateStr}T12:00:00+03:30`)
                                        const disabled = isFriday(candidate) || isPastGregorianDate(dateStr)
                                        const selected = pickerDay === day && formData.scheduledDate === dateStr
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                disabled={disabled}
                                                onClick={() => handleSelectDate(day)}
                                                className={`py-2 rounded text-sm ${
                                                    selected ? "bg-teal-600 text-white" :
                                                    disabled ? "text-gray-300 cursor-not-allowed" :
                                                    "hover:bg-teal-100 text-gray-800"
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        )
                                    })}
                                </div>
                                {selectedJalaaliLabel && (
                                    <p className="text-sm text-teal-700 mt-3 font-arabic">انتخاب شده: {selectedJalaaliLabel}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 font-arabic">ساعت تماس</label>
                                <select
                                    value={formData.scheduledTime}
                                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 font-arabic"
                                >
                                    <option value="">انتخاب ساعت</option>
                                    {WORK_TIME_SLOTS.map((slot) => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-2 font-arabic">فقط بین ۹:۰۰ تا ۱۶:۳۰</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex gap-3 mt-8">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={goBack}
                        className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-arabic font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                        <ArrowRight className="w-4 h-4" /> قبلی
                    </button>
                )}
                {step < 3 ? (
                    <button
                        type="button"
                        onClick={goNext}
                        className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-arabic font-semibold hover:bg-teal-700 flex items-center justify-center gap-2"
                    >
                        بعدی <ArrowLeft className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-arabic font-semibold hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <Phone className="w-4 h-4" />
                        {loading ? "در حال ثبت..." : "ثبت درخواست تماس"}
                    </button>
                )}
            </div>
        </div>
    )
}
