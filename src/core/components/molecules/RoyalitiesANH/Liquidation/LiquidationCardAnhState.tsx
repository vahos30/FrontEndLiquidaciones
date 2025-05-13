import { Tag } from "@/core/components/atoms";
import { STATE_LIQUIDATED } from "@/core/utils";
import { SvgCheck,SvgError } from "@components/atoms/svgIcons";

interface LiquidationCardAnhStateProps {
    liquidation: any;
}

export const LiquidationCardAnhState: React.FC<LiquidationCardAnhStateProps> = ({liquidation}) => {
    return(
        liquidation?.state === STATE_LIQUIDATED ? (
            <><SvgCheck /> <Tag text={liquidation?.state} /></>
        ) : (
            liquidation?.message != null &&
            <><SvgError message={liquidation?.message ?? 'Hubo un error'} index={liquidation.idliquidation} /><Tag text={liquidation?.state} clas="status-error"/></>
        )
        
    )
}