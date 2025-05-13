import { FiltersLiquidation, LiquidationOBAResult } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";

export class higheringcomeApi {
  async getLiquidation(filters: FiltersLiquidation): Promise<LiquidationOBAResult | null> {
    const queryParams = new URLSearchParams();

    if (filters?.months) {
      queryParams.append("Date", `${filters.months.month + 1}-${filters.months.year}`);
    }

    const response = await axiosLiquidations.get(`higherincome/gethigherincome?${queryParams}`);
    const data = response.data;

    if (!data?.liquidaciones) return null;

    return {
      puedeLiquidar: data.puedeLiquidar ?? false,
      errorProcesando: data.error ?? "",
      liquidations: data.liquidaciones.map((l: any) => ({
        idliquidation: String(l.id),
        basePrice: String(l.precioBase ?? ""),
        mensajeError: l.mensajeError ?? "",
        estado: String(l.estadoLiquidacion ?? ""),
        directSalesUSD: String(l.ventasDirectasUsd ?? ""),
        directSalesKPC: String(l.ventasRealesKpc ?? ""),
        averagePriceUSDKPC: String(l.precioPromedioRealUsdkpc ?? ""),
        diferentialPriceUSDKPC: String(l.precioDiferencialUsdkpc ?? ""),
        totalHigherIncome: String(l.totalMayoresIngresosUsd ?? ""),
        totalIncomeUSD: String(l.totalIngresosUsd ?? ""),
        totalIncomeKPC: String(l.totalIngresosKpc ?? ""),
        liquidationPercentage: String(l.porcentajeObaliquidacion ?? ""),
      })),
    };
  }

  async updateLiquidation(liquidation: any[]): Promise<any | null> {    
    const response = await axiosLiquidations.post('higherincome/liquidarmayoresingresos', this.buildLiquidationPayload(liquidation, 'usuario'));
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
