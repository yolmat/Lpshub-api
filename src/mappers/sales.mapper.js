function parseDate(value) {
    if (!value) {
        return null;
    }

    const date = new Date(value);

    return isNaN(date.getTime())
        ? null
        : date;
}

function mapSale(payload) {
    return {
        saleId: payload.SaleId,

        saleProcessId: payload.SaleProcessId,

        processOpeningDate: parseDate(
            payload.ProcessOpeningDate
        ),

        contractSignedDate: parseDate(
            payload.ContractSignedDate
        ),

        vgv: payload.VGV,

        saleStatus: payload.SaleStatus,

        saleStatusId: payload.SaleStatusId,

        saleStatusDate: parseDate(
            payload.SaleStatusDate
        ),

        productTypeId: payload.ProductTypeId,

        productType: payload.ProductType,

        product: payload.Product,

        productStreet: payload.ProductStreet,

        productNumber: payload.ProductNumber,

        productComplement:
            payload.ProductComplement,

        productNeighborhood:
            payload.ProductNeighborhood,

        productZipCode:
            payload.ProductZipCode,

        productPostalCode:
            payload.ProductPostalAddressCode,

        productCity:
            payload.ProductCity,

        productState:
            payload.ProductState,

        division:
            payload.Division,

        unit:
            payload.Unit,

        typeUnit:
            payload.TypeUnit,

        createDate: parseDate(
            payload.CreateDate
        ),

        changeDate: parseDate(
            payload.ChangeDate
        )
    };
}

module.exports = {
    mapSale,
};