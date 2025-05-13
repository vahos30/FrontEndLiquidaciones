export interface LiquidationANHUpdateModalProps {
    handleSubmit: (e: React.FormEvent) => void;
    campo: string;
    valorCampo: string;
    setValorCampo: (value: string) => void;
    errorMessage?: string;
    cancelar: () => void;
}