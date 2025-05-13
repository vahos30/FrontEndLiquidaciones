import { DeliveryPoint } from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";

export class PointsApi {
    async getPoints(): Promise<DeliveryPoint[]> {        
        const response = await axiosLiquidations.get('powercalorificversion');
        return response.data.map((point: any) => {
            return {
                id: point.id,
                idPuntoEntregaGas: point.idPuntoEntregaGas,
                fecha: point.fechaVigencia,
                poder: point.valorPoderCalorifico,
                nombre: point.nombrePuntoEntrega,
                codigoGDM: point.codigoGDM,
            };
        });
    }

    async getPointById(id: number): Promise<DeliveryPoint[]> {
        const response = await axiosLiquidations.get('powercalorificversion/' + id);
        return response.data.value.map((point: any) => {
            return {
                id: point.id,
                idPuntoEntregaGas: point.idPuntoEntregaGas,
                fecha: point.fechaVigencia,
                poder: point.valorPoderCalorifico,
                nombre: point.nombrePuntoEntrega,
                codigoGDM: point.codigoGDM,
            };
        });
    }

    async updatePoint(points: any[]): Promise<boolean> {
        const transformedRecords = points.map(point => ({
            id: point.id,
            idPuntoEntregaGas: point.idPuntoEntregaGas,
            fechaVigencia: new Date(point.fecha.split('-').reverse().join('-')).toISOString(),
            valorPoderCalorifico: point.poder,
        }));
    
        const payload = { records: transformedRecords };
        const response = await axiosLiquidations.post('powercalorificversion/batch-create-update', payload);
        return response.status === 204 || response.status === 200;
    }
}