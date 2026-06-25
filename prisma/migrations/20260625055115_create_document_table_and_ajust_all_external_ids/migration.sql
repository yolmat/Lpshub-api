/*
  Warnings:

  - You are about to drop the column `personExternalId` on the `payment_beneficiaries` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `payment_beneficiaries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `persons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `sale_participants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "payment_beneficiaries" DROP COLUMN "personExternalId",
ADD COLUMN     "personId" TEXT;

-- AlterTable
ALTER TABLE "persons" ALTER COLUMN "sapId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "person_documents" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "person_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_documents_personId_type_value_key" ON "person_documents"("personId", "type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "payment_beneficiaries_externalId_key" ON "payment_beneficiaries"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_externalId_key" ON "payments"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "persons_externalId_key" ON "persons"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "sale_participants_externalId_key" ON "sale_participants"("externalId");

-- AddForeignKey
ALTER TABLE "payment_beneficiaries" ADD CONSTRAINT "payment_beneficiaries_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_documents" ADD CONSTRAINT "person_documents_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
