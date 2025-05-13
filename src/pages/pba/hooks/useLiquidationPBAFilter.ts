import { useCallback, useEffect, useState } from "react";
import { Option, FiltersLiquidationPBA } from "@/core/domain/Entities";
import { LiquidationPBA, MasterApi } from "@/core/infrastructure/api";
import { defaultMonthAndYear } from "@/core/utils";

export const useLiquidationPBAFilters = (onChangeSelects: (filters: FiltersLiquidationPBA) => void) => {
    const master = new MasterApi();
    const defaultMonth = defaultMonthAndYear().defaultMonth;
    const defaultYear = defaultMonthAndYear().defaultYear;

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
    const [selectedConsecutives, setSelectedConsecutives] = useState<Option[]>([]);
    const [consecutives, setConsecutives] = useState<Option[]>([]);
    const apiPBA = new LiquidationPBA();

    const fetchConsecutives = async (month: number, year: number) => {
        const consecutivesResponse = await master.getConsecutivesByMonthYearPBA({ month, year });
        setConsecutives(consecutivesResponse);
    };

    useEffect(() => {
        fetchConsecutives(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const handleMonthYearChange = (month: number, year: number) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        setSelectedConsecutives([]);
        onChangeSelects({ months: { month, year }, consecutives: [] });
    };

    const handleChange = async (newValue: Option[]) => {
        setSelectedConsecutives(newValue.filter((item) => item.value !== selectedConsecutives[0]?.value));
        onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, consecutives: newValue});
        await apiPBA.getAgreementsPBA( {months: { month: selectedMonth, year: selectedYear }, consecutives: newValue});
    };

    const resetFilters = useCallback(() => {
        setSelectedMonth(defaultMonth);
        setSelectedYear(defaultYear);
        setSelectedConsecutives([]);

        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, consecutives: [] });
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
