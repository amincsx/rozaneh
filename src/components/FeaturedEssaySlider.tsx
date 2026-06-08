"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { essaysData } from "@/app/essays/essaysData"

export default function FeaturedEssaySlider() {
    const essays = essaysData
    const [currentIndex, setCurrentIndex] = useState(() => essays.length - 1)

    useEffect(() => {
        if (essays.length === 0) {
            return
        }

        const interval = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % essays.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [essays.length])

    if (essays.length === 0) {
        return null
    }

    const essay = essays[currentIndex]

    return (
        <section className="scroll-section relative w-full overflow-hidden h-screen snap-start snap-always bg-teal-50">
            <div className="mx-auto flex h-full max-w-[90rem] flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row-reverse md:items-end md:justify-between">
                    <div>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900 font-arabic leading-tight">
                            جدیدترین مقاله روزنه
                        </h2>
                    </div>
                    <Link
                        href="/essays"
                        className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:scale-103"
                    >
                        مشاهده همه مقالات
                    </Link>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <Link
                        href={`/essays/${essay.slug}`}
                        className="group block w-full overflow-hidden rounded-[2rem] border border-white/30 bg-white/30 border backdrop-blur-sm shadow-sm overflow-x-auto border-white  transition duration-300 hover:-translate-y-1"
                    >
                        <div className="grid h-[min(60vh)] min-h-[100px] gap-0 grid-cols-1 grid-rows-[2fr_1fr] md:grid-cols-[1.3fr_1fr] md:grid-rows-none lg:grid-cols-[1.35fr_1fr]">
                            <div className="relative overflow-hidden bg-slate-100">
                                <Image
                                    src={essay.image}
                                    alt={essay.title}
                                    fill
                                    className="object-cover transition-transform duration-700"
                                    style={{ objectPosition: essay.imagePosition?.card ?? "center center" }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/0" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800">
                                        مقاله جدید
                                    </span>
                                </div>
                            </div>
                            <div className="flex h-full flex-col justify-between p-4 sm:p-6 sm:p-8 lg:p-10">
                                <div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 font-arabic">{essay.title}</h3>
                                    <p className="text-xs sm:text-sm md:text-base leading-6 sm:leading-7 md:leading-8 text-slate-600 font-arabic line-clamp-4 mt-2 sm:mt-4">{essay.lead}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="mt-6 flex flex-wrap justify-center gap-3 px-2">
                        {essays.map((item, idx) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setCurrentIndex(idx)}
                                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${idx === currentIndex
                                    ? "bg-teal-700 text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                                aria-label={`نمایش مقاله ${idx + 1}`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
