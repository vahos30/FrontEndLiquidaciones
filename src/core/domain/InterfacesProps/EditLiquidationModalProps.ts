export interface EditLiquidationModalProps {
    liquidation:any;
    liquidationDate: string;
    onClose: () => void;
    onUpdateLiquidation?: (guid: string, totalDelivered: string) => void;
}