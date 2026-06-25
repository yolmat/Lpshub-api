const {
    financialImportSchema
} = require("../validations/import.schema");

const financialService = require("../services/import.service");

async function importSales(req, res, next) {
    try {
        const sales = financialImportSchema.parse(
            req.body
        );

        const importBatch =
            await financialService.enqueueImport(
                sales
            );

        return res.status(202).json({
            success: true,
            importId: importBatch.id,
            totalItems: sales.length
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    importSales
};