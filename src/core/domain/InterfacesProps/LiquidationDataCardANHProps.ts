export interface LiquidationDataCardANHProps {
    canLiquidate?: boolean;
    liquidations: any[];
    month?: string;
    year?: string;
    onChangeSelection: (updatedLiquidations: any[]) => void;
    onUpdateLiquidation: (liquidation:any) => void;
}