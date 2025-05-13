import { renderHook, act } from '@testing-library/react';
import { useValidationSearch } from '../../../../pages/factorx/hooks/useValidationSearch';
import { defaultMonthAndYear } from '@/core/utils';

// Mock de las utilidades
jest.mock('@/core/utils', () => ({
  defaultMonthAndYear: jest.fn(() => ({
    defaultMonth: 1,
    defaultYear: 2023,
  })),
}));

describe('useValidationSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useValidationSearch());
    
    expect(result.current.search).toEqual({
      months: { month: 1, year: 2023 },
      supplys: []
    });
  });

  it('debe actualizar el estado de búsqueda correctamente', () => {
    const { result } = renderHook(() => useValidationSearch());
    
    const newFilters = {
      months: { month: 5, year: 2024 },
      supplys: [
        { value: 'supply1', label: 'Supply 1' },
        { value: 'supply2', label: 'Supply 2' }
      ]
    };

    act(() => {
      result.current.setSearch(newFilters); // Envolver en act
    });

    expect(result.current.search).toEqual(newFilters);
  });

  it('debe manejar cambios parciales en los filtros', () => {
    const { result } = renderHook(() => useValidationSearch());
    
    act(() => {
      // Cambiar solo el mes
      result.current.setSearch({
        ...result.current.search,
        months: { month: 3, year: 2023 }
      });
    });

    expect(result.current.search).toEqual({
      months: { month: 3, year: 2023 },
      supplys: []
    });
  });

  it('debe usar nuevos valores por defecto cuando se actualizan', () => {
    (defaultMonthAndYear as jest.Mock).mockImplementationOnce(() => ({
      defaultMonth: 6,
      defaultYear: 2024,
    }));

    const { result } = renderHook(() => useValidationSearch());
    
    expect(result.current.search).toEqual({
      months: { month: 6, year: 2024 },
      supplys: []
    });
  });
});