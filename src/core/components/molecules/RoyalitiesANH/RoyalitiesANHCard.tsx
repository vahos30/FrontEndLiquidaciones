import { Col, Row } from "react-bootstrap";
import { Checkbox, Line, TextWithValues } from "@components/atoms";
import { useCheckboxSelection } from "@/pages/liquidations/hooks";
import { LiquidationCardProps } from "@/core/domain/InterfacesProps";
import { RoyalitiesANHActions } from "./RoyalitiesANHActions";

export const RoyalitiesANHCard: React.FC<LiquidationCardProps> = ({ liquidations, onChangeSelection, canLiquidate, onUpdateLiquidation, month, year }) => {
  const { selectedLiquidations, handleCheckboxChange } = useCheckboxSelection(liquidations, onChangeSelection);
  return (
    <>
      {liquidations.map((liquidation) => (
        <Row key={liquidation.idliquidation}>
          <Col md="auto" className="d-flex align-items-center">
            <Checkbox
              checked={selectedLiquidations.some(liq => liq.idliquidation === liquidation.idliquidation && liq.checked)}
              onChange={() => handleCheckboxChange(liquidation.idliquidation)}
              disabled={canLiquidate}
            />
            <TextWithValues title="Fuente de suministro" value={liquidation.supplySource} />
          </Col>
          <Col md={12} className="d-flex align-items-center">
            
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <TextWithValues title="Total suministro USD" valueBotton={true} value={liquidation.suppliedValueUSD} />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <TextWithValues title="Suministro MBTU" valueBotton={true} value={liquidation.supplyMBTU} />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <TextWithValues title="Suministro KPC" valueBotton={true} value={liquidation.supplyKPC} />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <TextWithValues title="Precio USD ($/MBTU)" valueBotton={true} value={liquidation.supplyMBTUValueUSD} />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <TextWithValues title="Precio USD ($/KPC)" valueBotton={true} value={liquidation.supplyKPCValueUSD} />
          </Col>
          <Col md={2} className="d-flex align-items-center justify-content-center">
            <RoyalitiesANHActions
              onUpdateLiquidation={onUpdateLiquidation}
              liquidation={liquidation}
              liquidationDate={(Number(month) + 1) + "-" + year}
            />
          </Col>
          <Line />
        </Row>
      ))
      }
    </>
  );
}