"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/Navbar"
import {
    Calendar,
    Clock,
    Video,
    Phone,
    MessageCircle,
    User,
    CreditCard,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    ExternalLink
} from "lucide-react"

// Mock therapist data - in real app, this would come from API
const therapistsData: Record<string, { id: string; name: string; specializations: string[]; hourlyRate: number; image: string }> = {
    "1": { id: "1", name: "دکتر ابوالفضل امینیان", specializations: ["مشاوره پيش از ازدواج", "مشاوره در زمینه تعارض زناشويی", "سکس تراپی"], hourlyRate: 300000, image: "/psychologists/1/image (15).png" },
    "2": { id: "2", name: "زینب ایرانی", specializations: ["مشاوره پیش از ازدواج", "خانواده درمانی", "زندگی مشترک و تعارضات زوجین"], hourlyRate: 300000, image: "/psychologists/2/image (14).png" },
    "3": { id: "3", name: "زهره کیانی", specializations: ["مشاوره پیش از ازدواج", "خانواده درمانی", "سکس تراپی", "زندگی مشترک و تعارضات زوجین", "گروه درمانی و مشاوره گروهی"], hourlyRate: 300000, image: "/psychologists/3/image (13).png" },
    "4": { id: "4", name: "دکتر محسن محمدی", specializations: ["عضو هیئت علمی دانشگاه", "مدیر مرکز مشاوره روزنه"], hourlyRate: 300000, image: "/psychologists/4/image (12).png" },
    "5": { id: "5", name: "الهام عسگری", specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی", "کارشناس روانشناسی بالینی"], hourlyRate: 300000, image: "/psychologists/5/image (11).png" },
    "6": { id: "6", name: "مینا خضری", specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی"], hourlyRate: 300000, image: "/psychologists/6/image (10).png" },
    "7": { id: "7", name: "زهرا بیگی", specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره نوجوان", "تعارض ها و مشکلات بین فردی"], hourlyRate: 300000, image: "/psychologists/7/image (9).png" },
    "8": { id: "8", name: "رضا معیری", specializations: ["مشاوره فردی وسواس، افسردگی، شكست عاطفی و ...", "مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"], hourlyRate: 300000, image: "/psychologists/8/image (8).png" },
    "9": { id: "9", name: "مهسا باغبانی", specializations: ["مشاوره فردی", "وسواس، افسردگی، شكست عاطفی، اختلالات خلقی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"], hourlyRate: 300000, image: "/psychologists/9/image (7).png" },
    "10": { id: "10", name: "مژگان میرزاده", specializations: ["درمان اختلالات یادگیری و كمبود توجه و تمركز", "اجرا و تحليل آزمون هاي هوش", "تشخيص و آموزش در حيطه اتيسم"], hourlyRate: 300000, image: "/psychologists/10/image (6).png" },
    "11": { id: "11", name: "دکتر یاسمن صالح", specializations: ["مشاوره فردی"], hourlyRate: 300000, image: "/psychologists/11/-2147483648_-224219.jpg" },
    "12": { id: "12", name: "سارا گلچوبیان", specializations: ["مشاوره فردی"], hourlyRate: 300000, image: "/psychologists/12/image (5).png" },
    "13": { id: "13", name: "زهرا صادقی", specializations: ["مشاوره فردی وسواس، افسردگی، اضطراب و..", "تعارضات بین فردی", "مانگر حوزه نوجوان", "خانواده درمانی", "مشاوره زوج"], hourlyRate: 300000, image: "/psychologists/13/image (4).png" },
    "14": { id: "14", name: "دکتر بهار ایروانی", specializations: ["مشاوره پیش از ازدواج", "مشاوره فردی", "مشاوره خانواده"], hourlyRate: 300000, image: "/psychologists/14/-2147483648_-224224.jpg" },
    "15": { id: "15", name: "دکتر نسرین واسعی", specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "حل تعارضات زناشويی"], hourlyRate: 300000, image: "/psychologists/15/-2147483648_-224217.jpg" },
    "16": { id: "16", name: "زهرا سادات اطیابی", specializations: ["مشاوره فردی پنیک، افسردگی، اضطراب، وسواس و ...", "مشاوره زوج و خانواده درمانیتعارضات زناشویی و..", "درمانگر نوجوان", "مشاوره پیش از ازدواج"], hourlyRate: 300000, image: "/psychologists/16/-2147483648_-224229.jpg" },
    "17": { id: "17", name: "لیلا بیرانوند", specializations: ["فرزند پروری"], hourlyRate: 300000, image: "/psychologists/17/image.png" },
    "18": { id: "18", name: "نگار غایبی", specializations: ["مشاوره"], hourlyRate: 300000, image: "/psychologists/18/-2147483648_-224231.jpg" },
    "19": { id: "19", name: "محمد جدیدکار همدانی", specializations: ["مشاوره فردی"], hourlyRate: 300000, image: "/psychologists/19/image (2).png" },
    "20": { id: "20", name: "بهاره نعمتی روشن", specializations: ["- مشاوره پیش از ازدواج - زوج و خانواده درمانی"], hourlyRate: 300000, image: "/psychologists/20/image (3).png" }
}

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30"
]

const consultationTypes = [
    {
        id: "video",
        name: "ویدیو کال",
        description: "جلسه مشاوره از طریق ویدیو آنلاین",
        icon: Video,
        price: 500000
    },
    {
        id: "phone",
        name: "تماس صوتی",
        description: "جلسه مشاوره از طریق تماس تلفنی",
        icon: Phone,
        price: 400000
    },
    {
        id: "chat",
        name: "چت متنی",
        description: "جلسه مشاوره از طریق پیام متنی",
        icon: MessageCircle,
        price: 300000
    }
]

function BookAppointmentContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [step, setStep] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    const [therapist, setTherapist] = useState<{ id: string; name: string; specializations: string[]; hourlyRate: number; image: string } | null>(null)
    const [formData, setFormData] = useState<{
        therapistId: string;
        consultationType: string;
        selectedDate: string;
        selectedTime: string;
        reason: string;
        emergencyContact: string;
        notes: string;
        paymentMethod: string;
    }>({
        therapistId: "",
        consultationType: "",
        selectedDate: "",
        selectedTime: "",
        reason: "",
        emergencyContact: "",
        notes: "",
        paymentMethod: ""
    })

    useEffect(() => {
        const therapistId = searchParams.get('therapist')
        if (therapistId && therapistsData[therapistId]) {
            const selectedTherapist = therapistsData[therapistId]
            setTherapist(selectedTherapist)
            setFormData(prev => ({ ...prev, therapistId }))
            setStep(2) // Skip therapist selection if already selected
        } else {
            setStep(1) // Show therapist selection
        }
        setIsLoaded(true)
    }, [searchParams])

    const [availableDates] = useState(() => {
        const dates = []
        const today = new Date()
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            dates.push(date.toISOString().split('T')[0])
        }
        return dates
    })

    const handleNext = () => {
        if (step < 5) setStep(step + 1)
    }

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = async () => {
        // In real app, this would submit to API
        console.log("Booking data:", formData)
        router.push("/dashboard?booking=success")
    }

    const getStepTitle = () => {
        switch (step) {
            case 1: return "انتخاب مشاور"
            case 2: return "انتخاب نوع مشاوره"
            case 3: return "انتخاب زمان"
            case 4: return "اطلاعات تکمیلی"
            case 5: return "پرداخت و تایید"
            default: return ""
        }
    }

    const selectedConsultationType = consultationTypes.find(type => type.id === formData.consultationType)

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Navbar textColor="gray" />
            {/* Header */}
            <div dir="rtl" className="text-center mb-8 mt-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-arabic text-center">
                    رزرو نوبت مشاوره
                </h1>
                <p className="text-gray-600 font-arabic text-center">
                    {isLoaded && therapist ? `با ${therapist.name}` : "لطفاً مشاور را انتخاب کنید"}
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4, 5].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber
                            ? "bg-teal-600 text-white"
                            : "bg-gray-200 text-gray-500"
                            }`}>
                            {step > stepNumber ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                stepNumber
                            )}
                        </div>
                        {stepNumber < 5 && (
                            <div className={`w-12 h-1 mx-2 ${step > stepNumber ? "bg-teal-600" : "bg-gray-200"
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic">
                    {getStepTitle()}
                </h2>

                {/* Step 1: Therapist Selection */}
                {step === 1 && (
                    <div className="space-y-4">
                        <label className="block text-gray-700 font-arabic font-semibold mb-3">
                            مشاور را انتخاب کنید
                        </label>
                        <select
                            value={formData.therapistId}
                            onChange={(e) => {
                                const selectedId = e.target.value
                                if (selectedId && therapistsData[selectedId]) {
                                    const selectedTherapist = therapistsData[selectedId]
                                    setTherapist(selectedTherapist)
                                    setFormData(prev => ({ ...prev, therapistId: selectedId }))
                                }
                            }}
                            className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 font-arabic bg-white"
                        >
                            <option value="">انتخاب مشاور...</option>
                            {Object.values(therapistsData).map((therapistOption) => (
                                <option key={therapistOption.id} value={therapistOption.id}>
                                    {therapistOption.name}
                                </option>
                            ))}
                        </select>
                        {formData.therapistId && (
                            <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 font-arabic mb-2">
                                            {therapist?.name}
                                        </h3>
                                        <p className="text-gray-700 font-arabic text-sm">
                                            تخصص‌ها: {therapist?.specializations.join(" - ")}
                                        </p>
                                    </div>
                                    <a
                                        href={`/therapists/${formData.therapistId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-3 flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-arabic whitespace-nowrap"
                                    >
                                        <span>مشاهده پروفایل</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Consultation Type */}
                {step === 2 && (
                    <div className="space-y-4">
                        {consultationTypes.map((type) => {
                            const IconComponent = type.icon
                            return (
                                <div
                                    key={type.id}
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${formData.consultationType === type.id
                                        ? "border-teal-500 bg-teal-50"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => setFormData({ ...formData, consultationType: type.id })}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <IconComponent className="w-6 h-6 text-teal-600 ml-3" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 font-arabic">
                                                    {type.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm font-arabic">
                                                    {type.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <span className="font-bold text-teal-600">
                                                {type.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 text-sm font-arabic"> تومان</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Step 3: Date and Time Selection */}
                {step === 3 && (
                    <div className="space-y-6">
                        {/* Date Selection */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3 font-arabic">
                                انتخاب تاریخ
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {availableDates.map((date) => {
                                    const dateObj = new Date(date)
                                    const persianDate = new Intl.DateTimeFormat('fa-IR', {
                                        month: 'long',
                                        day: 'numeric',
                                        weekday: 'short'
                                    }).format(dateObj)

                                    return (
                                        <button
                                            key={date}
                                            className={`p-3 rounded-lg border-2 text-center transition-colors ${formData.selectedDate === date
                                                ? "border-teal-500 bg-teal-50 text-teal-700"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            onClick={() => setFormData({ ...formData, selectedDate: date })}
                                        >
                                            <div className="font-semibold font-arabic">{persianDate}</div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Time Selection */}
                        {formData.selectedDate && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 font-arabic">
                                    انتخاب ساعت
                                </h3>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            className={`p-2 rounded-lg border-2 text-center transition-colors ${formData.selectedTime === time
                                                ? "border-teal-500 bg-teal-50 text-teal-700"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            onClick={() => setFormData({ ...formData, selectedTime: time })}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 4: Additional Information */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                دلیل مراجعه (اختیاری)
                            </label>
                            <Textarea
                                placeholder="لطفاً دلیل اصلی مراجعه خود را بنویسید..."
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="font-arabic"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                شماره تماس اضطراری
                            </label>
                            <Input
                                type="tel"
                                placeholder="09123456789"
                                value={formData.emergencyContact}
                                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                className="font-arabic"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                                توضیحات اضافی (اختیاری)
                            </label>
                            <Textarea
                                placeholder="هر چیز دیگری که فکر می‌کنید مشاور باید بداند..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="font-arabic"
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {/* Step 5: Payment and Confirmation */}
                {step === 5 && (
                    <div className="space-y-6">
                        {/* Booking Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 font-arabic">
                                خلاصه رزرو
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-arabic">مشاور:</span>
                                    <span className="font-arabic">{therapist?.name || "بدون انتخاب"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-arabic">نوع مشاوره:</span>
                                    <span className="font-arabic">{selectedConsultationType?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-arabic">تاریخ:</span>
                                    <span className="font-arabic">
                                        {formData.selectedDate && new Intl.DateTimeFormat('fa-IR').format(new Date(formData.selectedDate))}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-arabic">ساعت:</span>
                                    <span>{formData.selectedTime}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                    <span className="font-arabic">مبلغ کل:</span>
                                    <span className="font-arabic">
                                        {selectedConsultationType?.price.toLocaleString()} تومان
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3 font-arabic">
                                روش پرداخت
                            </h3>
                            <div className="space-y-3">
                                {["زرین‌پال", "پارسیان", "درگاه بانک ملی"].map((method) => (
                                    <div
                                        key={method}
                                        className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${formData.paymentMethod === method
                                            ? "border-teal-500 bg-teal-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                                    >
                                        <div className="flex items-center">
                                            <CreditCard className="w-5 h-5 text-teal-600 ml-3" />
                                            <span className="font-arabic">{method}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={step === 1}
                        className="font-arabic"
                    >
                        <ArrowRight className="w-4 h-4 ml-2" />
                        قبلی
                    </Button>

                    {step < 5 ? (
                        <Button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !formData.therapistId) ||
                                (step === 2 && !formData.consultationType) ||
                                (step === 3 && (!formData.selectedDate || !formData.selectedTime))
                            }
                            className="font-arabic"
                        >
                            بعدی
                            <ArrowLeft className="w-4 h-4 mr-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={!formData.paymentMethod}
                            className="font-arabic"
                        >
                            تایید و پرداخت
                            <CreditCard className="w-4 h-4 mr-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function BookAppointmentPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">جاری الود...</div>}>
            <BookAppointmentContent />
        </Suspense>
    )
}