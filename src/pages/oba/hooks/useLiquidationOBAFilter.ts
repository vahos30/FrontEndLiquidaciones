import { useCallback, useEffect, useState } from "react";
import { Option, FiltersLiquidationOBA } from "@/core/domain/Entities";
import { defaultMonthAndYear } from "@/core/utils";
import { LiquidationOBA } from "@/core/infrastructure/api";

export const useLiquidationOBAFilters = (onChangeSelects: (filters: FiltersLiquidationOBA) => void) => {
    
    const defaultMonth = defaultMonthAndYear().defaultMonth;
    const defaultYear = defaultMonthAndYear().defaultYear;

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
    const [selectedDeliveryPoint, setSelectedDeliveryPoint] = useState<Option[]>([]);
    const [deliveryPoint, setDeliveryPoint] = useState<Option[]>([]);    
    const apiOBA = new LiquidationOBA();

    const fetchDeliveryPoints = async () => {
        const deliveryPointsResponse = await apiOBA.getDeliveryPoints(); 
        setDeliveryPoint(deliveryPointsResponse);
    };

    useEffect(() => {
        fetchDeliveryPoints();
    }, [selectedMonth, selectedYear]);

    const handleMonthYearChange = (month: number, year: number) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        setSelectedDeliveryPoint([]);
        onChangeSelects({ months: { month, year }, deliveryPoint: [] });
    };

    const handleChange = async (newValue: Option[]) => {
        setSelectedDeliveryPoint(newValue);
        onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, deliveryPoint: newValue});        
    };

    const resetFilters = useCallback(() => {
        setSelectedMonth(defaultMonth);
        setSelectedYear(defaultYear);
        setSelectedDeliveryPoint([]);

        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, deliveryPoint: [] });
    }, [defaultMonth, defaultYear, onChangeSelects]);

    return {
        selectedMonth,
        selectedYear,
        setSelectedDeliveryPoint,
        deliveryPoint,
        selectedDeliveryPoint,
        handleMonthYearChange,
        handleChange,
        resetFilters,
    };
};
