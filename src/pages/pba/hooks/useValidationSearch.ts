import { useState } from "react";
import { FiltersLiquidationPBA } from "@/core/domain/Entities";
import { defaultMonthAndYear } from "@/core/utils";

export const useValidationSearch = () => {
    const { defaultMonth, defaultYear } = defaultMonthAndYear();
    
    const [search, setSearch] = useState<FiltersLiquidationPBA>({
        months: { month: defaultMonth, year: defaultYear },        
        consecutives: [],       
    });

    return {search, setSearch}
};
