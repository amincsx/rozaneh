"use client"

import { useState } from "react"
import { toJalaali, toGregorian } from "jalaali-js"

const JALAALI_MONTHS = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
]

const WEEKDAY_NAMES = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"]

export default function PersianCalendar() {
    const [jYear, setJYear] = useState(() => {
        const now = new Date()
        const { jy } = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate())
        return jy
    })
    const [jMonth, setJMonth] = useState(() => {
        const now = new Date()
        const { jm } = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate())
        return jm
    })

    // Get first and last day of Jalaali month
    const getDaysInMonth = (year: number, month: number) => {
        if (month < 7) return 31 // فروردین to شهریور: 31 days
        if (month < 12) return 30 // مهر to بهمن: 30 days
        // اسفند: 29 or 30 days (leap year calculation)
        const isLeap = (y: number) => ((y + 1474) % 2820 + 474) % 128 < 29
        return isLeap(year) ? 30 : 29
    }

    const firstDayOfMonth = toGregorian(jYear, jMonth, 1)
    const gDate = new Date(firstDayOfMonth.gy, firstDayOfMonth.gm - 1, firstDayOfMonth.gd)
    const startWeekday = gDate.getDay() // 0=Sunday, 6=Saturday

    const daysInMonth = getDaysInMonth(jYear, jMonth)

    // Build calendar grid
    const cells: Array<{ day: number | null; jYear: number; jMonth: number; jDay: number } | null> = []

    // Add empty cells for days before month starts
    for (let i = 0; i < startWeekday; i++) {
        cells.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push({ day, jYear, jMonth, jDay: day })
    }

    // Pad remaining cells
    while (cells.length % 7 !== 0) {
        cells.push(null)
    }

    const prevMonth = () => {
        if (jMonth === 1) {
            setJMonth(12)
            setJYear(jYear - 1)
        } else {
            setJMonth(jMonth - 1)
        }
    }

    const nextMonth = () => {
        if (jMonth === 12) {
            setJMonth(1)
            setJYear(jYear + 1)
        } else {
            setJMonth(jMonth + 1)
        }
    }

    const isToday = (cell: typeof cells[0]) => {
        if (!cell) return false
        const now = new Date()
        const { jy, jm, jd } = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate())
        return cell.jYear === jy && cell.jMonth === jm && cell.jDay === jd
    }

    // Convert year to Persian numerals
    const toPersianNumeral = (num: number) => {
        return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])
    }

    return (
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-sm font-arabic" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    className="text-lg px-3 py-1 rounded hover:bg-white/20 transition"
                >
                    ‹
                </button>
                <h2 className="font-bold text-gray-800 text-center">
                    {JALAALI_MONTHS[jMonth - 1]} {toPersianNumeral(jYear)}
                </h2>
                <button
                    onClick={nextMonth}
                    className="text-lg px-3 py-1 rounded hover:bg-white/20 transition"
                >
                    ›
                </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {WEEKDAY_NAMES.map((name) => (
                    <div key={name} className="text-xs font-medium text-gray-600">
                        {name}
                    </div>
                ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
                {cells.map((cell, idx) => (
                    <div
                        key={idx}
                        className="h-10 flex items-center justify-center text-sm"
                    >
                        {cell ? (
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${isToday(cell)
                                        ? "bg-teal-500 text-white font-bold"
                                        : "hover:bg-teal-100 text-gray-800"
                                    }`}
                            >
                                {String(cell.day).padStart(2, "۰").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])}
                            </div>
                        ) : (
                            <div className="w-8 h-8" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
