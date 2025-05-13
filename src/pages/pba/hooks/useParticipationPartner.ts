import { useState } from "react";
import { MasterApi } from "@/core/infrastructure/api";
import { ParticipacionAcuerdoPBAProps } from "@/core/domain/Entities";

export const useParticipationPartner = (contractId: string, date: string) => {

    const apiPBA = new MasterApi();
    const [participationByDate, setParticipationByDate] = useState<ParticipacionAcuerdoPBAProps[]>([]);

    const getParticipationByDate = async () => {
        try {
            const participation = await apiPBA.getParticipationByDate(contractId, date);
            if (participation) {
                setParticipationByDate(participation);
            }
        } catch (error) {
            console.error('Error al consultar consumos diarios de suministro', error);
        }
    }

    return { getParticipationByDate, participationByDate };
}