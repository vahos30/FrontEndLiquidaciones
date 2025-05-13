import { FiltersLiquidationPBA } from "./FilterLiquidationPBA"

export interface LiquidationPBAProps {
    nominationConfirmed: string,
    nominationConfirmedPartner: Data[],
    realParticipationPeerPartner: Data[],
    mbtu: string,
    imbalanceMBTU: Data[],
    usd: string,
    imbalanceUSD: Data[]
}

export interface ParticipacionAcuerdoPBAProps {
    NombreSocio: string,
    PorcentajeParticipacion: number,
}

export interface ConsumoDiarioPBAProps {
    searchFilters: FiltersLiquidationPBA,
    onSubmit?: boolean;
}
export interface PaginatedList<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface FechaDetalleResponse {
    id?: number;
    socio?: string;
    energia?: number;
    desbalance?: number;
}
export interface FechasResponse {
    fecha?: string;
    items: FechaDetalleResponse[];
}
interface SociosProps {
    id?: number,
    nombre?: string,
}
export interface DataDailyConsumption {
    FuenteSuministro: string;
    Socios: SociosProps[];
    Fechas: PaginatedList<FechasResponse>;
}

export interface LastestLiquidationsProps {
    periodoAcumulado: string,
    ultimoMesLiquidado: string,
    periodosLiquidar: [
        {
            anio: number,
            meses: Meses[],
        }
    ]
}
interface Meses {
    mes: string,
    numeroMes: number,
    valido: boolean
}
interface Data {
    namePartner: string,
    value: string
}