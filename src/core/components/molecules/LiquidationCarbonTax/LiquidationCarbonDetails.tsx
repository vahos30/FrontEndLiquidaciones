import { Col, Row } from "react-bootstrap";
import { LiquidationActions } from "@components/molecules";

interface LiquidationCarbonDetailsProps {
  liquidation: any;
  month?: string;
  year?: string;
  onUpdateLiquidation?: (guid: string, totalDelivered: string) => void;
}

export const LiquidationCarbonDetails: React.FC<LiquidationCarbonDetailsProps> = ({ liquidation, onUpdateLiquidation, month, year }) => (
  <>
    <Row>
      <Col>Punto de entrega</Col>
      <Col>Poder calorífico</Col>
      <Col>Total nominado MBTU</Col>
      <Col>Total nominado KPC</Col>
      {liquidation.liquidacionPorEntregas && <Col>Total entregado MBTU</Col>}
      {liquidation.liquidacionPorEntregas && <Col>Total entregado KPC</Col>}
      <Col>Volumen M3</Col>
      <Col md={1}><LiquidationActions liquidationDate={(Number(month) + 1) + "-" + year} liquidation={liquidation} onUpdateLiquidation={onUpdateLiquidation} /></Col>
    </Row>
    <Row>
      <Col>{liquidation.puntoEntrega}</Col>
      <Col>{liquidation.poderCalorifico}</Col>
      <Col>{liquidation.totalMBTU}</Col>
      <Col>{liquidation.totalKPC}</Col>
      {liquidation.liquidacionPorEntregas && <Col>{liquidation.totalDeliveredMBTU}</Col>}
      {liquidation.liquidacionPorEntregas && <Col>{liquidation.totalDeliveredKPC}</Col>}
      <Col>{liquidation.volumeM3}</Col>
      <Col md={1} />
    </Row>
  </>
);