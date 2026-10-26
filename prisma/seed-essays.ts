import { Prisma, PrismaClient } from "@prisma/client";
import { essaysData } from "../src/app/essays/essaysData.ts";

const prisma = new PrismaClient();

function toInputJson(value: unknown): Prisma.InputJsonValue {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

async function main() {
    const result = await prisma.essay.createMany({
        data: essaysData.map((essay) => ({
            id: essay.id,
            slug: essay.slug,
            title: essay.title,
            seoTitle: essay.seoTitle,
            metaDescription: essay.metaDescription,
            author: essay.author ?? null,
            publishedAt: essay.publishedAt ?? null,
            category: essay.category ?? null,
            image: essay.image,
            imagePosition: essay.imagePosition
                ? toInputJson(essay.imagePosition)
                : Prisma.DbNull,
            imageScale: essay.imageScale
                ? toInputJson(essay.imageScale)
                : Prisma.DbNull,
            lead: essay.lead,
            body: toInputJson(essay.body),
            isPublished: true,
        })),
        skipDuplicates: true,
    });

    console.log(
        `Essay import complete: ${result.count} inserted, ${essaysData.length - result.count} already present.`,
    );
}

main()
    .catch((error: unknown) => {
        console.error("Essay import failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
