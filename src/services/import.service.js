const repository = require("../repositories/import.repository");

async function enqueueImport(sales) {
    const importBatch = await repository.createImport(
        sales.length
    );

    await repository.createImportItems(
        importBatch.id,
        sales
    );

    return importBatch;
}

module.exports = {
    enqueueImport,
};