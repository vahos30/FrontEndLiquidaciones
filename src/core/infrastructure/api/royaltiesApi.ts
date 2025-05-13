import { LiquidationANHProps, Option } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";

export class royaltiesApi {
    async getRoyalitiesANHLiquidation(filters: FiltersLiquidationANH): Promise<LiquidationANHProps> {
        const queryParams = new URLSearchParams();
        if (filters?.months) {
            queryParams.append("ContractDate", `${filters.months.month+1}-${filters.months.year}`);
        }
        filters.supplys.forEach(supplys => {
          queryParams.append("SourceSupply", supplys.value);
        });
        const liquidationsANH = await axiosLiquidations.get(`royalties/getliquidationsanh?${queryParams}`);
        ;        
        if(liquidationsANH.data == null || liquidationsANH.data == undefined) return {} as LiquidationANHProps;
        return {
            canLiquidate: liquidationsANH.data.canLiquidate,
            liquidatePrice: liquidationsANH.data.liquidatePrice,
            liquidations: liquidationsANH.data.liquidations.map((liquidation: any) => ({
                checked: false,
                idliquidation: liquidation.idLiquidation,
                idSourceSupply: liquidation.idSourceSupply,
                sourceSupplyName: liquidation.sourceSupplyName,                
                totalStake: liquidation.totalStake,
                totalRoyalties: liquidation.totalRoyalties,
                totalPriceUSD: liquidation.totalPriceUSD,
                trm: liquidation.trm,
                kpc: liquidation.kpc,
                totalRoyaltiesUSD: liquidation.totalRoyaltiesUSD,
                totalRoyaltiesCOP: liquidation.totalRoyaltiesCOP,
                message: liquidation.message,
                state: liquidation.state,            
            }))
        };
        
    }
    async UpdateLiquidationsANH(liquidation: any): Promise<any> {
      const queryParams = new URLSearchParams();  
      if (liquidation) {
          queryParams.append("IdLiquidation", `${liquidation.idliquidation}`);
      }
      if(liquidation.totalStake != ""){
          queryParams.append("TotalStake", `${liquidation.totalStake.replace(/,/g, '.')}`);
      }
      if(liquidation.totalRoyalties != ""){
          queryParams.append("TotalRoyalties", `${liquidation.totalRoyalties.replace(/,/g, '.')}`);
      }
      if(liquidation.totalPriceUSD != ""){
          queryParams.append("TotalPriceUSD", `${liquidation.totalPriceUSD.replace(/,/g, '.')}`);
      }
      const response = await axiosLiquidations.post(`royalties/updateLiquidationsANH?${queryParams}`);
      return response.data;
    }

    async UpdatePriceANH(liquidations: string[],filters: any): Promise<any> {
      const liquidationToLiquidate = {
        idLiquidaciones: liquidations,
        Mes: filters.months.month+1,
        Anio: filters.months.year
    };  
    const response = await axiosLiquidations.post('royalties/calcularliquidacionpreciosanh', liquidationToLiquidate);
    return response.data;
  }

    async liquidateANH(liquidations: string[],filters: any): Promise<any> {      
        const liquidationToLiquidate = {
            idLiquidaciones: liquidations,
            Mes: filters.months.month+1,
            Anio: filters.months.year
        };  
        const response = await axiosLiquidations.post('royalties/liquidateANH', liquidationToLiquidate);
        return response.data;
    }

    async getAllGasSupplySource(): Promise<Option[]> {
      const response = (await axiosLiquidations.get(`gassupplysource`)).data;
      return response.map((item: any) => {
        return {
          value: item.codigoGDM,
          label: item.descripcion
        }
      });
    }

    async getRoyalitiesANHPrices(filters: FiltersLiquidationANH): Promise<any[] | null> {
        const queryParams = new URLSearchParams();
    
        if (filters?.months) {
          queryParams.append("ContractDate", `${filters.months.month + 1}-${filters.months.year}`);
        }
    
        filters.supplys.forEach(supplys => {
          queryParams.append("SourceSupply", supplys.value);
        });
    
        const response = (await axiosLiquidations.get(`royalties/royalitiesanhpricesquery?${queryParams}`)).data;
        return response.map((item: any) => {
          return item;
        });
    }
}
