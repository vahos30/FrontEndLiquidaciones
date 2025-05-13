import { DataDailyConsumption, FiltersLiquidationPBA } from "@/core/domain/Entities";
import { LiquidationPBA } from "@/core/infrastructure/api";
import { useState } from "react";

export const useDailyConsumption = (searchFilters: FiltersLiquidationPBA, pageNumber: number, pageSize: number) => {

    const apiPBA = new LiquidationPBA();
    const [DataDailyConsumption, setDataDailyConsumption] = useState<DataDailyConsumption>({} as DataDailyConsumption);
    const [loading, setLoading] = useState(false);

    const getDailyConsumption = async () => {
        try {
            setLoading(true);
            const ConsumoDiario = await apiPBA.getDailyConsumption(searchFilters, pageNumber, pageSize);
            if (ConsumoDiario) {
                setDataDailyConsumption(ConsumoDiario);
            }
        } catch (error) {
            console.error('Error al consultar consumos diarios de suministro', error);
        } finally {
            setLoading(false);
        }
    }

    return { getDailyConsumption, DataDailyConsumption, loading };
}