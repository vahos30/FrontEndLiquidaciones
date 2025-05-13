export interface DateInputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minDate?: string;
  minDateText?: string;
  maxDate?: string;
  maxDateText?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  isInvalid?: boolean;
}