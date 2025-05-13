import { Col, Row } from "react-bootstrap";
import { HEADERS_DETAILS_LIQUIDATION_HIGHERING, STATE_LIQUIDATED } from "@/core/utils";
import { SvgCheck, SvgError } from "../../atoms/svgIcons";

export const LiquidationCardHigheringDetails: React.FC<{ liquidation: any }> = ({ liquidation }) => {

    const renderIcons = () => (
        <section className="liquidation-actions">
            <div className="actions-row">
                {liquidation?.estado === STATE_LIQUIDATED && <SvgCheck />}
                {liquidation?.mensajeError !== null && <SvgError message={liquidation?.mensajeError} index={liquidation?.idliquidation} />}
            </div>
        </section>
    );

    return (
        <>
            <Row>
                {HEADERS_DETAILS_LIQUIDATION_HIGHERING.map((label, i) => (
                    <Col key={i}>{label}</Col>
                ))}
                <Col md={1}>{renderIcons()}</Col>
            </Row>
            <Row>
                <Col>{liquidation.totalHigherIncome}</Col>
                <Col>{liquidation.totalIncomeUSD}</Col>
                <Col>{liquidation.totalIncomeKPC}</Col>
                <Col>{liquidation.liquidationPercentage}</Col>
                <Col md={1} />
            </Row>
        </>
    );
}