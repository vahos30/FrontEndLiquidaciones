import { useState } from "react";
import { defaultMonthAndYear } from "@/core/utils";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";

export const useValidationSearch = () => {
    const { defaultMonth, defaultYear } = defaultMonthAndYear();
    
    const [search, setSearch] = useState<FiltersLiquidationANH>({
        months: { month: defaultMonth, year: defaultYear },
        supplys: []
    });

    return {search, setSearch}
};
