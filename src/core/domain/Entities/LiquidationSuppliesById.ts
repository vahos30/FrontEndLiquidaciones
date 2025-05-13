import { Supply } from "@/core/domain/Entities";

export interface LiquidationSuppliesById {    
    consecutive: string;
    totalDelivered: string;
    supplies: Supply[];
}