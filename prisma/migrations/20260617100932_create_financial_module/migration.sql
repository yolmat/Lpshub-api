-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "saleProcessId" INTEGER NOT NULL,
    "processOpeningDate" TIMESTAMP(3) NOT NULL,
    "contractSignedDate" TIMESTAMP(3),
    "vgv" DECIMAL(65,30) NOT NULL,
    "saleStatus" TEXT NOT NULL,
    "saleStatusId" INTEGER NOT NULL,
    "saleStatusDate" TIMESTAMP(3) NOT NULL,
    "productTypeId" INTEGER,
    "productType" TEXT,
    "product" TEXT,
    "productStreet" TEXT,
    "productNumber" TEXT,
    "productComplement" TEXT,
    "productNeighborhood" TEXT,
    "productZipCode" TEXT,
    "productCity" TEXT,
    "productPostalCode" TEXT,
    "productState" TEXT,
    "division" TEXT,
    "unit" TEXT,
    "typeUnit" TEXT,
    "createDate" TIMESTAMP(3) NOT NULL,
    "changeDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_siav" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "pv" INTEGER NOT NULL,

    CONSTRAINT "sale_siav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER,
    "sapId" TEXT NOT NULL,
    "name" TEXT,
    "nickname" TEXT,
    "personType" TEXT,
    "personGroup" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_participants" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "participantTypeId" INTEGER NOT NULL,
    "participantType" TEXT NOT NULL,
    "salePercentage" DECIMAL(18,2) NOT NULL,
    "saleId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "changeDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "saleId" TEXT NOT NULL,
    "treasuryDate" TIMESTAMP(3),
    "documentNumber" INTEGER,
    "installmentNumber" INTEGER,
    "paymentType" TEXT,
    "paymentValue" DECIMAL(18,2) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "renegotiated" BOOLEAN NOT NULL,
    "personResponsibleId" INTEGER,
    "createDate" TIMESTAMP(3) NOT NULL,
    "changeDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_beneficiaries" (
    "id" TEXT NOT NULL,
    "externalId" INTEGER NOT NULL,
    "paymentId" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "personExternalId" INTEGER NOT NULL,
    "mainBeneficiary" BOOLEAN NOT NULL,
    "beneficiaryValue" DECIMAL(18,2) NOT NULL,
    "paymentBeneficiaryTypeId" INTEGER NOT NULL,
    "typeBeneficiaryPayment" TEXT NOT NULL,
    "serviceType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_royalties" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "personId" INTEGER,
    "companyId" INTEGER,
    "beneficiaryType" TEXT,
    "beneficiaryValue" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "payment_royalties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_sap_configurations" (
    "id" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "sapConfigurationType" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "configurationAcronym" TEXT NOT NULL,

    CONSTRAINT "payment_sap_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_events" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "salesEventId" INTEGER NOT NULL,
    "salesEvent" TEXT NOT NULL,
    "salesEventDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_saleId_key" ON "sales"("saleId");

-- CreateIndex
CREATE UNIQUE INDEX "sales_saleProcessId_key" ON "sales"("saleProcessId");

-- AddForeignKey
ALTER TABLE "sale_siav" ADD CONSTRAINT "sale_siav_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_participants" ADD CONSTRAINT "sale_participants_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_participants" ADD CONSTRAINT "sale_participants_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_beneficiaries" ADD CONSTRAINT "payment_beneficiaries_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_royalties" ADD CONSTRAINT "payment_royalties_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "payment_beneficiaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_sap_configurations" ADD CONSTRAINT "payment_sap_configurations_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "payment_beneficiaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_events" ADD CONSTRAINT "sale_events_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
