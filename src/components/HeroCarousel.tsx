"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

type SlideButton = {
    href: string
    label: string
}

type HeroSlide = {
    title: React.ReactNode
    description: string
    buttons: SlideButton[]
}

const slides: HeroSlide[] = [
    {
        title: (
            <>
                سفر شما به سوی سلامت روان
                <br />
                از امروز شروع می‌شود.
            </>
        ),
        description: "در محیطی امن و حرفه‌ای همراه شما هستیم.",
        buttons: [
            { href: "/book-appointment", label: "رزرو نوبت" },
            { href: "/chat-support", label: "مشاوره فوری" },
        ],
    },
    {
        title: "مشاوره فوری، در دسترس شما",
        description: "در چند مرحله ساده درخواست تماس ثبت کنید تا در زمان مناسب با شما تماس بگیریم.",
        buttons: [
            { href: "/chat-support", label: "درخواست مشاوره فوری" },
        ],
    },
    {
        title: "تست‌های رایگان آنلاین",
        description: "معتبرترین آزمون‌های روانشناسی را به صورت رایگان انجام دهید و نتیجه را بلافاصله ببینید.",
        buttons: [
            { href: "/assessments", label: "مشاهده تست‌ها" },
        ],
    },
    {
        title: "مقالات تخصصی روزنه",
        description: "دانش و راهنمایی درباره سلامت روان، روابط و زندگی روزمره را در مقالات ما بخوانید.",
        buttons: [
            { href: "/essays", label: "مطالعه مقالات" },
        ],
    },
    {
        title: "سمینارها و کارگاه‌های آموزشی",
        description: "در رویدادهای گروهی روزنه شرکت کنید و مهارت‌های زندگی و سلامت روان را یاد بگیرید.",
        buttons: [
            { href: "/contact-us", label: "اطلاع از سمینارها" },
        ],
    },
]

const AUTOPLAY_MS = 6000

const buttonClass =
    "bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-regular px-4 py-2 md:px-6 md:py-3 3xl:px-12 3xl:py-6 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm md:text-base 4xl:text-2xl text-center inline-block"

export default function HeroCarousel() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const goTo = useCallback((index: number) => {
        setActiveIndex((index + slides.length) % slides.length)
    }, [])

    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length)
        }, AUTOPLAY_MS)

        return () => clearInterval(interval)
    }, [isPaused])

    return (
        <div
            dir="rtl"
            className="absolute inset-x-4 sm:inset-x-6 md:left-auto md:right-12 lg:right-20 3xl:right-56 top-20 sm:top-24 md:top-1/3 lg:top-120 transform md:-translate-y-1/2 text-right w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] md:max-w-lg 2xl:max-w-4xl 3xl:max-w-7xl font-arabic px-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative min-h-[260px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[340px] 3xl:min-h-[360px] overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${index === activeIndex
                            ? "opacity-100 z-10"
                            : "opacity-0 pointer-events-none"
                            }`}
                        aria-hidden={index !== activeIndex}
                    >
                        <div className="text-right">
                            <h1 className="font-bold text-teal-700 mb-3 md:mb-4 3xl:mb-12 leading-tight text-2xl md:text-4xl 4xl:text-6xl">
                                {slide.title}
                            </h1>
                            <p className="text-gray-600 mb-4 md:mb-6 3xl:mb-12 leading-relaxed font-regular text-sm md:text-base 4xl:text-2xl text-right">
                                {slide.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 3xl:gap-8">
                                {slide.buttons.map((button) => (
                                    <Link key={button.href + button.label} href={button.href} className={buttonClass}>
                                        {button.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-row  items-center justify-center sm:justify-start md:justify-start 2xl:justify-start gap-3 mt-0 md:mt-0">
                <button
                    type="button"
                    onClick={goPrev}
                    aria-label="اسلاید قبلی"
                    className="w-9 h-9 rounded-full cursor-pointer bg-white/30 backdrop-blur-sm border border-white/40 text-teal-700 hover:bg-white/50 transition text-lg leading-none"
                >
                    ›
                </button>

                <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => goTo(index)}
                            aria-label={`اسلاید ${index + 1}`}
                            aria-current={index === activeIndex ? "true" : undefined}
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? "w-8 bg-teal-600"
                                : "w-2 bg-teal-300/70 hover:bg-teal-500"
                                }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={goNext}
                    aria-label="اسلاید بعدی"
                    className="w-9 h-9 rounded-full cursor-pointer bg-white/30 backdrop-blur-sm border border-white/40 text-teal-700 hover:bg-white/50 transition text-lg leading-none"
                >
                    ‹
                </button>
            </div>
        </div>
    )
}
