import moment from "moment";
import axiosLiquidations from "../axiosLiquidations";
import { DataDailyConsumption, FiltersLiquidationPBA, LastestLiquidationsProps, LiquidationPBAProps, ResponseGeneric } from "@/core/domain/Entities";

export class LiquidationPBA {
    async getMainCalculations(filters: FiltersLiquidationPBA, AccumulatedMonthsYear: string[] = [""]): Promise<LiquidationPBAProps> {
        const queryParams = new URLSearchParams();

        filters?.consecutives?.forEach(consecutives => {
            queryParams.append("IdContract", consecutives.value);
        });

        if (filters?.months) {
            queryParams.append("ContractDate", `${filters.months.month + 1}-${filters.months.year}`);
        }

        AccumulatedMonthsYear.forEach((monthYear) => {
            if (monthYear == null || monthYear == undefined || monthYear == "") return;
            queryParams.append("AccumulatedMonthsYear", `${monthYear}`);
        });

        const liquidationsPBA = await axiosLiquidations.get(`pba/getmaincalculations?${queryParams}`);
        if (liquidationsPBA.data == null || liquidationsPBA.data == undefined) return {} as LiquidationPBAProps;
        return {
            nominationConfirmed: liquidationsPBA.data.nominationConfirmed,
            nominationConfirmedPartner: liquidationsPBA.data.nominationConfirmedPartner,
            realParticipationPeerPartner: liquidationsPBA.data.realParticipationPeerPartner,
            mbtu: liquidationsPBA.data.mbtu,
            imbalanceMBTU: liquidationsPBA.data.imbalanceMBTU,
            usd: liquidationsPBA.data.usd,
            imbalanceUSD: liquidationsPBA.data.imbalanceUSD,
        };

    }

    async makeCalculations(filters: FiltersLiquidationPBA): Promise<ResponseGeneric> {
        const mes = filters?.months ? filters.months.month + 1 : moment().month() + 1;
        const anio = filters?.months ? filters.months.year : moment().year();
        const liquidationToLiquidate = {
            Mes: mes,
            Anio: anio,
            IdContract: filters?.consecutives[0]?.value,
        };
        const response = await axiosLiquidations.post(`pba/makeCalculations`, liquidationToLiquidate);
        return response.data;
    }

    async getDailyConsumption(filters: FiltersLiquidationPBA, pageNumber?: number, pageSize?: number): Promise<DataDailyConsumption> {
        const queryParams = new URLSearchParams();
        if (filters?.months) {
            queryParams.append("Anio", `${filters?.months?.year}`);
            queryParams.append("Mes", `${filters?.months?.month + 1}`);
            queryParams.append("IdContrato", `${filters?.consecutives[0]?.value}`);
            queryParams.append("PageNumber", `${pageNumber ?? 1}`);
            queryParams.append("PageSize", `${pageSize ?? 100}`);
        }
        const liquidationsPBA = await axiosLiquidations.get(`pba/getdailyconsumption?${queryParams}`);
        if (!liquidationsPBA.data) return {} as DataDailyConsumption;

        return {
            FuenteSuministro: liquidationsPBA.data.fuenteSuministro,
            Socios: liquidationsPBA.data.socios,
            Fechas: liquidationsPBA.data.fechas,
        };
    }

    async makeLiquidation(filters: FiltersLiquidationPBA): Promise<ResponseGeneric> {
        const mes = filters?.months ? filters.months.month + 1 : moment().month() + 1;
        const anio = filters?.months ? filters.months.year : moment().year();
        const liquidationToLiquidate = {
            Mes: mes,
            Anio: anio,
            IdContract: filters?.consecutives[0]?.value
        };
        const response = await axiosLiquidations.post(`pba/makeliquidation`, liquidationToLiquidate);
        return response.data;
    }

    async getInfoLastestLiquidation(filters: FiltersLiquidationPBA): Promise<LastestLiquidationsProps> {
        const queryParams = new URLSearchParams();

        filters.consecutives.forEach(consecutives => {
            queryParams.append("IdContrato", consecutives.value);
        });

        if (filters?.months) {
            queryParams.append("Anio", `${filters.months.year}`);
            queryParams.append("Mes", `${filters.months.month + 1}`);
        }

        const liquidationsPBA = await axiosLiquidations.get(`pba/getinfolatestliquidation?${queryParams}`);
        if (liquidationsPBA.data == null || liquidationsPBA.data == undefined) return {} as LastestLiquidationsProps;
        return {
            periodoAcumulado: liquidationsPBA.data.periodoAcumulado,
            ultimoMesLiquidado: liquidationsPBA.data.ultimoMesLiquidado,
            periodosLiquidar: liquidationsPBA.data.periodosLiquidar
        };
    }

    async getAgreementsPBA(filters: FiltersLiquidationPBA): Promise<string> {
        const queryParams = new URLSearchParams();
        if (filters?.months) {
            queryParams.append("ContractDate", `${filters.months.month + 1}-${filters.months.year}`);
        }
        filters.consecutives.forEach(consecutives => {
            queryParams.append("IdContract", consecutives.value);
        });
        const liquidationPBA = await axiosLiquidations.get(`pba/getAgreementsPBA?${queryParams}`);
        return liquidationPBA.data;
    }

    async getDataExportPBA(filters: FiltersLiquidationPBA): Promise<any> {
        const queryParams = new URLSearchParams();
        if (filters?.months) {
            queryParams.append("Mes", `${filters.months.month + 1}`);
            queryParams.append("Anio", `${filters.months.year}`);
        }
        filters.consecutives.forEach(consecutives => {
            queryParams.append("IdContrato", consecutives.value);
        });
        let respuesta = "";
        try {
            const liquidationsPBA = await axiosLiquidations.get(`pba/exportarexcelpba?${queryParams}`);
            return liquidationsPBA.data;
           
        } catch (error) {
            respuesta = "Error al descargar el archivo";
        }
        return respuesta;
    }

}