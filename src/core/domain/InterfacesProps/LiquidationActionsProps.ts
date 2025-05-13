export interface LiquidationActionsProps {
    liquidation: any;
    liquidationDate: string;
    onUpdateLiquidation?: (guid: string, totalDelivered: string) => void;
}