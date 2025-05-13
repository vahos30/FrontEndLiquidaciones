import { SelectionChangeProps } from "@/core/domain/InterfacesProps";

export interface LiquidationCardProps extends SelectionChangeProps {
    liquidations: any[];
    canLiquidate?: boolean;
    month?: string;
    year?:string;
    disabled?: boolean;
    onUpdateLiquidation?: (guid: string, totalDelivered: string) => void;
    showRate?: string;
    showPPP?: string;
    showCheck?: boolean;
  }