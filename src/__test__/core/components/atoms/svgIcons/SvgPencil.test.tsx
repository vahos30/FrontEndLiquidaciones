import React from 'react';
import { render } from '@testing-library/react';
import { SvgPencil } from '../../../../../core/components/atoms/svgIcons';

describe('SvgPencil Component', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(<SvgPencil />);
        const svgElement = getByTestId('svg-pencil');
        expect(svgElement).toBeInTheDocument();
    });

    it('applies default size when size prop is not provided', () => {
        const { getByTestId } = render(<SvgPencil />);
        const svgElement = getByTestId('svg-pencil');
        expect(svgElement).toHaveAttribute('height', '20px');
        expect(svgElement).toHaveAttribute('width', '20px');
    });

    it('applies custom size when size prop is provided', () => {
        const customSize = '40px';
        const { getByTestId } = render(<SvgPencil size={customSize} />);
        const svgElement = getByTestId('svg-pencil');
        expect(svgElement).toHaveAttribute('height', customSize);
        expect(svgElement).toHaveAttribute('width', customSize);
    });

    it('applies custom color when color prop is provided', () => {
        const customColor = 'red';
        const { getByTestId } = render(<SvgPencil color={customColor} />);
        const svgElement = getByTestId('svg-pencil');
        expect(svgElement).toHaveAttribute('fill', customColor);
    });

    it('does not apply color attribute when color prop is not provided', () => {
        const { getByTestId } = render(<SvgPencil />);
        const svgElement = getByTestId('svg-pencil');
        expect(svgElement).not.toHaveAttribute('fill');
    });
});