import { renderHook, act, waitFor } from '@testing-library/react';
import { useFactorXLiquidation } from '../../../../pages/factorx/hooks/useFactorXLiquidation';
import { factorXApi } from '@/core/infrastructure/api';
import { FiltersLiquidationANH } from '@/core/domain/Entities/FiltersLiquidationANH';

// Mock de la API
jest.mock('@/core/infrastructure/api', () => ({
  factorXApi: jest.fn().mockImplementation(() => ({
    getFactorXLiquidation: jest.fn(),
    liquidateFactorX: jest.fn(),
  })),
}));

// Mock para console.error
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

describe('useFactorXLiquidation', () => {
  const mockFilters: FiltersLiquidationANH = {
    months: { month: 1, year: 2023 },
    supplys: [],
  };

  const mockFactors = [
    { idliquidation: '1', checked: false, nombre: 'Factor 1' },
    { idliquidation: '2', checked: true, nombre: 'Factor 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe cargar factores correctamente', async () => {
    (factorXApi as jest.Mock).mockImplementation(() => ({
      getFactorXLiquidation: jest.fn().mockResolvedValue(mockFactors),
      liquidateFactorX: jest.fn(),
    }));

    const { result } = renderHook(() => useFactorXLiquidation(mockFilters));

    await act(async () => {
      result.current.getLiquidation();
    });

    await waitFor(() => {
      expect(result.current.factors).toEqual(mockFactors);
      expect(result.current.loading).toBe(false);
    });
  });

  it('debe manejar errores al cargar factores', async () => {
    (factorXApi as jest.Mock).mockImplementation(() => ({
      getFactorXLiquidation: jest.fn().mockRejectedValue(new Error('API Error')),
      liquidateFactorX: jest.fn(),
    }));

    const { result } = renderHook(() => useFactorXLiquidation(mockFilters));

    await act(async () => {
      result.current.getLiquidation();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Error al consultar factor x');
      expect(result.current.loading).toBe(false);
    });
  });

  it('debe liquidar factores correctamente', async () => {
    const mockLiquidate = jest.fn().mockResolvedValue(true);
    (factorXApi as jest.Mock).mockImplementation(() => ({
      getFactorXLiquidation: jest.fn().mockResolvedValue(mockFactors),
      liquidateFactorX: mockLiquidate,
    }));

    const { result } = renderHook(() => useFactorXLiquidation(mockFilters));

    await act(async () => {
      await result.current.liquidateFactorX(['1', '2']);
    });

    await waitFor(() => {
      expect(mockLiquidate).toHaveBeenCalledWith(mockFilters, ['1', '2']);
      expect(result.current.success).toBe('Liquidación realizada con éxito');
    });
  });

  it('debe manejar errores al liquidar', async () => {
    const mockLiquidate = jest.fn().mockRejectedValue(new Error('Liquidación fallida'));
    (factorXApi as jest.Mock).mockImplementation(() => ({
      getFactorXLiquidation: jest.fn(),
      liquidateFactorX: mockLiquidate,
    }));

    const { result } = renderHook(() => useFactorXLiquidation(mockFilters));

    await act(async () => {
      await result.current.liquidateFactorX(['1']);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Error al liquidar factor x');
    });
  });

  it('debe actualizar el estado de factores', async () => {
    const { result } = renderHook(() => useFactorXLiquidation(mockFilters));

    const newFactors = [...mockFactors, { idliquidation: '3', checked: false, nombre: 'Factor 3' }];
    
    await act(async () => {
      result.current.setFactors(newFactors);
    });

    expect(result.current.factors).toEqual(newFactors);
  });
});