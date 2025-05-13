export interface DeliveryPoint {
    id: number | string;
    idPuntoEntregaGas?: number | string;
    codigoGDM?: string | number;
    nombre: string;
    fecha?: string;
    poder?: string;
}