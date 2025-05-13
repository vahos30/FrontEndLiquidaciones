import { FiltersLiquidation } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";

export class recoveryGdMApi {

    async getLiquidation(filters: FiltersLiquidation): Promise<{
        errorProcesando: string | null;
        liquidations: any[];
    } | null> {
        const queryParams = new URLSearchParams();

        if (filters?.months) {
            queryParams.append("Mes", `${filters.months.month+1}`);
            queryParams.append("Anio", `${filters.months.year}`);
        }

        filters.clients.forEach(client => {
            queryParams.append("IdClient", client.value);
        });

        const url = `liquidationgdm/getliquidationgdm?${queryParams}`
        const response = await axiosLiquidations.get(url);
        const data = response.data;

        if (!data?.liquidaciones) return null;
        
        return {
            errorProcesando: data.error ?? null,
            liquidations: data.liquidaciones
        };
    }
}
