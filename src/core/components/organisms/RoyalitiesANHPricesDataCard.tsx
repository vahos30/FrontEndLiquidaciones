import { LiquidationDataProps } from "@/core/domain/InterfacesProps";
import { NoData } from "@components/molecules";
import { RoyalitiesANHCard } from "../molecules/RoyalitiesANH/RoyalitiesANHCard";

export const RoyalitiesANHDataCard: React.FC<LiquidationDataProps> = ({ liquidations, onChangeSelection, canLiquidate, onUpdateLiquidation, month, year }) => {
    return liquidations?.length > 0 ? 
    (<RoyalitiesANHCard canLiquidate={canLiquidate} liquidations={liquidations} onChangeSelection={onChangeSelection} onUpdateLiquidation={onUpdateLiquidation} month={month} year={year} />) : ( <NoData /> );
};
