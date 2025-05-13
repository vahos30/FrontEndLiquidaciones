import { DetalleOBAProps, FiltersLiquidationOBA, LiquidationDeatailOBAProps, LiquidationOBAProps, PaginatedListOBA } from "@/core/domain/Entities";
import { LiquidationOBA } from "@/core/infrastructure/api";
import { useEffect, useState } from "react";

export const useLiquidationObaDetail = (searchFilters: FiltersLiquidationOBA, puntoDeEntrega:number=0, idliquidation: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');
    const [success] = useState<string>('');
    const [liquidationsOBA, setLiquidationsOBA] = useState<LiquidationOBAProps[]>([]);
    const [liquidationOBADetail, setLiquidationOBADetail] = useState<LiquidationDeatailOBAProps>({} as LiquidationDeatailOBAProps);
    const [desbalancesOBA, setDesbalancesOBA] = useState<PaginatedListOBA<DetalleOBAProps>>({} as PaginatedListOBA<DetalleOBAProps>);
    const api = new LiquidationOBA();
    
    useEffect(() => {        
        getDetailOba(puntoDeEntrega);
    }, []);

    const getDetailOba = async (puntoEntrega: number) => {
        try {
            setLoading(true);
            setError('');
            const result = await api.getDetailOBA(puntoEntrega);
            if(result) {
                setLiquidationOBADetail(result);
                setError(result.error);
            }
            
        } catch (error) {
            setError('Error al consultar las liquidaciones OBA');
            console.error('Error al consultar las liquidaciones OBA', error);
        } finally {
            setLoading(false);
        }
    } 
    const filterMothDesbalance = async (dates: string[],pageSize:number,pageNumber:number) => {
        try {
            setLoading(true);
            setError('');
            const result = await api.getBalancesOBA(puntoDeEntrega,dates,pageNumber,pageSize);            
            if(result) {
                setDesbalancesOBA(result.imbalancesObaDetail);
            }
            setError(result.error ?? '');
        } catch (error) {
            setError('Error al consultar las Desbalances OBA');
            console.error('Error al consultar las Desbalances OBA', error);
        } finally {
            setLoading(false);
        }
    }   

    const makeLiquidation = async () => {
        try {
            setLoading(true);
            setError('');
            const liquidar = await api.makeLiquidation(searchFilters, idliquidation);
            if(liquidar.success) {
                getDetailOba(puntoDeEntrega);
                return;  
            }
            setError(liquidar.mensaje || "Error al liquidar");
        } catch (error) {
            setError('Error al ejecutar la liquidación');
            console.error('Error al ejecutar la liquidación', error);
        } finally {
            setLoading(false);
        }        
    }

    return {        
        setLiquidationsOBA,
        getDetailOba,
        filterMothDesbalance,
        makeLiquidation,
        liquidationOBADetail,
        liquidationsOBA, 
        desbalancesOBA,
        loading, 
        error, 
        success 
    };

}