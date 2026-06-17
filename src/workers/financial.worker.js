const repository = require("../repositories/financial.repository");

async function processNextItem() {
    const item = await repository.getNextPendingItem();

    if (!item) {
        return;
    }

    try {
        await repository.markAsProcessing(item.id);

        console.log(
            `[FINANCIAL] Processing sale ${item.saleExternalId}`
        );

        await repository.markAsSuccess(item.id);



        await repository.updateImportStatistics(
            item.importId
        );

        console.log(
            `[FINANCIAL] Success ${item.saleExternalId}`
        );

    } catch (error) {

        await repository.markAsFailed(
            item.id,
            error.message
        );

        await repository.updateImportStatistics(
            item.importId
        );

        console.error(
            `[FINANCIAL] Failed ${item.saleExternalId}`,
            error
        );
    }
}

async function startWorker() {
    console.log(
        "[FINANCIAL] Worker started"
    );

    setInterval(async () => {
        await processNextItem();
    }, 3000);
}

startWorker();