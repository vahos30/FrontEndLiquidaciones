import { FiltersLiquidation, LiquidationSuppliesById, ParamsGetPointsByLiquidation, ParamsUpdatePointsByLiquidation } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";

export class LiquidationsApi {
  async getLiquidation(filters: FiltersLiquidation): Promise<any[] | null> {
    const queryParams = new URLSearchParams();

    if (filters?.months) {
      queryParams.append("ContractDate", `${filters.months.month + 1}-${filters.months.year}`);
    }

    filters.clients.forEach(client => {
      queryParams.append("ClientList", client.value);
    });

    filters.consecutives.forEach(consecutives => {
      queryParams.append("Consecutive", consecutives.value);
    });

    filters.supplys.forEach(supplys => {
      queryParams.append("SourceSupply", supplys.value);
    });

    const response = (await axiosLiquidations.get(`liquidations/contractdataquery?${queryParams}`)).data;
    const ppp = response.ppp;
    return response.liquidationDto?.map((liquidation: any) => {
      return {
      checked: false,
      isCarbonTax: false,
      idliquidation: liquidation.idliquidation,
      idContrato: liquidation.idContract,
      cliente: liquidation.clientName,
      consecutivo: liquidation.consecutive,
      tipoContrato: liquidation.typeContractName,
      fuenteSuministro: liquidation.sourceSupplyName,
      fuenteSuministroId: liquidation.sourceSupplyId,
      precio: liquidation.price,
      monedaLiquidacion: liquidation.currencyLiquidationName,
      monedaPago: liquidation.currencyPayName,
      trmPagoEnPesos: liquidation.payTrm,
      totalNominado: liquidation.totalNominada,
      entregado: liquidation.totalEntregado,
      totalSuministro: liquidation.totalSuministro,
      noNominado: liquidation.noNominada,
      totalNoNominadas: liquidation.totalNoNominada,
      idTypeLiquidation: liquidation.idTypeLiquidation,
      estado: liquidation.estado,
      mensajeError: liquidation.message,
      puedeLiquidar: liquidation.puedeLiquidar,
      ppp
      };
    });
  }

  async getSuppliesByContract(params: ParamsGetPointsByLiquidation): Promise<LiquidationSuppliesById | null> {
    const response = (await axiosLiquidations
      .get(`liquidations/getsuppliesbycontractbymonth?IdContract=${params.IdContract}&LiquidationDate=${params.LiquidationDate}&IdSource=${params.IdSource}`)).data;

    if (response.length === 0) return null;

    return {
      consecutive: params.consecutive,
      totalDelivered: response.length > 0 ? response.reduce((acc: number, supply: any) => acc + Number(supply.entregado), 0).toString() : '0',
      supplies: response.map((supply: any) => {
        return {
          id: supply.idPuntoEntrega?.toString(),
          name: supply?.nombre,
          energy: supply?.entregado?.toString()
        };
      }),
    };
  }

  async updateLiquidationSupplies(params: ParamsUpdatePointsByLiquidation): Promise<any | null> {
    const payload = {
      idContract: params.idContract,
      liquidationDate: params.liquidationDate,
      idSource: params.idSource,
      isCarbonTax: params.isCarbonTax,
      deliveryPoints: params.deliveryPoints.map((supply: any) => ({
        idDeliveryPoint: Number(supply.id),
        delivered: Number(supply.energy)
      }))
    };

    const response = await axiosLiquidations.post('liquidations/updatetotaldeliverypoints', payload);
    return response.data.isSuccess;
  }

  async updateLiquidation(liquidation: any[]): Promise<any | null> {
    const response = await axiosLiquidations.post('liquidations/liquidate', this.buildLiquidationPayload(liquidation, 'usuario'));
    return response.data;
  }

  async sendToPrepareSap(ids: string[]): Promise<any | null> {
    const response = await axiosLiquidations.post('ordersap/preparetosendsap', { ids: ids });
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
