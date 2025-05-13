import { Col, Row } from "react-bootstrap";
import { SvgCheck, SvgError } from "../../atoms/svgIcons";
import { STATE_LIQUIDATED } from "@/core/utils";

export const RecoveryGdMHeader: React.FC<{ liquidation: any }> = ({ liquidation }) => (
    <>
      <Row className="align-items-center w-100">
        <Col md={3} className="fw-bold ">Cliente:</Col>
        <Col md={2} className="fw-bold">Cantidad CDNA (MBTU):</Col>
        <Col md={3} className="fw-bold">Cobro reembolso (COP):</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col md={3}>{liquidation.razonSocial}</Col>
        <Col md={2}>{liquidation.cantidadCdnaporMbtuporCliente}</Col>
        <Col md={3}>{liquidation.cobroReembolsoCopporCliente}</Col>
        <Col></Col>
        <Col md={1}>
          <section className="liquidation-actions">
              <div className="actions-row">
              {liquidation.detalles.filter((p: any) => p.estadoLiquidacion === STATE_LIQUIDATED).length == liquidation.detalles.length && <SvgCheck />}
              {liquidation.detalles.filter((p: any) => p.mensajeError !== null).length > 0 && <SvgError message={liquidation.detalles.filter((p: any) => p.mensajeError !== null)[0]?.mensajeError} index={Math.random().toString()} />}
              </div>
          </section>
        </Col>
      </Row>
    </>
  );