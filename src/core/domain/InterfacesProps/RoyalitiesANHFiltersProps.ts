import { FiltersLiquidationANH } from "../Entities/FiltersLiquidationANH";

export interface RoyalitiesANHFiltersProps {
    onSubmit: () => void;
    onChangeSelects: (filters: FiltersLiquidationANH) => void;
    isLoading?: boolean;
}