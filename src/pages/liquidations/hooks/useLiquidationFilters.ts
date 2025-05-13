import { useCallback, useEffect, useState } from "react";
import { Option, FiltersLiquidation } from "@/core/domain/Entities";
import { MasterApi } from "@/core/infrastructure/api";
import { defaultMonthAndYear, STATES_LIQUIDATION } from "@/core/utils";

export const useLiquidationFilters = (onChangeSelects: (filters: FiltersLiquidation) => void, monthsDefault?: { month: number; year: number } | null) => {
    const master = new MasterApi();

    const defaultMonth = monthsDefault == null ? defaultMonthAndYear().defaultMonth : monthsDefault.month;
    const defaultYear = monthsDefault == null ? defaultMonthAndYear().defaultYear : monthsDefault.year;

    const [selectedMonth, setSelectedMonth] = useState<number>(defaultMonth);
    const [selectedYear, setSelectedYear] = useState<number>(defaultYear);
    const [selectedClients, setSelectedClients] = useState<Option[]>([]);
    const [selectedConsecutives, setSelectedConsecutives] = useState<Option[]>([]);
    const [selectedSupplys, setSelectedSupplys] = useState<Option[]>([]);
    const [selectedStates, setSelectedStates] = useState<Option[]>([]);
    const [clients, setClients] = useState<Option[]>([]);
    const [consecutives, setConsecutives] = useState<Option[]>([]);
    const [sypplies, setSupplies] = useState<Option[]>([]);
    const [states, ] = useState<Option[]>(STATES_LIQUIDATION);

    const fetchClients = async (month: number, year: number) => {
        const clientsData = await master.getClients({ month, year });
        setClients(clientsData);
        setSelectedClients([]);
        setSelectedConsecutives([]);
        setSelectedSupplys([]);
    };

    const fetchConsecutivesAndSupplys = async () => {
        const responseData = await master.getConsecutivesAndSupplys((selectedClients[0].value), selectedMonth, selectedYear);

        setConsecutives(responseData.consecutives);
        setSupplies(responseData.supplies);
    };

    useEffect(() => {
        fetchClients(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        if (selectedClients.length > 0) {
            fetchConsecutivesAndSupplys();
        } else {
            setSelectedConsecutives([]);
            setSelectedSupplys([]);
        }
    }, [selectedClients]);

    const handleMonthYearChange = (month: number, year: number) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        onChangeSelects({ months: { month, year }, clients: [], consecutives: [], supplys: [], states: [] });
        onChangeSelects({ months: { month, year }, clients: [], consecutives: [], supplys: [], states: [] });
    };

    const handleChange = (newValue: Option[], field: keyof FiltersLiquidation) => {
        switch (field) {
            case "clients":
                setSelectedClients(newValue.filter((item) => item.value !== selectedClients[0]?.value));
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: newValue.filter((item) => item.value !== selectedClients[0]?.value), consecutives: selectedConsecutives, supplys: selectedSupplys, states: selectedStates });
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: newValue.filter((item) => item.value !== selectedClients[0]?.value), consecutives: selectedConsecutives, supplys: selectedSupplys, states: selectedStates });
                break;
            case "consecutives":
                setSelectedConsecutives(newValue);
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: selectedClients, consecutives: newValue, supplys: selectedSupplys, states: selectedStates });
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: selectedClients, consecutives: newValue, supplys: selectedSupplys, states: selectedStates });
                break;
            case "supplys":
                setSelectedSupplys(newValue);
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: selectedClients, consecutives: selectedConsecutives, supplys: newValue, states: selectedStates });
                break;
            case "states":
                setSelectedStates(newValue);
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: selectedClients, consecutives: selectedConsecutives, supplys: selectedSupplys, states: newValue });
                onChangeSelects({ months: { month: selectedMonth, year: selectedYear }, clients: selectedClients, consecutives: selectedConsecutives, supplys: newValue, states: selectedStates });
                break;
        }
    };

    const resetFilters = useCallback(() => {
        setSelectedMonth(defaultMonth);
        setSelectedYear(defaultYear);
        setSelectedClients([]);
        setSelectedConsecutives([]);
        setSelectedSupplys([]);
        setSelectedStates([]);
        setSelectedStates([]);

        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, clients: [], consecutives: [], supplys: [], states: [] });
        onChangeSelects({ months: { month: defaultMonth, year: defaultYear }, clients: [], consecutives: [], supplys: [], states: [] });
    }, [defaultMonth, defaultYear, onChangeSelects]);

    return {
        selectedMonth,
        selectedYear,
        selectedClients,
        selectedConsecutives,
        selectedSupplys,
        selectedStates,
        clients,
        consecutives,
        sypplies,
        states,
        handleMonthYearChange,
        handleChange,
        resetFilters,
    };
};
