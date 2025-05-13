import { STATE_LIQUIDATED, STATE_LIQUIDATION_SEND_TO_SAP, STATE_LIQUIDATION_PENDING_SEND_TO_SAP } from "@/core/utils";
import {  Tag } from "@components/atoms";
import { SvgCheck, SvgError} from "@components/atoms/svgIcons";

interface LiquidationFactorXStateProps {
    liquidation: any;
}

export const LiquidationFactorXState: React.FC<LiquidationFactorXStateProps> = ({ liquidation }) => {
    return (
        <>            
            <section className="liquidation-actions">                
                <div className="actions-row">
                    {liquidation?.state === STATE_LIQUIDATED && <><SvgCheck /> <Tag text={liquidation?.state}/></>}
                    {liquidation?.MensajeError !== null && <> <SvgError message={liquidation?.MensajeError} index={liquidation?.idliquidation} /> <Tag text={liquidation?.state} clas="status-error"/></>}
                    {(liquidation?.state === STATE_LIQUIDATION_PENDING_SEND_TO_SAP || liquidation?.state === STATE_LIQUIDATION_SEND_TO_SAP) && <Tag text={liquidation?.state} />}
                </div>
            </section>
        </>
    );
};

