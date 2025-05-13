import { Col, Row } from "react-bootstrap";
import { Checkbox, Line } from "@components/atoms";
import { useCheckboxSelection } from "@/pages/liquidations/hooks";
import { LiquidationCardProps } from "@/core/domain/InterfacesProps";
import { LiquidationActions, LiquidationBasicData, LiquidationNomination, LiquidationPays } from "@components/molecules";

export const LiquidationCard: React.FC<LiquidationCardProps> = ({ liquidations, onChangeSelection, canLiquidate, onUpdateLiquidation, month, year }) => {
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
          </Col>
          <Col md={3} className="d-flex align-items-center">
            <LiquidationBasicData
              client={liquidation.cliente}
              contractId={liquidation.consecutivo}
              contractType={liquidation.tipoContrato}
              supplySource={liquidation.fuenteSuministro}
            />
          </Col>
          <Col md={3} className="d-flex align-items-center">
            <LiquidationPays
              price={liquidation.precio}
              payLiquidation={liquidation.monedaLiquidacion}
              pay={liquidation.monedaPago}
              trm={liquidation.trmPagoEnPesos}
            />
          </Col>
          <Col md={3} className="d-flex align-items-center">
            <LiquidationNomination
              totalNominated={liquidation.totalNominado}
              totalDelivered={liquidation.entregado}
              totalSupply={liquidation.totalSuministro}
              notNominated={liquidation.noNominado}
              totalNotNominated={liquidation.totalNoNominadas}
            />
          </Col>
          <Col md={2} className="d-flex align-items-center justify-content-center">
            <LiquidationActions
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