import { FiltersLiquidationPBA, LiquidationPBAProps } from "@/core/domain/Entities";
import { LiquidationPBA } from "@/core/infrastructure/api";
import { ExcelClass, HEADERS_EXPORT_EXCEL_PBA } from "@/core/utils";
import { useEffect, useState } from "react";

export const useLiquidationPBA = (searchFilters: FiltersLiquidationPBA, selectedMonths?: string[]) => {

    const [DataMainCalculations, setDataMainCalculations] = useState<LiquidationPBAProps>({} as LiquidationPBAProps);
    const [loading, setLoading] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const apiPBA = new LiquidationPBA();
    const [PeriodoAcumulado, setPeriodoAcumulado] = useState<string>('');
    const [UltimoMesLiquidado, setUltimoMesLiquidado] = useState<string>('');
    const [MesesLiquidar, setMesesLiquidar] = useState<{ anio: number, meses: { mes: string, numeroMes: number, valido: boolean }[] }[]>([]);

    const makeCalculations = async () => {
        try {
            setLoading(true);
            setError('');
            const calculo = await apiPBA.makeCalculations(searchFilters);
            if( calculo.success) {
                setSuccess(calculo.mensaje || "Cálculo exitoso");
                getInfoLatestLiquidation();
                getMainCalculations();
                return;
            }
            setError(calculo.mensaje || "Error al calcular");
        } catch (error) {
            setError('Error al realizar el cálculos');
            console.error('Error al realizar el cálculos', error);
        } finally {
            setLoading(false);
        }        
    }

    const getInfoLatestLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const infoLast = await apiPBA.getInfoLastestLiquidation(searchFilters);
            if (infoLast) {
                setPeriodoAcumulado(infoLast.periodoAcumulado);
                setUltimoMesLiquidado(infoLast.ultimoMesLiquidado);
                setMesesLiquidar(infoLast.periodosLiquidar);
            }
        } catch (error) {
            setError('Error al consultar las información de meses liquidar');
            console.error('Error al consultar las información de meses liquidar', error);
        } finally {
            setLoading(false);
        }

    }

    const getMainCalculations = async (AccumulatedMonthsYear?: string[]) => {
        try {
            setLoading(true);
            setError('');
            const liquidation = await apiPBA.getMainCalculations(searchFilters, AccumulatedMonthsYear);
            if (liquidation) {
                setDataMainCalculations({
                    nominationConfirmed: liquidation.nominationConfirmed,
                    nominationConfirmedPartner: liquidation.nominationConfirmedPartner,
                    realParticipationPeerPartner: liquidation.realParticipationPeerPartner,
                    mbtu: liquidation.mbtu,
                    imbalanceMBTU: liquidation.imbalanceMBTU,
                    usd: liquidation.usd,
                    imbalanceUSD: liquidation.imbalanceUSD,
                });
            }
        } catch (error) {
            setError('Error al consultar información de liquidación');
            console.error('Error al consultar información de liquidación', error);
        } finally {
            setLoading(false);
        }

    }
    const makeLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const liquidar = await apiPBA.makeLiquidation(searchFilters);
            if(liquidar.success) {
                setSuccess(liquidar.mensaje || "Liquidación exitosa");
                getInfoLatestLiquidation();
                getMainCalculations();
                return;  
            }
            setError(liquidar.mensaje || "Error al liquidar");
        } catch (error) {
            setError('Error al ejecutar la liquidación');
            console.error('Error al ejecutar la liquidación', error);
        } finally {
            setLoading(false);
        }        
    }
    const getAgreementsPBA = async () => {
        try {
            setLoading(true);
            setError('');
            const agreentments = await apiPBA.getAgreementsPBA(searchFilters);
            if (agreentments) {
                setSuccess(agreentments);
            }
        } catch (error) {
            setError('Error al consumir endpoint de acuerdos PBA');
            console.error('Error al consumir endpoint de acuerdos PBA', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMainCalculations(selectedMonths);
    }, [selectedMonths]);

    const exportPBA = async () => {
        try {
            setLoading(true);
            setError('');
            const Dataexport = await apiPBA.getDataExportPBA(searchFilters);
            if (Dataexport && Dataexport.length > 0) {
                const cleanedData = Dataexport.map((item:any) => ({
                    ...item,
                    porcentajeParticipacion: item.porcentajeParticipacion.toString(),
                    totalNominacionConfirmada: item.totalNominacionConfirmada.toString(),
                    participacionRealPorSocio: item.participacionRealPorSocio.toString(),
                    desbalanceMBTU: item.desbalanceMBTU.toString(),
                    desbalanceUSD: item.desbalanceUSD.toString()
                }));
                ExcelClass.ExportExcel(cleanedData, 'LiquidationPBA', HEADERS_EXPORT_EXCEL_PBA);             
                setSuccess("Exportación exitosa");
                return;       
            }
            setError('No hay datos para exportar');
            
        } catch (error) {
            setError('Error al exportar datos de PBA');
            console.error('Error al exportar datos de PBA', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        makeCalculations,
        getInfoLatestLiquidation,
        getMainCalculations,
        makeLiquidation,
        getAgreementsPBA,
        setMesesLiquidar,
        exportPBA,        
        loading,
        error,
        DataMainCalculations,
        PeriodoAcumulado,
        UltimoMesLiquidado,
        MesesLiquidar,
        setOnSubmit,
        onSubmit,
        success
    };
}