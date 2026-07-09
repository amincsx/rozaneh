"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { essaysData } from "./essaysData";

export default function EssaysPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    const categories = useMemo(() => {
        return Array.from(
            new Set(essaysData.map((essay) => essay.category).filter((category): category is string => Boolean(category))),
        ).sort((a, b) => a.localeCompare(b, "fa"));
    }, []);

    const visibleEssays = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const filtered = essaysData.filter((essay) => {
            const haystack = [essay.title, essay.metaDescription, essay.lead, essay.category, essay.author]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
            const matchesCategory = !selectedCategory || essay.category === selectedCategory;

            return matchesQuery && matchesCategory;
        });

        return [...filtered].sort((a, b) => {
            switch (sortOrder) {
                case "newest":
                    return b.id - a.id;
                case "oldest":
                    return a.id - b.id;
                case "title-asc":
                    return a.title.localeCompare(b.title, "fa");
                case "title-desc":
                    return b.title.localeCompare(a.title, "fa");
                case "category":
                    return (a.category ?? "").localeCompare(b.category ?? "", "fa");
                case "default":
                default:
                    return b.id - a.id;
            }
        });
    }, [searchQuery, selectedCategory, sortOrder]);

    return (
        <main dir="rtl" className="min-h-screen font-sans antialiased">
            <div className="w-full px-6 pt-8" dir="ltr">
                <Link
                    href="/"
                    className="inline-block rounded-lg border border-white/30 bg-white/20 px-4 py-2 text-[13px] font-normal text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
                >
                    بازگشت به صفحه اصلی
                </Link>
            </div>

            <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur md:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <h1 className="text-2xl font-bold text-slate-900">مقالات و راهنمایی‌های روزنه</h1>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                در این بخش می‌توانید مقالات مرتبط با سلامت روان، خانواده و رشد فردی را جست‌وجو، فیلتر و مرتب کنید.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                            <label className="flex flex-col text-sm text-slate-600">
                                <span className="mb-1">جست‌وجو</span>
                                <input
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="نام مقاله، موضوع یا نویسنده"
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none ring-0 transition focus:border-teal-500"
                                />
                            </label>

                            <label className="flex flex-col text-sm text-slate-600">
                                <span className="mb-1">موضوع</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(event) => setSelectedCategory(event.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-teal-500"
                                >
                                    <option value="">همه موضوع‌ها</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex flex-col text-sm text-slate-600">
                                <span className="mb-1">مرتب‌سازی</span>
                                <select
                                    value={sortOrder}
                                    onChange={(event) => setSortOrder(event.target.value)}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-teal-500"
                                >
                                    <option value="default">پیش‌فرض</option>
                                    <option value="newest">جدیدترین</option>
                                    <option value="oldest">قدیمی‌ترین</option>
                                    <option value="title-asc">الف تا ی</option>
                                    <option value="title-desc">ی تا الف</option>
                                    <option value="category">بر اساس موضوع</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-500">
                        {visibleEssays.length} مقاله
                    </div>
                </div>

                {visibleEssays.length > 0 ? (
                    <section className="grid h-full w-full gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        {visibleEssays.map((essay) => (
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
                                        style={{
                                            objectPosition: essay.imagePosition?.card ?? "center center",
                                            transform: `scale(${essay.imageScale?.card ?? 1})`,
                                        }}
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                    />
                                </div>

                                <div className="space-y-3 p-4">
                                    <h2 className="line-clamp-2 text-lg font-bold text-slate-800">{essay.title}</h2>
                                    <p className="line-clamp-3 text-sm leading-7 text-slate-600">{essay.metaDescription}</p>
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                        {essay.author ? <span>نویسنده: {essay.author}</span> : null}
                                        {essay.publishedAt ? (
                                            <span dir="rtl" className="text-right">
                                                • {essay.publishedAt}
                                            </span>
                                        ) : null}
                                        {essay.category ? (
                                            <span className="rounded-full bg-teal-100 px-2 py-0.5 text-teal-700">
                                                {essay.category}
                                            </span>
                                        ) : null}
                                    </div>
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
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-600">
                        هیچ مقاله‌ای با این فیلترها پیدا نشد.
                    </div>
                )}
            </div>
        </main>
    );
}
