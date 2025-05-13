import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox } from '../../../../core/components/atoms/Checkbox'; 

describe('Checkbox Component', () => {

  test('renders correctly', () => {
    render(<Checkbox label='Test Checkbox' checked={false} onChange={() => {}} disabled={true} />);
    
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('click', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox label='Test Checkbox' checked={false} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalled();
    
  });

});