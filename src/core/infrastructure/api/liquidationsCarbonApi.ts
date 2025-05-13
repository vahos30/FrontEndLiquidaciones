import { FiltersLiquidation } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";

export class liquidationsCarbonApi {
  async getLiquidation(filters: FiltersLiquidation): Promise<{
    tarifa: string;
    puedeLiquidar: boolean;
    errorProcesando: string | null;
    liquidations: any[];
  } | null> {
    const queryParams = new URLSearchParams();

    if (filters?.months) {
      queryParams.append("ContractDate", `${filters.months.month+1}-${filters.months.year}`);
    }

    filters.consecutives.forEach(consecutives => {
      queryParams.append("Consecutive", consecutives.value);
    });

    const response = await axiosLiquidations.get(`liquidationcarbontax/getcontractbytax?${queryParams}`);
    const data = response.data;

    if (!data?.listLiquidationTax) return null;
    
    return {
        tarifa: data.rate,
        puedeLiquidar: data.puedeLiquidar ?? false,
        errorProcesando: data.errorProcesando ?? null,
        liquidations: data.listLiquidationTax.map((liquidation: any) => ({
            checked: false,
            isCarbonTax: true,
            idliquidation: liquidation.idliquidation,
            idContrato: liquidation.idContract,
            mensajeError: liquidation.message,
            consecutivo: liquidation.consecutive,
            puntoEntrega: liquidation.deliveryPoint,
            fuenteSuministroId: liquidation.sourceSupplyId,
            noGravado: liquidation.noTaxed,
            gravado: liquidation.taxed,
            compensado: liquidation.offset,
            poderCalorifico: liquidation.calorific,
            impuestoCarbono: liquidation.carbonTax,
            totalMBTU: liquidation.totalMBTU,
            totalKPC: liquidation.totalKPC,
            totalDeliveredMBTU: liquidation.totalDeliveredMBTU,
            totalDeliveredKPC: liquidation.totalDeliveredKPC,
            volumeM3: liquidation.volumeM3,
            entregado: liquidation.totalDeliveredMBTU,
            estado: liquidation.estado,
            liquidacionPorEntregas: liquidation.idTypeLiquidation === 2 ? true : false
        }))
    };
}

  async updateLiquidation(liquidation: any[]): Promise<any | null> {
    const response = await axiosLiquidations.post('liquidationcarbontax/liquidateCarbonTax', this.buildLiquidationPayload(liquidation, 'usuario'));
    return response.data;
  }

  buildLiquidationPayload(liquidations: any[], usuario: string) {
    return {
      idLiquidaciones: liquidations.map(item => item.idliquidation),
      anio: liquidations[0].year,
      mes: liquidations[0].month,
      usuario
    };
  }
}
