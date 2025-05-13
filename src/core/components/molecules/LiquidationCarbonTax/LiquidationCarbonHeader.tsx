import { Col, Row } from "react-bootstrap";

export const LiquidationCarbonHeader: React.FC<{ liquidation: any }> = ({ liquidation }) => (
    <>
      <Row className="align-items-center w-100">
        <Col className="fw-bold">Consecutivo de contrato</Col>
        <Col className="fw-bold">% No gravado</Col>
        <Col className="fw-bold">% Gravado</Col>
        <Col className="fw-bold">% Compensado</Col>
        <Col className="fw-bold">Impuesto al carbono</Col>
      </Row>
      <Row>
        <Col>{liquidation.consecutivo}</Col>
        <Col>{liquidation.noGravado}</Col>
        <Col>{liquidation.gravado}</Col>
        <Col>{liquidation.compensado}</Col>
        <Col>{liquidation.impuestoCarbono}</Col>
      </Row>
    </>
  );