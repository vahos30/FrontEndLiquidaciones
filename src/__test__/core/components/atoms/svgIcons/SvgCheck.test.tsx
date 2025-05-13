import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SvgCheck } from '../../../../../core/components/atoms/svgIcons'

describe('SvgCheck Component', () => {
    test('renders the SVG element', () => {
        render(<SvgCheck />);       
        
        const svgElement = screen.getByTestId('svg-check');

        expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
        expect(svgElement).toHaveAttribute('height', '32px');
        expect(svgElement).toHaveAttribute('width', '32px');
        expect(svgElement).toHaveAttribute('viewBox', '0 -960 960 960');
        expect(svgElement).toHaveAttribute('fill', '#6cbf44');     
        
    });
});