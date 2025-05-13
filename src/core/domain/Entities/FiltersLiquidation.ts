import { Option } from "@/core/domain/Entities";

export interface FiltersLiquidation {
    months?: { month: number; year: number };
    clients: Option[];
    consecutives: Option[];
    supplys: Option[];
    states: Option[];
}