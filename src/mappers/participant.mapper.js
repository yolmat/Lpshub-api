function mapParticipant(
    saleId,
    personId,
    payload
) {
    return {
        externalId: payload.Id,

        companyId: payload.CompanyId,

        participantTypeId:
            payload.ParticipantTypeId,

        participantType:
            payload.ParticipantType,

        salePercentage:
            payload.SalePercentage,

        saleId,
        personId,

        createDate:
            new Date(payload.CreateDate),

        changeDate:
            new Date(payload.ChangeDate)
    };
}

module.exports = {
    mapParticipant
};