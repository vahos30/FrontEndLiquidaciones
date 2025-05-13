import { CustomInput } from '../../../../core/components/molecules/CustomInput';
import { render, screen, fireEvent } from '@testing-library/react';

test('renders CustomInput component correctly', () => {
    const mockOnChange = jest.fn();
    
    render(<CustomInput label={'test'} value={'testvalue'} onChange={mockOnChange} disabled={false} required={true} />);
    
    const label = screen.getByText('test');
    const input = screen.getByRole('textbox')
    
    expect(label).toBeInTheDocument();
    expect(label).not.toBeDisabled();
    expect(input).toBeInTheDocument();
    expect(input).toBeRequired();
});

test('renders CustomInput component with change value', () => {
    const mockOnChange = jest.fn();
    
    render(<CustomInput label={'test'} value={'testvalue'} onChange={mockOnChange} disabled={false} required={true} />);
    
    const label = screen.getByText('test');
    const input = screen.getByRole('textbox')
    
    expect(label).toBeInTheDocument();
    expect(label).not.toBeDisabled();
    expect(input).toBeInTheDocument();
    expect(input).toBeRequired();
})
describe('CustomInput Component', () => {
    test('renders CustomInput component correctly', () => {
        const mockOnChange = jest.fn();

        render(
            <CustomInput
                label="Test Label"
                value="Test Value"
                onChange={mockOnChange}
                disabled={false}
                required={true}
            />
        );

        const label = screen.getByText('Test Label');
        const input = screen.getByRole('textbox');

        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent('Test Label');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Test Value');
        expect(input).toBeRequired();
        expect(input).not.toBeDisabled();
    });

    test('calls onChange handler when input value changes', () => {
        const mockOnChange = jest.fn();

        render(
            <CustomInput
                label="Test Label"
                value=""
                onChange={mockOnChange}
                disabled={false}
                required={true}
            />
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Value' } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue('');
        //expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'New Value' } }));
    });

    test('renders disabled input when disabled prop is true', () => {
        const mockOnChange = jest.fn();

        render(
            <CustomInput
                label="Test Label"
                value="Test Value"
                onChange={mockOnChange}
                disabled={true}
                required={false}
            />
        );

        const input = screen.getByRole('textbox');

        expect(input).toBeDisabled();
    });

    test('renders invalid input when required and value is empty', () => {
        const mockOnChange = jest.fn();

        render(
            <CustomInput
                label="Test Label"
                value=""
                onChange={mockOnChange}
                disabled={false}
                required={true}
            />
        );

        const input = screen.getByRole('textbox');

        expect(input).toBeInvalid();
    });
});


