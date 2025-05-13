import { CustomButtonProps } from "@/core/domain/InterfacesProps";
import { Button } from "react-bootstrap";
import React from "react";

export const IconButton: React.FC<CustomButtonProps> = ({ children, onClick, disabled }) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={disabled}
            variant="link"
            className="icon-button"
        >
            {children}
        </Button>
    );
};
