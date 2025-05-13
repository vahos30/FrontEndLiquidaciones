import { useState, useEffect } from "react";
import { loadingService } from "@/services";
import { LiquidationsApi } from "@/core/infrastructure/api";
import { ParamsGetPointsByLiquidation, ParamsUpdatePointsByLiquidation } from "@/core/domain/Entities";

export const useLiquidationSupplies = (liquidation:any, liquidationDate:string, onClose: () => void) => {
    const api = new LiquidationsApi();
    const [liquidationSupplies, setLiquidationSupplies] = useState<any | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

    useEffect(() => {
        const fetchLiquidationSupplies = async () => {
            try {
                loadingService.showLoading();
                const params: ParamsGetPointsByLiquidation = {
                    IdContract: liquidation.idContrato,
                    LiquidationDate: liquidationDate,
                    IdSource: liquidation.fuenteSuministroId,
                    consecutive: liquidation.consecutivo,
                }
                const response = await api.getSuppliesByContract(params);
                if (response) {
                    setLiquidationSupplies(response);
                }
            } catch (error) {
                console.error("Error al consultar la información", error);
                setErrorMessage("Error al consultar la información");
            } finally {
                loadingService.hideLoading();
            }
        };

        fetchLiquidationSupplies();
    }, [liquidation.idContrato]);

    const validateDeliveredValue = (value: string) => {
        const regex = /^\d{0,6}(\.\d{0,2})?$/;
        return regex.test(value);
    };

    const handleDeliveredChange = (supplyId: string, value: string) => {
        if (!validateDeliveredValue(value)) return;

        setLiquidationSupplies((prev:any) => {
            if (!prev) return prev;
            return {
                ...prev,
                supplies: prev.supplies.map((supply:any) =>
                    supply.id === supplyId ? { ...supply, energy: value } : supply
                ),
            };
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        if (!liquidationSupplies) return;

        const hasEmptyValues = liquidationSupplies.supplies.some((supply:any) => !supply?.energy?.trim());
        if (hasEmptyValues) {
            setErrorMessage("Complete los campos requeridos");
            return;
        }

        try {
            const params: ParamsUpdatePointsByLiquidation = {
                idContract: liquidation.idContrato,
                liquidationDate: liquidationDate,
                idSource: liquidation.fuenteSuministroId,
                isCarbonTax: liquidation.isCarbonTax,
                deliveryPoints: liquidationSupplies.supplies.map((supply:any) => ({
                    id: supply.id,
                    energy: supply.energy,
                }))
            }
            const response = await api.updateLiquidationSupplies(params);
            if(response === true){
                setSuccessUpdate(true);
            }
            onClose();
        } catch (error) {
            console.error("Error al guardar la información", error);
            setErrorMessage("Error al guardar la información");
        }
    };

    return {
        liquidationSupplies,
        errorMessage,
        handleDeliveredChange,
        handleSubmit,
        successUpdate
    };
};
