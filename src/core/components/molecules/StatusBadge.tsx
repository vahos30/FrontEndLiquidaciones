import { StatusBadgeProps } from "@/core/domain/InterfacesProps";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

const getStatusClass = (status: string): string => {
    switch (status) {
      case "Enviado a SAP":
        return "status-confirmada";
      case "Procesando en SAP":
        return "status-revision";
      case "Error envio a SAP":
        return "status-error";
      case "Pendiente envio SAP":
        return "status-new";
      default:
        return "status-default";
    }
  };

export const StatusBadge: React.FC<StatusBadgeProps> = (props: StatusBadgeProps) => {
    return (
      <OverlayTrigger overlay={props.tooltip ? <Tooltip>{props.tooltip}</Tooltip> : <></>}>
        <Form.Control
          type="text"
          value={props.status}
          className={`custom-status ${getStatusClass(props.status)}`}
          disabled
        />
      </OverlayTrigger>
    
  );
}