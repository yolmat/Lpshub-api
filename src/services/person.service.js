const repository = require(
    "../repositories/person.repository"
);

const {
    mapPerson,
    mapDocuments
} = require(
    "../mappers/person.mapper"
);

async function syncPersons(tx, payload) {

    const participants =
        payload.Participants || [];

    const personMap = new Map();

    for (const participant of participants) {

        if (!participant.Person) {
            continue;
        }

        personMap.set(
            participant.Person.Id,
            participant.Person
        );
    }

    for (const personPayload of personMap.values()) {

        const person =
            await repository.upsertPerson(
                tx,
                mapPerson(personPayload)
            );

        await repository.deleteDocuments(
            tx,
            person.id
        );

        const documents =
            mapDocuments(
                person.id,
                personPayload.Documents || []
            );

        await repository.createDocuments(
            tx,
            documents
        );
    }
}

module.exports = {
    syncPersons
};