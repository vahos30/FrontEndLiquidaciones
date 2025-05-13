import React from "react";
import { CustomButton, TextWithValues } from "../../atoms";
import { Col, Form, Row } from "react-bootstrap";
import { EditLiquidationModalProps } from "@/core/domain/InterfacesProps";

export const RoyalitiesANHDetailsModal: React.FC<EditLiquidationModalProps> = ({ liquidation, liquidationDate, onClose, onUpdateLiquidation }) => {
    return (
        <Form noValidate>
            {liquidation.detail.map((item: any, i: number) => (
                <Row key={i} className="px-3 align-items-center mb-2">
                    <Col md={3} className="d-flex align-items-center">
                        <TextWithValues title="Consecutivo de contrato" valueBotton={true} value={item.consecutive} />
                    </Col>
                    <Col md={3} className="d-flex align-items-center">
                        <TextWithValues title="Total suministro USD" valueBotton={true} value={item.suppliedValueUSD} />
                    </Col>
                    <Col md={3} className="d-flex align-items-center">
                        <TextWithValues title="Suministro MBTU" valueBotton={true} value={item.supplyMBTU} />
                    </Col>
                    <Col md={3} className="d-flex align-items-center">
                        <TextWithValues title="Suministro KPC" valueBotton={true} value={item.supplyKPC} />
                    </Col>
                </Row>
            ))}
            
            <Row className="px-3">
                <Col xs={12} className="d-flex justify-content-end">
                    <CustomButton onClick={onClose} variant="secundary" disabled={false}>
                        <span>Cerrar</span>
                    </CustomButton>
                </Col>
            </Row>
        </Form>
    );
}