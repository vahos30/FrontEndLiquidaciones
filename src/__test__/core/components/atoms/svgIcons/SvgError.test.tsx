import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SvgError } from '../../../../../core/components/atoms/svgIcons'

describe('SvgError Component', () => {
    test('renders the SVG element', () => {
        const props = {
            message: 'Este es un error de prueba',
            index: '1'
        };

        render(<SvgError {...props} />);       
        
        const svgElement = screen.getByTestId('error-icon');       
        
        expect(svgElement).toHaveAttribute('data-tip', props.message);
        expect(svgElement).toHaveAttribute('data-for', `error-${props.index}`);
        
        const tooltip = screen.getByRole('tooltip', { hidden: true });
        expect(tooltip).toHaveAttribute('id', `error-${props.index}`);        

        expect(screen.getByText('Error presentado')).toBeInTheDocument();
        expect(screen.getByText(props.message)).toBeInTheDocument();
        
    });
    test('does not render when message is empty', () => {
        const props = {
          message: '',
          index: '1'
        };
    
        const { container } = render(<SvgError {...props} />);
        
        // Verifica que no se renderice nada
        expect(container.firstChild).toBeNull();
    });
});