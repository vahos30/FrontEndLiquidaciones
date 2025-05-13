import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton } from "@/core/components/atoms/IconButton";


test('should render the button with the correct variant', () => {
    const mockClick = jest.fn();
    render(<IconButton children={'click'} onClick={mockClick} disabled={false} />);
    const button = screen.getByRole("button");
    expect(screen.getByText("click")).toBeInTheDocument();
    expect(button).toHaveClass("btn-link");    
});

test('should call onClick when clicked', () => {
    const mockClick = jest.fn();
    render(<IconButton children={'click'} onClick={mockClick} disabled={false} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);        
});

test('should be disabled when the disabled prop is true', () => {
    const mockClick = jest.fn();
    render(<IconButton children={'click'} onClick={mockClick} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();        
});