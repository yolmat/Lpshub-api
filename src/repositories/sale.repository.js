const prisma = require("../lib/prisma");

async function upsertSale(tx, data) {
    return tx.sale.upsert({
        where: {
            saleId: data.saleId
        },
        update: data,
        create: data
    });
}

module.exports = {
    upsertSale
};