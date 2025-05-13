import { FiltersLiquidationOBA, LiquidationOBAProps } from "../Entities";

export interface LiquidationStateActionsOBAProps {
    liquidation: LiquidationOBAProps;           
    search:FiltersLiquidationOBA;
}

export interface DetailOBAModalProps{
    liquidation:LiquidationOBAProps;
    handleExitModal?: () => void;       
    search:FiltersLiquidationOBA;

}