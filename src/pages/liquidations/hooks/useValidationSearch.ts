import { useState } from "react";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { defaultMonthAndYear } from "@/core/utils";

export const useValidationSearch = () => {
    const { defaultMonth, defaultYear } = defaultMonthAndYear();
    
    const [search, setSearch] = useState<FiltersLiquidation>({
        months: { month: defaultMonth, year: defaultYear },
        clients: [],
        consecutives: [],
        supplys: [],
        states: []
    });

    return {search, setSearch}
};
