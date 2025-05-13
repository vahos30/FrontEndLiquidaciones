export interface MonthYearPickerProps {
  value: { month: number; year: number};
  label?: string;
  onChange: (month: number, year: number) => void;
}