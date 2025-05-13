export interface ParamsUpdatePointsByLiquidation {
    idContract: string;
    liquidationDate: string;
    idSource: number;
    isCarbonTax: boolean;
    deliveryPoints: DeliveryPoint[];
}

interface DeliveryPoint {
    idDeliveryPoint: number;
    delivered: number;
}