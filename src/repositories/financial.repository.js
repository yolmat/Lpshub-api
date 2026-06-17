const prisma = require("../lib/prisma");

// Criação dos imports
async function createImport(totalItems) {
    return prisma.financialImport.create({
        data: {
            totalItems,
            status: "PENDING"
        }
    });
}

async function createImportItems(importId, sales) {
    return prisma.financialImportItem.createMany({
        data: sales.map((sale) => ({
            importId,
            saleExternalId: sale.SaleId,
            status: "PENDING",
            payload: sale
        }))
    });
}

// Identificação da fila
async function updateImportStatistics(importId) {
    const items = await prisma.financialImportItem.findMany({
        where: {
            importId,
        },
        select: {
            status: true,
        },
    });

    const successItems = items.filter(
        item => item.status === "SUCCESS"
    ).length;

    const failedItems = items.filter(
        item => item.status === "FAILED"
    ).length;

    const totalItems = items.length;

    let status = "PROCESSING";

    if (successItems + failedItems === totalItems) {
        status =
            failedItems > 0
                ? "COMPLETED_WITH_ERRORS"
                : "COMPLETED";
    }

    return prisma.financialImport.update({
        where: {
            id: importId,
        },
        data: {
            successItems,
            failedItems,
            status,
            finishedAt:
                successItems + failedItems === totalItems
                    ? new Date()
                    : null,
        },
    });
}

// Identificação dos items na fila
async function getNextPendingItem() {
    return prisma.financialImportItem.findFirst({
        where: {
            status: "PENDING",
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

async function markAsProcessing(itemId) {
    return prisma.financialImportItem.update({
        where: {
            id: itemId,
        },
        data: {
            status: "PROCESSING",
            startedAt: new Date(),
        },
    });
}

async function markAsSuccess(itemId) {
    return prisma.financialImportItem.update({
        where: {
            id: itemId,
        },
        data: {
            status: "SUCCESS",
            finishedAt: new Date(),
        },
    });
}

async function markAsFailed(itemId, errorMessage) {
    return prisma.financialImportItem.update({
        where: {
            id: itemId,
        },
        data: {
            status: "FAILED",
            errorMessage: errorMessage?.substring(0, 1000),
            finishedAt: new Date(),
        },
    });
}

module.exports = {
    createImport,
    createImportItems,
    updateImportStatistics,
    getNextPendingItem,
    markAsProcessing,
    markAsSuccess,
    markAsFailed
};