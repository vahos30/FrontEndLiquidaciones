import { Option } from "@/core/domain/Entities";

export interface FiltersLiquidationOBA {
    months?: { month: number; year: number };
    deliveryPoint: Option[];
}