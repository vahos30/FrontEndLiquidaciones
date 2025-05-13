import { useState } from "react";
import { royaltiesApi } from "@/core/infrastructure/api";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";

export const useRoyalitiesANHLiquidation = (searchFilters: FiltersLiquidationANH) => {
    const [liquidation, setLiquidation] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [canLiquidate, setCanLiquidate] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageLiquidation, setMessageLiquidation] = useState<string>('');
    const [liquidationPrice, setLiquidationPrice] = useState<boolean>(true);
    const api = new royaltiesApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const result = await api.getRoyalitiesANHLiquidation(searchFilters);
            setMessageLiquidation('');
            if (result) {
                setLiquidation(result.liquidations);
                setLiquidationPrice(result.liquidatePrice);
                if (!result.liquidatePrice) {
                    setCanLiquidate(false);
                    setMessageLiquidation(`Recuerde: Primero debe realizar la liquidación de 'Precio' para el mes seleccionado para continuar`)
                }
            }
        } catch (error) {
            setError('Error al consultar las regalías ANH');
            console.error('Error al consultar las regalías ANH', error);
        } finally {
            setLoading(false);
        }
    }
    const UpdateLiquidation = async (liquidación: any) => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const result = await api.UpdateLiquidationsANH(liquidación);

            if (result.success) {
                setSuccess(result.mensaje)
                getLiquidation();
            } else {
                setError(result.mensaje);
            }
        } catch (error) {
            setError('Error al actualizar la liquidacion');
            console.error('Error al actualizar la liquidacion', error);
        } finally {
            setLoading(false);
        }
    }

    const LiquidateToLiquidation = async (idLiquidations: string[]) => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const result = await api.liquidateANH(idLiquidations, searchFilters);

            if (result.success) {
                setSuccess(result.mensaje)
                getLiquidation();
            } else {
                setError(result.mensaje);
            }
        } catch (error) {
            setError('Error al liquidar');
            console.error('Error al liquidar', error);
        } finally {
            setLoading(false);
        }
    }
    
    return { liquidation, canLiquidate, error, success, setLiquidation, getLiquidation, UpdateLiquidation, LiquidateToLiquidation, loading, messageLiquidation, liquidationPrice, setLiquidationPrice };
};