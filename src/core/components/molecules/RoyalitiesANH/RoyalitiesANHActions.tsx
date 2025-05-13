import { useState } from "react";
import { IconButton, ModalBase, Tag } from "@components/atoms";
import { STATE_LIQUIDATED, STATE_LIQUIDATION_SEND_TO_SAP, STATE_LIQUIDATION_PENDING_SEND_TO_SAP } from "@/core/utils";
import { LiquidationActionsProps } from "@/core/domain/InterfacesProps";
import { SvgCheck, SvgError, SvgContract } from "@components/atoms/svgIcons";
import { RoyalitiesANHDetailsModal } from "./RoyalitiesANHDetailsModal";

export const RoyalitiesANHActions: React.FC<LiquidationActionsProps> = ({ liquidation, liquidationDate, onUpdateLiquidation }) => {
    const [isConfirm, setIsConfirm] = useState(false);

    return (
        <>
            <ModalBase show={isConfirm} onHide={() => setIsConfirm(false)} title="Detalle ANH">
                <RoyalitiesANHDetailsModal liquidation={liquidation} liquidationDate={liquidationDate} onClose={() => setIsConfirm(false)} onUpdateLiquidation={onUpdateLiquidation} />
            </ModalBase>
            <section className="liquidation-actions">
                <div className="actions-row">
                    <IconButton onClick={() => setIsConfirm(true)} disabled={false}>
                        <SvgContract index={liquidation?.idliquidation} tooltip="Ver detalle" />
                    </IconButton>
                </div>
                <div className="actions-row">
                    {liquidation?.state === STATE_LIQUIDATED && <> <SvgCheck /> <Tag text={liquidation?.state} /> </>}
                    {liquidation?.message !== null && <><SvgError message={liquidation?.message} index={liquidation?.idliquidation} /> <Tag text={liquidation?.state} clas="status-error"/> </>}
                    {(liquidation?.state === STATE_LIQUIDATION_PENDING_SEND_TO_SAP || liquidation?.state === STATE_LIQUIDATION_SEND_TO_SAP) && <Tag text={liquidation?.state} />}
                </div>
            </section>
        </>
    );
};
