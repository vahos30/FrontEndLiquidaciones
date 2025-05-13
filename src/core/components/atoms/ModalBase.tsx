import { Modal } from "react-bootstrap"
import { SuccessfulCreationModalProps } from "@/core/domain/InterfacesProps"

export const ModalBase: React.FC<SuccessfulCreationModalProps> = ({ show, onHide, title, children }: SuccessfulCreationModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header
        className='text-white font-weight-bold custom-modal-header'
        style={{ borderBottom: 'none', backgroundColor: '#2B388F', fontSize: '15px' }}
        closeButton
      >
        <Modal.Title style={{ fontSize: '22px', fontWeight: 'bold' }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4" style={{ fontSize: '16px', color: '#212529' }}>
        {children}
      </Modal.Body>
      <hr className="m-0" />
    </Modal>
  )
}