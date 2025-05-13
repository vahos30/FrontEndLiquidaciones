import React from 'react';
import { render, screen } from '@testing-library/react';
import { SvgContract } from '../../../../../core/components/atoms/svgIcons'

jest.mock('react-tooltip', () => ({
    __esModule: true,
    default: ({ id, children, 
        effect,
        place,
        backgroundColor,
        textColor,
        padding,
        delayShow}: { 
        id: string; 
        children: React.ReactNode; 
        effect?: string; 
        place?: string; 
        backgroundColor?: string; 
        textColor?: string; 
        padding?: string; 
        delayShow?: number 
    }) => (
      <div data-testid={`mock-tooltip-${id}`} 
        id={`tooltip-contract-${id}`} style={{padding,backgroundColor}}   
        >
        {children}
      </div>
    ),
}));

describe('SvgContract Component', () => {
    const defaultIndex = 'test-1';
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('renders the SVG element', () => {
        render(<SvgContract index={defaultIndex}/>);       
        
        const svgElement = screen.getByTestId('svg-contract');

        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('data-tip', 'Ingresar total entregado');
        expect(svgElement).toHaveAttribute('data-for', `tooltip-contract-${defaultIndex}`);
        expect(svgElement).toHaveAttribute('height', '24px');
        expect(svgElement).toHaveAttribute('width', '24px');
        expect(svgElement).toHaveAttribute('fill', '#2B388F');
        
    });

    test('renders the tooltips', () => {
        const differentIndex = 'test-2';
        render(<SvgContract index={differentIndex} />);
    
        const svgElement = screen.getByTestId('svg-contract');
        const tooltip = screen.getByTestId(`mock-tooltip-tooltip-contract-${differentIndex}`);
    
        expect(svgElement).toHaveAttribute('data-for', `tooltip-contract-${differentIndex}`);
        expect(tooltip).toBeInTheDocument();
    });
});