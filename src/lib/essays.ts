import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { essaysData, type Essay, type EssayBlock } from "@/app/essays/essaysData";

const essayBlocksSchema: z.ZodType<EssayBlock[]> = z.array(
    z.discriminatedUnion("type", [
        z.object({
            type: z.literal("heading"),
            id: z.string(),
            level: z.union([z.literal(2), z.literal(3)]),
            text: z.string(),
        }),
        z.object({ type: z.literal("paragraph"), text: z.string() }),
        z.object({ type: z.literal("figure"), caption: z.string() }),
        z.object({ type: z.literal("bullets"), items: z.array(z.string()) }),
        z.object({
            type: z.literal("callout"),
            variant: z.enum(["info", "warning"]),
            title: z.string(),
            text: z.string(),
        }),
        z.object({
            type: z.literal("faq"),
            items: z.array(
                z.object({
                    question: z.string(),
                    answer: z.string(),
                }),
            ),
        }),
    ]),
);

const imagePositionSchema = z.object({
    card: z.string().optional(),
    hero: z.string().optional(),
});

const imageScaleSchema = z.object({
    card: z.number().optional(),
    hero: z.number().optional(),
});

function mapEssay(row: Prisma.EssayGetPayload<object>): Essay {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        seoTitle: row.seoTitle,
        metaDescription: row.metaDescription,
        author: row.author ?? undefined,
        publishedAt: row.publishedAt ?? undefined,
        category: row.category ?? undefined,
        image: row.image,
        imagePosition:
            row.imagePosition === null
                ? undefined
                : imagePositionSchema.parse(row.imagePosition),
        imageScale:
            row.imageScale === null
                ? undefined
                : imageScaleSchema.parse(row.imageScale),
        lead: row.lead,
        body: essayBlocksSchema.parse(row.body),
    };
}

function isDatabaseUnavailable(
    error: unknown,
): error is Prisma.PrismaClientInitializationError {
    return (
        error instanceof Prisma.PrismaClientInitializationError &&
        error.message.includes("Can't reach database server")
    );
}

async function withBundledEssaysFallback<T>(
    operation: () => Promise<T>,
    fallback: () => T,
): Promise<T> {
    try {
        return await operation();
    } catch (error) {
        if (!isDatabaseUnavailable(error)) {
            throw error;
        }

        console.error(
            "Essay database is unreachable; serving bundled essay data until it is available.",
            error,
        );
        return fallback();
    }
}

export async function getPublishedEssays(): Promise<Essay[]> {
    return withBundledEssaysFallback(
        async () => {
            const rows = await prisma.essay.findMany({
                where: { isPublished: true },
                orderBy: { id: "asc" },
            });

            return rows.map(mapEssay);
        },
        () => essaysData,
    );
}

export async function getLatestPublishedEssays(limit: number): Promise<Essay[]> {
    return withBundledEssaysFallback(
        async () => {
            const rows = await prisma.essay.findMany({
                where: { isPublished: true },
                orderBy: { id: "desc" },
                take: limit,
            });

            return rows.map(mapEssay).reverse();
        },
        () => {
            if (limit <= 0) {
                return [];
            }

            return [...essaysData]
                .sort((a, b) => a.id - b.id)
                .slice(-limit);
        },
    );
}

export async function getPublishedEssayBySlug(slug: string): Promise<Essay | null> {
    return withBundledEssaysFallback(
        async () => {
            const row = await prisma.essay.findFirst({
                where: { slug, isPublished: true },
            });

            return row ? mapEssay(row) : null;
        },
        () => essaysData.find((essay) => essay.slug === slug) ?? null,
    );
}
