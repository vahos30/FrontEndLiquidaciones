import React from "react";
import { CustomAccordion } from "../../atoms";
import { MonthsLiquidate } from "./MonthsLiquidate";

interface InfoLiquidationProps {
    PeriodoAcumulado: string;
    UltimoMesLiquidado: string;
    MesesLiquidar: periodo[];
    handleMonthToggle: (key: string) => void;
}
interface periodo {
    anio: number;
    meses: Meses[];
}

interface Meses {
    mes: string;
    numeroMes: number;
    valido: boolean;
}

export const InfoLiquidation: React.FC<InfoLiquidationProps> = ({ PeriodoAcumulado, UltimoMesLiquidado, MesesLiquidar, handleMonthToggle }) => {
    return (
        <>
            <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Periodo acumulado</h1>}>
                <p>{PeriodoAcumulado}</p>
            </CustomAccordion>
            <CustomAccordion clas={"m-2"} header={<h1 className="titulo-two m-3">Último mes liquidado</h1>}>
                <p>{UltimoMesLiquidado}</p>
            </CustomAccordion>
            <MonthsLiquidate MesesLiquidar={MesesLiquidar} handleMonthToggle={handleMonthToggle} />
        </>
    );
}