import { Option } from "@/core/domain/Entities";

export interface FiltersRecoveryGdM {
    months?: { month: number; year: number };
    clients: Option[];
}