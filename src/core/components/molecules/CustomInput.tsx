import { Form } from "react-bootstrap";
import { CustomInputProps } from "@/core/domain/InterfacesProps";

export const CustomInput: React.FC<CustomInputProps> = ({ label, value, onChange, disabled = false, required }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label className="custom-label">
                {required && (<span className="text-danger">* </span>)}
                {label}
            </Form.Label>
            <Form.Control
                type="text"
                required={required}
                value={value}
                onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)}
                disabled={disabled}
                isInvalid={required && !value}
            />
        </Form.Group>
    );
}