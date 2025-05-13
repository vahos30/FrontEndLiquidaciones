import { Col, Form, Row } from "react-bootstrap";
import { SvgIconModal } from '@/core/components/atoms/svgIcons';
import { DeliveryPoint } from "@/core/domain/Entities";

interface PointsCardProps {
    points: DeliveryPoint[];
    handleOpenModal: (point: any) => void;
}

export const PointsCard: React.FC<PointsCardProps> = ({ points, handleOpenModal }) => {
    return (
        <Row className="mt-3 gap-3">
            {points.map((point: DeliveryPoint) => (
                <Row key={`${point.id}-${point.codigoGDM}`} className="align-items-center mb-2">
                    <Col md={2} className="fw-semibold">{point.nombre}</Col>
                    <Col md={2}>
                        <Form.Control type="text" value={point.codigoGDM} disabled />
                    </Col>
                    <Col md={2}>
                        <Form.Control type="text" value={point.fecha} disabled />
                    </Col>
                    <Col md={2} className="d-flex align-items-center gap-2">
                        <Form.Control type="text" value={point.poder} disabled />
                        <SvgIconModal onClick={() => handleOpenModal(point.idPuntoEntregaGas)} />
                    </Col>
                </Row>
            ))}
        </Row>
    );
}