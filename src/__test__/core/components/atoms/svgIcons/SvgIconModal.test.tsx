import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SvgIconModal } from '../../../../../core/components/atoms/svgIcons'

describe('SvgIconModal Component', () => {
    test('renders the SVG element', () => {
        render(<SvgIconModal />);       
        
        const svgElement = screen.getByTestId('svg-iconmodal');
        expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');        
        expect(svgElement).toHaveAttribute('viewBox', '0 0 22 22');
        expect(svgElement).toHaveAttribute('fill', 'none');   
        
        expect(svgElement).toHaveStyle({
            cursor: 'pointer',
            marginLeft: '10px',
            opacity: '1'
        });
        
    });
    test('applies disabled styles when disabled prop is true', () => {
        render(<SvgIconModal disabled={true} />);
        
        const svgElement = screen.getByTestId('svg-iconmodal');
        expect(svgElement).toHaveStyle({
          cursor: 'not-allowed',
          marginLeft: '10px',
          opacity: '0.5'
        });
    });
    test('calls onClick handler when clicked and not disabled', () => {
        const mockOnClick = jest.fn();
        render(<SvgIconModal onClick={mockOnClick} />);
        
        const svgElement = screen.getByTestId('svg-iconmodal');
        fireEvent.click(svgElement);
        
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});