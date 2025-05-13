import React from "react";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from '@/core/components/atoms';
import { Option } from "@/core/domain/Entities";
import { MultiValue } from "react-select";

interface HeaderDeliveryPointProps {
    pointsSelected: Option[];
    selectedPoint: Option[];
    handlePointChange: (value: MultiValue<Option>) => void;
}

export const HeaderDeliveryPoint: React.FC<HeaderDeliveryPointProps> = ({ pointsSelected, selectedPoint, handlePointChange }) => {
    return (
        <Row className="align-items-center mb-3">
            <Col md={2} className="d-flex align-items-center">
                <Dropdown
                    id="dropdown"
                    label="Punto de entrega"
                    options={pointsSelected}
                    value={selectedPoint}
                    onChange={handlePointChange}
                    classNamePrefix="select"
                    placeholder="Todos"
                />
            </Col>
            <Col md={2} className="text-muted fw-bold d-flex align-items-center headerPoints">Código GDM</Col>
            <Col md={2} className="text-muted fw-bold d-flex align-items-center">Fecha</Col>
            <Col md={2} className="text-muted fw-bold d-flex align-items-center">Poder calorífico</Col>
        </Row>
    )
};