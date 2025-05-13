import { Col, Row } from "react-bootstrap";
import { SvgCheck, SvgError } from "../../atoms/svgIcons";
import { Tag } from "@components/atoms";
import { STATE_LIQUIDATED, STATE_LIQUIDATION_PENDING_SEND_TO_SAP, STATE_LIQUIDATION_SEND_TO_SAP } from "@/core/utils";

interface RecoveryGdMDetailsProps {
  details: any[];
}

export const RecoveryGdMDetails: React.FC<RecoveryGdMDetailsProps> = ({ details }) => (
  <>
   { details.map((item) => (
    <>
      <Row>
        <Col>Fuente de suministro:</Col>
        <Col>Consecutivo de contrato:</Col>
        <Col>Cantidad CDNA (MBTU):</Col>
        <Col>Cobro reembolso (COP):</Col>
        <Col md={1}>
          <section className="liquidation-actions">
              <div className="actions-row">
                  {item?.estadoLiquidacion === STATE_LIQUIDATED && <SvgCheck />}
                  {item?.mensajeError !== null && <SvgError message={item?.mensajeError} index={Math.random().toString()} />}
                  {(item?.estadoLiquidacion === STATE_LIQUIDATION_SEND_TO_SAP || item?.estadoLiquidacion === STATE_LIQUIDATION_PENDING_SEND_TO_SAP) && <Tag text={item?.estadoLiquidacion} />}
              </div>
          </section>
        </Col>
      </Row>
      <Row>
        <Col>{item.fuenteSuministro}</Col>
        <Col>{item.consecutivo}</Col>
        <Col>{item.cantidadCdnaporMbtu}</Col>
        <Col>{item.cobroReembolsoCop}</Col>
        <Col md={1} />
      </Row>
      <br />
      <hr />
      <br />
      
    </>
   ))}
    
  </>
);