async function deleteSaleParticipants(
    tx,
    saleId
) {
    return tx.saleParticipant.deleteMany({
        where: {
            saleId
        }
    });
}

async function createParticipants(
    tx,
    data
) {
    if (!data.length) {
        return;
    }

    return tx.saleParticipant.createMany({
        data
    });
}

module.exports = {
    deleteSaleParticipants,
    createParticipants
};