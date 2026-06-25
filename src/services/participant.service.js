const participantRepository = require(
    "../repositories/participant.repository"
);

const {
    mapParticipant
} = require(
    "../mappers/participant.mapper"
);

async function syncParticipants(
    tx,
    sale,
    payload
) {

    await participantRepository
        .deleteSaleParticipants(
            tx,
            sale.id
        );

    const participants = [];

    for (
        const participantPayload
        of payload.Participants || []
    ) {

        if (
            !participantPayload.Person ||
            !participantPayload.Person.Id
        ) {
            continue;
        }

        const person =
            await tx.person.findUnique({
                where: {
                    externalId:
                        participantPayload
                            .Person
                            .Id
                }
            });

        if (!person) {
            continue;
        }

        participants.push(
            mapParticipant(
                sale.id,
                person.id,
                participantPayload
            )
        );
    }

    await participantRepository
        .createParticipants(
            tx,
            participants
        );
}

module.exports = {
    syncParticipants
};