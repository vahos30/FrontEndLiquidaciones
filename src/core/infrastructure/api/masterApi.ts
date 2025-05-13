import axiosContract from "../axiosContract";
import { Option, ParticipacionAcuerdoPBAProps } from "@/core/domain/Entities";
import { ConsecutivesAndSupplys } from "@/core/domain/Entities";
import moment from "moment";

export class MasterApi {
  async getClients(params: any) {
    const response = (await axiosContract.get(`getclientebydate?ContractDate=${params.month + 1}-${params.year}`));
    return response?.data?.value?.map((client: any) => {
      return {
        value: client.id,
        label: client.nameClient,
      };
    });
  }

  async getConsecutivesAndSupplys(idClient: any, month: number, year: number): Promise<ConsecutivesAndSupplys> {
    const responseConsecutives = (await axiosContract.get(`getconsecutiveandsourcesupply?IdClient=${idClient}&ContractDate=${month + 1}-${year}`)).data;

    const consecutives: Option[] = responseConsecutives.value.consecutive.map((item: string) => ({
      value: item,
      label: item
    }));

    const supplies: Option[] = responseConsecutives.value.sourceSupply.map((supply: { id: number; name: string }) => ({
      value: supply.id.toString(),
      label: supply.name
    }));

    return { consecutives, supplies };
  }

  async getConsecutivesByMonthYear(params: any) {
    const response = (await axiosContract.get(`getconsecutivesbydate?ContractDate=${params.month + 1}-${params.year}`));
    return response?.data?.value?.map((consecutive: any) => {
      return {
        value: consecutive.consecutivo,
        label: consecutive.consecutivo,
      };
    });
  }

  async getConsecutivesByMonthYearPBA(params: any) {
    const response = (await axiosContract.get(`getconsecutivespbabydate?ContractDate=${params.month + 1}-${params.year}`));
    return response?.data?.value?.map((consecutive: any) => {
      return {
        value: consecutive.idContrato,
        label: consecutive.consecutivo,
      };
    });
  }

  async getParticipationByDate(idContrato: string, date: string): Promise<ParticipacionAcuerdoPBAProps[]> {
    const queryParams = new URLSearchParams();

    if (idContrato) {
      if (!date)
        date = moment().format("DD-MM-YYYY");

      queryParams.append("Date", `${date}`);
      queryParams.append("IdContract", `${idContrato}`);
    }

    const liquidationsPBA = await axiosContract.get(`getParticipationByDate?${queryParams}`);
    if (liquidationsPBA.data == null || liquidationsPBA.data == undefined) return {} as ParticipacionAcuerdoPBAProps[];

    return liquidationsPBA.data.map((liquidation: any) => ({
      NombreSocio: liquidation.clientName,
      PorcentajeParticipacion: liquidation.percentage,
    }));
  }
}
