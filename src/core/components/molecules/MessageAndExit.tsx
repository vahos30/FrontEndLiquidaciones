import { MessageAndExitProps } from "@/core/domain/InterfacesProps";
import { handleExit } from "@/core/utils";
import { CustomButton } from "@components/atoms";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { ExclamationCircleFill, CheckCircleFill } from "react-bootstrap-icons";

export const MessageAndExit: React.FC<MessageAndExitProps> = ({ errorMessage, successMessage, isPBA = false, disabledLiquidate=false, Onliquidate,isOBA=false,disabledExport=false,onDownload,exitDetailOba }) => {
    return (
        <Row className="shadowed-row p-2 px-5 mt-4 mb-4 mx-2 d-flex align-items-center" id="msg">
            <Col xs={6} className="d-flex align-items-center">
                {errorMessage && (
                    <div className="text-danger me-3" style={{ fontSize: "12px" }}>
                        <ExclamationCircleFill className="me-2" />
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="text-success" style={{ fontSize: "12px" }}>
                        <CheckCircleFill className="me-2" />
                        {successMessage}
                    </div>
                )}
            </Col>
            <Col xs={6} className="d-flex justify-content-end gap-2">
                <CustomButton onClick={isOBA ? exitDetailOba: handleExit} variant="secundary" disabled={false}>
                    <span>Salir</span>
                </CustomButton>
                {isOBA && (
                    <CustomButton onClick={onDownload} variant="secundary" disabled={disabledExport}>
                        <span>Descargar</span>
                    </CustomButton>
                )}
                {isPBA && (
                    <CustomButton onClick={Onliquidate} variant="primary" disabled={disabledLiquidate || (moment().date() < 2) }>
                        <span>Liquidar</span>
                    </CustomButton>
                )}
            </Col>
        </Row>
    );
}