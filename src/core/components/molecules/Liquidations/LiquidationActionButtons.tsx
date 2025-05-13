import { Col, Row } from "react-bootstrap";
import { CustomButton } from "@components/atoms";
import { SvgCheckList, SvgDownload } from "@components/atoms/svgIcons";
import { LiquidationActionButtonsProps } from "@/core/domain/InterfacesProps";

export const LiquidationActionButtons = ({ 
    onExport, 
    onAction, 
    onActionReadyToSap,
    disabledExport, 
    disabledLiquidate,
    disabledReadyToSap = false,
    textAction = "Liquidar",
    titleAction = "",
    textReadyToSap
}: LiquidationActionButtonsProps) => {
    return (
        <Row className="mb-3 d-flex justify-content-end">
            <Col xs="auto">
                <CustomButton onClick={onExport} variant="secundary" disabled={disabledExport} title="Descargar a Excel">
                    <SvgDownload />
                    <span>Descargar</span>
                </CustomButton>
            </Col>
            <Col xs="auto">
                <CustomButton title={titleAction} onClick={onAction} variant="primary" disabled={disabledLiquidate}>
                    <SvgCheckList />
                    <span>{textAction}</span>
                </CustomButton>
            </Col>
            {textReadyToSap &&
            <Col xs="auto">
                <CustomButton onClick={onActionReadyToSap} variant="primary" disabled={disabledReadyToSap}>
                    <SvgCheckList />
                    <span>{textReadyToSap}</span>
                </CustomButton>
            </Col> 
            }
        </Row>
    );
};
