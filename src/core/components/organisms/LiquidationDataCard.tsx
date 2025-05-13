import { LiquidationDataProps } from "@/core/domain/InterfacesProps";
import { LiquidationCard, NoData } from "@components/molecules";

export const LiquidationData: React.FC<LiquidationDataProps> = ({ liquidations, onChangeSelection, canLiquidate, onUpdateLiquidation, month, year }) => {
    return liquidations?.length > 0 ? 
    (<LiquidationCard canLiquidate={canLiquidate} liquidations={liquidations} onChangeSelection={onChangeSelection} onUpdateLiquidation={onUpdateLiquidation} month={month} year={year} />) : ( <NoData /> );
};
