import { DeliveryPointProps, DetalleOBAProps, FiltersLiquidationOBA, ImbalancesOBADetailProps, InfoLatestLiquidationOBAResponseProps, LiquidationDeatailOBAProps, LiquidationResponseOBAProps, Option, PaginatedListOBA, ResponseGeneric } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";
import moment from "moment";

export class LiquidationOBA {
    async getDeliveryPoints(): Promise<Option[]> {    
        const deliveryPoints = await axiosLiquidations.get(`liquidationoba/getdeliverypoints`);
        if (deliveryPoints.data == null || deliveryPoints.data == undefined || deliveryPoints.data.deliveryPoints == null) return {} as Option[];
        return deliveryPoints.data.deliveryPoints.map((deliveryPoint: DeliveryPointProps) => ({
            value: deliveryPoint.id,
            label: deliveryPoint.descripcion,
        }));        
    }
    async getListOBA(filters: FiltersLiquidationOBA): Promise<LiquidationResponseOBAProps> {
        const queryParams = new URLSearchParams();

        if (filters?.months) {
            queryParams.append("Date", `${filters.months.month + 1}-${filters.months.year}`);            
        }
        filters.deliveryPoint.forEach(deliveryPoint => {
            queryParams.append("deliveryPoint", deliveryPoint.value);
        });    
        
        const liquidationsOBA = await axiosLiquidations.get(`liquidationoba/getliquidationoba?${queryParams}`);
        if (liquidationsOBA.data == null || liquidationsOBA.data == undefined || liquidationsOBA.data.liquidaciones == null) return { error: null, liquidaciones: [] } as LiquidationResponseOBAProps;

        const listLiquidationsOBA = 
        liquidationsOBA.data.liquidaciones.map(({id, estadoLiquidacion, ...rest}: { id: string; estadoLiquidacion: string; [key: string]: any }) => ({
            idliquidation: id,
            estado: estadoLiquidacion,
            checked:false,
            ...rest
        }));        
        return {
            error: liquidationsOBA.data.error,
            liquidaciones: listLiquidationsOBA
        } as LiquidationResponseOBAProps;
        
    }
    async getDetailOBA(PuntoEntrega:number): Promise<LiquidationDeatailOBAProps> {
        const queryParams = new URLSearchParams();
                
        queryParams.append("IdDeliveryPoint", PuntoEntrega.toString());
        
        const liquidationsOBA = await axiosLiquidations.get(`liquidationoba/getinfolatestliquidationoba?${queryParams}`);
        if (liquidationsOBA.data == null || liquidationsOBA.data == undefined) return { error: null, getInfoLatestLiquidationResponse: {} as InfoLatestLiquidationOBAResponseProps } as LiquidationDeatailOBAProps;
        
        return {
            error: liquidationsOBA.data.error,
            getInfoLatestLiquidationResponse: liquidationsOBA.data.getInfoLatestLiquidation || {} as InfoLatestLiquidationOBAResponseProps,            
        } as LiquidationDeatailOBAProps;

    }
    async getBalancesOBA(PuntoEntrega:number,dates:string[],pageNumber:number,pageSize:number): Promise<ImbalancesOBADetailProps> {
        const queryParams = new URLSearchParams();
        queryParams.append("IdDeliveryPoint", PuntoEntrega.toString());
        dates.forEach((date) => {   
            if (date == null || date == undefined || date == "") return;         
            queryParams.append("Dates", `${date}`);
        });
        queryParams.append("PageNumber", pageNumber.toString());
        queryParams.append("PageSize", pageSize.toString());

        const liquidationsOBA = await axiosLiquidations.get(`liquidationoba/getimbalancesoba?${queryParams}`);
        if (liquidationsOBA.data == null || liquidationsOBA.data == undefined || liquidationsOBA.data.imbalancesObaDetail == null) return { error: null, imbalancesObaDetail: {} as PaginatedListOBA<DetalleOBAProps>, desbalancesOba: [] } as ImbalancesOBADetailProps;
        
        return {
            error: liquidationsOBA.data.error,
            imbalancesObaDetail: liquidationsOBA.data.imbalancesObaDetail,
        } as ImbalancesOBADetailProps;

    }
    async makeCalculations(filters: FiltersLiquidationOBA, IdIdPuntoEntrega: number[]): Promise<ResponseGeneric> {
        const mes = filters?.months ? filters.months.month + 1 : moment().month() + 1;
        const anio = filters?.months ? filters.months.year : moment().year();
        const liquidationToLiquidate = {
            Mes: mes,
            Anio: anio,
            IdIdPuntoEntrega: IdIdPuntoEntrega
        };
        const response = await axiosLiquidations.post(`pba/makeCalculationsOba`, liquidationToLiquidate);
        return response.data;
    }
    async makeLiquidation(filters: FiltersLiquidationOBA, idLiquidation:string): Promise<ResponseGeneric> {
        const mes = filters?.months ? filters.months.month + 1 : moment().month() + 1;
        const anio = filters?.months ? filters.months.year : moment().year();
        const liquidationToLiquidate = {
            Mes: mes,
            Anio: anio,
            IdLiquidation: idLiquidation
        };
        const response = await axiosLiquidations.post(`pba/makeliquidationOba`, liquidationToLiquidate);
        return response.data;
    }
}