import { Col, Row } from "react-bootstrap";

export const LiquidationFactorXHeader: React.FC<{ liquidation: any }> = ({ liquidation }) => (
    <>
      <Row className="align-items-center w-100">
        <Col className="fw-bold">Fuente de suministro</Col>
        <Col className="fw-bold">Factor X</Col>        
      </Row>
      <Row>
        <Col>{liquidation.FuenteSuministro}</Col>
        <Col>{liquidation.FactorX+"%"}</Col>        
      </Row>
    </>
  );