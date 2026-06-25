const { mapSale } = require("../mappers/sales.mapper");
const saleRepository = require("../repositories/sale.repository");

async function syncSale(tx, payload) {
    console.log("[SALE] Syncing sale", payload.SaleId);

    const saleData = mapSale(payload);

    console.log("[SALE] Data:", saleData);

    return saleRepository.upsertSale(
        tx,
        saleData
    );
}

module.exports = {
    syncSale
};