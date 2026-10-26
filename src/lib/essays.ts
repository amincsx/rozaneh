import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Essay, EssayBlock } from "@/app/essays/essaysData";

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

export async function getPublishedEssays(): Promise<Essay[]> {
    const rows = await prisma.essay.findMany({
        where: { isPublished: true },
        orderBy: { id: "asc" },
    });

    return rows.map(mapEssay);
}

export async function getPublishedEssayBySlug(slug: string): Promise<Essay | null> {
    const row = await prisma.essay.findFirst({
        where: { slug, isPublished: true },
    });

    return row ? mapEssay(row) : null;
}
