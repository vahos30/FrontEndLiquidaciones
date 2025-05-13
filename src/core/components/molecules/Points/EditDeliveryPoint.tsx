import { Col, Row } from 'react-bootstrap';
import { CustomInput } from '@/core/components/molecules';
import { SvgIconModal } from '@/core/components/atoms/svgIcons';
import { CustomButton, DateInput, Dropdown } from '@/core/components/atoms';
import { CheckCircleFill, ExclamationCircleFill, Plus, Trash } from 'react-bootstrap-icons';

interface EditDeliveryPointProps {
    powerList: any[];
    handleChange: (index: number, fieldName: "fecha" | "poder", value: any) => void;
    handleAdd: () => void;
    handleRemove: (index: number) => void;
    handleSave: () => void;
    handleCloseModal: () => void;
    errorMessage?: string;
    successMessage?: string;
}

export const EditDeliveryPoint: React.FC<EditDeliveryPointProps> = ({ powerList, handleChange, handleAdd, handleRemove, handleSave, handleCloseModal, errorMessage, successMessage }) => {
    return (
        <>
            <Row>
                <Col md='auto' className="d-flex align-items-center">
                    <SvgIconModal />
                    <h1 className="titulo-two ms-2">Poder calorífico</h1>
                </Col>
            </Row>
            {powerList.map((poder, index) => (
                <Row key={index} className="align-items-center mb-2 mt-4">
                    <Col md={3}>
                        <Dropdown
                            id="dropdown"
                            value={[{ value: powerList[0].id.toString(), label: poder.nombre }]}
                            label="Punto de entrega"
                            placeholder="Seleccione"
                            classNamePrefix="select"
                            isDisabled
                        />
                    </Col>
                    <Col md={2}>
                        <CustomInput label="Código GDM" value={poder.codigoGDM} disabled onChange={() => { }} />
                    </Col>
                    <Col md={2} className='mb-3'>
                        <DateInput label="Fecha" required value={poder.fecha} onChange={(e) => handleChange(index, "fecha", e.target.value)} />
                    </Col>
                    <Col md={2} className="d-flex align-items-center gap-2">
                        <CustomInput label="Poder calorífico" value={poder.poder} required
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const regex = /^[1-9](\.\d{0,8})?$/;
                                if (inputValue === "" || regex.test(inputValue)) {
                                    handleChange(index, "poder", inputValue);
                                }
                            }}
                        />
                    </Col>
                    <Col className="d-flex align-items-center">
                        <Plus
                            size={25}
                            className="m-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleAdd()}
                            title='Agregar'
                        />
                        {powerList.length > 1 && (
                            <Trash
                                size={25}
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemove(index)}
                                title='Eliminar'
                            />
                        )}
                    </Col>
                </Row>
            ))}
            <Row className="align-items-center">
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
                    <CustomButton onClick={() => handleCloseModal()} variant="secundary" disabled={false}>
                        <span>Cancelar</span>
                    </CustomButton>
                    <CustomButton onClick={() => handleSave()} variant="primary" disabled={powerList.some((poder) => !poder.fecha || !poder.poder || errorMessage)}>
                        <span>Guardar</span>
                    </CustomButton>
                </Col>
            </Row>
        </>
    )
}