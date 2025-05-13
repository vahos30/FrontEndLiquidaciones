import { Col, Row } from "react-bootstrap";
import { HEADERS_LIQUIDATION_HIGHERING } from "@/core/utils";

export const LiquidationHigheringHeader: React.FC<{ liquidation: any }> = ({ liquidation }) => (
    <>
      <Row className="align-items-center w-100">
        {HEADERS_LIQUIDATION_HIGHERING.map((label, i) => (
          <Col key={i} className="fw-bold">
            {label}
          </Col>
        ))}
      </Row>
      <Row>
        <Col>{liquidation.basePrice}</Col>
        <Col>{liquidation.directSalesUSD}</Col>
        <Col>{liquidation.directSalesKPC}</Col>
        <Col>{liquidation.averagePriceUSDKPC}</Col>
        <Col>{liquidation.diferentialPriceUSDKPC}</Col>        
      </Row>
    </>
  );