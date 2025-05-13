import { Option } from "@/core/domain/Entities";

export interface FiltersLiquidationANH {
    months?: { month: number; year: number };
    supplys: Option[];
}