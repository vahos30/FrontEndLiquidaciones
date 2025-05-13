import { TextWithValuesProps } from '@/core/domain/InterfacesProps';
import React from 'react';

export const TextWithValues: React.FC<TextWithValuesProps> = ({ title, value, color = 'gray', valueBotton = false,icon }) => {
    return (
        <p className="text-with-values">
            {title}: {icon}{valueBotton && <br />} <strong style={{ color }}>{value}</strong>
        </p>
    );
};
