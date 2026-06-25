const { z } = require("zod");

const documentSchema = z.object({
    Type: z.string(),
    Value: z.string().nullable()
});

const personSchema = z.object({
    Id: z.number(),
    SapId: z.string().nullable(),
    Name: z.string().nullable(),
    Nickname: z.string().nullable(),
    PersonType: z.string().nullable(),
    PersonGroup: z.string().nullable(),
    Documents: z.array(documentSchema).nullable()
});

const autonomousCompanySchema = z.object({
    Id: z.number(),
    Name: z.string().nullable(),
    PersonGroup: z.string().nullable(),
    SapId: z.string().nullable(),
    Nickname: z.string().nullable(),
    PersonType: z.string().nullable(),
    Documents: z.any().nullable()
});

const participantSchema = z.object({
    Id: z.number(),
    CompanyId: z.number(),

    Person: personSchema,

    ParticipantTypeId: z.number(),
    ParticipantType: z.string(),

    SalePercentage: z.number(),

    AutonomousCompany: autonomousCompanySchema.optional(),

    CreateDate: z.string(),
    ChangeDate: z.string()
});

const royaltySchema = z.object({
    PersonId: z.number(),
    CompanyId: z.number(),
    BeneficiaryType: z.string().nullable(),
    BeneficiaryValue: z.number()
});

const sapConfigurationSchema = z.object({
    SapConfigurationType: z.string(),
    ServiceType: z.string(),
    ConfigurationAcronym: z.string()
});

const blockSchema = z.object({
    BlockDate: z.string(),
    UnlockDate: z.string(),
    BlockType: z.string().nullable(),
    Comment: z.string().nullable()
});

const beneficiarySchema = z.object({
    Id: z.number(),
    CompanyId: z.number(),
    PersonId: z.number(),

    MainBeneficiary: z.boolean(),

    BeneficiaryValue: z.number(),

    PaymentBeneficiaryTypeId: z.number(),

    TypeBeneficiaryPayment: z.string(),
    ServiceType: z.string(),

    Block: blockSchema.optional(),

    Royalty: z.array(
        royaltySchema
    ).optional(),

    SapConfiguration: z.array(
        sapConfigurationSchema
    ).optional()
});

const paymentSchema = z.object({
    Id: z.number(),

    TreasuryDate: z.string(),

    DocumentNumber: z.number(),

    InstallmentNumber: z.number(),

    PaymentType: z.string(),

    PaymentValue: z.number(),

    ExpirationDate: z.string(),

    Active: z.boolean(),

    Renegotiated: z.boolean(),

    PersonResponsibleId: z.number(),

    Beneficiaries: z.array(
        beneficiarySchema
    ),

    CreateDate: z.string().optional(),

    ChangeDate: z.string().optional()
});

const saleEventSchema = z.object({
    SalesEvent: z.string(),

    SalesEventId: z.number(),

    SalesEventDate: z.string()
});

const siavSchema = z.object({
    PV: z.number()
});

const financialSaleSchema = z.object({
    SaleId: z.string().uuid(),

    SaleProcessId: z.number(),

    Siav: z.array(siavSchema),

    ProcessOpeningDate: z.string(),

    VGV: z.number(),

    SaleStatus: z.string(),

    SaleStatusId: z.number(),

    SaleStatusDate: z.string(),

    ContractSignedDate: z.string().nullable(),

    ProductTypeId: z.number(),

    ProductType: z.string(),

    Product: z.string(),

    ProductStreet: z.string().nullable(),

    ProductNumber: z.string().nullable(),

    ProductComplement: z.string().nullable(),

    ProductNeighborhood: z.string().nullable(),

    ProductZipCode: z.string().nullable(),

    ProductPostalAddressCode: z.string().nullable(),

    ProductCity: z.string().nullable(),

    ProductState: z.string().nullable(),

    Division: z.string().nullable(),

    Unit: z.string().nullable(),

    TypeUnit: z.string().nullable(),

    CreateDate: z.string(),

    ChangeDate: z.string(),

    Participants: z.array(
        participantSchema
    ).default([]),

    Payments: z.array(
        paymentSchema
    ).default([]),

    SalesEvent: z.array(
        saleEventSchema
    ).default([])
});

const financialImportSchema = z.array(
    financialSaleSchema
);

module.exports = {
    financialImportSchema,
    financialSaleSchema
};