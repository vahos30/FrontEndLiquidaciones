import { Option } from "@/core/domain/Entities";

export interface FiltersLiquidationPBA {
    months?: { month: number; year: number };
    consecutives: Option[];
}