import React from "react";
import { CustomButton } from "../../atoms";
import { CustomInput } from "../CustomInput";
import { Col, Form, Row } from "react-bootstrap";
import { SvgIconModal } from "@components/atoms/svgIcons";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useLiquidationSupplies } from "@/pages/liquidations/hooks";
import { EditLiquidationModalProps } from "@/core/domain/InterfacesProps";

export const EditLiquidationModal: React.FC<EditLiquidationModalProps> = ({ liquidation, liquidationDate, onClose, onUpdateLiquidation }) => {
    const { liquidationSupplies, errorMessage, handleDeliveredChange, handleSubmit, successUpdate } = useLiquidationSupplies(liquidation, liquidationDate, onClose);
    if (successUpdate) {
        onUpdateLiquidation?.(liquidation.idliquidation, liquidationSupplies?.supplies?.reduce((sum:any, supply:any) => sum + (Number(supply.energy) || 0), 0) || 0);
    }

    return (
        <>
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="px-3 align-items-center mb-2">
                    <Col md={1}><SvgIconModal /></Col>
                    <Col>
                        <h1 className="titulo-two m-3">Total entregado</h1>
                    </Col>
                </Row>
                <Row className="px-3 align-items-center mb-2">
                    <Col>
                        <CustomInput label="Consecutivo de contrato" value={liquidationSupplies?.consecutive} onChange={() => { }} disabled />
                    </Col>
                    <Col>
                        <CustomInput label="Total entregado (MBTU)"
                                value={liquidationSupplies?.supplies.reduce((sum:any, supply:any) => sum + (Number(supply.energy) || 0), 0)}
                            onChange={() => { }} disabled />
                    </Col>
                </Row>
                {liquidationSupplies?.supplies.map((supply:any) => (
                    <Row key={supply.id} className="px-3 align-items-center mb-2">
                        <Col>
                            <CustomInput label="Punto de entrega" value={supply.name} onChange={() => { }} disabled />
                        </Col>
                        <Col>
                            <CustomInput
                                required
                                label="Entregado (MBTU)"
                                value={supply.energy || ""}
                                onChange={(e) => handleDeliveredChange(supply.id, e.target.value)}
                            />
                        </Col>
                    </Row>
                ))}
                <Row className="px-3">
                    <Col xs={6} className="d-flex align-items-center">
                        {errorMessage && (
                            <div className="text-danger me-3" style={{ fontSize: "12px" }}>
                                <ExclamationCircleFill className="me-2" />
                                {errorMessage}
                            </div>
                        )}
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end">
                        <CustomButton onClick={onClose} variant="secundary" disabled={false}>
                            <span>Cancelar</span>
                        </CustomButton>
                        <div style={{ width: '10px' }}></div>
                        <CustomButton variant="primary" type="submit" disabled={false}>
                            <span>Guardar</span>
                        </CustomButton>
                    </Col>
                </Row>
            </Form>
        </>
    );
}