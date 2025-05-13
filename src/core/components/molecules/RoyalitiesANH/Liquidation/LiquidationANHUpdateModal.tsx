import { Col, Form, Row } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { CustomInput } from "@components/molecules/CustomInput";
import { CustomButton } from "@components/atoms/CustomButton";
import { LiquidationANHUpdateModalProps } from "@/core/domain/InterfacesProps";

export const LiquidationANHUpdateModal: React.FC<LiquidationANHUpdateModalProps> = ({ handleSubmit, campo, valorCampo, setValorCampo, errorMessage, cancelar }) => {
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="px-3 align-items-center mb-2">
                <Col>
                    <h1 className="titulo-two m-3">{campo}</h1>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                    <CustomInput label={campo} value={valorCampo} onChange={(e) => setValorCampo(e.target.value)} />
                </Col>
            </Row>
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
                    <CustomButton onClick={cancelar} variant="secundary" disabled={false}>
                        <span>Cancelar</span>
                    </CustomButton>
                    <div style={{ width: '10px' }}></div>
                    <CustomButton variant="primary" type="submit" disabled={false}>
                        <span>Guardar</span>
                    </CustomButton>
                </Col>
            </Row>
        </Form>
    )
}