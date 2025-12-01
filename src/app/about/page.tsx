"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-slate-50 font-farsi selection:bg-teal-100 selection:text-teal-900">
            {/* Navigation Bar */}
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/rozaneh pics/1.jpg"
                        alt="Rozaneh Clinic Interior"
                        fill
                        className="object-cover brightness-[0.85]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-50" />
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-16">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg leading-tight">
                        فضایی برای <span className="text-teal-300">آرامش</span> و <span className="text-teal-300">رشد</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-100 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                        ما در روزنه، همراه شما هستیم تا مسیر سلامت روان را با اطمینان و آگاهی طی کنید.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />

                        <h2 className="text-4xl font-bold text-slate-800 mb-8 relative z-10">داستان ما</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-loose text-justify relative z-10">
                            <p>
                                کلینیک روانشناختی روزنه در سال ۱۳۹۷ با هدف ایجاد فضایی امن، حرفه‌ای و مبتنی بر اصول سلامت روان تأسیس شد. داستان شکل‌گیری این کلینیک به دوران تدریس دکتر محمدی در دانشگاه علامه طباطبایی بازمی‌گردد؛ جایی که در گفت‌وگویی الهام‌بخش با یکی از دانشجویان برجسته، دکتر امینیان، ایده اولیه آن شکل گرفت.
                            </p>
                            <p>
                                این دو متخصص، با اشتراک دیدگاه‌های نوآورانه، بر آن شدند تا کلینیکی منحصربه‌فرد بنا نهند که در آن درمانگرانی متخصص گرد هم آیند تا بتوانیم خدمات جامعی را به مراجعان ارائه دهیم. هدف غایی، ایجاد محیطی امن و حمایتی است که در آن افراد بتوانند با آرامش کامل به سوی بهبودی و رشد شخصی گام بردارند.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                        <Image
                            src="/rozaneh pics/2.jpg"
                            alt="Therapy Session"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-80 px-12 overflow-hidden">
                {/* Background SVG */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about.svg"
                        alt="Background"
                        fill
                        className="object-cover brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-white/90" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">ارزش‌های بنیادین ما</h2>
                        <p className="text-slate-500 text-lg font-light">آنچه روزنه را متمایز می‌کند</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {

                                title: "فضای امن و همدلانه",
                                desc: "ما متعهد به ایجاد محیطی هستیم که در آن بدون قضاوت شنیده شوید."
                            },
                            {

                                title: "تخصص و حرفه‌ای‌گری",
                                desc: "تیم ما متشکل از متخصصان با تجربه و دارای صلاحیت‌های علمی معتبر است."
                            },
                            {

                                title: "رویکرد مراجع‌محور",
                                desc: "برنامه درمانی شما متناسب با نیازها و اهداف منحصر به فرد شما طراحی می‌شود."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                                <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-2xl hover:border-white/80 transition-all duration-300 h-full shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    <h3 className="text-lg font-bold text-slate-800 mb-3">{item.title}</h3>
                                    <p className="text-slate-700 leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery / Atmosphere Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
                    <div className="relative rounded-3xl overflow-hidden shadow-lg group">
                        <Image
                            src="/rozaneh pics/3.jpg"
                            alt="Clinic Atmosphere"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white text-xl font-medium">محیطی آرام برای گفتگو</p>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-8">
                        <div className="relative rounded-3xl overflow-hidden shadow-lg group">
                            <Image
                                src="/rozaneh pics/4.jpg"
                                alt="Clinic Detail"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative rounded-3xl overflow-hidden shadow-lg group">
                            <Image
                                src="/rozaneh pics/5.jpg"
                                alt="Clinic Detail"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-4 px-6 mt-4 pb-20">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm flex flex-col items-center gap-3 px-4 py-4">
                    <div className="flex items-center gap-2">
                        <img src="/logo.svg" alt="Rozaneh Logo" className="w-8 h-8" />
                        <span className="text-sm font-bold text-gray-800">کلینیک روانشناسی روزنه</span>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-3 text-xs">
                        <Link href="/" className="hover:text-teal-600 text-gray-700 transition">خانه</Link>
                        <Link href="/therapists" className="hover:text-teal-600 text-gray-700 transition">مشاوران</Link>
                        <Link href="/assessments" className="hover:text-teal-600 text-gray-700 transition">تست‌ها</Link>
                        <Link href="/about" className="hover:text-teal-600 text-gray-700 transition">درباره</Link>
                        <Link href="/contact-us" className="hover:text-teal-600 text-gray-700 transition">تماس</Link>
                    </nav>
                    <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
                </div>
            </footer>
        </main >
    );
}
