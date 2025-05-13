export interface CustomInputProps {
    label: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
}