import {
    PaginatedResponse,
    ResponseGeneric,
} from "@/core/domain/Entities";
import axiosLiquidations from "../axiosLiquidations";
import { PendingForSendToSapDto } from "@/core/domain/Entities/PendingForSendToSapDto";

interface dataFilters {
    month: number;
    year: number;
    clients?: number[],
    supplys?: number[],
    states?: string[]
}

interface dataFilterPendingSentToSapPaged extends dataFilters {
    page: number;
    rowsPerPage: number;
}

export class SapApi {
    private getFilterQueryParams(): URLSearchParams {
        const queryParams = new URLSearchParams();
        return queryParams;
    }

    async getPendingForSendToSap(
        filters: dataFilterPendingSentToSapPaged
    ): Promise<PaginatedResponse<PendingForSendToSapDto>> {

        const url = `ordersap/getpendingsforsendtosap`;
        const { data } = await axiosLiquidations.post(url, filters);

        const list = data.value;

        return {
            items: list.items,
            pageNumber: list.pageNumber,
            totalPages: list.totalPages,
            totalCount: list.totalCount,
            hasPreviousPage: list.hasPreviousPage,
            hasNextPage: list.hasNextPage,
        };
    }

    async processPendingsPost(
        ids: string[]
    ) {
        const payload = {
            ids: ids,
        };
        const response = await axiosLiquidations.post("ordersap/processsendtosap",
            payload
        );
        return {
            errors: response.data.errors,
            success: response.data.success,
            value: response.data.value,
            mensaje: response.data.mensaje
        } as ResponseGeneric;
    }
}
