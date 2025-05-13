import { Col, Row } from "react-bootstrap";
import { NoData } from "@components/molecules";
import { Checkbox, Line, TextWithValues } from "@components/atoms";
import { LiquidationCardAnhDetails } from "./LiquidationCardAnhDeatils";
import { useCheckboxSelection } from "@/pages/liquidations/hooks";
import { LiquidationDataCardANHProps } from "@/core/domain/InterfacesProps";

export const LiquidationDataCardANH: React.FC<LiquidationDataCardANHProps> = ({ liquidations, onChangeSelection,onUpdateLiquidation }) => {
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
                            <TextWithValues title="Fuente de suministro" value={liquidation.sourceSupplyName} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LiquidationCardAnhDetails liquidation={liquidation} onUpdate={onUpdateLiquidation} />
                        </Col>
                    </Row>
                    <Line />
                </div>
            ))}
        </>
    );
}