export interface LiquidationDataProps {
    canLiquidate?: boolean;
    liquidations: any[];
    month?: string;
    year?:string;
    onChangeSelection: (updatedLiquidations: any[]) => void;
    onUpdateLiquidation?: (guid: string, totalDelivered: string) => void;
}