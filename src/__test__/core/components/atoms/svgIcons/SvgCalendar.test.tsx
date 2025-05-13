import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SvgCalendar } from '../../../../../core/components/atoms/svgIcons'

describe('SvgCalendar Component', () => {
    test('renders the SVG element', () => {
        render(<SvgCalendar />);       
        
        const svgElement = screen.getByTestId('svg-calendar');

        expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
        expect(svgElement).toHaveAttribute('height', '20px');
        expect(svgElement).toHaveAttribute('width', '20px');
        expect(svgElement).toHaveAttribute('viewBox', '0 -960 960 960');
        expect(svgElement).toHaveAttribute('fill', '#5f6368');     
        
    });
});