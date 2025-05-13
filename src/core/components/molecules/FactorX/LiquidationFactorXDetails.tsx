import { Col, Row } from "react-bootstrap";
import { LiquidationFactorXState } from "./LiquidationFactorXState";
import { TextWithValues } from "../../atoms";

interface LiquidationFactorXDetailsProps {
  liquidation: any;  
}

export const LiquidationFactorXDetails: React.FC<LiquidationFactorXDetailsProps> = ({ liquidation}) => (
  <>
    <Row className="align-items-center w-100">
        <Col md={2}>
            <TextWithValues title="PPP USD ($ KPC)" value={liquidation.PrecioUSDporKPC} valueBotton={true} />
        </Col>
        <Col md={2}>
            <TextWithValues title="Producción (KPC)" value={liquidation.ProduccionKPC} valueBotton={true} />
        </Col>
        <Col md={2}>
            <TextWithValues title="% Regalías" value={liquidation.PorcentajeRegalias+"%"} valueBotton={true} />
        </Col>
        <Col md={2}>
            <TextWithValues title="Total Factor X (KPC)" value={liquidation.TotalFactorX} valueBotton={true} />
        </Col>
        <Col md={1}></Col>
        <Col md={3}>
            <LiquidationFactorXState liquidation={liquidation}  />
        </Col>
    </Row>    
  </>
);