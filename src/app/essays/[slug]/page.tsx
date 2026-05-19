import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { EssayBlock } from "../essaysData";
import { essaysData } from "../essaysData";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const essay = essaysData.find((item) => item.slug === slug);
    if (!essay) {
        return { title: "مقاله یافت نشد" };
    }
    return {
        title: essay.seoTitle,
        description: essay.metaDescription,
        openGraph: {
            title: essay.seoTitle,
            description: essay.metaDescription,
        },
    };
}

function collectToc(body: EssayBlock[]) {
    return body.filter(
        (b): b is Extract<EssayBlock, { type: "heading" }> =>
            b.type === "heading" && b.level === 2,
    );
}

function renderBlock(block: EssayBlock, index: number) {
    switch (block.type) {
        case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            const base =
                block.level === 2
                    ? "mt-12 scroll-mt-28 text-xl font-bold text-slate-900 first:mt-0 md:text-2xl"
                    : "mt-8 text-lg font-semibold text-slate-800 md:text-xl";
            return (
                <Tag key={index} id={block.id} className={base}>
                    {block.text}
                </Tag>
            );
        }
        case "paragraph":
            return (
                <p key={index} className="text-base leading-8 text-slate-700 md:text-lg md:leading-9">
                    {block.text}
                </p>
            );

        case "bullets":
            return (
                <ul
                    key={index}
                    className="my-4 space-y-2 rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4 md:px-6"
                >
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-base leading-8 text-slate-700 md:text-lg">
                            <span
                                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                                aria-hidden
                            />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "callout": {
            const styles =
                block.variant === "warning"
                    ? "border-amber-200 bg-amber-50/90 text-amber-950"
                    : "border-sky-200 bg-sky-50/90 text-sky-950";
            return (
                <div
                    key={index}
                    className={`my-8 rounded-2xl border px-5 py-4 shadow-sm md:px-6 md:py-5 ${styles}`}
                    role="note"
                >
                    <p className="text-base font-semibold md:text-lg">{block.title}</p>
                    <p className="mt-2 text-base leading-8 opacity-95 md:text-lg md:leading-9">
                        {block.text}
                    </p>
                </div>
            );
        }
        case "faq":
            return (
                <div key={index} className="mt-6 space-y-4">
                    {block.items.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md md:px-6 md:py-5"
                        >
                            <p className="text-base font-semibold text-slate-900 md:text-lg">
                                {item.question}
                            </p>
                            <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg md:leading-9">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
}

export default async function EssayDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const essay = essaysData.find((item) => item.slug === slug);

    if (!essay) {
        notFound();
    }

    const toc = collectToc(essay.body);

    return (
        <main dir="rtl" className="min-h-screen bg-[var(--background)] pb-16 font-sans antialiased">
            <div className="w-full pt-8 px-6" dir="ltr">
                <Link
                    href="/essays"
                    className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-normal px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-[13px]"
                >
                    بازگشت به مقالات
                </Link>
            </div>

            <div className="mx-auto max-w-5xl px-4 pt-8 md:px-6 md:pt-10">
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="relative h-56 w-full bg-slate-100 sm:h-72 md:h-96">
                        <Image
                            src={essay.image}
                            alt={essay.title}
                            fill
                            priority
                            className="object-cover"
                            style={{
                                objectPosition: essay.imagePosition?.hero ?? essay.imagePosition?.card ?? "center center",
                                transform: `scale(${essay.imageScale?.hero ?? essay.imageScale?.card ?? 1})`,
                            }}
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>

                    <div className="grid gap-10 p-5 md:grid-cols-[minmax(0,1fr)_240px] md:gap-12 md:p-8 lg:p-10">
                        <div className="order-2 min-w-0 space-y-2 md:order-1">
                            <header className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-5 md:px-6 md:py-6">
                                <h1 className="text-2xl font-bold leading-snug text-slate-900 md:text-4xl md:leading-tight">
                                    {essay.title}
                                </h1>
                                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
                                    {essay.lead}
                                </p>
                            </header>
                            <p className="rounded-xl border border-slate-100 bg-slate-50/90 px-4 py-3 text-sm leading-7 text-slate-600 md:text-base">
                                {essay.metaDescription}
                            </p>
                            <div className="space-y-1">{essay.body.map(renderBlock)}</div>
                        </div>

                        <aside className="order-1 md:order-2 md:sticky md:top-24 md:self-start">
                            <nav
                                aria-label="فهرست مطالب"
                                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 md:p-5"
                            >
                                <p className="text-sm font-bold text-slate-800 md:text-base">فهرست مطالب</p>
                                <ul className="mt-3 space-y-2 text-sm md:text-base">
                                    {toc.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className="text-teal-800 underline-offset-4 transition-colors hover:text-teal-950 hover:underline"
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>
                    </div>
                </article>
            </div>
        </main>
    );
}
