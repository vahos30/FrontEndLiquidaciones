export interface LiquidationDto {
    checked: boolean;
    idContrato: string;
    cliente: string;
    consecutivo: string;
    tipoContrato: string;
    fuenteSuministro: string;
    fuenteSuministroId: number;
    precio: string;
    monedaLiquidacion: string;
    monedaPago: string;
    trmPagoEnPesos: string;
    totalNominado: number;
    entregado: string;
    totalSuministro: number;
    noNominado: string;
    totalNoNominadas: number;
    estado: string;
}