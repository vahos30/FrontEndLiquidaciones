export interface DataConsumoDiarioProps {
    FuenteSuministro: string;
    Socios: Socios[];
    Fechas: Fechas;
}

export interface Socios {
    id: number;
    nombre: string;
}
export interface Fechas {
    [key: string]: FechasData[];
}
export interface FechasData {
    id: number;
    Socio: string;
    Energia: number;
    Desbalance: number;
}