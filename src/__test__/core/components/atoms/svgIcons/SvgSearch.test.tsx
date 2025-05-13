import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SvgSearch } from '../../../../../core/components/atoms/svgIcons'

describe('SvgSearch Component', () => {
    test('renders SvgSearch component correctly', () => {
        render(<SvgSearch />);
        
        
        const svgElement = screen.getByTestId('svg-search');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
        expect(svgElement).toHaveAttribute('width', '20');
        expect(svgElement).toHaveAttribute('height', '20');              
        expect(svgElement).toHaveAttribute('stroke', 'currentColor');        
        expect(svgElement).toHaveClass('feather feather-search');        
        
    });
});