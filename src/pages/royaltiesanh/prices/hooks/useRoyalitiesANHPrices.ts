import { useState } from "react";
import { royaltiesApi } from "@/core/infrastructure/api";
import { STATE_LIQUIDATION_PENDING } from "@/core/utils";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";

export const useRoyalitiesANHPrices = (searchFilters: FiltersLiquidationANH) => {
    const [liquidation, setLiquidation] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, ] = useState<string>('');
    const [canLiquidate, setCanLiquidate] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const api = new royaltiesApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const result = await api.getRoyalitiesANHPrices(searchFilters);
            if (result) {
                setLiquidation(result);
            }
        } catch (error) {
            setError('Error al consultar las regalías ANH');
            console.error('Error al consultar las regalías ANH', error);
        } finally {
            setLoading(false);
        }
    }

    const LiquidateToLiquidation = async (idLiquidations: string[]) => {
        try {
            setLoading(true);
            setError('');
            const result = await api.UpdatePriceANH(idLiquidations,searchFilters);
            await getLiquidation();
        } catch (error) {
            setError('Error al liquidar');
            console.error('Error al liquidar', error);
        } finally {
            setLoading(false);
        }
    }

    return { liquidation, canLiquidate, error, success, setLiquidation, getLiquidation, loading, LiquidateToLiquidation };
};