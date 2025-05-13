import { FiltersLiquidation } from "@/core/domain/Entities";

export interface RecoveryGdMFiltersProps {
    onSubmit: () => void;
    onChangeSelects: (filters: FiltersLiquidation) => void;
    isLoading?: boolean;
    filtersShow?: string[];
    monthsDefault?: { month: number; year: number };
}