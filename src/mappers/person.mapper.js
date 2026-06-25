function mapPerson(payload) {
    return {
        externalId: payload.Id,
        sapId: payload.SapId,
        name: payload.Name,
        nickname: payload.Nickname,
        personType: payload.PersonType,
        personGroup: payload.PersonGroup
    };
}

function mapDocuments(personId, documents) {
    return documents.map(doc => ({
        personId,
        type: doc.Type,
        value: doc.Value
    }));
}

module.exports = {
    mapPerson,
    mapDocuments
};