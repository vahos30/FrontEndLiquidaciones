import { useCallback, useState } from "react";
import { FiltersLiquidation } from "@/core/domain/Entities";
import { defaultMonthAndYear } from "@/core/utils";

export const useHigheringcomeFilters = (onChangeSelects: (filters: FiltersLiquidation) => void) => {
    const defaultMonth = defaultMonthAndYear().defaultMonth;
    const defaultYear = defaultMonthAndYear().defaultYear;

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

    const handleMonthYearChange = (month: number, year: number) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        onChangeSelects({ months: { month, year }, clients: [], consecutives: [], supplys: [], states: [] });
    };

    const resetFilters = useCallback(() => {
        setSelectedMonth(defaultMonth);
        setSelectedYear(defaultYear);

        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, clients: [], consecutives: [], supplys: [], states: [] });
    }, [defaultMonth, defaultYear, onChangeSelects]);

    return { selectedMonth, selectedYear, handleMonthYearChange, resetFilters };
};
