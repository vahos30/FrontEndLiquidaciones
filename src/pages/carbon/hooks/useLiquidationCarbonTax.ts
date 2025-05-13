import { useState } from "react";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { liquidationsCarbonApi } from "@/core/infrastructure/api";

export const useLiquidationCarbonTax = (searchFilters: FiltersLiquidation) => {
    const [liquidation, setLiquidation] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    const [canLiquidate, setCanLiquidate] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const apiLquidation = new liquidationsCarbonApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const liquidation = await apiLquidation.getLiquidation(searchFilters);
            if (liquidation) {
                setLiquidation(liquidation.liquidations);
                setRate(liquidation.tarifa);
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

    return { liquidation, canLiquidate, rate, error, success, setLiquidation, getLiquidation, updateLiquidation, loading };
};