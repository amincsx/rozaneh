CREATE TABLE "essays" (
    "id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "author" TEXT,
    "publishedAt" TEXT,
    "category" TEXT,
    "image" TEXT NOT NULL,
    "imagePosition" JSONB,
    "imageScale" JSONB,
    "lead" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "essays_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "essays_slug_key" ON "essays"("slug");
CREATE INDEX "essays_isPublished_id_idx" ON "essays"("isPublished", "id");
