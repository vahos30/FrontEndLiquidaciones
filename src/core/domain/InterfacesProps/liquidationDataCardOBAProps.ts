import { FiltersLiquidationOBA, LiquidationOBAProps } from "../Entities";

export interface liquidationDataCardOBAProps {
    canLiquidate?: boolean;
    liquidations: LiquidationOBAProps[];
    month?: string;
    year?: string;
    onChangeSelection: (updatedLiquidations: LiquidationOBAProps[]) => void;    
    search:FiltersLiquidationOBA;
}