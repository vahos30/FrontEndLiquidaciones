import { TagProps } from "@/core/domain/InterfacesProps";
import { Form } from "react-bootstrap";

export const Tag: React.FC<TagProps> = ({ text, clas = 'status-confirmada' }) => {
  return (
    <Form.Control
      type="text"
      value={text}
      className={`custom-status ${clas}`}
      style={{ width: `${text?.length + 4}ch` }}
      disabled
    />
  );
};
