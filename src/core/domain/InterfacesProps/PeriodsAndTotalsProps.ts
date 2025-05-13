export interface PeriodsAndTotalsProps {
    DataMainCalculations:{
        nominationConfirmed: string,
        nominationConfirmedPartner: Data[],
        realParticipationPeerPartner: Data[],
        mbtu: string,
        imbalanceMBTU: Data[],
        usd: string,
        imbalanceUSD: Data[]
    },
    PeriodoAcumulado:string,
    UltimoMesLiquidado:string,
    MesesLiquidar:periodo[];
    handleMonthToggle: (key: string) => void;
}
interface periodo {
    anio: number,
    meses: Meses[],
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