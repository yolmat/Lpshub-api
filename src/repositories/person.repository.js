async function upsertPerson(tx, data) {
    return tx.person.upsert({
        where: {
            externalId: data.externalId
        },
        update: data,
        create: data
    });
}

async function deleteDocuments(tx, personId) {
    return tx.personDocument.deleteMany({
        where: {
            personId
        }
    });
}

async function createDocuments(tx, data) {
    if (!data.length) {
        return;
    }

    return tx.personDocument.createMany({
        data
    });
}

module.exports = {
    upsertPerson,
    deleteDocuments,
    createDocuments
};