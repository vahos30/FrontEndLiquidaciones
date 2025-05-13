import { useCallback, useEffect, useState } from "react";
import { Option, FiltersLiquidation } from "@/core/domain/Entities";
import { MasterApi } from "@/core/infrastructure/api";
import { defaultMonthAndYear } from "@/core/utils";

export const useLiquidationCarbonFilters = (onChangeSelects: (filters: FiltersLiquidation) => void) => {
    const master = new MasterApi();
    const defaultMonth = defaultMonthAndYear().defaultMonth;
    const defaultYear = defaultMonthAndYear().defaultYear;

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
    const [selectedConsecutives, setSelectedConsecutives] = useState<Option[]>([]);
    const [consecutives, setConsecutives] = useState<Option[]>([]);

    const fetchConsecutives = async (month: number, year: number) => {
        const consecutivesResponse = await master.getConsecutivesByMonthYear({ month, year });
        setConsecutives(consecutivesResponse);
    };

    useEffect(() => {
        fetchConsecutives(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const handleMonthYearChange = (month: number, year: number) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        setSelectedConsecutives([]);
        onChangeSelects({ months: { month, year }, clients: [], consecutives: [], supplys: [], states: [] });
    };

    const handleChange = (newValue: Option[]) => {
        setSelectedConsecutives(newValue);
        onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: [], consecutives: newValue, supplys: [], states: [] });
    };

    const resetFilters = useCallback(() => {
        setSelectedMonth(defaultMonth);
        setSelectedYear(defaultYear);
        setSelectedConsecutives([]);

        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, clients: [], consecutives: [], supplys: [], states: [] });
    }, [defaultMonth, defaultYear, onChangeSelects]);

    return {
        selectedMonth,
        selectedYear,
        selectedConsecutives,
        consecutives,
        handleMonthYearChange,
        handleChange,
        resetFilters,
    };
};
