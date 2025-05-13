import { CheckboxProps } from '@/core/domain/InterfacesProps';
import React from 'react';

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <label className="custom-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="checkbox-input"
                disabled={disabled}
            />
            <span className="checkbox-label">{label}</span>
        </label>
    );
};
