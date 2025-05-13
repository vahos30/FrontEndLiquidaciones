export interface LiquidationActionButtonsProps {
    onExport: () => void;
    onAction: () => void;
    onActionReadyToSap?: () => void;
    disabledLiquidate: boolean;
    disabledExport: boolean;
    disabledReadyToSap?: boolean;
    textAction?: string;
    titleAction?: string;
    textReadyToSap?: string;
}