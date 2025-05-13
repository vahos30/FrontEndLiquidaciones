import { STATE_LIQUIDATED } from "@/core/utils";
import { useMemo } from "react";

export const useButtonsDisabled = (liquidation: any[]) => {
    const disabledButtonExport = useMemo(() => liquidation.length === 0, [liquidation]);
    const disabledButtonLiquidate = useMemo(() => (liquidation?.some(item => item.checked) === false), [liquidation]);
    const disabledReadyToSap = useMemo(() => ((liquidation?.some(item => item.checked) === false) || (liquidation?.some(item => item.checked && item.estado != STATE_LIQUIDATED) === true)), [liquidation]);
    return { disabledButtonLiquidate, disabledButtonExport, disabledReadyToSap };
};
