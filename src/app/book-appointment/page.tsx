"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ConsultationRequestForm from "@/components/ConsultationRequestForm"

export default function BookAppointmentPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-arabic"
                >
                    <ArrowLeft className="w-5 h-5" />
                    بازگشت به صفحه اصلی
                </Link>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
                    <ConsultationRequestForm
                        source="booking"
                        title="رزرو مشاوره"
                        subtitle="اطلاعات خود را وارد کنید تا در زمان مناسب با شما تماس بگیریم"
                    />
                </div>
            </div>
        </div>
    )
}
