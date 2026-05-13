"use client";
import Image from "next/image";
import Link from "next/link";
import { essaysData } from "./essaysData";

export default function EssaysPage() {
    return (
        <main dir="rtl" className="min-h-screen font-sans antialiased">
            <div className="w-full pt-8 px-6" dir="ltr">
                <Link
                    href="/"
                    className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-normal px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-[13px]"
                >
                    بازگشت به صفحه اصلی
                </Link>
            </div>

            <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <div className="bg-gray-400 h-full w-full ">

                </div>


                <section className="grid gap-6 h-full w-full sm:grid-cols-2 lg:grid-cols-2">
                    {essaysData.map((essay) => (
                        <article
                            key={essay.id}
                            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="w-full bg-slate-100">
                                <Image
                                    src={essay.image}
                                    alt={essay.title}
                                    width={1746}
                                    height={901}
                                    className="block h-auto w-full sm:h-80 sm:object-cover"
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                />
                            </div>

                            <div className="space-y-3 p-4">
                                <h2 className="line-clamp-2 text-lg font-bold text-slate-800">{essay.title}</h2>
                                <p className="line-clamp-3 text-sm leading-7 text-slate-600">{essay.metaDescription}</p>
                                <Link
                                    href={`/essays/${essay.slug}`}
                                    className="inline-flex text-sm font-medium text-teal-700 hover:text-teal-800"
                                >
                                    مشاهده مقاله
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
