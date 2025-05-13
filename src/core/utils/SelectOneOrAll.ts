export const toggleCheckbox = (liquidations: any[], id: string): any[] => {
    return liquidations.map(liquidation =>
        liquidation.idliquidation === id
            ? { ...liquidation, checked: !liquidation.checked }
            : liquidation
    );
};

export const selectAllCheckboxes = (liquidations: any[], isChecked: boolean): any[] => {
    return liquidations.map(liquidation => ({ ...liquidation, checked: isChecked }));    
};
