import { LiquidationFactorXProps } from "@/core/domain/Entities";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";
import axiosLiquidations from "../axiosLiquidations";
export class factorXApi {
    async getFactorXLiquidation(filters: FiltersLiquidationANH): Promise<LiquidationFactorXProps[]> {
        const queryParams = new URLSearchParams();
        if (filters?.months) {
            queryParams.append("ContractDate", `${filters.months.month+1}-${filters.months.year}`);
        }
        filters.supplys.forEach(supplys => {
          queryParams.append("SourceSupply", supplys.value);
        });
        const liquidationsFactorX = await axiosLiquidations.get(`liquidations/gassupplysourcefactorxquery?${queryParams}`);
        
        if(liquidationsFactorX.data == null || liquidationsFactorX.data == undefined || liquidationsFactorX.data.liquidaciones == null) return [] as LiquidationFactorXProps[];
                    
        return  liquidationsFactorX.data.liquidaciones.map((liquidation: any) => ({
            checked: false,
            idliquidation: liquidation.id,
            IdFuenteSuministro: liquidation.idFuenteSuministro,
            FuenteSuministro: liquidation.descripcionFuenteSuministro,
            FactorX: liquidation.factorX,
            PrecioUSDporKPC: liquidation.pppKpc,
            ProduccionKPC: liquidation.produccion,
            PorcentajeRegalias: liquidation.porcentajeRegalias,
            TotalFactorX: liquidation.totalFactorX,
            IdEstadoLiquidacion: liquidation.idEstadoLiquidacion,
            MensajeError: liquidation.mensajeError,
            state: liquidation.estadoLiquidacion,            
        }));
    }

    async liquidateFactorX(filters: FiltersLiquidationANH, idLiquidaciones:string[]): Promise<boolean> {                
        const params = {
            "idLiquidaciones": idLiquidaciones,
            "anio": filters?.months?.year || 0,
            "mes": filters?.months?.month ? filters.months.month+1 : 0
        };        
        const liquidationsFactorX = await axiosLiquidations.post(`factorx/calcularliquidacionfactorx`, params );
        
        if(liquidationsFactorX.data == null || liquidationsFactorX.data == undefined) return false;
                    
        return  liquidationsFactorX.data;
    }
}