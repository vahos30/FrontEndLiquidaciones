import { Col, Row } from "react-bootstrap";
import { NoData } from "@components/molecules";
import { Checkbox, Line, TextWithValues } from "@components/atoms";
import { useCheckboxSelection } from "@/pages/liquidations/hooks";
import { liquidationDataCardOBAProps } from "@/core/domain/InterfacesProps";
import { LiquidationCardOBADetalis } from "./LiquidationDataCardOBADetails";

export const LiquidationDataCardOBA: React.FC<liquidationDataCardOBAProps> = ({ liquidations, onChangeSelection,search }) => {
    const { selectedLiquidations, handleCheckboxChange } = useCheckboxSelection(liquidations, onChangeSelection);
    if (liquidations.length === 0) return <NoData />;

    return (
        <>
            {liquidations.map((liquidation) => (
                <div key={liquidation.idliquidation}>
                    <Row className="align-items-center mb-2">
                        <Col md="auto" className="d-flex justify-content-center align-items-center">
                            <Checkbox
                                checked={selectedLiquidations.some((liq) => liq.idliquidation === liquidation.idliquidation && liq.checked)}
                                onChange={() => handleCheckboxChange(liquidation.idliquidation)}
                                disabled={false}
                            />
                            <TextWithValues title="Punto de entrega: " value={liquidation.puntoDeEntrega} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LiquidationCardOBADetalis liquidation={liquidation} search={search} />
                        </Col>
                    </Row>
                    <Line />
                </div>
            ))}
        </>
    );
}