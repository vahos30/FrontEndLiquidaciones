import { Col, Row } from "react-bootstrap";
import { CustomButton } from "@components/atoms";
import { SvgCheckList, SvgDownload } from "@components/atoms/svgIcons";
import { LiquidationActionButtonsProps } from "@/core/domain/InterfacesProps";

export const LiquidationOBAActionButtons = ({onExport, onAction, disabledExport, disabledLiquidate}: LiquidationActionButtonsProps) => {
    return (
        <Row className="mb-3 d-flex justify-content-end">
            <Col xs="auto">
                <CustomButton onClick={onExport} variant="secundary" disabled={disabledExport}>
                    <SvgDownload />
                    <span>Descargar</span>
                </CustomButton>
            </Col>
            <Col xs="auto">
                <CustomButton onClick={onAction} variant="primary" disabled={disabledLiquidate}>
                    <SvgCheckList />
                    <span>Calcular</span>
                </CustomButton>
            </Col>
        </Row>
    );
};
