import { useState, useEffect } from "react";
import { selectAllCheckboxes, toggleCheckbox } from "@/core/utils";

export const useCheckboxSelection = (initialLiquidations: any[], onChangeSelection: (updated: any[]) => void) => {
    const [selectedLiquidations, setSelectedLiquidations] = useState(initialLiquidations);

    useEffect(() => {
        setSelectedLiquidations(initialLiquidations);
    }, [initialLiquidations]);

    const handleCheckboxChange = (id: string) => {
        const updatedLiquidations = toggleCheckbox(selectedLiquidations, id);
        setSelectedLiquidations(updatedLiquidations);
        onChangeSelection(updatedLiquidations);
    };

    const allChecked = selectedLiquidations.length > 0 && selectedLiquidations.every(liq => liq.checked);

    const handleSelectAll = () => {
        const updatedLiquidations = selectAllCheckboxes(selectedLiquidations, !allChecked);
        setSelectedLiquidations(updatedLiquidations);
        onChangeSelection(updatedLiquidations);
    };

    return { selectedLiquidations, handleCheckboxChange, handleSelectAll, allChecked };
};
