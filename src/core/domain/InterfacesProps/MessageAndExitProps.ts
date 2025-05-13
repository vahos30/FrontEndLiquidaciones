export interface MessageAndExitProps {
    errorMessage?: string;
    successMessage?: string;
    isPBA?: boolean;
    disabledLiquidate?: boolean;
    Onliquidate?: () => void;
    isOBA?: boolean;
    disabledExport?: boolean;
    onDownload?: () => void;
    exitDetailOba?: () => void;
}