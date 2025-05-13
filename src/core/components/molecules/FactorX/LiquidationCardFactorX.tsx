import { Col, Row } from "react-bootstrap";
import { useCheckboxSelection } from "@/pages/liquidations/hooks";
import { Checkbox, CustomAccordion, Line } from "@components/atoms";
import { LiquidationCardProps } from "@/core/domain/InterfacesProps";
import { LiquidationFactorXDetails, LiquidationFactorXHeader, NoData } from "@components/molecules";



export const LiquidationCardFactorX: React.FC<LiquidationCardProps> = ({ liquidations, onChangeSelection, canLiquidate, onUpdateLiquidation, month, year }) => {
  const { selectedLiquidations, handleCheckboxChange } = useCheckboxSelection(liquidations, onChangeSelection);

  if (liquidations.length === 0) return <NoData />;

  return (
    <>
      {liquidations.map((liquidation) => (
        <div key={liquidation.idliquidation}>
          <Row className="align-items-center">
            <Col md="auto" className="d-flex justify-content-center align-items-center">
              <Checkbox
                checked={selectedLiquidations.some((liq) => liq.idliquidation === liquidation.idliquidation && liq.checked)}
                onChange={() => handleCheckboxChange(liquidation.idliquidation)}
                disabled={canLiquidate || liquidation.state === 'Liquidado'}
              />
            </Col>
            <Col>
              <CustomAccordion 
              clas={`custom-accordion ${liquidation.mensaje ? "has-error" : ""}`}
               header={<LiquidationFactorXHeader liquidation={liquidation} />}>
                <LiquidationFactorXDetails liquidation={liquidation} />
              </CustomAccordion>
            </Col>
          </Row>
          <Line />
        </div>
      ))}
    </>
  );
};