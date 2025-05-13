import { useState } from "react";
import { EditLiquidationModal } from "./EditLiquidationModal";
import { IconButton, ModalBase, Tag } from "@components/atoms";
import { handleEditContract, STATE_LIQUIDATED, STATE_LIQUIDATION_SEND_TO_SAP, STATE_LIQUIDATION_PENDING_SEND_TO_SAP } from "@/core/utils";
import { LiquidationActionsProps } from "@/core/domain/InterfacesProps";
import { SvgCheck, SvgError, SvgGoContract, SvgContract } from "@components/atoms/svgIcons";

export const LiquidationActions: React.FC<LiquidationActionsProps> = ({ liquidation, liquidationDate, onUpdateLiquidation }) => {
    const [isConfirm, setIsConfirm] = useState(false);

    return (
        <>
            <ModalBase show={isConfirm} onHide={() => setIsConfirm(false)} title="Total entregado">
                <EditLiquidationModal liquidation={liquidation} liquidationDate={liquidationDate} onClose={() => setIsConfirm(false)} onUpdateLiquidation={onUpdateLiquidation} />
            </ModalBase>
            <section className="liquidation-actions">
                <div className="actions-row">
                    {liquidation?.mensajeError !== null && (
                        <IconButton onClick={() => handleEditContract(liquidation?.idContrato)} disabled={false}>
                            <SvgGoContract index={liquidation?.idliquidation} />
                        </IconButton>
                    )}
                    {liquidation?.idTypeLiquidation === 1 && (
                        <IconButton onClick={() => setIsConfirm(true)} disabled={false}>
                            <SvgContract index={liquidation?.idliquidation} />
                        </IconButton>
                    )}                    
                </div>
                <div className="actions-row">
                    {liquidation?.estado === STATE_LIQUIDATED && <> <SvgCheck /> <Tag text={liquidation?.estado}/> </>}
                    {liquidation?.mensajeError !== null && <><SvgError message={liquidation?.mensajeError} index={liquidation?.idliquidation} />  <Tag text={liquidation?.estado} clas="status-error"/></>}
                    {(liquidation?.estado === STATE_LIQUIDATION_PENDING_SEND_TO_SAP || liquidation?.estado === STATE_LIQUIDATION_SEND_TO_SAP) && <Tag text={liquidation?.estado} />}
                </div>
            </section>
        </>
    );
};
