export interface  MonthsLiquidateProps{
    MesesLiquidar: periodo[];
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

export interface  MonthsLiquidateOBAProps{
    MesesLiquidar: periodoOBA[];
    handleMonthToggle: (anio: number,numerMes:number) => void;
}

interface periodoOBA {
    anio: number,
    meses: MesesOBA[],
}

interface MesesOBA {
    mes: string,
    numeroMes: number,
    habilitado: boolean,
    marcado: boolean,
    puedeLiquidar:boolean
}