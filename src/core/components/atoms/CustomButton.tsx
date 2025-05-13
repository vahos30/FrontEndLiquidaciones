import { CustomButtonProps } from "@/core/domain/InterfacesProps";
import { Button } from "react-bootstrap";
import React from "react";

export const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick, variant, disabled, type, title = "" }) => {
    return (
        <Button
            type={type ?? "button"}
            onClick={onClick}
            variant={variant}
            disabled={disabled}
            className={variant}
            title={title}
        >
            {children}
        </Button>        
    );
}