import { Modal } from 'react-bootstrap';
import { CustomButton } from "./CustomButton";
import { MessageExitModalProps } from '@/core/domain/InterfacesProps/MessageExitModalProps';

export const MessageExitModal: React.FC<MessageExitModalProps> = (props: MessageExitModalProps) => {
    return (
        <Modal show={props.show} onHide={props.onHide} centered backdrop="static" keyboard={false}>
            <Modal.Header closeButton className='custom-modal-header'>
                <Modal.Title className="modal-title">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                {props.message}
            </Modal.Body>
            <hr />
            <Modal.Footer className="modal-footer">
                { props.textButtonCancel && 
                    <CustomButton
                        disabled={false}
                        onClick={props.onHide}
                        variant="secundary"
                    ><span>{props.textButtonCancel}</span></CustomButton>
                }
                <CustomButton
                    disabled={false}
                    onClick={props.onExit}
                    variant="primary"
                ><span>{props.textButtonConfirm}</span></CustomButton>
            </Modal.Footer>
        </Modal>
    );
}
