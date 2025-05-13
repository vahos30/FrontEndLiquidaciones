import { renderHook, act, waitFor } from '@testing-library/react';
import { useLiquidationCarbonFilters } from '../../../../pages/carbon/hooks/useLiquidationCarbonFilters';
import { MasterApi } from '@/core/infrastructure/api';

// Mock de las dependencias
jest.mock('@/core/infrastructure/api', () => ({
  MasterApi: jest.fn(() => ({
    getConsecutivesByMonthYear: jest.fn().mockResolvedValue([]),
  })),
}));

jest.mock('@/core/utils', () => ({
  defaultMonthAndYear: jest.fn(() => ({
    defaultMonth: 1,
    defaultYear: 2023,
  })),
}));

describe('useLiquidationCarbonFilters', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (MasterApi as jest.Mock).mockImplementation(() => ({
      getConsecutivesByMonthYear: jest.fn().mockResolvedValue([]),
    }));
  });

  it('debe inicializar con valores por defecto', async () => {
    const { result } = renderHook(() => useLiquidationCarbonFilters(mockOnChange));
    
    await waitFor(() => {
      expect(result.current.selectedMonth).toBe(1);
      expect(result.current.selectedYear).toBe(2023);
      expect(result.current.selectedConsecutives).toEqual([]);
      expect(result.current.consecutives).toEqual([]);
    });
  });

  it('debe cargar consecutivos al montar', async () => {
    const mockConsecutives = [{ value: '1', label: 'Test' }];
    const mockGetConsecutives = jest.fn().mockResolvedValue(mockConsecutives);
    
    (MasterApi as jest.Mock).mockImplementation(() => ({
      getConsecutivesByMonthYear: mockGetConsecutives,
    }));

    const { result } = renderHook(() => useLiquidationCarbonFilters(mockOnChange));

    await waitFor(() => {
      expect(result.current.consecutives).toEqual(mockConsecutives);
      expect(mockGetConsecutives).toHaveBeenCalledTimes(1);
      expect(mockGetConsecutives).toHaveBeenCalledWith({ month: 1, year: 2023 });
    });
  });

  it('debe manejar cambio de mes/año y resetear consecutivos', async () => {
    const mockGetConsecutives = jest.fn().mockResolvedValue([]);
    (MasterApi as jest.Mock).mockImplementation(() => ({
      getConsecutivesByMonthYear: mockGetConsecutives,
    }));

    const { result } = renderHook(() => useLiquidationCarbonFilters(mockOnChange));

    await act(async () => {
      result.current.handleMonthYearChange(5, 2024);
    });

    expect(result.current.selectedMonth).toBe(5);
    expect(result.current.selectedYear).toBe(2024);
    expect(result.current.selectedConsecutives).toEqual([]);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 5, year: 2024 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: []
    });

    await waitFor(() => {
      expect(mockGetConsecutives).toHaveBeenCalledWith({ month: 5, year: 2024 });
    });
  });

  it('debe actualizar consecutivos seleccionados', async () => {
    const { result } = renderHook(() => useLiquidationCarbonFilters(mockOnChange));
    const newConsecutives = [{ value: '2', label: 'Test2' }];

    await act(async () => {
      result.current.handleChange(newConsecutives);
    });

    expect(result.current.selectedConsecutives).toEqual(newConsecutives);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 1, year: 2023 },
      clients: [],
      consecutives: newConsecutives,
      supplys: [],
      states: []
    });
  });

  it('debe resetear filtros correctamente', async () => {
    const mockGetConsecutives = jest.fn().mockResolvedValue([]);
    (MasterApi as jest.Mock).mockImplementation(() => ({
      getConsecutivesByMonthYear: mockGetConsecutives,
    }));

    const { result } = renderHook(() => useLiquidationCarbonFilters(mockOnChange));

    // Cambiar valores iniciales
    await act(async () => {
      result.current.handleMonthYearChange(5, 2024);
      result.current.handleChange([{ value: '3', label: 'Test3' }]);
    });

    // Resetear
    await act(async () => {
      result.current.resetFilters();
    });

    expect(result.current.selectedMonth).toBe(1);
    expect(result.current.selectedYear).toBe(2023);
    expect(result.current.selectedConsecutives).toEqual([]);
    expect(mockOnChange).toHaveBeenCalledWith({
      months: { month: 1, year: 2023 },
      clients: [],
      consecutives: [],
      supplys: [],
      states: []
    });

    await waitFor(() => {
      expect(mockGetConsecutives).toHaveBeenCalledWith({ month: 1, year: 2023 });
    });
  });

  it('debe actualizar consecutivos al cambiar mes/año', async () => {
    const mockConsecutives = [{ value: '3', label: 'Test3' }];
    const mockGetConsecutives = jest.fn().mockResolvedValue(mockConsecutives);
    
    (MasterApi as jest.Mock).mockImplementation(() => ({
      getConsecutivesByMonthYear: mockGetConsecutives,
    }));

    const { result } = renderHook(() => useLiquidationCarbonFilters(mockOnChange));

    await act(async () => {
      result.current.handleMonthYearChange(6, 2025);
    });

    await waitFor(() => {
      expect(result.current.consecutives).toEqual(mockConsecutives);
      expect(mockGetConsecutives).toHaveBeenCalledWith({ month: 6, year: 2025 });
    });
  });
});