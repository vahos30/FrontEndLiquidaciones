import { MultiSelectProps } from "@/core/domain/InterfacesProps";
import Select, { MultiValue } from "react-select";
import { Option } from "@/core/domain/Entities";
import { Form } from "react-bootstrap";

export const Dropdown: React.FC<MultiSelectProps> = (props: MultiSelectProps) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label className="custom-label">
                {props.required && (<span className="text-danger">* </span>)}
                {props.label}
            </Form.Label>
            <Select
                isMulti
                options={props.options}
                value={props.value}
                onChange={props.onChange as (newValue: MultiValue<Option>) => void}
                classNamePrefix={props.classNamePrefix}
                placeholder={props.placeholder}
                {...props}
                required={props?.required}
            />
        </Form.Group>
    )
}