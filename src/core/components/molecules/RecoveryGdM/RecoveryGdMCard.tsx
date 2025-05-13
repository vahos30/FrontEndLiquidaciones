import { Col, Row } from "react-bootstrap";
import { CustomAccordion, Line } from "@components/atoms";
import { NoData } from "@components/molecules";
import { RecoveryGdMHeader } from "./RecoveryGdMHeader";
import { RecoveryGdMDetails } from "./RecoveryGdMDetails";
import { RecoveryGdMCardProps } from "@/core/domain/InterfacesProps/RecoveryGdMCardProps";

export const RecoveryGdMCard: React.FC<RecoveryGdMCardProps> = ({
  liquidations 
}) => {
  if (liquidations.length === 0) return <NoData />;

  return (
    <>
      {liquidations.map((liquidation, index) => (
        <div key={index}>
          <Row className="align-items-center">
            <Col>
              <CustomAccordion 
              clas={`custom-accordion ${liquidation.mensajeError ? "has-error" : ""}`}
               header={<RecoveryGdMHeader liquidation={liquidation} />}>
                <RecoveryGdMDetails details={liquidation.detalles} />
              </CustomAccordion>
            </Col>
          </Row>
          <Line />
        </div>
      ))}
    </>
  );
};