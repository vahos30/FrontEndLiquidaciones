import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../../../../core/components/atoms/Dropdown'; // Ajusta la ruta según tu estructura
import { MultiSelectProps } from '../../../../core/domain/InterfacesProps';
import { Option } from '../../../../core/domain/Entities';

// Mock mejorado de react-select
jest.mock('react-select', () => ({ 
  __esModule: true,
  default: jest.fn(({
    isMulti,
    options,
    value,
    onChange,
    placeholder,
    classNamePrefix,
    id,
    closeMenuOnSelect,
    isClearable,
    isSearchable,
    isDisabled,
    isLoading,
    ...props    
  }) => {
    return (
      <div data-testid={`mock-select-${id}`}>
        <select
          data-testid={`mock-select-element-${id}`}
          multiple={isMulti}
          value={value?.map((v: any) => v.value) || []}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions)
              .map(option => ({
                value: option.value,
                label: option.label
              }));
            onChange(selectedOptions);
          }}
          {...props}
        >
          {options?.map(({ label, value }: any) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  })
}));

describe('Dropdown Component', () => {
  const mockOptions: Option[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const mockOnChange = jest.fn();

  const defaultProps: MultiSelectProps = {
    id: 'test-dropdown',
    label: 'Test Label',
    options: mockOptions,
    onChange: mockOnChange,
    classNamePrefix: 'test',
    placeholder: 'Select options...',
    required: false,
    isMulti: true,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { container } = render(<Dropdown {...defaultProps} />);
    
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.queryByText('*')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-select-test-dropdown')).toBeInTheDocument();
  });

  it('passes all SelectProps correctly to the underlying Select component', () => {
    const customProps: MultiSelectProps = {
      ...defaultProps,
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isSearchable: true,
      closeMenuOnSelect: false,
    };

    render(<Dropdown {...customProps} />);
    
    const selectElement = screen.getByTestId('mock-select-element-test-dropdown');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).not.toBeDisabled();
  });

  it('shows required asterisk when required is true', () => {
    const customProps: MultiSelectProps = {
        ...defaultProps,
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isSearchable: true,
        closeMenuOnSelect: false,
    };
    render(<Dropdown {...customProps} required={true} />);
    
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-danger');
    
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('custom-label');
  });

  it('passes options and value correctly to Select component', () => {
    const customProps: MultiSelectProps = {
        ...defaultProps,
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isSearchable: true,
        closeMenuOnSelect: false,
    };
    const selectedValues: Option[] = [
      { value: '1', label: 'Option 1' },
      { value: '3', label: 'Option 3' }
    ];

    render(<Dropdown {...customProps} value={selectedValues} />);
    
    const selectElement = screen.getByTestId('mock-select-element-test-dropdown');
    expect(selectElement.children.length).toBe(mockOptions.length);
    
    // Verificar que las opciones seleccionadas tienen el atributo selected
    const option1 = screen.getByText('Option 1') as HTMLOptionElement;
    const option3 = screen.getByText('Option 3') as HTMLOptionElement;
    expect(option1.selected).toBeTruthy();
    expect(option3.selected).toBeTruthy();
  });

  it('handles multi-select onChange event correctly', () => {
    const customProps: MultiSelectProps = {
        ...defaultProps,
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isSearchable: true,
        closeMenuOnSelect: false,
    };
    render(<Dropdown {...customProps} />);
    
    const selectElement = screen.getByTestId('mock-select-element-test-dropdown') as HTMLSelectElement;
  
  // Obtener todas las opciones
  const options = screen.getAllByRole('option') as HTMLOptionElement[];
  
  // Seleccionar las opciones 1 y 2
  options[0].selected = true; // Option 1
  options[1].selected = true; // Option 2
  
  // Crear un nuevo evento change
  const changeEvent = new Event('change', { bubbles: true });
  Object.defineProperty(changeEvent, 'target', {
    writable: false,
    value: selectElement
  });
  
  // Disparar el evento
  fireEvent(selectElement, changeEvent);
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith([
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ]);
  });


  it('passes isMulti prop correctly', () => {
    render(<Dropdown {...defaultProps} />);
    
    const selectElement = screen.getByTestId('mock-select-element-test-dropdown');
    expect(selectElement).toHaveAttribute('multiple');
  });

});