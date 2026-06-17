function mapSale(payload) {
    return {
        saleId: payload.SaleId,
        saleProcessId: payload.SaleProcessId,

        processOpeningDate: new Date(payload.ProcessOpeningDate),

        contractSignedDate: payload.ContractSignedDate
            ? new Date(payload.ContractSignedDate)
            : null,

        vgv: payload.VGV,

        saleStatus: payload.SaleStatus,
        saleStatusId: payload.SaleStatusId,
        saleStatusDate: new Date(payload.SaleStatusDate),

        productTypeId: payload.ProductTypeId,
        productType: payload.ProductType,

        product: payload.Product,

        productStreet: payload.ProductStreet,
        productNumber: payload.ProductNumber,
        productComplement: payload.ProductComplement,
        productNeighborhood: payload.ProductNeighborhood,
        productZipCode: payload.ProductZipCode,
        productPostalCode: payload.ProductPostalAddressCode,
        productCity: payload.ProductCity,
        productState: payload.ProductState,

        division: payload.Division,
        unit: payload.Unit,
        typeUnit: payload.TypeUnit,

        createDate: new Date(payload.CreateDate),
        changeDate: new Date(payload.ChangeDate),
    };
}

module.exports = {
    mapSale,
};