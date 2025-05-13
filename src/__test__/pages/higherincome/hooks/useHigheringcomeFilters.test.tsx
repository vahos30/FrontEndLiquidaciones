import { renderHook, act } from '@testing-library/react';
import { useHigheringcomeFilters } from '../../../../pages/higherincome/hooks/useHigheringcomeFilters';
import { defaultMonthAndYear } from '@/core/utils';

// Mock de las utilidades
jest.mock('@/core/utils', () => ({
  defaultMonthAndYear: jest.fn(() => ({
    defaultMonth: 6,
    defaultYear: 2024
  }))
}));

const mockOnChange = jest.fn();

describe('useHigheringcomeFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe inicializar con los valores por defecto', () => {
    const { result } = renderHook(() => useHigheringcomeFilters(mockOnChange));
    
    expect(result.current.selectedMonth).toBe(6);
    expect(result.current.selectedYear).toBe(2024);
  });

  it('debe actualizar mes y año correctamente', () => {
    const { result } = renderHook(() => useHigheringcomeFilters(mockOnChange));
    
    act(() => {
      result.current.handleMonthYearChange(11, 2025);
    });

    expect(result.current.selectedMonth).toBe(11);
    expect(result.current.selectedYear).toBe(2025);
  });

  it('debe llamar onChangeSelects con los valores correctos al actualizar', () => {
    const { result } = renderHook(() => useHigheringcomeFilters(mockOnChange));
    
    act(() => {
      result.current.handleMonthYearChange(3, 2023);
    });

    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 3, year: 2023 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: []
    });
  });

  it('debe resetear los filtros a los valores por defecto', () => {
    const { result } = renderHook(() => useHigheringcomeFilters(mockOnChange));
    
    // Cambiar valores primero
    act(() => {
      result.current.handleMonthYearChange(8, 2026);
    });

    // Resetear
    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.selectedMonth).toBe(6);
    expect(result.current.selectedYear).toBe(2024);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 6, year: 2024 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: []
    });
  });

  it('debe actualizar los valores por defecto si cambian', () => {
  // Actualiza el mock de defaultMonthAndYear
  (defaultMonthAndYear as jest.Mock).mockImplementation(() => ({
    defaultMonth: 0,
    defaultYear: 2025,
  }));

  // Renderiza el hook después de actualizar el mock
  const { unmount } = renderHook(() => useHigheringcomeFilters(mockOnChange));

  // Desmonta y vuelve a montar el hook para aplicar el mock actualizado
  unmount();
  const { result: newResult } = renderHook(() => useHigheringcomeFilters(mockOnChange));

  // Verifica los valores actualizados
  expect(newResult.current.selectedMonth).toBe(0);
  expect(newResult.current.selectedYear).toBe(2025);
});

  it('debe mantener la referencia estable de resetFilters con dependencias constantes', () => {
    const { result, rerender } = renderHook(
      ({ onChange }) => useHigheringcomeFilters(onChange),
      { initialProps: { onChange: mockOnChange } }
    );

    const firstReset = result.current.resetFilters;
    
    rerender({ onChange: mockOnChange });
    
    expect(result.current.resetFilters).toBe(firstReset);
  });
});