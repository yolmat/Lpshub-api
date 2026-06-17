const { z } = require("zod");

const financialSaleSchema = z.object({
    SaleId: z.string().uuid(),
    SaleProcessId: z.number()
});

const financialImportSchema = z.array(
    financialSaleSchema
);

module.exports = {
    financialImportSchema
};