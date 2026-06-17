-- CreateEnum
CREATE TYPE "ImportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'COMPLETED_WITH_ERRORS');

-- CreateEnum
CREATE TYPE "ImportItemStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "financial_imports" (
    "id" TEXT NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "successItems" INTEGER NOT NULL DEFAULT 0,
    "failedItems" INTEGER NOT NULL DEFAULT 0,
    "status" "ImportStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_imports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_import_items" (
    "id" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "saleExternalId" TEXT NOT NULL,
    "status" "ImportItemStatus" NOT NULL,
    "errorMessage" TEXT,
    "payload" JSONB NOT NULL,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_import_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "financial_import_items_status_idx" ON "financial_import_items"("status");

-- CreateIndex
CREATE INDEX "financial_import_items_saleExternalId_idx" ON "financial_import_items"("saleExternalId");

-- AddForeignKey
ALTER TABLE "financial_import_items" ADD CONSTRAINT "financial_import_items_importId_fkey" FOREIGN KEY ("importId") REFERENCES "financial_imports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
