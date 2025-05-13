import { useState } from "react";
import { LiquidationsApi } from "@/core/infrastructure/api";
import { FiltersLiquidation } from "@/core/domain/Entities";

export const useLiquidation = (searchFilters: FiltersLiquidation) => {
    const [liquidation, setLiquidation] = useState<any[]>([]);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [canLiquidate, setCanLiquidate] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const apiLquidation = new LiquidationsApi();

    const getLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const liquidation = await apiLquidation.getLiquidation(searchFilters);
            if (liquidation) {
                setLiquidation(liquidation);
                setCanLiquidate(!liquidation.some(item => item.puedeLiquidar));
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
            }
            await getLiquidation();
        } catch (error) {
            setError('Error al realizar la liquidación');
            console.error('Error al realizar la actualización', error);
        } finally {
            setLoading(false);
        }
    }

    const sendToPrepareSap = async (ids: string[]) => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const response = await apiLquidation.sendToPrepareSap(ids);
            setLoading(false);
            if (response.success) {
                setSuccess(response.mensaje);
                const newList = liquidation.map((item) => {
                    if (ids.filter(id => id == item.idliquidation).length > 0){
                        item.estado = "Pendiente Envío SAP";
                        item.checked = false;
                    } 
                    return item;
                });
                setLiquidation(newList);
            }else{
                setError(response.mensaje);
            }
            const element = document.getElementById("msg");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
            
            
        } catch (error) {
            setError('Error al realizar la preparacion de los registros para envio a sap');
            console.error('Error al realizar la preparacion de los registros para envio a sap', error);
        } finally {
            setLoading(false);
        }
    }

    return { liquidation, canLiquidate, error, success, setLiquidation, getLiquidation, updateLiquidation, sendToPrepareSap, loading };
};