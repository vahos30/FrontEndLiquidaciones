import { useState } from "react";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { higheringcomeApi } from "@/core/infrastructure/api";

export const useLiquidationHigheringcome = (searchFilters: FiltersLiquidation) => {
    const [liquidation, setLiquidation] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [canLiquidate, setCanLiquidate] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const apiLquidation = new higheringcomeApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const liquidation = await apiLquidation.getLiquidation(searchFilters);
            if (liquidation) {
                setLiquidation(liquidation.liquidations);
                setCanLiquidate(!liquidation.puedeLiquidar);
            }
        } catch (error) {
            setError('Error al consultar las liquidaciones de suministro');
            console.error('Error al consultar las liquidaciones de suministro', error);
        } finally {
            setLoading(false);
        }
    }

    const updateLiquidation = async (liquidations: any[]) => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const response = await apiLquidation.updateLiquidation(liquidations);
            if (response === "Exitoso!") {
                setSuccess('Liquidación realizada correctamente!');
                await getLiquidation();
            }
        } catch (error) {
            setError('Error al realizar la liquidación');
            console.error('Error al realizar la actualización', error);
        } finally {
            setLoading(false);
        }
    }

    return { liquidation, canLiquidate, error, success, getLiquidation, updateLiquidation, loading };
};