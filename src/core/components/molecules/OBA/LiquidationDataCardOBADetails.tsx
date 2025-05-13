
import { Col, Row } from "react-bootstrap";
import { TextWithValues } from "@components/atoms";
import { LiquidationStateActionsOBAProps } from "@/core/domain/InterfacesProps";
import { LiquidationStateActionsOBA } from "./LiquidationStateActionsOBA";
import { HEADER_LIQUIDATIONS_OBA } from "@/core/utils";

export const LiquidationCardOBADetalis: React.FC<LiquidationStateActionsOBAProps> = ({ liquidation, search }) => {
    const liquidationInfoDetails = [
        { title: HEADER_LIQUIDATIONS_OBA[0], value: liquidation.acumuladoEntregaKPC },
        { title: HEADER_LIQUIDATIONS_OBA[1], value: liquidation.acumuladoPoderCalorifico },
        { title: HEADER_LIQUIDATIONS_OBA[2], value: liquidation.acumuladoConsolidadoNominaciones },
        { title: HEADER_LIQUIDATIONS_OBA[3], value: liquidation.acumuladoDesbalanceDiarioMbtu },
        { title: HEADER_LIQUIDATIONS_OBA[4], value: liquidation.acumuladoDesbalanceMensualMbtu },
        { title: HEADER_LIQUIDATIONS_OBA[5], value: liquidation.acumuladoDesbalanceAcumuladoMbtu },
        { title: HEADER_LIQUIDATIONS_OBA[6], value: liquidation.acumuladoDesbalanceUsd },
    ];

    return (
        <>
            <Row>
                {liquidationInfoDetails.map((item, index) => (
                    <Col key={index}>
                        <TextWithValues title={item.title} value={item.value.toString()} valueBotton={true} />
                    </Col>
                ))}
                <Col md={1}>
                    <LiquidationStateActionsOBA liquidation={liquidation} search={search} />
                </Col>
            </Row>
        </>
    )
}