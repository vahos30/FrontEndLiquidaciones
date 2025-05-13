import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomButton } from '../../../../core/components/atoms/CustomButton'; 

describe('CustomButton Component', () => {

  test('renders correctly', () => {
    render(<CustomButton disabled={true} type={'submit'} children={'GuardarTest'} variant={'primary'}/>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('primary');
  });

  test('renders correctly with onclick', () => {
    const onClick = jest.fn();
    render(<CustomButton disabled={false} type={'button'} children={'GuardarTest'} onClick={onClick}/>);
    
    const button = screen.getByText('GuardarTest');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});