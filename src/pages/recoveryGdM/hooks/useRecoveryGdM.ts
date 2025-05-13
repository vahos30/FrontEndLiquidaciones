import { useState } from "react";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { recoveryGdMApi } from "@/core/infrastructure/api/recoveryGdMApi";
import { MONTH_NAMES } from "@/core/utils";

export const useRecoveryGdM = (searchFilters: FiltersLiquidation) => {
    const [liquidation, setLiquidation] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const api = new recoveryGdMApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const liquidation = await api.getLiquidation(searchFilters);
            if (liquidation) {
                setLiquidation(liquidation.liquidations);
            }
        } catch (error) {
            setError('Error al consultar las liquidaciones de recobro de GdM');
            console.error('Error al consultar las liquidaciones de recobro de GdM', error);
        } finally {
            setLoading(false);
        }
    }

    const getDataByExport = (year: number, month: number) => {
        const cleanedData: any[] = []
                
        liquidation.forEach(item => {
            item.detalles.forEach((detail: any) => {
                cleanedData.push({
                    date: MONTH_NAMES[month] + " - " + year,
                    razonSocial: item.razonSocial,
                    consecutivo: detail.consecutivo,
                    fuenteSuministro: detail.fuenteSuministro,
                    cantidadCdnaporMbtu: detail.cantidadCdnaporMbtu,
                    cobroReembolsoCop: detail.cobroReembolsoCop
                })
            })
        });
        return cleanedData;
    }


    return { liquidation, error, success, setLiquidation, getLiquidation, getDataByExport, loading };
};