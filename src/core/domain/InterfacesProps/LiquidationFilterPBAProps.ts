import { FiltersLiquidationPBA } from "@/core/domain/Entities";

export interface LiquidationFiltersPBAProps {
    onSubmit: () => void;
    onChangeSelects: (filters: FiltersLiquidationPBA) => void;
    isLoading?: boolean;
    showConsecutives?: boolean;
    monthsDefault?: { month: number; year: number };
}