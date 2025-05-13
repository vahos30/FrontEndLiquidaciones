import { FiltersLiquidationOBA } from "../Entities";

export interface LiquidationOBAFiltersProps {
    onSubmit: () => void;
    onChangeSelects: (filters: FiltersLiquidationOBA) => void;
    isLoading?: boolean;
}