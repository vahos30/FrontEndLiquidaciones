import { Props as SelectProps } from "react-select";
import { Option } from "@/core/domain/Entities";

export interface MultiSelectProps extends SelectProps<Option, true> {
    id: string;
    label?: string;
    required?: boolean;
}