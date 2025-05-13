import { FiltersLiquidation } from "@/core/domain/Entities";

export interface LiquidationFiltersProps {
    onSubmit: () => void;
    onChangeSelects: (filters: FiltersLiquidation) => void;
    isLoading?: boolean;
    filtersShow?: string[];
    monthsDefault?: { month: number; year: number };
}