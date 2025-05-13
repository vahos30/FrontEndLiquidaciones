import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";
import { factorXApi } from "@/core/infrastructure/api";
import { useState } from "react";

export const useFactorXLiquidation = (searchFilters: FiltersLiquidationANH) => {
    const [factors, setFactors] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const api = new factorXApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const result = await api.getFactorXLiquidation(searchFilters);
            setFactors(result);
            
        } catch (error) {
            setError('Error al consultar factor x');
            console.error('Error al consultar factor x', error);
        } finally {
            setLoading(false);
        }
    }
    const liquidateFactorX = async (idLiquidaciones:string[]) => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const result = await api.liquidateFactorX(searchFilters,idLiquidaciones);
            if(result) {
                setSuccess("Liquidación realizada con éxito");
                getLiquidation();
            }else{
                setError('Error al liquidar factor x');
            }
        } catch (error) {
            setError('Error al liquidar factor x');
            console.error('Error al liquidar factor x', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        factors,
        setFactors,
        error,
        setError,
        success,
        loading,
        setSuccess,
        getLiquidation,
        liquidateFactorX
    }
}