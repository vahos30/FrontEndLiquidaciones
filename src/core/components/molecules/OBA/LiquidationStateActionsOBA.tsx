import { useState } from "react";
import { DetailOBAModal } from "./DetailOBAModal";
import { IconButton, ModalBase, Tag } from "@components/atoms";
import { SvgCheck, SvgError } from "@components/atoms/svgIcons";
import { SvgObaDetails } from "../../atoms/svgIcons/SvgObaDetails";
import { LiquidationStateActionsOBAProps } from "@/core/domain/InterfacesProps";

export const LiquidationStateActionsOBA: React.FC<LiquidationStateActionsOBAProps> = ({ liquidation, search }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <ModalBase show={openModal} onHide={() => setOpenModal(false)} title={`Detalle desbalance acumulado punto de entrega "${liquidation.puntoDeEntrega}"`}>
                <DetailOBAModal liquidation={liquidation} handleExitModal={() => setOpenModal(false)} search={search} />
            </ModalBase>
            <section className="liquidation-actions">
                <div className="actions-row">
                    <IconButton onClick={() => { setOpenModal(true) }} disabled={!liquidation.verDetalle}>
                        <SvgObaDetails />
                    </IconButton>
                </div>
                <div className="actions-row">
                    {liquidation?.estado === "Liquidado" &&
                        <>
                            <SvgCheck />
                            <Tag text={liquidation.estado} />
                        </>
                    }
                    {liquidation?.mensajeError !== null &&
                        <>
                            <SvgError message={liquidation?.mensajeError} index={liquidation?.idliquidation} />
                            <Tag text={liquidation.estado} clas="status-error" />
                        </>
                    }
                </div>
            </section>
        </>
    );
};
