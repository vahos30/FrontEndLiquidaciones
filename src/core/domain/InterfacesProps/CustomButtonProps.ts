export interface CustomButtonProps {
    onClick?: () => void;
    variant?: string;
    disabled: boolean;
    children: React.ReactNode;
    title?: string;
    type?: "button" | "submit" | "reset";
}