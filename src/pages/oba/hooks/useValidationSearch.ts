import { useState } from "react";
import { defaultMonthAndYear } from "@/core/utils";
import { FiltersLiquidationOBA } from "@/core/domain/Entities";

export const useValidationSearch = () => {
    const { defaultMonth, defaultYear } = defaultMonthAndYear();
    
    const [search, setSearch] = useState<FiltersLiquidationOBA>({
        months: { month: defaultMonth, year: defaultYear },
        deliveryPoint: []
    });

    return {search, setSearch}
};
