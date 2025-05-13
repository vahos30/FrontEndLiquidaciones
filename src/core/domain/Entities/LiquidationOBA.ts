export interface DeliveryPointProps{
    id: number;
    codigo: string;
    descripcion: string;
}

export interface LiquidationResponseOBAProps {
    error:string | null;
    liquidaciones: LiquidationOBAProps[];
}

export interface LiquidationOBAProps {
    idliquidation:string;
    idPuntoEntrega:number;
    puntoDeEntrega:string;
    acumuladoDesbalanceDiarioMbtu:number;
    acumuladoDesbalanceMensualMbtu:number;
    acumuladoDesbalanceAcumuladoMbtu:number;
    acumuladoDesbalanceUsd:number;
    acumuladoConsolidadoNominaciones:number;
    acumuladoEntregaKPC:number;
    acumuladoPoderCalorifico:number;
    mensajeError:string | null;
    verDetalle:boolean;
    estado:string;//estadoLiquidacion    
    checked:boolean;    
}

export interface LiquidationDeatailOBAProps {
    error:string | null;
    getInfoLatestLiquidationResponse: InfoLatestLiquidationOBAResponseProps;
}

export interface InfoLatestLiquidationOBAResponseProps{
    periodoAcumulado:string;
    ultimoMesLiquidado:string;
    periodosLiquidar:{
        anio: number,
        meses: Meses[],
    }[]    
}
interface Meses {
    mes: string,
    numeroMes: number,
    habilitado: boolean,
    marcado: boolean,
    puedeLiquidar: boolean
}
export interface DetalleOBAProps {
    fecha:string;
    desbalanceDiarioMbtu:number;
    desbalanceMensualMbtu:number;
    desbalanceAcumuladoMbtu:number;
    desbalanceUsd:number;
    consolidadoNominaciones:number;
    entregaKPC:number;
    poderCalorifico:number;
}

export interface ImbalancesOBADetailProps{
    error:string | null;
    imbalancesObaDetail: PaginatedListOBA<DetalleOBAProps>;
}
export interface ImbalancesOBAResponse {    
    items: DetalleOBAProps[];
}
export interface PaginatedListOBA<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface CustomTablaOBAProps {
    liquidationDetails: DetalleOBAProps[];
}