import { FiltersLiquidationOBA, LiquidationOBAProps } from "@/core/domain/Entities";
import { LiquidationOBA } from "@/core/infrastructure/api";
import { useState } from "react";

export const useLiquidationOBA = (searchFilters: FiltersLiquidationOBA) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');
    const [success, setSuccess] = useState<string>('');
    const [liquidationsOBA, setLiquidationsOBA] = useState<LiquidationOBAProps[]>([]);    
    const api = new LiquidationOBA();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const result = await api.getListOBA(searchFilters);
            if (result) {
                setLiquidationsOBA(result.liquidaciones);
                setError(result.error);
            }

        } catch (error) {
            setError('Error al consultar las liquidaciones OBA');
            console.error('Error al consultar las liquidaciones OBA', error);
        } finally {
            setLoading(false);
        }
    }

    const makeCalculations = async () => {
        try {
            setLoading(true);
            setError('');
            const calculo = await api.makeCalculations(searchFilters, liquidationsOBA.filter((liquidation) => liquidation.checked).map((liquidation) => liquidation.idPuntoEntrega));
            if (calculo.success) {
                setSuccess(calculo.mensaje || "Cálculo exitoso");
                getLiquidation();
                return;
            }
            setError(calculo.mensaje || "Error al calcular");
        } catch (error) {
            setError('Error al realizar el cálculos de OBA');
            console.error('Error al realizar el cálculos de OBA', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        getLiquidation,
        setLiquidationsOBA,
        makeCalculations,
        liquidationsOBA,
        loading,
        error,
        success
    };

}