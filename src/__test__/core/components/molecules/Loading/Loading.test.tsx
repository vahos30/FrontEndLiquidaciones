import React from 'react';
import { render } from '@testing-library/react';
import {Loading} from '../../../../../core/components/molecules/Loading/Loading';
import useLoading from '../../../../../core/components/molecules/Loading/useLoading';

// Mock the useLoading hook
jest.mock('../../../../../core/components/molecules/Loading/useLoading', () => {
    return jest.fn();
});


describe('Loading Component', () => {
    it('should render null when isLoading is false', () => {
        (useLoading as jest.Mock).mockReturnValue(false);
        const { container } = render(<Loading />);
        expect(container.firstChild).toBeNull();
    });

    it('should render the loading spinner when isLoading is true', () => {
        (useLoading as jest.Mock).mockReturnValue(true);
        const { container } = render(<Loading />);        
        expect(container.querySelector('.spinner-border')).toBeInTheDocument();
    });
});