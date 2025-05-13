import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SvgDownload } from '../../../../../core/components/atoms/svgIcons'

describe('SvgDownload Component', () => {
    test('renders the SVG element', () => {
        render(<SvgDownload />);       
        
        const svgElement = screen.getByTestId('svg-download');

        expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
        expect(svgElement).toHaveAttribute('height', '20px');
        expect(svgElement).toHaveAttribute('width', '20px');
        expect(svgElement).toHaveAttribute('viewBox', '0 -960 960 960');
        expect(svgElement).toHaveAttribute('fill', 'currentColor');     
        
    });
});