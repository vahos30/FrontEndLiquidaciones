import { useCallback, useEffect, useState } from "react";
import { Option, FiltersLiquidation } from "@/core/domain/Entities";
import { royaltiesApi } from "@/core/infrastructure/api";
import { defaultMonthAndYear } from "@/core/utils";
import { FiltersLiquidationANH } from "@/core/domain/Entities/FiltersLiquidationANH";

export const useRoyalitiesANHFilters = (onChangeSelects: (filters: FiltersLiquidationANH) => void) => {
    const api = new royaltiesApi();
    const defaultMonth = defaultMonthAndYear().defaultMonth;
    const defaultYear = defaultMonthAndYear().defaultYear;

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
    const [selectedSupplys, setSelectedSupplys] = useState<Option[]>([]);
    const [sypplies, setSupplies] = useState<Option[]>([]);

    const fetchSupplys = async () => {
        const responseData = await api.getAllGasSupplySource();
        setSupplies(responseData);
    };

    const handleMonthYearChange = (month: number, year: number) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        onChangeSelects({ months: { month, year }, supplys: selectedSupplys });
    };

    const handleChange = (newValue: Option[], field: keyof FiltersLiquidation) => {
        if (field == "supplys") {
            setSelectedSupplys(newValue);
            onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, supplys: newValue });
        }
    };

    const resetFilters = useCallback(() => {
        setSelectedMonth(defaultMonth);
        setSelectedYear(defaultYear);
        setSelectedSupplys([]);

        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, supplys: [] });
    }, [defaultMonth, defaultYear, onChangeSelects]);

    useEffect(() => {
        fetchSupplys();
    }, []);

    return {
        selectedMonth,
        selectedYear,
        selectedSupplys,
        sypplies,
        handleMonthYearChange,
        handleChange,
        resetFilters,
    };
};
