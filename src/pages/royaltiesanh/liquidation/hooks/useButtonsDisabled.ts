import { useMemo } from "react";

export const useButtonsDisabled = (liquidation: any[]) => {
    const disabledButtonExport = useMemo(() => liquidation.length === 0, [liquidation]);
    const disabledButtonLiquidate = useMemo(() => (liquidation?.some(item => item.checked) === false), [liquidation]);
    return { disabledButtonLiquidate, disabledButtonExport };
};
